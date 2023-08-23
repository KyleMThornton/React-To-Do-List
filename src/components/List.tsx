import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  useDraggable,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import './List.css';

interface ListComponentProps {
  toDoList: string[];
  deleteItem: (index: number) => void;
}

export const List: React.FC<ListComponentProps> = ({ toDoList, deleteItem }) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(toDoList.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  const handleDeleteCheck = (index: number) => {
    const updatedList = checkedItems.filter((_, i) => i !== index);
    setCheckedItems(updatedList);
    deleteItem(index);
  };

  const toDoListItems = toDoList.map((list: string, index: number) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: index });

    return (
      <div
        className="toDoItems"
        key={index}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <input
          type="checkbox"
          name="taskCompleted"
          id={`taskCompleted-${index}`}
          checked={checkedItems[index]}
          onChange={() => handleCheckboxChange(index)}
        />
        <p
          style={{
            textDecoration: checkedItems[index] ? 'line-through' : 'none',
          }}
        >
          {list}
        </p>
        <button
          onClick={() => {
            handleDeleteCheck(index);
          }}
        >
          X
        </button>
      </div>
    );
  });

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('Drag end called');
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={toDoList} strategy={verticalListSortingStrategy}>
        <div className="listWrapper">{toDoListItems}</div>
      </SortableContext>
    </DndContext>
  );
};
