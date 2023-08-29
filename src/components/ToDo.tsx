import { useState } from "react";
import './ToDo.css'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {DndContext, closestCenter} from '@dnd-kit/core';
import {SortableContext, arrayMove, verticalListSortingStrategy} from '@dnd-kit/sortable';
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

    const handleDragEnd = (event:any) => {
        const {active, over} = event;
        if(active.id !== over.id) {
            setToDoItems((items:string[]) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
                return arrayMove(items, activeIndex, overIndex);
            })
        }
    }

    return (
        <div className="toDoContainter">
            <h1>To Do List</h1>
            <input type="text" name="toDoInput" id="toDoInput" value={inputValue} onChange={handleInputChange} />
            <input type="submit" value="Add Item" className="submitButton" onClick={checkIfDuplicate} />
            <DndContext
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
            >
                <div ref={animationParent}>
                    <SortableContext 
                        items={toDoItems}
                        strategy={verticalListSortingStrategy}
                    >
                    {toDoItems.map((item, index) => 
                        <ItemCard 
                            key={item} 
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