import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import PageviewIcon from '@mui/icons-material/Pageview';
import AddIcon from '@mui/icons-material/Add';
import { SideBar } from "../componentes/SideBar/SideBar"
import { useEffect, useState } from 'react';
import Data from '../utils/data.json'
import { DragDropContext } from 'react-beautiful-dnd';
import { ColumnCard } from '../componentes/kanban/ColumnCard/ColumnCard';
import Cookies from 'js-cookie';

export const SuporteTecnico = () => {

    const [openSideBar, setOpenSideBar] = useState(true)
    const [boardData] = useState(Data);
    const [ws, setWs] = useState();
    const [dataTeste, setDataTeste] = useState([]);
    //const userCookie = JSON.parse(Cookies.get('userAuth'));

    useEffect(() => {
        const socket = new WebSocket('wss://nmt.nmultifibra.com.br/notion/ws');
        setWs(socket);
        socket.onmessage = function (event) {
            const data = JSON.parse(event.data)
            if (data.type === "update_board") {
                setDataTeste(data.data?.cards)
            }
        };
    }, []);

    const onDragEnd = (re) => {
        if (!re.destination) return;

        const destinationDroppableId = parseInt(re.destination.droppableId);
        const sourceDroppableId = parseInt(re.source.droppableId);
        const columnNoCompleted = boardData.length - 1;
        const columnCompleted = boardData.length - 2;
        
        let newBoardData = [...boardData];
        var dragItem = newBoardData[sourceDroppableId].items[re.source.index];

        if (destinationDroppableId === columnCompleted && sourceDroppableId === columnNoCompleted) {
            return;
        } else if (destinationDroppableId === columnNoCompleted && sourceDroppableId === columnCompleted) {
            return;
        }

        if (destinationDroppableId === columnCompleted) {
            dragItem.status = "Concluidos"
        }
        else if (destinationDroppableId === columnNoCompleted) {
            dragItem.status = "Não Solucionado"
        } else {
            return;
        }

        const message = JSON.stringify({
            type: 'custom_action',
            action: 'updateCard',
            input: dragItem
        });
        ws.send(message);
    };

    const createTasks = () => {
        const message = JSON.stringify({ type: 'custom_action', action: "addCard", input: { status: "O.S Escallo", assignee: "Felippe Gonçalves", title: "70524 - Sem Conexão ", description: "", created_by: "", lineAddress: "Avenida das cruzadas, 89 - Paisagem Casa Grande", province: "https://media.licdn.com/dms/image/v2/D4D03AQEkOMED_bWdFg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1714174602974?e=1730332800&v=beta&t=KtI0pZtM2WWk7l-OCYS2kW29o3UWHlB-KYOok_WPdjc", city: "Cotia", team: "Suporte" } });
        ws.send(message);
    }

    return (
        <div className="flex w-screen h-screen overflow-hidden">
            <SideBar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar} />
            <div className='flex-1 bg-fundo-suporte bg-center bg-cover bg-no-repeat h-full overflow-hidden'>

                <div className={`flex flex-col ml-6 h-full relative`}>
                    <div className='w-full flex flex-col justify-center items-center mt-10 gap-y-4'>
                        <h1 className='text-white text-7xl'>TASKS DEMANDAS</h1>
                        <span className='text-slate-500 text-3xl'>SUPORTE TÉCNICO</span>
                    </div>

                    <div className="h-[240px] w-full my-2">
                        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2 lg:grid-cols-4">
                            <div className="col-span-2 row-span-2 lg:col-start-4 lg:col-end-4">
                                <div className='flex flex-col w-96 h-32 bg-[#111111] rounded-sm px-4 py-2'>
                                    <span className='text-white text-2xl font-bold'>Status</span>
                                    <p className='text-slate-500 text-xs'>O que cada cor significa:</p>
                                    <div className='flex gap-3 mt-6'>
                                        <span className='bg-[#83FF57] font-bold text-md text-center rounded-xl min-w-28 py-0.5 px-4'>A fazer</span>
                                        <span className='bg-[#FFDD63] font-bold text-md text-center rounded-xl min-w-28 py-0.5 px-4'>Pendente</span>
                                        <span className='bg-[#FF5F49] font-bold text-md text-center rounded-xl min-w-28 py-0.5 px-4'>Atrasado</span>
                                    </div>
                                    <button className='text-white uppercase' onClick={createTasks}>Criar</button>
                                </div>
                            </div>
                            <div className="col-start-1 col-end-1 row-start-2 row-end-2">
                                <div className='flex bg-[#111111] w-52 rounded-sm p-3'>
                                    <span onClick={() => alert("oi")}
                                        className='text-white text-start flex items-center cursor-pointer font-bold gap-x-28'>
                                        Filtro
                                        <ExpandCircleDownIcon className='!w-7 !h-7' />
                                    </span>
                                </div>
                            </div>
                            <div className="col-start-2 col-end-4 row-start-2 row-end-2">
                                <div className="relative w-[650px]">
                                    <input
                                        className="w-full p-3 pr-10 rounded-sm bg-[#111111] text-white placeholder-gray-400 focus:outline-none"
                                        type="text"
                                        placeholder="Digite o que você está procurando..."
                                    />
                                    <div className="absolute inset-y-0 right-0 top-2 pr-3 flex items-center pointer-events-none">
                                        <PageviewIcon className="text-white !w-10 !h-10 " />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="flex w-full space-x-5 mt-6 overflow-x-auto overflow-y-hidden h-full scrollbar-kanban">
                            {boardData.map((data, index) => {
                                data.items = dataTeste.filter(element => element.status === data.name);

                                return (
                                    <ColumnCard
                                        key={index}
                                        task={data}
                                        index={index}
                                    />
                                );
                            })}
                        </div>
                    </DragDropContext>
                    <button onClick={() => alert("Modal")} class="absolute bottom-5 right-1 h-16 w-16 rounded-full bg-black-dark"><AddIcon className='text-white' /></button>
                </div>
            </div>
        </div>

    )
}