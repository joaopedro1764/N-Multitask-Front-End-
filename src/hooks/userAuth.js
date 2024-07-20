import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const loginUser = async (data) => {
    return await axios.post("https://nmt.nmultifibra.com.br/notion/AuthenticateUser", data);
}

const userAuth = (Cookies.get("userAuth"))


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
        onError: () => {
            toast.error("Usuário e/ou senha incorreto!")
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

