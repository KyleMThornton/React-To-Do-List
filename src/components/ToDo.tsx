import { useState } from "react";
import './ToDo.css'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {DndContext} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import ItemCard from "./itemCard";
import toast, { Toaster } from 'react-hot-toast';

export default function ToDo() {
    const [toDoItems, setToDoItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [animationParent] = useAutoAnimate();

    const notify = () => toast('Item already exists!', {
        duration: 1000,
        position: 'top-center'
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const checkIfDuplicate = () => {
        toDoItems.includes(inputValue) ? notify() : handleAddItem()
    }

    const handleAddItem = () => {
        inputValue != '' ? setToDoItems([...toDoItems, inputValue]) : null
        setInputValue('')
    }

    const handleDeleteItem = (index: number) => {
        setToDoItems(prevItems => prevItems.filter((_, i) => i !== index));
    }

    return (
        <div className="toDoContainter">
            <h1>To Do List</h1>
            <input type="text" name="toDoInput" id="toDoInput" value={inputValue} onChange={handleInputChange} />
            <input type="submit" value="Add Item" className="submitButton" onClick={checkIfDuplicate} />
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
                            handleDeleteItem={handleDeleteItem} 
                        />
                    )}
                    </SortableContext>
                </div>
            </DndContext>
            <Toaster />
        </div>
    )

}