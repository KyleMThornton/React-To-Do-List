import { useState } from "react";
import './ToDo.css'
import { useAutoAnimate } from '@formkit/auto-animate/react'


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
            <h1>Add item:</h1>
            <input type="text" name="toDoInput" id="toDoInput" value={inputValue} onChange={handleInputChange} />
            <input type="submit" value="Add" className="submitButton" onClick={handleAddItem} />
            <div className="cardContainer" ref={animationParent}>
                {toDoItems.map((item, index) =>
                    <div className="itemContainer" key={index}>
                        <p>{item}</p>
                        <button className="deleteButton" onClick={() => handleDeleteItem(index)}>X</button>
                    </div>
                )}
            </div>
        </div>
    )

}