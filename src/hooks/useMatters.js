import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie';

const getAllMatters = async () => {
    const userCookieString = Cookies.get('userAuth');
    let userAuth;

    if (userCookieString) {
        const userCookie = JSON.parse(userCookieString);
        userAuth = userCookie.userAuth;
    }
    try {
        const response = await axios.get("https://nmt.nmultifibra.com.br/notion/ws/matters", {
            headers: {
                'userAuth': userAuth, 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching matters:", error);
        throw new Error("Failed to fetch matters");
    }
};

export function useGetMatters() {
   
    const query = useQuery({
        queryKey: ['getMatters'],
        queryFn: getAllMatters,
        initialData: [],
    });

    return {
        ...query,
        matters: query.data,
    };
}