import './TextBar.css'
import { useEffect, useRef, useState } from 'react'

export function TextBar() {
    const [toDoList, setToDoList] = useState<string[]>([])

    let toDoInputValue : any = useRef();

    function handleSubmit(event : any) {
        event.preventDefault();
        setToDoList([...toDoList, toDoInputValue.current?.value])
        toDoInputValue.current.value = ""
    }

    useEffect(() => {
        console.log(toDoList);
    }, [toDoList]);

    return(
        <div className="textBarWrapper">
            <form action="" className="inputBar">
                <label htmlFor="">TO DO: </label>
                <input type="text" name="toDoInput" id="toDoInput" ref={toDoInputValue} />
                <button type="submit" onClick={handleSubmit}>Add</button>
            </form>
        </div>
    )
}