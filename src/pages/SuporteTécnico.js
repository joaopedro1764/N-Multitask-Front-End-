import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Notification } from "../componentes/Notification/Notification"
import PageviewIcon from '@mui/icons-material/Pageview';
import { SideBar } from "../componentes/SideBar/SideBar"

export const SuporteTecnico = () => {

    return (
        <div className="flex w-full h-screen bg-black-dark overflow-hidden">
            <SideBar />
            <main className="bg-black-dark w-full h-screen">
                <div className="max-w-screen flex justify-center h-72 bg-blue-500 bg-fundo-suporte bg-center bg-cover bg-no-repeat">
                    <Brightness4Icon className="text-white absolute right-5 top-4 cursor-pointer hover:text-blue-200 duration-300" />
                    <div className="flex flex-col gap-y-10 justify-center items-center">
                        <h2 className="text-center text-6xl text-white font-bold">TASKS DEMANDAS</h2>
                        <span className="text-slate-300 text-3xl font-bold">SUPORTE TÉCNICO</span>
                    </div>
                </div>

                <div className="flex w-full h-full ml-44">
                    <div class="flex gap-9 h-10 mt-32">
                        <div className='flex bg-[#2D2D2D] w-52 rounded-sm p-4'>
                            <span onClick={() => alert("oi")}
                                className='text-white text-start flex items-center cursor-pointer font-bold gap-x-28'>
                                Filtro
                                <ExpandCircleDownIcon className='!w-7 !h-7' /></span>

                        </div>

                        <div className="relative w-[550px]">
                            <input
                                className="w-full p-3 pr-10 rounded-sm bg-[#2D2D2D] text-white placeholder-gray-400 focus:outline-none"
                                type="text"
                                placeholder="Digite o que você está procurando..."
                            />
                            <div className="absolute inset-y-0 right-0 top-2 pr-3 flex items-center pointer-events-none">
                                <PageviewIcon className="text-white !w-10 !h-10 " />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col ml-32 w-96 h-32 bg-[#2D2D2D] rounded-sm px-4 py-2 mt-12'>
                        <span className='text-white text-2xl font-bold'>Status</span>
                        <p className='text-slate-500 text-xs'>O que cada cor significa:</p>
                        <div className='flex gap-3 mt-6'>
                            <span className='bg-[#83FF57] font-bold text-md text-center rounded-xl min-w-28 py-0.5 px-4'>A fazer</span>
                            <span className='bg-[#FFDD63] font-bold text-md text-center rounded-xl min-w-28 py-0.5 px-4'>Pendente</span>
                            <span className='bg-[#FF5F49] font-bold text-md text-center rounded-xl min-w-28 py-0.5 px-4'>Atrasado</span>
                        </div>
                    </div>

                </div>
            </main>
            <Notification />
        </div>
    )
}