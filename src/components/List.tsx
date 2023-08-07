import Draggable from 'react-draggable';
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

    function handleDeleteCheck(index:number) {
        const updatedList = checkedItems.filter((_,i) => i !== index);
        setCheckedItems(updatedList)
    }

    const toDoListItems = toDoList.map((list:string, index:number) => 
        <Draggable axis='y' cancel='button, input' >
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
                <button onClick={() => {
                    handleDeleteCheck(index)
                    deleteItem(index)
                }}>X</button>
            </div>
        </Draggable>
    )

    return(
        <div className="listWrapper">
            {toDoListItems}
        </div>
    )
}