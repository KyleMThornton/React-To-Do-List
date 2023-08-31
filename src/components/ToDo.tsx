import { useState } from "react";
import './ToDo.css'
import {DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor} from '@dnd-kit/core';
import {SortableContext, arrayMove, verticalListSortingStrategy, sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import ItemCard from "./itemCard";
import toast, { Toaster } from 'react-hot-toast';

export default function ToDo() {
    const [toDoItems, setToDoItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const itemAlreadyExistsToast = () => toast(`\u{1F605} Item already exists!`, {
        duration: 1000,
        position: 'top-center'
    });

    const noItemToast = () => toast(`\u{1F648} I can't add nothing to the list!`, {
        duration: 1500,
        position: 'top-center'
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const checkIfDuplicate = () => {
        toDoItems.includes(inputValue) ? itemAlreadyExistsToast() : handleAddItem()
    }

    const handleAddItem = () => {
        inputValue != '' ? setToDoItems([...toDoItems, inputValue]) : noItemToast()
        setInputValue('')
    }

    const handleDeleteItem = (index: number) => {
        setToDoItems(prevItems => prevItems.filter((_, i) => i !== index));
    }

    const handleDragEnd = (event:any) => {
        const {active, over} = event;
        if(active.id !== over.id) {
            setToDoItems((items:string[]) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
            })
        }
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <div className="toDoContainer">
            <div className="topWrapper">
                <h1>To Do List</h1>
                <input type="text" name="toDoInput" id="toDoInput" value={inputValue} onChange={handleInputChange} />
                <input type="submit" value="Add Item" className="submitButton" onClick={checkIfDuplicate} />
            </div>
            <DndContext
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
                sensors={sensors}
            >
                <div>
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