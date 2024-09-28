import { Modal } from "@mui/material"
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';

export const ModalRegisterTask = ({ open, setOpen }) => {

    const { register, handleSubmit } = useForm()

    var icon = <svg xmlns="http://www.w3.org/2000/svg" width="45
    " fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
    </svg>

    const registerTask = (data) => {

        console.log(data)
    }

    return (

        <Dialog open={open} as="div" className="relative font-saira-medium z-10 focus:outline-none flex justify-center items-center" onClose={() => setOpen(false)}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center">
                    <DialogPanel
                        transition
                        className="max-w-[800px] relative bg-white rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border-l-[46px] border-l-[#FFDD63]"
                    >
                        <CloseIcon className="absolute right-3 !w-10 !h-10 top-3 cursor-pointer" onClick={() => setOpen(false)} />

                        <h1 class="flex items-center font-saira-bold text-5xl gap-x-4 mt-4 text-blue-fit">Tarefa {icon}</h1>

                        <form onSubmit={handleSubmit(registerTask)} className="grid grid-cols-2 grid-rows-4 w-full h-full">
                            <div className="w-full flex flex-col font-saira-bold">
                                <p className="flex font-saira-medium font-bold text-blue-fit mt-6">Defina como prioridade:</p>
                                <div class="flex gap-x-3 mt-3 ">
                                    <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="html" class="w-20 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Normal</label>
                                    <input
                                        type="radio"
                                        class="w-4 h-5" />
                                    <label for="inline-2-radio" class="w-20 ms-2 text-sm font-medium text-gray-900">Importante</label>
                                    <input
                                       {...register("priority")}
                                        type="radio"
                                        class="w-4 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="inline-checked-radio" class="w-20 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Critico</label>
                                </div>
                            </div>
                            <div class="w-full flex gap-x-5 col-span-2 mt-2">
                                <div className="flex flex-col">
                                    <label class="tracking-wide font-saira-medium font-bold mb-2 text-blue-fit " for="defina-o-id">
                                        ID do Cliente:
                                    </label>
                                    <input
                                        class="w-64 bg-gray text-gray border-2 border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                                        id="please-camp"
                                        type="number"
                                        placeholder="Escreva aqui o ID"
                                        required autocomplete="off"
                                        {...register("id")}
                                    />
                                </div>
                                <div className="w-full flex flex-col">
                                    <label class="tracking-wide font-saira-medium font-bold mb-2 text-blue-fit" for="defina-date" type="text" placeholder="date">
                                        Data de Entrega:
                                    </label>
                                    <input
                                        class="flex w-64 bg-gray text-gray border-2 border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name="date"
                                        type="date"
                                        placeholder="date"
                                        {...register("date")}
                                    />
                                </div>
                            </div>
                            <div class="w-full flex gap-x-5 mt-2">
                                <div class="flex flex-col">
                                    <label for="countries" class="tracking-wide font-saira-medium font-bold mb-2 text-blue-fit" placeholder="selecione">Defina o assunto:</label>
                                    <select
                                        {...register("subject")}
                                        id="countries"
                                        class="w-64 bg-gray text-gray border-2 border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ">
                                        <option class="text-grey " value="" disabled selected hidden>Assunto</option>
                                        <option value="Casos Suporte">Casos Suporte</option>
                                        <option value="Atualização PPPoE">Atualização PPPoE</option>
                                        <option value="O.S Aprimorar">O.S Aprimorar</option>

                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label for="countries" class="tracking-wide font-saira-medium font-bold mb-2 text-blue-fit" placeholder="selecione">Defina o colaborador:</label>
                                    <select
                                        {...register("collaborator")}
                                        id="countries"
                                        class="w-64 bg-gray text-gray border-2 border-black rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                        <option class="text-black-500" value="" disabled selected hidden>Colaborador</option>
                                        <option value="Casos Suporte">Casos Suporte</option>
                                        <option value="Atualização PPPoE">Atualização PPPoE</option>
                                        <option value="O.S Aprimorar">O.S Aprimorar</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-2 mt-2">
                                <label class="tracking-wide font-saira-medium font-bold mb-3 text-blue-fit" for="defina-coment">
                                    Defina um comentario: (opcional)
                                </label>
                                <textarea
                                    class="w-96 flex text-gray-700 border-2 border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none"
                                    type="text"
                                    placeholder="Escreva um comentario"
                                    {...register("coment")}
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