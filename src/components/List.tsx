import './List.css';
import { useState } from 'react';
interface ListComponentProps {
    toDoList: string[];
    deleteItem: (index: number) => void;
}

export const List: React.FC<ListComponentProps> = ({toDoList, deleteItem}) => {
    const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(toDoList.length).fill(false));

    const handleCheckboxChange = (index: number) => {
        setCheckedItems(prevCheckedItems => {
            const newCheckedItems = [...prevCheckedItems];
            newCheckedItems[index] = !newCheckedItems[index];
            return newCheckedItems;
        });
    };

    const toDoListItems = toDoList.map((list:string, index:number) => 
        <div className="toDoItems" key={index}>
            <input 
                type="checkbox" 
                name="taskCompleted" 
                id={'taskCompleted-${index}'} 
                checked={checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
            />
            <p style={{ textDecoration: checkedItems[index] ? 'line-through' : 'none' }}>
                {list}
            </p>
            <button onClick={() => deleteItem(index)}>X</button>
        </div>
    )

    return(
        <div className="listWrapper">
            {toDoListItems}
        </div>
    )
}