import moment from "moment";
import { useEffect, useState } from "react";
import { Smile, Annoyed, Frown } from 'lucide-react';

export const SLA = ({ color, taskItem }) => {
    const [slaPercentage, setSlaPercentage] = useState(0);

    const SLA_HOURS = 12;
    const START_HOUR = 8;
    const END_HOUR = 20;

    
    const calculateSLA = () => {
        if (isTaskCompletedOrNotSolved()) return;

        const slaStartTime = getSlaStartTime();
        const now = getCurrentTimeWithinSlaRange();

        const duration = getDurationInHours(slaStartTime, now);
        return getSlaPercentage(duration);
    };

    const isTaskCompletedOrNotSolved = () => {
        return taskItem.status === "Concluidos" || taskItem.status === "Não Solucionado";
    };

    
    const getSlaStartTime = () => {
        const taskCreationTime = moment(taskItem.created_time);
        const scheduledDayStart = moment(taskItem.scheduled_time).startOf('day').add(START_HOUR, 'hours');

        // Se a tarefa foi criada antes das 08:00, o SLA começa às 08:00 do dia agendado
        // Se criada após as 08:00 no mesmo dia, começa no horário da criação
        if (taskCreationTime.isSame(scheduledDayStart, 'day')) {
            return taskCreationTime.isBefore(scheduledDayStart) ? scheduledDayStart : taskCreationTime;
        }

        // Caso a tarefa tenha sido criada antes do dia agendado, o SLA começa às 08:00 do dia agendado
        return scheduledDayStart;
    };

    // Obtém o horário atual, respeitando o intervalo entre 08:00 e 20:00
    const getCurrentTimeWithinSlaRange = () => {
        const now = moment();
        const startOfDay = moment(taskItem.scheduled_time).startOf('day').add(START_HOUR, 'hours');
        const endOfDay = moment(taskItem.scheduled_time).startOf('day').add(END_HOUR, 'hours');

        if (now.isAfter(endOfDay)) return endOfDay;
        if (now.isBefore(startOfDay)) return startOfDay;
        return now;
    };

    // Calcula a duração em horas entre o horário de início do SLA e o horário atual
    const getDurationInHours = (start, end) => {
        return Math.abs(end.diff(start, 'hours'));
    };

    // Calcula o percentual do SLA com base na duração
    const getSlaPercentage = (duration) => {
        return Math.round(duration >= SLA_HOURS ? 0 : 100 - (duration / SLA_HOURS) * 100);
    };

    // Atualiza o SLA periodicamente
    useEffect(() => {
        const updateSLA = () => {
            setSlaPercentage(calculateSLA());
        };
        updateSLA();

        const intervalId = setInterval(updateSLA, 60000);
        return () => clearInterval(intervalId);
    }, [taskItem]);

    // Obtém o ícone do SLA com base no percentual
    const getSlaIcon = () => {
        if (slaPercentage >= 75) return <Smile className="w-5 h-5" />;
        if (slaPercentage >= 20) return <Annoyed className="w-5 h-5" />;
        return <Frown className="w-5 h-5" />;
    };

    return (
        <span className={`${color} px-2 py-1 rounded-md mt-1 text-sm font-saira-medium text-[#354165] font-bold flex items-center gap-1`}>
            {getSlaIcon()} {slaPercentage + "%"}
        </span>
    );
};
