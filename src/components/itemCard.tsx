import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {RiDraggable, RiDeleteBin7Fill} from "react-icons/ri"

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
            <span className="dragHandle" {...attributes} {...listeners}><RiDraggable /></span>
            <p>{props.id}</p>
            <button className="deleteButton" onClick={handleDeleteClick}><RiDeleteBin7Fill /></button>
        </div>
    )
}