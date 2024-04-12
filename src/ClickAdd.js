import { useState } from 'react';
import './ClickAdd.css';

function ClickAdd(props) {

  const titleArray = props.title;

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleAdd = () => {
    const index = titleArray.indexOf(props.title);
    const storedItems = JSON.parse(localStorage.getItem('data'));
  
    if (index >= 0 && index <= props.title.length - 1) {
      storedItems[props.title].unshift(inputValue);
      localStorage.setItem('data', JSON.stringify(storedItems));

      props.setCount(storedItems[props.title].length);
    }

    // 입력값 초기화
    props.setItems([inputValue, ...props.items]);
    setInputValue('');
  };

  const handleCancel = () => {
    props.setInputToggle(false);
  };

  return (
    <div className='textInput'>
      <div className="addList" id="todoInput">
        <textarea className="textarea" maxLength="500" placeholder="Enter a note" value={ inputValue } onChange={ handleInputChange } ></textarea>
        <div className='count'>
          <span className='countChild'><span className="reCount">{ inputValue.length }</span> / 500</span>
        </div>
      </div>
      <div className="buttonBox">
        <button className="addBtn" disabled={ !inputValue.trim() } onClick={ handleAdd }>Add</button>
        <button className="cancelBtn" onClick={ handleCancel }>Cancel</button>
      </div>
    </div>
  )
}
export default ClickAdd;