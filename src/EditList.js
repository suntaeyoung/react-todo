import { useState } from "react";
import "./EditList.css";

function EditList(props) {
  
  // textarea의 값을 상태로 관리
  const [value, setValue] = useState(props.selectValue);

  // textarea의 값이 변경될 때 호출되는 함수
  const handleChange = e => {
    // textarea의 값이 변경될 때마다 상태를 업데이트
    setValue(e.target.value);
  }

  const handleClose = () => {
    document.body.classList.remove('blackBg');

    props.setEdit(false);
  }

  const onSave = () => {
    document.body.classList.remove('blackBg');

    props.handleSave(value);
    props.setEdit(false);
  }

  return (
    <div className="editBox">
      <div className="editContainer">
        <div className="editItem">
          <span className="text">Edit note</span>
          <button className="editClose" onClick={ handleClose }>X</button>
        </div>
        <div className="addList">
          <span>Note</span>
          <textarea className="editTextarea" rows="20" maxLength="500" placeholder="Enter a note"
            value={ value }
            onChange={ handleChange }
          ></textarea>
          <div className="saveBox">
            <button className="saveBtn" disabled={ !value.trim() } onClick={ onSave }>Save note</button>
            <span>
              <span>{value.length}</span> / 500
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditList;