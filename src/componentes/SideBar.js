import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { BsRouterFill } from "react-icons/bs";
import { AiOutlineGateway } from "react-icons/ai";
import { TbChartInfographic } from "react-icons/tb";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { useLogout } from "../hooks/userAuth";
import { Notification } from "./Notification";
export const SideBar = () => {

    const Menus = [
        { title: "Suporte Técnico", icon: <FaTasks className="w-7 h-7" />, page: "/suporteTecnico" },
        { title: "Acesso Roteador", icon: <BsRouterFill className="w-7 h-7" />, page: "/acessoRoteador" },
        { title: "Contato Ativo", icon: <IoMdContacts className="w-7 h-7" />, page: "/contatoAtivo" },
        { title: "Avaliações Negativas", icon: <AiOutlineGateway className="w-7 h-7" />, page: "/avaliacoesNegativas" },
        { title: "Métricas e Gráficos", icon: <TbChartInfographic className="w-7 h-7" />, page: "/metricasGraficos" },

    ];

    const [open, setOpen] = useState(true)
    const { mutate } = useLogout()
    return (
        <div className={`relative h-screen text-white bg-black-dark ${open ? 'w-72' : 'w-28'}`}>
            <MdKeyboardDoubleArrowRight
                color="blue"
                onClick={() => setOpen(!open)}
                className={`w-10 h-10 absolute bg-red-900 text-white -right-1 top-3 p-5 cursor-pointer ${open && 'rotate-180'}`}
            />
            {open ? (
                <img className="w-60 mt-24 mx-auto" alt="Logo SideBar" src={require("../assets/logo.png")} />
            ) : (
                <img className="w-12 mt-24 mx-auto" alt="Logo SideBar" src={require("../assets/logoN.png")} />
            )}

            <div className="flex flex-col w-full items-start justify-start p-6 text-white gap-y-4">
                {Menus.map((item, index) => (
                    <a
                        href={item.page}
                        className="flex w-full gap-x-4 bg-gray-dark rounded-md px-5 py-3 cursor-pointer hover:bg-gray-100 hover:text-black"
                        key={index}
                    >
                        {item.icon}
                        <span className={`${!open && 'hidden'} font-medium duration-300`}>{item.title}</span>
                    </a>
                ))}

                <div className="flex items-center gap-x-4 mt-48 w-full h-20 rounded-md px-3 py-4">
                    <img className="w-16" alt="Logo SideBar" src={require("../assets/icon.png")} />
                    <span className={`${!open && 'hidden'} text-white text-center font-medium`}>Gabriel Marques</span>
                </div>
                <div className="w-full flex items-center justify-center gap-x-4 rounded-md px-3 py-4">
                    <button onClick={mutate} className="flex items-center gap-x-2">
                        <FaPersonWalkingDashedLineArrowRight className="text-center w-8" />
                        <span className={`${!open && 'hidden'}`}>Sair</span>
                    </button>
                </div>
            </div>
            <Notification />
        </div>
    )
}