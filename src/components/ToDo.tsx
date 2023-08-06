import { List } from './List';
import './ToDo.css'
import { useRef, useState } from 'react'

export function ToDo() {
    const [toDoList, setToDoList] = useState<string[]>([])

    let toDoInputValue : any = useRef();

    function handleSubmit(event : any) {
        event.preventDefault();
        setToDoList([...toDoList, toDoInputValue.current?.value])
        toDoInputValue.current.value = ""
    }

    function deleteItem(index:number) {
        const updatedList = toDoList.filter((_,i) => i !== index);
        setToDoList(updatedList)
    }

    return(
        <div className="textBarWrapper">
            <form action="" className="inputBar">
                <label htmlFor="">TO DO: </label>
                <input type="text" name="toDoInput" id="toDoInput" ref={toDoInputValue} />
                <button type="submit" onClick={handleSubmit}>Add</button>
            </form>
            <List toDoList={toDoList} deleteItem={deleteItem} />
        </div>
    )
}