import { Droppable } from "react-beautiful-dnd";
import { CardItem } from "../CardItem/CardItem";
import AddIcon from '@mui/icons-material/Add';
import { ModalRegisterTask } from "../../Modal/ModalRegisterTask";
import { useState } from "react";

export const ColumnCard = ({ task, index }) => {

    const COLUMNS_COLORS = {
        'Casos Suporte': 'bg-[#30384F]',
        'Atualização PPPoE': 'bg-[#42454F]',
        'O.S Aprimorar': 'bg-[#362F26]',
        'Não Atendido': 'bg-[#2E2319]',
        'O.S Reagendamento': 'bg-[#221628]',
        'O.S Escallo': 'bg-[#281623]',
        'Não Solucionado': 'bg-[#32162C]',
        'Solucionado': 'bg-[#173A22]',
    };

    const TITLE_COLORS = {
        'Casos Suporte': 'bg-[#3C4F85]',
        'Atualização PPPoE': 'bg-[#626672]',
        'O.S Aprimorar': 'bg-[#6A5943]',
        'Não Atendido': 'bg-[#844A19]',
        'O.S Reagendamento': 'bg-[#470A64]',
        'O.S Escallo': 'bg-[#640A4B]',
        'Não Solucionado': 'bg-[#640A23]',
        'Solucionado': 'bg-[#22640A]',
    };

    const getColumnColor = (task) => COLUMNS_COLORS[task.name];
    const columnColor = getColumnColor(task)
    const getTitleColor = (task) => TITLE_COLORS[task.name];
    const colorTitle = getTitleColor(task)

    const [value, setValue] = useState("")
    const [open, setOpen] = useState(false)

    return (
        <>
            <Droppable droppableId={index.toString()}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <div className={`overflow-y-auto rounded-md ${columnColor} min-w-[300px] max-h-[calc(100%-20px)] scrollbar-column p-2`}>
                            <div className={`w-full flex justify-between gap-4 items-center text-white px-2 py-1.5 sticky top-0 rounded-md ${colorTitle} z-10`}>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-white rounded-full" />
                                    <span className="text-balance font-saira-medium">{task.name}</span>
                                </div>
                                <span className="font-saira-medium text-white">{task.items?.length}</span>
                            </div>

                           
                                {task.items.length > 0 &&
                                    task.items.map((taskItem, taskID) => (
                                        <CardItem
                                            key={taskItem.id}
                                            task={task}
                                            taskItem={taskItem}
                                            index={taskID}
                                        />
                                    ))
                                }
                                {provided.placeholder}
                           

                            {task.name === "Não Atendido" || task.name === "Solucionado" || task.name === "Não Solucionado" ? "" :
                                <button
                                    onClick={() => { setValue(task.name); setOpen(true) }}
                                    className={`${colorTitle} mt-2 px-3 py-1 rounded-md text-sm font-saira-medium text-white flex gap-1 items-center`}
                                >
                                    <AddIcon />Novo Card
                                </button>
                            }
                        </div>

                    </div>
                )}
            </Droppable>
            <ModalRegisterTask open={open} setOpen={setOpen} value={value} />
        </>

    )

}