import { Draggable } from 'react-beautiful-dnd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
export const CardItem = ({ task, index, taskItem }) => {


    const cardsColors = {
        'Casos Suporte': 'bg-[#3C4F85]',
        'Atualização PPPOE': 'bg-[#626672]',
        'O.S Aprimorar': 'bg-[#6A5943]',
        'O.S Global': 'bg-[#844A19]',
        'O.S Reagendamento': 'bg-[#470A64]',
        'O.S Escallo': 'bg-[#640A4B]',
        'Não solucionado': 'bg-red-500',
        'Concluidos': 'bg-[#203A16]',
    };



    const getCardColor = (task) => cardsColors[task.name] || '';

    const cardColor = getCardColor(task)

    return (
        <Draggable key={taskItem.id} index={index} draggableId={taskItem.id.toString()}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${cardColor} flex flex-col items-start rounded-md mt-6 shadow-2xl h-auto p-2 border-l-8 border-l-[#FFC355]`}
                >
                    <div className='w-full flex justify-between'>
                        <span className='bg-[#FFC355] px-2 py-1 rounded-md mt-1 text-xs text-[#354165] font-medium'>😐 50%</span>
                        <span className='bg-[#FFC355] px-2 py-1 text-xs rounded-md text-[#354165] font-medium flex gap-2 items-center'>30/01/2024<CalendarMonthIcon fontSize='small' /></span>
                    </div>
                    <div className='w-full flex flex-col items-start gap-2 mt-2'>
                        <span className='text-white text-xl font-medium'>{taskItem.title}</span>
                        <div className='w-full flex items-center justify-between gap-3'>
                            <div className='w-full flex gap-3'>
                                <img src={taskItem.province} className='w-8 h-8 bg-black rounded-full object-cover' />
                                <span className='text-white text-base'>{taskItem.assignee}</span>
                            </div>
                            <p className='text-slate-500'>1</p> <QuestionAnswerRoundedIcon className='text-white' />
                        </div>
                        <div className='mt-2 w-full rounded-lg'>
                            <input className='w-full px-4 py-3 focus:outline-none rounded-md placeholder:text-gray-500' placeholder='Descrição'></input>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};
