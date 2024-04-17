import React, { useEffect, useState } from 'react';
import './App.css';
import './css/Card.css';
import Card from './component/Card';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {

  const [items, setItems] = useState([[], [], []]);
  const [count, setCount] = useState([0, 0, 0]);

  const title = ['해야할 일', '하는중', '다했음'];

  // 새로고침해도 화면에 남게
  useEffect(() => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setItems(title.map(column => parsedData[column]));
      setCount(title.map(column => parsedData[column].length));
    } else {
      // 초기 데이터 설정
      const initialData = title.reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {});
      localStorage.setItem('data', JSON.stringify(initialData));
    }
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const storedItems = JSON.parse(localStorage.getItem('data'));

    // 출발 인덱스
    const sourceIndex = result.source.index;
    // 도착 인덱스
    const destinationIndex = result.destination.index;

    // 출발지 컬럼 번호
    const sourceColumnName = title[result.source.droppableId];
    const sourceColumn = String(title.indexOf(sourceColumnName));

    // 종착지 컬럼 번호
    const destinationColumnName = title[result.destination.droppableId];
    const destinationColumn = String(title.indexOf(destinationColumnName));


    if(sourceColumn === destinationColumn){
      // 로컬스토리지 순서 변경
      const reorderedItems = storedItems[sourceColumnName];
      const [removed] = reorderedItems.splice(sourceIndex, 1);
      reorderedItems.splice(destinationIndex, 0, removed);

      localStorage.setItem('data', JSON.stringify(storedItems));

      // 변경된 아이템 상태를 화면에 반영
      setItems(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems[sourceColumn] = reorderedItems;
        return updatedItems;
      });

    } else if(sourceColumn !== destinationColumn) {
      // 출발지에서 잡은 배열
      const reorderedItems = storedItems[sourceColumnName];
      // 이동시킨 값
      const [removed] = reorderedItems.splice(sourceIndex, 1);

      // 도착지 배열
      const resultItems = storedItems[destinationColumnName];
      resultItems.splice(destinationIndex, 0, removed);

      localStorage.setItem('data', JSON.stringify(storedItems));

      // 변경된 아이템 상태를 화면에 반영
      setItems(prevItems => {
        const newItems = [...prevItems];
        newItems[title.indexOf(sourceColumnName)] = reorderedItems;
        newItems[title.indexOf(destinationColumnName)] = resultItems;
        return newItems;
      });

      // 새로운 카운트 계산하여 한 번에 설정
      const newCount = title.map(column => storedItems[column].length);
      // console.log(newCount)
      setCount(newCount);

    } 
  }

  return (
      <div className="App">
        <div className='black-nav'>
          <h4 className='title'>TODO 서비스</h4>
          <h4 className='menu'>menu</h4>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='todo-container'>
            {title.map((title, index) => (
              <Card key={ index } title={ title } index={ index } count={ count[index] } items={ items[index] }
              setCount={(newCount) => {
                const updatedCount = [...count];
                updatedCount[index] = newCount;
                setCount(updatedCount);
              }}
              setItems={(newItems) => {
                const updatedItems = [...items];
                updatedItems[index] = newItems;
                setItems(updatedItems);
              }} />
            ))}
          </div>
        </DragDropContext>
      </div>
  );
}

export default App;