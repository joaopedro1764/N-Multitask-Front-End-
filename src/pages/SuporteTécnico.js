import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Notification } from "../componentes/Notification/Notification"
import PageviewIcon from '@mui/icons-material/Pageview';
import { SideBar } from "../componentes/SideBar/SideBar"
import { useEffect, useState } from 'react';
import Data from '../utils/data.json'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CardItem } from '../componentes/CardItem/CardItem';

export const SuporteTecnico = () => {

    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const [items, setItems] = useState();
    const [boardData, setBoardData] = useState(Data)
    const [ready, setReady] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(0);

    useEffect(() => {
        const socket = new WebSocket('http://10.0.30.151:8080');
        setWs(socket);
        socket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };
    }, []);



    const onDragEnd = (re) => {
        /*   //console.log(re)
          if (!re.destination) return;
          let newBoardData = boardData;
          var dragItem =
              newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
          newBoardData[parseInt(re.source.droppableId)].items.splice(
              re.source.index,
              1
          );
          newBoardData[parseInt(re.destination.droppableId)].items.splice(
              re.destination.index,
              0,
              dragItem
          );
          setBoardData(newBoardData); */
    };

    return (
        <div className="flex w-full h-screen bg-black-dark overflow-hidden">
            <SideBar />
            <main className="bg-black-dark w-full h-screen flex flex-col">
                <div className="min-w-screen flex justify-center h-72 bg-fundo-suporte bg-center bg-cover bg-no-repeat">
                    <Brightness4Icon className="text-white absolute right-5 top-4 cursor-pointer hover:text-blue-200 duration-300" />
                    <div className="flex flex-col gap-y-10 justify-center items-center">
                        <h2 className="text-center text-6xl text-white font-bold">TASKS DEMANDAS</h2>
                        <span className="text-slate-300 text-3xl font-bold">SUPORTE TÉCNICO</span>
                    </div>
                </div>
                <div className='flex flex-col w-full h-full ml-44'>
                    <div className='flex flex-col w-full'>
                        <div className="flex w-full">
                            <div class="flex gap-9 h-12 mt-32">
                                <div className='flex bg-[#2D2D2D] w-52 rounded-sm p-3'>
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
                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="grid grid-cols-6 gap-5 mt-10 overflow-x-auto">
                            {Data.map((item, index) => {
                                return (
                                    <Droppable droppableId={item.name}>
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                <div className={` bg-[#30384F] overflow-y-auto overflow-x-hidden h-auto p-3 rounded-md w-full`}
                                                    style={{ maxHeight: 'calc(100vh - 290px)' }}>
                                                    <span className={`text-2xl text-[white] w-full px-3 py-1.5 rounded-md ${item.name === "Casos Suporte" && 'bg-[#3C4F85]'} ${item.name === "O.S Global" && 'bg-red-900'} `}>
                                                        {item.name}
                                                    </span>
                                                    <div className="overflow-y-auto overflow-x-hidden h-auto"
                                                        style={{ maxHeight: 'calc(100vh - 290px)' }}>
                                                        {item.items.length > 0 &&
                                                            item.items.map((subItem, iIndex) => {
                                                                return (
                                                                    <CardItem
                                                                        key={subItem.id}
                                                                        data={subItem}
                                                                        index={iIndex}
                                                                        className="m-3"
                                                                    />
                                                                );
                                                            })}
                                                        {provided.placeholder}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Droppable>
                                );
                            })}
                        </div>
                    </DragDropContext>
                </div>
            </main>
            <Notification />
        </div>
    )
}