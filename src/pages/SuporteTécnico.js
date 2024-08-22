import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Notification } from "../componentes/Notification/Notification"
import PageviewIcon from '@mui/icons-material/Pageview';
import { SideBar } from "../componentes/SideBar/SideBar"
import { useEffect, useState } from 'react';
import Data from '../utils/data.json'
import { DragDropContext } from 'react-beautiful-dnd';
import { ColumnCard } from '../componentes/kanban/ColumnCard/ColumnCard';
import { TopBar } from '../componentes/TopBar/TopBar';

export const SuporteTecnico = () => {

    const [openSideBar, setOpenSideBar] = useState(true)

    const [boardData, setBoardData] = useState(Data);
    const [ws, setWs] = useState();
    const [dataTeste, setDataTeste] = useState([]);


    const [open, setOpen] = useState(false);
    useEffect(() => {
        const socket = new WebSocket('wss://nmt.nmultifibra.com.br/notion/ws');
        setWs(socket);
        socket.onopen = function () {
            console.log('Conexão estabelecida.');
        };
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

        // Verifique se a coluna de destino é "Solucionados"
        const solvedColumnId = boardData.length - 1;
        if (destinationDroppableId !== solvedColumnId) {

            return;
        }
        let newBoardData = [...boardData]; // Faz uma cópia do boardData
        var dragItem = newBoardData[sourceDroppableId].items[re.source.index];
        console.log(dragItem)
        dragItem.status = "Solucionados"
        console.log(dragItem)

        const message = JSON.stringify({
            type: 'custom_action',
            action: 'updateCard',
            input: dragItem
        });
        console.log(message)
        ws.send(message);
    };

    const teste = () => {
        const message = JSON.stringify({ type: 'custom_action', action: "addCard", input: { status: "O.S Global", assignee: "Teste", title: "2020 - João Pedro", description: "Teste", created_by: "Teste", lineAddress: "Teste", province: "Teste", city: "Teste", team: "Teste" } });
        ws.send(message);
    }

    return (
        <div className="flex w-screen h-screen bg-black-dark">
            <SideBar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar} />
            <div className='flex-1 overflow-auto'>
                <TopBar title="TASKS DEMANDAS" />
                <div className={`flex flex-col mx-4`}>

                    <div class="h-[240px] w-full">
                        <div class="grid h-full w-full grid-cols-2 grid-rows-1 gap-5 lg:grid-cols-4 place-items-center">
                            <div class="col-span-2 row-span-2 lg:col-start-4 lg:col-end-4">
                                <div className='flex flex-col w-96 h-32 bg-[#2D2D2D] rounded-sm px-4 py-2'>
                                    <span className='text-white text-2xl font-bold'>Status</span>
                                    <p className='text-slate-500 text-xs'>O que cada cor significa:</p>
                                    <div className='flex gap-3 mt-6'>
                                        <span className='bg-[#83FF57] font-bold text-md text-center rounded-xl min-w-28 py-0.5 px-4'>A fazer</span>
                                        <span className='bg-[#FFDD63] font-bold text-md text-center rounded-xl min-w-28 py-0.5 px-4'>Pendente</span>
                                        <span className='bg-[#FF5F49] font-bold text-md text-center rounded-xl min-w-28 py-0.5 px-4'>Atrasado</span>
                                        <button onClick={teste}>Teste</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-start-1 col-end-1 row-start-2 row-end-2">
                                <div className='flex bg-[#2D2D2D] w-52 rounded-sm p-3'>
                                    <span onClick={() => alert("oi")}
                                        className='text-white text-start flex items-center cursor-pointer font-bold gap-x-28'>
                                        Filtro
                                        <ExpandCircleDownIcon className='!w-7 !h-7' />
                                    </span>
                                </div>
                            </div>
                            <div class="col-start-2 col-end-4 row-start-2 row-end-2">
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
                        </div>
                    </div>


                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className={`flex flex-1 space-x-5 overflow-x-auto max-h-[calc(100vh-25rem)]`}>
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
                </div>

            </div>
        </div>

    )
}