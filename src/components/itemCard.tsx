import { useState } from 'react';
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
        transition,
    }

    const [isChecked, setIsChecked] = useState(false);

    const handleDeleteClick = () => {
        props.handleDeleteItem(props.index);
        console.log('Delete!')
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div ref={setNodeRef} style={style} className="itemContainer">
            <span className="dragHandle" {...attributes} {...listeners}><RiDraggable /></span>
            <p className={isChecked ? 'crossed-out' : ''}>{props.id}</p>
            <input type="checkbox" name="itemCheckbox" id={`checkbox-${props.id}`} className="itemCheckbox" onChange={handleCheckboxChange} />
            <button className="deleteButton" onClick={handleDeleteClick}><RiDeleteBin7Fill /></button>
        </div>
    )
}