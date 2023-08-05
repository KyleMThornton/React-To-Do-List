

interface ListComponentProps {
    toDoList: string[];
    deleteItem: (index: number) => void;
}

export const List: React.FC<ListComponentProps> = ({toDoList, deleteItem}) => {

    const toDoListItems = toDoList.map((list:any, index:number) => 
        <div key={index}>
            {list}
            <button onClick={() => deleteItem(index)}>X</button>
        </div>
    )

    return(
        <div className="listWrapper">
            {toDoListItems}
        </div>
    )
}