import moment from "moment";
import { useEffect, useState } from "react";

export const SLA = ({ color, taskItem }) => {
    const calculateSLA = () => {
        const dateNow = moment();
        const dateCreate = moment(taskItem.created_time);
        const diff = dateNow.diff(dateCreate, 'hours');
        const duration = Math.abs(diff);
        const slaHours = 12;
        const porcentagem = duration >= slaHours ? 0 : 100 - (duration / slaHours) * 100;
        return Math.round(porcentagem);
    };

    const [slaPercentage, setSlaPercentage] = useState(0);

    useEffect(() => {
        const sla = calculateSLA();
        setSlaPercentage(sla);
    }, [taskItem]);


    return (
        <span className={`${color} px-2 py-1 rounded-md mt-1 text-xs text-[#354165] font-medium`}>
            {
                slaPercentage >= 75
                    ? '😁 ' + slaPercentage + "%"
                    : slaPercentage >= 20
                        ? '😐 ' + slaPercentage + "%"
                        : '😠 ' + slaPercentage + "%"
            }

        </span>
    )
}