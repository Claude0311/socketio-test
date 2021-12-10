import logo from './logo.svg';
import './App.css';
import webSocket from 'socket.io-client'
import { useState } from 'react';

const ws = webSocket('ws://localhost:3000')

const App = () => {
  const [usr,setUsr] = useState("");
  const [count,setCnt] = useState(0);
  const handleOnlyMe = ()=>{
    ws.emit('only me',usr)
  }
  const handleEveryOne = ()=>{
    ws.emit('broadcast to everyone',usr)
  }
  const handleExceptMe = ()=>{
    ws.emit('broadcast except me',usr)
  }
  ws.on('count',()=>setCnt(count+1))
  return (
    <div className="App">
      <input placeholder="username"
       onChange={(e)=>{setUsr(e.target.value)}}/><br/>
      <button onClick={handleOnlyMe}>toMe</button><br/>
      <button onClick={handleEveryOne}>toEveryOne</button><br/>
      <button onClick={handleExceptMe}>toEveryOneExceptMe</button><br/>
      {count}
    </div>
  );
}

export default App;
