import './List.css';

interface ListComponentProps {
    toDoList: string[];
    deleteItem: (index: number) => void;
}

export const List: React.FC<ListComponentProps> = ({toDoList, deleteItem}) => {

    const toDoListItems = toDoList.map((list:any, index:number) => 
        <div className="toDoItems" key={index}>
            <p>{list}</p>
            <button onClick={() => deleteItem(index)}>X</button>
        </div>
    )

    return(
        <div className="listWrapper">
            {toDoListItems}
        </div>
    )
}