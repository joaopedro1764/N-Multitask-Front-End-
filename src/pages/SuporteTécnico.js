import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Notification, showToast } from "../componentes/Notification/Notification"
import PageviewIcon from '@mui/icons-material/Pageview';
import { SideBar } from "../componentes/SideBar/SideBar"
import { useCallback, useEffect, useReducer, useState } from 'react';
import Data from '../utils/data.json'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ColumnCard } from '../componentes/kanban/ColumnCard/ColumnCard';
import { TopBar } from '../componentes/TopBar/TopBar';

export const SuporteTecnico = () => {

    const [boardData, setBoardData] = useState(Data);

    const onDragEnd = (re) => {
        if (!re.destination) return;

        const destinationDroppableId = parseInt(re.destination.droppableId);
        const sourceDroppableId = parseInt(re.source.droppableId);

        // Verifique se a coluna de destino é "Solucionados"
        const solvedColumnId = boardData.length - 1; // Por exemplo, o ID da coluna "Solucionados" é 2
        if (destinationDroppableId !== solvedColumnId) {
            return;
        }
        let newBoardData = [...boardData]; // Faz uma cópia do boardData
        var dragItem = newBoardData[sourceDroppableId].items[re.source.index];
        // Remove o item da coluna de origem
        newBoardData[sourceDroppableId].items.splice(re.source.index, 1);
        // Adiciona o item na coluna de destino
        newBoardData[destinationDroppableId].items.splice(re.destination.index, 0, dragItem);
        setBoardData(newBoardData);
    };




    return (
        <div className="flex w-screen h-screen bg-black-dark overflow-hidden">
            <SideBar />
            <main className="bg-black-dark w-full flex flex-col">
                <TopBar title="TASKS DEMANDAS SUPORTE" />
                <div className='flex flex-col min-w-full mx-10'>
                    <div className="flex w-full">
                        <div className="flex gap-9 h-12 mt-32">
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

                    <div className="mt-10 overflow-x-auto">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="flex space-x-5">
                                {boardData.map((data, index) => (
                                    <ColumnCard
                                        key={data.id}
                                        task={data}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </DragDropContext>
                    </div>
                </div>
            </main >
            <Notification />
        </div >

    )
}