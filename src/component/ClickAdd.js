import { useState } from 'react';
import '../css/ClickAdd.css';

function ClickAdd(props) {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };
  
  const handleAdd = () => {
    const storedItems = JSON.parse(localStorage.getItem('data'));
  
    storedItems[props.title].unshift(inputValue);
    localStorage.setItem('data', JSON.stringify(storedItems));

    props.setCount(storedItems[props.title].length);

    // 화면에 리스트 추가
    props.setItems([inputValue, ...props.items]);

    // 입력값 초기화
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