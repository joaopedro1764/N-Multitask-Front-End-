import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const loginUser = async (data) => {
    return await axios.post("https://nmt.nmultifibra.com.br/notion/AuthenticateUser", data);
}

console.log(Cookies.get("tokenAuth"))

const logoutUser = async (data) => {
    return await axios.post("https://nmt.nmultifibra.com.br/notion/DeauthenticateUser", data, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get("tokenAuth")}`
        }
    });
}

export const useLogin = () => {

    const mutate = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            toast.success("Logado com sucessso" + data.data)
            Cookies.set("tokenAuth", data.data)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    return mutate;
}

export const useLogout = () => {

    const mutate = useMutation({
        mutationFn: logoutUser,
        onSuccess: (data) => {
            toast.success("Sucesso, deslogado")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    return mutate;
}

