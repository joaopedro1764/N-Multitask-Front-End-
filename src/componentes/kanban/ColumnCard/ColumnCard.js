import { Droppable } from "react-beautiful-dnd";
import { CardItem } from "../CardItem/CardItem";

export const ColumnCard = ({ task }) => {



    const getColumnColor = (task) => {
        switch (task.name) {
            case 'Casos Suporte':
                return 'bg-[#3C4F85]';
            case 'Atualização PPPOE':
                return 'bg-[#626672]';
            case 'O.S Aprimorar':
                return 'bg-[#6A5943]';
            case 'O.S Global':
                return 'bg-[#844A19]';
            case 'O.S Reagendamento':
                return 'bg-[#470A64]';
            case 'O.S Escallo':
                return 'bg-[#640A4B]';
        }
    }

    const colorColumn = getColumnColor(task)

    return (
        <Droppable droppableId={task.name}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <div className={`overflow-x-auto h-auto p-2 rounded-md ${colorColumn}`} style={{ maxHeight: 'calc(100vh - 290px)' }}>
                        <div className="flex gap-4 items-center text-white">
                        <span className="w-2 h-2 bg-white rounded-full"/>
                        <span>{task.name}</span>
                        <span className="ml-12">{task.items?.length}</span>
                        </div>
                        {task.items.length > 0 &&
                            task.items.map((taskItem, taskID) => (
                                <CardItem
                                    key={taskItem.id}
                                    task={task}
                                    taskItem={taskItem}
                                    index={taskID}
                                />

                            ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    )

}