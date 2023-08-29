import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export default function ItemCard(props:any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    const handleDeleteClick = () => {
        props.handleDeleteItem(props.index);
        console.log('Delete!')
    };

    return (
        <div ref={setNodeRef} style={style} className="itemContainer">
            <span className="dragHandle" {...attributes} {...listeners}>#</span>
            <p>{props.id}</p>
            <button className="deleteButton" onClick={handleDeleteClick}>X</button>
        </div>
    )
}

// {toDoItems.map((item, index) =>
//     <div className="itemContainer" key={index}>
//         <p>{item}</p>
//         <button className="deleteButton" onClick={() => handleDeleteItem(index)}>X</button>
//     </div>
// )}