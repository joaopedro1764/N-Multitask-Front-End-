import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie';
import { showToast } from "../componentes/Notification/Notification";

const loginUser = async (data) => {
    return await axios.post("http://10.0.30.221:5228/AuthenticateUser", data);
}


export const useLogin = () => {

    const mutate = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            Cookies.set("userAuth", JSON.stringify(data.data))
            window.location.href = "/suporteTecnico"
        },
        onError: (error) => {
            console.log(error)
            showToast(error.response.data, "error");
        }
    });

    return mutate;
}


