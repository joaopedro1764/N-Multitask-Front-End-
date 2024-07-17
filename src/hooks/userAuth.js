import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from 'react-hot-toast';
const loginUser = async (data) => {
    return await axios.post("https://nmt.nmultifibra.com.br/notion/AuthenticateUser", data);
}


export const useLogin = () => {

    const mutate = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log(data.data)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    return mutate;
}