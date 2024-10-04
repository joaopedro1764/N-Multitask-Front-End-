import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie';

const getAllUsers = async () => {
    const userCookieString = Cookies.get('userAuth');
    let userAuth;

    if (userCookieString) {
        const userCookie = JSON.parse(userCookieString);
        userAuth = userCookie.userAuth;
    }
    try {
        const response = await axios.get("https://nmt.nmultifibra.com.br/notion/ws/users", {
            headers: {
                'userAuth': userAuth, 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
};

export function useGetUser() {
   
    const query = useQuery({
        queryKey: ['getUsers'],
        queryFn: getAllUsers,
        initialData: [],
    });

    return {
        ...query,
        users: query.data,
    };
}
