import { useState } from "react";

export default function ToDo() {
    const [toDoItems, setToDoItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleAddItem = () => {
        inputValue != '' ? setToDoItems([...toDoItems, inputValue]) : null
    }

    const handleDeleteItem = (index: number) => {
        let updatedItems = toDoItems.filter((_, i) => i !== index)
        setToDoItems(updatedItems)
    }

    return (
        <div>
            <span>Add item:</span>
            <input type="text" name="toDoInput" id="toDoInput" onChange={handleInputChange} />
            <input type="submit" value="Add" onClick={handleAddItem} />
            {toDoItems.map((item, index) =>
                <div key={index}>
                    <div>{item}</div>
                    <button onClick={() => handleDeleteItem(index)}>X</button>
                </div>
            )}
        </div>
    )

}