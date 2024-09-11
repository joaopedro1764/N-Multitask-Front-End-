import { useForm } from "react-hook-form"
import { useLogin } from "../hooks/userAuth.js"
import { Notification, showToast } from "../componentes/Notification/Notification.js"
export const Login = () => {

    const { mutate} = useLogin();
    const { handleSubmit, register, setFocus } = useForm()

    const handleLogin = async (data) => {
        if (data.user === "") {
            setFocus("user");
            showToast("Preencha o campo usuário!", "error");
        } else if (data.password === "") {
            setFocus("password");
            showToast("Preencha o campo senha!", "error");
        } else {
            const dataApi = {
                user: data.user,
                passwd: data.password
            };
            mutate(dataApi)
        }
    }


    return (

        <div className="w-full h-screen bg-fundo-login bg-center bg-no-repeat bg-cover overflow-hidden">
            <div className="flex w-full h-full justify-center items-center">
                <div className="hidden lg:w-[60%] lg:flex flex-col items-center mt-10">
                    <span className="text-white text-4xl text-start font-kodchasan-bold w-[450px]">Um sistema completo e dinâmico para demandas cotidianas.</span>
                    <img width={"52%"} alt="Imagem " src={require("../assets/iconLogin.png")} />
                </div>
                <div className="flex flex-col w-[500px] bg-white rounded-md h-[700px] lg:mx-auto">
                    <img className="mt-6 w-72 mx-auto" alt="Imagem " src={require("../assets/LogoSSA.png")} />
                    <form className="w-full flex flex-col mt-10 gap-4 p-6" onSubmit={handleSubmit(handleLogin)}>
                        <label className="text-gray-600 text-xl -mb-3 font-bold">Usuário:</label>
                        <input {...register("user")} type="text" placeholder="Digite o usuário..." className="w-full px-3 py-4 border-b-2 border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:border-none focus:ring-black placeholder-gray-400" />
                        <label className="text-gray-600 text-xl -mb-3 font-bold">Senha:</label>
                        <input {...register("password")} type="password" placeholder="Digite a senha..." className="w-full px-3 py-4 border-b-2 border-gray-600  rounded-sm focus:outline-none focus:ring-1 focus:border-none focus:ring-black placeholder-gray-400" />
                        <button className="p-4 bg-black text-white rounded-md mt-20">Entrar</button>
                    </form>
                </div>
            </div>
            <Notification />
        </div>


    )
}