import React, { useState } from 'react';
import logo from './logo.svg';
import Hello from './components/Hello';
import LikeButton from './components/LikeButton';
import MouseTracker from './components/MouseTracker';
import ClassLike from './components/classLike';
import useMousePosition from './hooks/useMousePosition';
import useURLLoader from './hooks/useURLLoader';
import './App.css';
interface IShowResult {
   message:string;
   status:string;
}
// const DogShow:React.FC<{data:IShowResult}> = ({data})=>{
//    return(
//      <>
//        <h2>Dog show:{data.status}</h2>
//        <img src={data.message}/>
//      </>
//    )
// }
const  App:React.FC = () => {
  const [show,setShow] = useState(true)
  const positions = useMousePosition()
  const [data,loading]  = useURLLoader('https://dog.ceo/api/breeds/image/random',[show])
  const DogResult = data as IShowResult;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button onClick={()=>{setShow(!show)}}>Refresh Dog Photo</button>
        </p>
        <p>X:{positions.x} Y:{positions.y}</p>
        {loading?<p>读取中</p>:<img src={DogResult&&DogResult.message}/>}
        <Hello message="Hello World"/>
        <ClassLike/>
        <LikeButton/>
        {show&&<MouseTracker/>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
