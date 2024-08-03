import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../componentes/Notification/Notification';

const userAuth = (Cookies.get("userAuth"));

const logoutUser = async () => {
    return await axios.post("https://nmt.nmultifibra.com.br/notion/DeauthenticateUser", null, {
        headers: {
            'userAuth': userAuth
        }
    });
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
            showToast(error.message, "error")
        }
    });

    return mutate;
}