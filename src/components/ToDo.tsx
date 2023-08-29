import { useState } from "react";
import './ToDo.css'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {DndContext} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import ItemCard from "./itemCard";

export default function ToDo() {
    const [toDoItems, setToDoItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [animationParent] = useAutoAnimate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleAddItem = () => {
        inputValue != '' ? setToDoItems([...toDoItems, inputValue]) : null
        setInputValue('')
    }

    const handleDeleteItem = (index: number) => {
        let updatedItems = toDoItems.filter((_, i) => i !== index)
        setToDoItems(updatedItems)
    }

    return (
        <div className="toDoContainter">
            <h1>Add Item:</h1>
            <input type="text" name="toDoInput" id="toDoInput" value={inputValue} onChange={handleInputChange} />
            <input type="submit" value="Add" className="submitButton" onClick={handleAddItem} />
            <DndContext>
                <div ref={animationParent}>
                    <SortableContext 
                        items={toDoItems}
                        strategy={verticalListSortingStrategy}
                    >
                    {toDoItems.map((item, index) => 
                        <ItemCard 
                            key={index} 
                            id={item}
                            index={index} 
                            handleDeleteItem={() => handleDeleteItem(index)} 
                        />
                    )}
                    </SortableContext>
                </div>
            </DndContext>
        </div>
    )

}