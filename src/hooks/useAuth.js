import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie';
import { showToast } from "../componentes/Notification/Notification";
import { useForm } from "react-hook-form"

const loginUser = async (data) => {
    return await axios.post("http://10.0.30.147:5228/AuthenticateUser", data);
}

export const useLogin = () => {

    const form = useForm();

    const mutate = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            Cookies.set("userAuth", JSON.stringify(data.data))
            window.location.href = "/suporteTecnico"
        },
        onError: (error) => {
            showToast(error.response.data, "error");
        }
    });


    const handleLogin = async (data) => {
        if (data.user === "") {
            form.setFocus("user");
            showToast("Preencha o campo usuário!", "error");
        } else if (data.password === "") {
            form.setFocus("password");
            showToast("Preencha o campo senha!", "error");
        } else {
            const dataApi = {
                user: data.user,
                passwd: data.password
            };
            mutate.mutate(dataApi);
        }
    }

    return {
        handleLogin,
        form
    }
}



