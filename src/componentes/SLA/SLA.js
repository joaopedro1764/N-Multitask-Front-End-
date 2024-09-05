import moment from "moment";
import { useEffect, useState } from "react";

export const SLA = ({ color, taskItem }) => {


    let dayCreate = moment(taskItem.created_time)
    let maxDayComplete = moment(taskItem.created_time).add(1, 'days')

    const calculateSLA = (creationDate, completionDate, maxAllowedTime) => {
        const creation = moment(creationDate);
        const completion = moment(completionDate);

        const duration = completion.diff(creation, 'hours'); // Diferença em horas
        const slaPercentage = Math.min((duration / maxAllowedTime) * 100, 100);
        return slaPercentage.toFixed(0);

    };
    const [slaPercentage, setSlaPercentage] = useState(0);
    useEffect(() => {
        let sla = calculateSLA(dayCreate, maxDayComplete, 24)
        if (sla >= 100) {
            setSlaPercentage('😁 ' + sla + '%')
        }else if(sla < 100 && sla >= 50){
            setSlaPercentage('😢 ' + sla + '%')
        }else{
            setSlaPercentage('😞 ' + sla + '%')
        }
    }, [])

    return (
        <span className={`${color} px-2 py-1 rounded-md mt-1 text-xs text-[#354165] font-medium`}>{slaPercentage}</span>
    )
}