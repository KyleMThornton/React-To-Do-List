import { useState } from 'react';
import './List.css';

interface ListComponentProps {
    toDoList: string[];
    deleteItem: (index: number) => void;
}

export const List: React.FC<ListComponentProps> = ({toDoList, deleteItem}) => {
    const [toDoItems, setToDoItems] = useState([])

    const handleCheck = (index) => {
        
    }

    const toDoListItems = toDoList.map((list:any, index:number) => 
        <div className="toDoItems" key={index}>
            <input type="checkbox" name="taskCompleted" id="taskCompleted" />
            <p>{list}</p>
            <button onClick={() => deleteItem(index)}>X</button>
        </div>
    )

    return(
        <div className="listWrapper">
            {toDoListItems}
        </div>
    )
}