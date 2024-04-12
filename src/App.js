import './App.css';
import './Card.css';
import Card from './Card';
import { useEffect } from 'react';

function App() {

  const title = ['해야할 일', '하는중', '다했음'];

  useEffect(() => {
    if(!localStorage.getItem('data')) {
      const initialData = title.reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {});
      localStorage.setItem('data', JSON.stringify(initialData));
    }
  }, []);
  
  return (
    <div className="App">
      <div className='black-nav'>
        <h4 className='title'>TODO 서비스</h4>
        <h4 className='menu'>menu</h4>
      </div>
      <div className='todo-container'>
        {
          title.map((title, index) => (
            <Card key={ index } title={ title } />
          ))
        }        
      </div>
    </div>
  );
}

export default App;
