import { useAutoAnimate } from '@formkit/auto-animate/react'
import './List.css';
import { useState } from 'react';
interface ListComponentProps {
    toDoList: string[];
    deleteItem: (index: number) => void;
}

export const List: React.FC<ListComponentProps> = ({toDoList, deleteItem}) => {
    const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(toDoList.length).fill(false));
    const [parent, enableAnimations] = useAutoAnimate();

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
            <div className="toDoItems" key={index}>
                <input 
                    type="checkbox" 
                    name="taskCompleted" 
                    id={`taskCompleted-${index}`} 
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
    )

    return(
        <div className="listWrapper" ref={parent}>
            {toDoListItems}
        </div>
    )
}