import { useState } from 'react';
import './Card.css';
import ClickAdd from './ClickAdd';
import List from './List';

function Card(props) {

  const [inputToggle, setInputToggle] = useState(false);
  const [addClick, setAddClick] = useState(false);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  return (
    <div className='listItems'>
      <div className="item">
        <span className='title'>
          {props.title}
          <span className='listCount'> ({count})</span>
        </span>
        <span className={`openBtn ${inputToggle ? 'plusBtnActive' : ''}`}>
          <span className='plusBtn' onClick={() => { setInputToggle(!inputToggle) }}>+</span>
        </span>
      </div>
      {
        inputToggle && <ClickAdd setCount={ setCount } title={props.title} setInputToggle={ setInputToggle } addClick={ addClick } setAddClick={ setAddClick } items={items} setItems={setItems} ></ClickAdd> 
      }
      {
        <List title={ props.title } items={ items } setItems={ setItems } setCount={ setCount } edit={ props.edit } setEdit={ props.setEdit }></List>
      }
    </div>
  )
}
export default Card;