import { Draggable } from 'react-beautiful-dnd';

export const CardItem = ({ data, index }) => {
    return (
        <Draggable key={data.id} index={index} draggableId={data.id.toString()}>
            {(provided, snapshot) => (
                <div
                    onClick={() => alert("Cheiro de cu")}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-blue-500 rounded-md p-3 m-3 last:mb-0 mt-10 ${snapshot.isDragging ? 'bg-blue-700' : ''}`}
                >
                    <h5 className="text-md my-3 text-lg leading-6">{data.title}</h5>
                </div>
            )}
        </Draggable>
    );
};
