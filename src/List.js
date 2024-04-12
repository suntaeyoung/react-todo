import { useState } from 'react';
import EditList from './EditList';
import './List.css';

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
    // body에 검은색 배경 클래스 추가
    document.body.classList.add('blackBg');

  }

  const handleDelete = (index) => {
    const storedItems = JSON.parse(localStorage.getItem('data'));

    // 로컬 스토리지의 해당 항목을 삭제합니다.
    const category = props.title;
    const updatedItems = storedItems[category].filter((a, i) => i !== index);

    storedItems[category] = updatedItems;
    localStorage.setItem('data', JSON.stringify(storedItems));

    // 새로운 아이템 배열로 상태를 업데이트합니다.
    const newItems = props.items.filter((a, i) => i !== index);

    props.setItems(newItems);
    props.setCount(newItems.length);
  };

  const handleSave = (newValue) => {
    const storedItems = JSON.parse(localStorage.getItem('data'));

    // 로컬스토리지 수정
    const title = storedItems[props.title];
    title.splice(index, 1, newValue);
    localStorage.setItem('data', JSON.stringify(storedItems));

    // 화면 수정
    props.items.splice(index, 1, newValue);
  }

  return (
    <div className='listBoxes'>
      {
        props.items.map((item, index) => (
          <div key={index} className='listBox' onDoubleClick={() => handleDoubleClick(index)}>
            {item}
            <button className='listDelete' onClick={() => handleDelete(index)}>X</button>
          </div>
        ))
      }
      {
        edit && <EditList handleSave={handleSave} setEdit={setEdit} selectValue={selectValue} />
      }
    </div>
  )
}
export default List;