import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showToast } from '../componentes/Notification/Notification';

const userAuth = (Cookies.get("userAuth"));

const logoutUser = async () => {
    return await axios.get("http://10.0.30.221:5228/DeauthenticateUser", {
        headers: {
            'userauth': userAuth
        }
    });
}

export const useLogout = () => {

    const mutate = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            Cookies.remove("userAuth")
            window.location.href = "/"
        },
        onError: (error) => {
            showToast(error.message, "error")
        }
    });

    return mutate;
}