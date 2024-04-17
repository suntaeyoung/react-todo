import { useState } from 'react';
import '../css/Card.css';
import ClickAdd from './ClickAdd';
import List from './List';
import { Droppable } from 'react-beautiful-dnd';

function Card(props) {

  const [inputToggle, setInputToggle] = useState(false);
  const [addClick, setAddClick] = useState(false);

  return (
    <Droppable droppableId={`${props.index}`} >
      {(provided) => (
        <div className={`listItems-${props.index}`} ref={provided.innerRef} {...provided.droppableProps}>
          <div className="item">
            <span className='title'>
              {props.title}
              <span className='listCount'> ({props.count})</span>
            </span>
            <span className={`openBtn ${inputToggle ? 'plusBtnActive' : ''}`}>
              <span className='plusBtn' onClick={() => { setInputToggle(!inputToggle) }}>+</span>
            </span>
          </div>
          {
            inputToggle && <ClickAdd setCount={ props.setCount } title={ props.title } setInputToggle={ setInputToggle } addClick={ addClick } setAddClick={ setAddClick } items={ props.items } setItems={ props.setItems } ></ClickAdd> 
          }
          {
            <List title={ props.title } items={ props.items } setItems={ props.setItems } setCount={ props.setCount }></List>
          }
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
export default Card;