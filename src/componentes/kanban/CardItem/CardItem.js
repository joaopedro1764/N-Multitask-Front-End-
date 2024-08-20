import { Draggable } from 'react-beautiful-dnd';

export const CardItem = ({ task, index, taskItem }) => {

/*     const removeCard = () > {

    } */


    const getCardColor = (task) => {
        switch (task.name) {
            case 'Casos Suporte':
                return 'bg-[#3C4F85]';
            case 'Atualização PPPOE':
                return 'bg-[#626672]';
            case 'O.S Aprimorar':
                return 'bg-[#6A5943]';
            case 'O.S Global':
                return 'bg-[#543D29]';
            case 'O.S Reagendamento':
                return 'bg-[#470A64]';
            case 'O.S Escallo':
                return 'bg-[#640A4B]';
        }
    }

    const colorCard = getCardColor(task)

    return (
        <Draggable key={taskItem.id} index={index} draggableId={taskItem.id.toString()}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`border-l-[12px] border-orange-600 rounded-md mt-10 shadow-2xl ${colorCard} h-32 ${snapshot.isDragging ? 'bg-blue-700' : ''}`}
                >
                    <h5 className="text-md my-3">{taskItem.title}</h5>
                    <button onClick={() => console.log(taskItem)}>Remover</button>
                </div>
            )}
        </Draggable>
    );
};
