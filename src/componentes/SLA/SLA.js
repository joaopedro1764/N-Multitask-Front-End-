import moment from "moment";
import { useEffect, useState } from "react";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export const SLA = ({ color, taskItem }) => {
    const [slaPercentage, setSlaPercentage] = useState(0);

    const calculateSLA = () => {
        if (taskItem.status === "Concluidos" || taskItem.status === "Não Solucionado") {
            return ;
        }
        const slaHours = 12;
        const duration = Math.abs(moment().diff(moment(taskItem.created_time), 'hours'));
        return Math.round(duration >= slaHours ? 0 : 100 - (duration / slaHours) * 100);
    };

    useEffect(() => {
        const updateSLA = () => {
            setSlaPercentage(calculateSLA());
        };
        updateSLA(); 
        const intervalId = setInterval(updateSLA, 60000);
        return () => clearInterval(intervalId);
    }, [taskItem]);

    const getSlaIcon = () => {
        if (slaPercentage >= 75) return <SentimentVerySatisfiedIcon fontSize="small" />;
        if (slaPercentage >= 20) return <SentimentDissatisfiedIcon fontSize="small" />;
        return <SentimentVeryDissatisfiedIcon fontSize="small" />;
    };

    return (
        <span className={`${color} px-2 py-1 rounded-md mt-1 text-sm text-[#354165] font-bold flex items-center gap-1`}>
            {getSlaIcon()} {slaPercentage + "%"}
        </span>
    );
};
