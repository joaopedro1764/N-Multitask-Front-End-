import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Notification } from "../Notification/Notification";
import { useState } from "react";
import { useLogout } from "../../hooks/userLogOut";
export const SideBar = () => {

    const [open, setOpen] = useState(true)
    const { mutate } = useLogout();
    const Menus = [
        { title: "Suporte Técnico", icon: <ContactPhoneIcon />, page: "/suporteTecnico" },
        { title: "Dashboard Gerais", icon: <LeaderboardIcon />, page: "/dashBoard" },
        { title: "Ligações Ativas", icon: <PhoneForwardedIcon />, page: "/ligaçõesAtivas" },
        { title: "Avaliações Negativas", icon: <FactCheckIcon />, page: "/avaliacoesNegativas" },
    ];

    return (
        <div className={`relative h-screen bg-black-dark rounded-r-md border-r-white border-r-[6px] ${open ? 'w-72' : 'w-28'}`}>
            <KeyboardDoubleArrowLeftIcon
                onClick={() => setOpen(!open)}
                className={`!w-10 !h-10 absolute text-white right-3 top-3 cursor-pointer ${!open && 'rotate-180'}`}
            />
            {open ? (
                <img className="w-60 mt-24 mx-auto" alt="Logo SideBar" src={require("../../assets/logo.png")} />
            ) : (
                <img className="w-12 mt-24 mx-auto" alt="Logo SideBar Pequena" src={require("../../assets/logoN.png")} />
            )}

            <div className="flex flex-col w-full items-start justify-start text-white gap-y-4 mt-14">
                {Menus.map((item, index) => (
                    <a
                        href={item.page}
                        className={`flex items-center w-full gap-x-4 text-white px-5 py-3 
                        cursor-pointer hover:text-black-dark hover:bg-white ${index === 0 && 'bg-white !text-black-dark'} ${!open && 'justify-center'} `}
                        key={index}
                    >
                        {item.icon}
                        <span className={`${!open && 'hidden'} font-medium duration-300 text-sm`}>{item.title}</span>
                    </a>
                ))}

                <div className={`w-full h-20 flex items-center justify-center gap-x-4 rounded-md px-3 py-4 absolute bottom-6 ${!open && 'flex-col gap-3'}`}>
                    <img className="w-14" alt="Foto usuário" src={require("../../assets/icon.png")} />
                    <span className={`${!open && 'hidden'} text-white text-center font-medium text-xs`}>Gabriel Marques</span>
                    <ExitToAppIcon onClick={mutate} className="!text-center !w-8 !cursor-pointer" />
                </div>
            </div>
            <Notification />
        </div>
    )
}