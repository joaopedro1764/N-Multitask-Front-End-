import Cookies from 'js-cookie';
import { Dialog, DialogPanel, Radio } from '@headlessui/react'
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useWebSocketContext } from "../../hooks/useWebSocketProvider";
import moment from "moment";
import { useGetUser } from '../../hooks/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DropDownUser } from './DropDownUser';
import { useGetMatters } from '../../hooks/useMatters';

export const ModalRegisterTask = ({ open, setOpen, value }) => {

    const { users } = useGetUser();
    const { matters } = useGetMatters()
    const [selectedUser, setSelectedUser] = useState({ name: "", profile_image: "" });
    const [isOpen, setIsOpen] = useState(false);
    const { sendMessage } = useWebSocketContext();
    const userCookieString = Cookies.get('userAuth');
    const itemsPriority = [
        { value: 'normal', label: 'Normal' },
        { value: 'importante', label: 'Importante' },
        { value: 'critico', label: 'Crítico' }

    ];
    let user;

    if (userCookieString) {
        let userCookie = JSON.parse(userCookieString);
        user = userCookie;
    }    

    const schemaForms = z.object({
        task: z.object({
            "priority": z.enum(["normal", "critico", "importante"], {
                errorMap: () => ({ message: "Selecione uma opção." })
            }),
            "client": z.string().min(5, "Por favor, digite um cliente válido."),
            "date": z.string().min(1, "Por favor, selecione uma data."),
            "subject": z.string().min(1, "Por favor, selecione um assunto válido."),
            "collaborator": z.string().nullable(),
            "comment": z.string().nullable()
        })
    })

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        criteriaMode: 'all',
        mode: 'onBlur',
        resolver: zodResolver(schemaForms),
        defaultValues: {
            task: {
                "priority": "normal",
                "client": "",
                "date": "",
                "subject": value !== "" ? value : "",
                "collaborator": "",
                "comment": ""
            }
        }
    })

    const registerTask = async (data) => {
        const commentExists = (data.task.comment && data.task.comment.length > 0 && data.task.comment[0] !== "");

        let objComment;
        if (commentExists) {
            objComment = {
                date: moment().format("DD/MM/YYYY: HH:mm"),
                comment: data.task.comment,
                user: user
            };
        }

        const message = JSON.stringify({
            type: 'custom_action',
            action: "addCard",
            input: {
                priority: taskPriority,
                status: data.task.subject,
                pageId: 'tasksSupport',
                team: "Suporte",
                todo_time: data.task.date,
                assignee: selectedUser.name,
                title: data.task.client,
                description: commentExists ? JSON.stringify([objComment]) : JSON.stringify([]),
                created_by: user?.name,
                user_img: selectedUser.profile_image,
                last_edited_time: '',
                last_edited_by: '',
                conclusion_timer: ''
            }
        });

        sendMessage(message);
        setOpen(false);
        clearForm();
    }


    const clearForm = () => {
        setIsOpen(false);
        setSelectedUser({ user: "", profile_image: "" });
        reset();
    };

    const BORDER_COLOR = {
        "normal": "border-l-[#83FF57]",
        "importante": "border-l-[#FFDD63]",
        "critico": "border-l-[#FF5F49]"
    };

    const taskPriority = watch('task.priority');
    const border = BORDER_COLOR[taskPriority] || 'border-l-[#FFDD63]';

    useEffect(() => {
        if (value !== "" && open) {
            reset({
                task: {
                    priority: "normal",
                    client: "",
                    date: "",
                    subject: value !== "" ? value : "",
                    collaborator: "",
                    comment: ""
                }
            });
        }
    }, [open, value, reset]);


    var icon = <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="60"
        height="60"
        fill="none"
        viewBox="0 0 60 60"
    >
        <path fill="url(#pattern0_1186_8413)" d="M0 0H60V60H0z"></path>
        <defs>
            <pattern
                id="pattern0_1186_8413"
                width="1"
                height="1"
                patternContentUnits="objectBoundingBox"
            >
                <use transform="scale(.01)" xlinkHref="#image0_1186_8413"></use>
            </pattern>
            <image
                id="image0_1186_8413"
                width="100"
                height="100"
                xlinkHref="data:image/png;base64,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"
            ></image>
        </defs>
    </svg>


    return (

        <Dialog open={open} as="div" className="relative  z-10 focus:outline-none flex justify-center items-center"
            onClose={() => { setOpen(false); clearForm() }}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center">
                    <DialogPanel
                        transition
                        className={`max-w-[800px] relative shadow-2xl bg-white rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border-l-[46px] ${border}`}
                    >
                        <CloseIcon className="absolute right-3 !w-10 !h-10 top-3 cursor-pointer" onClick={() => { setOpen(false); clearForm(); }} />

                        <h1 class="flex items-center font-saira-bold text-5xl gap-x-2 mt-4 text-blue-fit">Tarefa {icon} </h1>

                        <form onSubmit={handleSubmit(registerTask)} className="grid grid-cols-2 grid-rows-4 w-full h-full">
                            <div className="w-full flex flex-col">
                                <p className="flex  font-bold text-blue-fit mt-6">Defina a prioridade:</p>
                                <div class="flex gap-x-3 mt-3 ">
                                    {itemsPriority.map(item => (
                                        <div className="flex items-center gap-x-2" key={item.value}>
                                            <label htmlFor={item.value} className="cursor-pointer font-bold">
                                                {item.label}
                                            </label>
                                            <input
                                                {...register("task.priority")}
                                                id={item.value}
                                                type="radio"
                                                value={item.value}
                                            />

                                        </div>
                                    ))}
                                </div>
                                {errors.task?.priority?.message && (
                                    <p className='text-red-600 text-sm mt-1'>{errors.task.priority?.message}</p>
                                )}
                            </div>
                            <div class="w-full flex gap-x-5 col-span-2 mt-2">
                                <div className="flex flex-col">
                                    <label class="tracking-wide font-bold mb-2 text-blue-fit" htmlFor="client">
                                        Defina o cliente:
                                    </label>
                                    <input
                                        class="w-64 border-2 border-black rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                                        id="client"
                                        type="text"
                                        placeholder="12345 - O.S Sem Conexão"
                                        {...register("task.client")}
                                    />
                                    {errors.task?.client?.message && (
                                        <p className='text-red-600 text-sm mt-1'>{errors.task.client?.message}</p>
                                    )}
                                </div>
                                <div className="w-full flex flex-col">
                                    <label class="tracking-wide mb-2 text-blue-fit font-bold" htmlFor="date" type="text" placeholder="date">
                                        Data de entrega:
                                    </label>
                                    <input
                                        id='date'
                                        min={moment().format("YYYY-MM-DD")}
                                        max={moment().add(14, 'days').format("YYYY-MM-DD")}
                                        class="w-64 border-2 border-black rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white placeholder:text-red-500"
                                        type="date"
                                        placeholder="date"
                                        {...register("task.date")}
                                    />
                                    {errors.task?.date?.message && (
                                        <p className='text-red-600 text-sm mt-1'>{errors.task.date?.message}</p>
                                    )}
                                </div>
                            </div>
                            <div class="w-full flex gap-x-5 mt-2">
                                <div class="flex flex-col">
                                    <label htmlFor="subject" class="tracking-wide font-bold mb-2 text-blue-fit" placeholder="selecione">Defina o assunto:</label>
                                    <select
                                        id='subject'
                                        {...register("task.subject")}
                                        class="w-64 border-2 border-black cursor-pointer rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ">
                                        <option value="" disabled selected hidden>Assunto</option>
                                        {matters.slice(0, -3).map((subject, index) => (
                                            <option key={index} value={subject.name}>{subject.name}</option>
                                        ))}

                                    </select>
                                    {errors.task?.subject?.message && (
                                        <p className='text-red-600 text-sm mt-1'>{errors.task.subject?.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <label class="tracking-wide mb-2 text-blue-fit font-bold" htmlFor="comment">
                                        Defina o colaborador: (opcional)
                                    </label>
                                    <DropDownUser users={users} setIsOpen={setIsOpen} isOpen={isOpen} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
                                    {errors.task?.collaborator?.message && (
                                        <p className='text-red-600 text-sm mt-1'>{errors.task.collaborator?.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-2 mt-2">
                                <label class="tracking-wide font-bold mb-3 text-blue-fit" htmlFor="comment">
                                    Defina um comentario: (opcional)
                                </label>
                                <textarea
                                    id='comment'
                                    class="w-96 flex border-2 border-black rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none"
                                    type="text"
                                    placeholder="Escreva um comentario"
                                    {...register("task.comment")}
                                />
                            </div>
                            <div class="flex justify-start gap-x-4 mt-6">
                                <button type="submit" class="min-w-44 text-white bg-[#182B60] px-3 py-2.5 rounded-lg">Cadastrar</button>
                            </div>
                        </form>

                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    )
}