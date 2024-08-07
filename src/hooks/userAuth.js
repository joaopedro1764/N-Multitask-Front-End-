import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { showToast } from "../componentes/Notification/Notification";

const loginUser = async (data) => {
    return await axios.post("https://nmt.nmultifibra.com.br/notion/AuthenticateUser", data);
}


export const useLogin = () => {
    const navigate = useNavigate();
    const mutate = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            Cookies.set("userAuth", data.data)
            window.location.href = "/suporteTecnico"
        },
        onError: (error) => {
            if (error.response.status === 401) {
                showToast("Usuário e/ou senha incorreto!", "error");
            } else if (error.response.status === 409) {
                showToast("Usuário já está logado!", "error");
            } else {
                showToast("Erro no servidor, tente novamente ;-;!", "error");
            }
        }
    });

    return mutate;
}


