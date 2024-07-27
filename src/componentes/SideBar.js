import { FaTasks, FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
export const SideBar = () => {

    return (
        <div className="fixed inset-y-0 left-0 bg-[#2d2d2d] w-52">
            <div className="flex items-center justify-center mt-5 p-6">
                <img
                    className=""
                    alt="Imagem Lateral Esquerda"
                    src={require("../assets/logo.png")}
                />
            </div>
            <div className="flex flex-col justify-center items-center mt-4">
                <a href="/suporte" className="rounded font-medium text-white text-center bg-[#6A6A6A] px-1 py-2 w-full">
                    <FaTasks /> Suporte Técnico
                </a>
            </div>
        </div>
    )
}