import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

let lastToastTime = 0;
const toastDelay = 3000;

const showToast = (message) => {
    const currentTime = Date.now();
    if (currentTime - lastToastTime >= toastDelay) {
        toast.error(message);
        lastToastTime = currentTime;
    }
};

const loginUser = async (data) => {
    return await axios.post("https://nmt.nmultifibra.com.br/notion/AuthenticateUser", data);
}

const userAuth = (Cookies.get("userAuth"))
console.log(userAuth)


const logoutUser = async () => {
    return await axios.post("https://nmt.nmultifibra.com.br/notion/DeauthenticateUser", null, {
        headers: {
            'userAuth': userAuth
        }
    });
}

export const useLogin = () => {
    const navigate = useNavigate();
    const mutate = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            toast.success("Logado com sucessso" + data.data)
            Cookies.set("userAuth", data.data)
            navigate("/dashboard")
        },
        onError: (error) => {
            if (error.response.status === 401) {
                showToast("Usuário e/ou senha incorreto!");
            } else if (error.response.status === 409) {
                showToast("Usuário já está logado!");
            } else {
                showToast("Erro no servidor, tente novamente ;-;!");
            }
        }
    });

    return mutate;
}

export const useLogout = () => {
    const navigate = useNavigate();
    const mutate = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            Cookies.remove("userAuth")
            navigate("/")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    return mutate;
}

