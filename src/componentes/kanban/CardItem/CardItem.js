import { Draggable } from 'react-beautiful-dnd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import moment from 'moment';
import { SLA } from '../../SLA/SLA';
export const CardItem = ({ task, index, taskItem }) => {

    const CARD_COLORS = {
        'Casos Suporte': 'bg-[#3C4F85]',
        'Atualização PPPOE': 'bg-[#626672]',
        'O.S Aprimorar': 'bg-[#6A5943]',
        'O.S Global': 'bg-[#844A19]',
        'O.S Reagendamento': 'bg-[#470A64]',
        'O.S Escallo': 'bg-[#640A4B]',
        'Não solucionado': 'bg-red-500',
        'Concluidos': 'bg-[#203A16]',
    };
    const STATUS_COLORS = {
        'A fazer': 'bg-[#83FF57]',
        'Pendente': 'bg-[#FFDD63]',
        'Atrasado': 'bg-[#FF5F49]'
    }
    const BORDERS_COLORS = {
        'A fazer': 'border-l-[#83FF57]',
        'Atrasado': 'border-l-[#FF5F49]',
        'Pendente': 'border-l-[#FFDD63]'
    }

    const isToday = (date) => {
        return moment(date, 'DD/MM/YYYY').isSame(moment(), 'day');
    };

    const isInNextDays = (date, days = 7) => {
        const today = moment();
        const targetDate = moment(date, 'DD/MM/YYYY');
        return targetDate.isAfter(today, 'day') && targetDate.diff(today, 'days') <= days;
    };

    const hasDatePassed = (date) => {
        return moment(date, 'DD/MM/YYYY').isBefore(moment(), 'day');
    };

    const validateStatusColor = (date) => {
        if (isToday(date)) {
            return 'Pendente';
        } else if (hasDatePassed(date)) {
            return 'Atrasado';
        } else if (isInNextDays(date)) {
            return 'A fazer';
        } else {
            return 'bg-white';
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Enviar a mensagem
            alert("voce digitou" + event.data)
        }
    };

    const colorStatus = validateStatusColor(moment(taskItem.created_time).format("DD/MM/YYYY"))
    const borderColor = validateStatusColor(moment(taskItem.created_time).format("DD/MM/YYYY"))
    const border = BORDERS_COLORS[borderColor]
    const color = STATUS_COLORS[colorStatus]
    const getCardColor = (task) => CARD_COLORS [task.name] || '';
    const cardColor = getCardColor(task)



    return (
        <Draggable key={taskItem.id} index={index} draggableId={taskItem.id.toString()}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${cardColor} flex flex-col items-start rounded-md mt-6 shadow-2xl h-auto p-2 border-l-8 ${border}`}
                >
                    <div className='w-full flex justify-between'>
                        <SLA color={color} taskItem={taskItem} />
                        <span className={`${color} px-2 py-1 text-xs rounded-md text-[#354165] font-medium flex gap-2 items-center`}>{moment(taskItem.created_time).format("DD/MM/YYYY")}<CalendarMonthIcon fontSize='small' /></span>
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
                            <input onKeyDown={handleKeyDown} className='w-full px-4 py-3 focus:outline-none rounded-md placeholder:text-gray-500 placeholder:font-bold' placeholder='Comentário'></input>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};
