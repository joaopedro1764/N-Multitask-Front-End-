import Cookies from 'js-cookie';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { useWebSocketContext } from "../../hooks/useWebSocketProvider";
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import moment from "moment";
import { useGetUser } from '../../hooks/useUser';
import Data from "../../utils/data.json"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const ModalRegisterTask = ({ open, setOpen }) => {


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

    const { users } = useGetUser()

    let user;
    const userCookieString = Cookies.get('userAuth');

    if (userCookieString) {
        let userCookie = JSON.parse(userCookieString);
        user = userCookie;
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        criteriaMode: 'all',
        mode: 'all',
        resolver: zodResolver(schemaForms),
        defaultValues: {
            task: {
                "priority": "",
                "client": "",
                "date": "",
                "subject": "",
                "collaborator": "",
                "comment": ""
            }
        }
    })
    const [value, setValue] = useState("")
    const { sendMessage, message } = useWebSocketContext();
    const itemsPriority = [
        { value: 'normal', label: 'Normal' },
        { value: 'importante', label: 'Importante' },
        { value: 'critico', label: 'Crítico' }

    ]


    const registerTask = (data) => {
      
        console.log(data)

        const message = JSON.stringify({
            type: 'custom_action', action: "addCard",
            input: {
                status: data.subject,
                pageId: 'tasksSupport',
                team: "Suporte",
                todo_time: data.date,
                assignee: data.collaborator,
                title: data.id,
                description: JSON.stringify([data.comment]),
                created_by: user?.name,
                user_img: user?.profile_image
            }
        });
        sendMessage(message);
        setOpen(false);
        reset();
    }

    return (

        <Dialog open={open} as="div" className="relative font-saira-medium z-10 focus:outline-none flex justify-center items-center" onClose={() => setOpen(false)}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center">
                    <DialogPanel
                        transition
                        className="max-w-[800px] relative bg-white rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border-l-[46px] border-l-[#FFDD63]"
                    >
                        <CloseIcon className="absolute right-3 !w-10 !h-10 top-3 cursor-pointer" onClick={() => { setOpen(false); reset(); }} />

                        <h1 class="flex items-center font-saira-bold text-5xl gap-x-4 mt-4 text-blue-fit">Tarefa <BorderColorSharpIcon className='!w-14 !h-14' /> </h1>

                        <form onSubmit={handleSubmit(registerTask)} className="grid grid-cols-2 grid-rows-4 w-full h-full">
                            <div className="w-full flex flex-col">
                                <p className="flex font-saira-medium font-bold text-blue-fit mt-6">Defina como prioridade:</p>
                                <div class="flex gap-x-3 mt-3 ">
                                    {itemsPriority.map(item => (
                                        <div className="flex items-center gap-x-2" key={item.value}>
                                            <label htmlFor={item.value} className="cursor-pointer font-saira-medium">
                                                {item.label}
                                            </label>
                                            <input
                                                {...register("task.priority")}
                                                id={item.value}
                                                type="radio"
                                                value={item.value}
                                                onChange={e => setValue(e.target.value)}
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
                                    <label class="tracking-wide font-saira-medium font-bold mb-2 text-blue-fit" htmlFor="client">
                                        Defina o cliente:
                                    </label>
                                    <input
                                        class="w-64 bg-gray text-gray border-2 border-black rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
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
                                    <label class="tracking-wide font-saira-medium font-bold mb-2 text-blue-fit" htmlFor="date" type="text" placeholder="date">
                                        Data de entrega:
                                    </label>
                                    <input
                                        id='date'
                                        min={moment().format("YYYY-MM-DD")}
                                        class="w-64 bg-gray text-gray border-2 border-black rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
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
                                    <label htmlFor="subject" class="tracking-wide font-saira-medium font-bold mb-2 text-blue-fit" placeholder="selecione">Defina o assunto:</label>
                                    <select
                                        id='subject'
                                        {...register("task.subject")}
                                        class="w-64 bg-gray text-gray border-2 border-black rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ">
                                        <option value="" disabled selected hidden>Assunto</option>
                                        {Data.map((subject, index) => (
                                            <option key={index} value={subject.name}>{subject.name}</option>
                                        ))}

                                    </select>
                                    {errors.task?.subject?.message && (
                                        <p className='text-red-600 text-sm mt-1'>{errors.task.subject?.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <label for="collaborator" class="tracking-wide font-saira-medium font-bold mb-2 text-blue-fit" htmlFor='collaborator'>Defina o colaborador: (opcional)</label>
                                    <select
                                        id="collaborator"
                                        {...register("task.collaborator")}
                                        class="w-64 bg-gray text-gray border-2 border-black rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                        <option class="text-black-500" value="" disabled selected hidden>Colaborador</option>
                                        {
                                            users.map((user, index) => (
                                                <option key={index} value={user.name}>{user.name}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.task?.collaborator?.message && (
                                        <p className='text-red-600 text-sm mt-1'>{errors.task.collaborator?.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-2 mt-2">
                                <label class="tracking-wide font-saira-medium font-bold mb-3 text-blue-fit" htmlFor="comment">
                                    Defina um comentario: (opcional)
                                </label>
                                <textarea
                                    id='comment'
                                    class="w-96 flex text-gray-700 border-2 border-black rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none"
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