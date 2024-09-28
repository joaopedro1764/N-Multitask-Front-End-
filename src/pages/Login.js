import { useForm } from "react-hook-form"
import { useLogin } from "../hooks/userAuth.js"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { showToast } from "../componentes/Notification/Notification.js";
export const Login = () => {

    const { mutate } = useLogin();
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
                <div className="hidden xl:w-[50%] xl:flex flex-col justify-center">
                    <span className="text-white text-4xl text-start font-kodchasan-bold w-[450px]">Um sistema completo e dinâmico para demandas cotidianas.</span>
                    <img width={"60%"} alt="Imagem " src={require("../assets/iconLogin.png")} />
                </div>
                <div className="w-[500px] bg-white rounded-md h-[600px]">
                    <div className="h-full w-full flex items-center justify-center flex-col">

                        <img className="w-60" alt="Imagem " src={require("../assets/LogoLogin.png")} />

                        <form className="w-full flex flex-col gap-4 p-6" onSubmit={handleSubmit(handleLogin)}>
                            <label className="text-gray-600 text-xl -mb-3 font-bold">Usuário:</label>
                            <input {...register("user")} type="text" placeholder="Digite o usuário..." className="w-full px-3 py-4 border-b-2 border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:border-none focus:ring-black placeholder-gray-400" />
                            <label className="text-gray-600 text-xl -mb-3 font-bold">Senha:</label>
                            <input {...register("password")} type="password" placeholder="Digite a senha..." className="w-full px-3 py-4 border-b-2 border-gray-600  rounded-sm focus:outline-none focus:ring-1 focus:border-none focus:ring-black placeholder-gray-400" />
                            <button className="p-4 bg-black text-white rounded-md mt-10">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>


    )
}