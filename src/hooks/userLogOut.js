import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showToast } from '../componentes/Notification/Notification';

let userAuth;
const userCookieString = Cookies.get('userAuth');

if (userCookieString) {
    let userCookie = JSON.parse(userCookieString);
    userAuth = userCookie.userAuth;
}

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
            console.log(error)
            showToast(error.response.data, "error")
        }
    });

    return mutate;
}