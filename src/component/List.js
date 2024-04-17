import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditList from './EditList';
import '../css/List.css';

function List(props) {

  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectValue, setSelectValue] = useState('');

  const handleDoubleClick = (index) => {
    const storedItems = JSON.parse(localStorage.getItem('data'));

    const title = storedItems[props.title];

    setSelectValue(title[index]);
    setIndex(index);
    setEdit(true);
    document.body.classList.add('blackBg');
  };

  const handleDelete = (index) => {
    const storedItems = JSON.parse(localStorage.getItem('data'));

    const category = props.title;
    const updatedItems = storedItems[category].filter((a, i) => i !== index);

    storedItems[category] = updatedItems;
    localStorage.setItem('data', JSON.stringify(storedItems));

    const newItems = props.items.filter((a, i) => i !== index);

    props.setItems(newItems);
    props.setCount(newItems.length);
  };

  const handleSave = (newValue) => {
    const storedItems = JSON.parse(localStorage.getItem('data'));

    const title = storedItems[props.title];
    title.splice(index, 1, newValue);
    localStorage.setItem('data', JSON.stringify(storedItems));

    props.items.splice(index, 1, newValue);
  };


  return (
    <div className='listBoxes'>
      {props.items.map((item, index) => (
        <Draggable key={index} draggableId={`item-${props.title}-${index}`} index={index} >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className='listBox'
              onDoubleClick={() => handleDoubleClick(index)}
            >
              {item}
              <button className='listDelete' onClick={() => handleDelete(index)}>X</button>
            </div>
          )}
        </Draggable>
      ))}
      {edit && <EditList handleSave={handleSave} setEdit={setEdit} selectValue={selectValue} />}
    </div>
  );
}

export default List;
