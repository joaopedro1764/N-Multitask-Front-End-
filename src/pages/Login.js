import { useForm } from "react-hook-form"
import { Button } from "../componentes/Button"
import { TextField } from "../componentes/TextField"
import { useLogin } from "../hooks/userAuth.js"
import { Notification } from "../componentes/Notification.js"
export const Login = () => {

    const { mutate } = useLogin()
    const { register, handleSubmit } = useForm();

    const handleLogin = async (data) => {
        if (data.password || data.user !== "") {
            const dataApi = {
                user: data.user,
                passwd: data.password
            }
            mutate(dataApi)
        }
    }

    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="xl:flex xl:flex-col xl:w-1/2 items-center hidden xl:h-full p-4 bg-black rounded-r-3xl shadow-2xl">
                <img
                    className="bg-center w-[40%] mt-16"
                    alt="Imagem Lateral Esquerda"
                    src={require("../assets/logo.png")}
                />
                <img
                    className="bg-center w-[80%]"
                    alt="Imagem Lateral Esquerda"
                    src={require("../assets/icon-img.png")}
                />
            </div>
            <div className="w-full xl:w-1/2 min-h-screen flex justify-center items-center">
                <div className="flex flex-col h-[700px] mx-auto w-[600px] shadow-xl border-l-gray-200 border-l-4 border-b-[6px] border-r-[6px] p-6 border-r-black border-b-black rounded-xl">
                    <h2 className="text-6xl text-center font-medium text-black  font-kodchasan-bold">LOGIN</h2>
                    <span className="text-center text-black mt-4 font-kodchasan-bold">Gerenciador de Tarefas</span>
                    <form onSubmit={handleSubmit(handleLogin)} className="my-auto flex flex-col gap-4">
                        <label className="text-black font-kodchasan-bold text-1xl">Usuário</label>
                        <TextField
                            {...register("user")}
                            type="text"
                            placeholder="Ex: Higor.Silva" />
                        <label className="text-start text-black font-kodchasan-bold text-1xl">Senha</label>
                        <TextField
                            {...register("password")}
                            type="password"
                            placeholder="**********" />
                        <Button text="Acessar" type="submit" />
                    </form>

                </div>
            </div>
            <Notification />
        </div >
    )
}