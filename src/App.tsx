import React, { useState } from 'react';
import logo from './logo.svg';
import Hello from './components/Hello';
import LikeButton from './components/LikeButton';
import MouseTracker from './components/MouseTracker';
import ClassLike from './components/classLike';
import useMousePosition from './hooks/useMousePosition';
import useURLLoader from './hooks/useURLLoader';
import './App.css';

interface IThemeProps {
  [key:string]:{color: string;background:string}
}
interface IShowResult {
   message:string;
   status:string;
}
const themes:IThemeProps = {
  'light':{
    color:'#000',
    background:'#eee'
  },
  'dark':{
    color:'#fff',
    background:'#222'
  }
}
const DogShow:React.FC<{data:IShowResult}> = ({data})=>{
   return(
     <>
       <h2>Dog show:{data.status}</h2>
       <img src={data.message}/>
     </>
   )
}
export const ThemeContext = React.createContext(themes.light)
const  App:React.FC = () => {
  const [show,setShow] = useState(true);
  const [theme,setTheme]= useState(themes.light)
  const positions = useMousePosition()
  const [data,loading]  = useURLLoader('https://dog.ceo/api/breeds/image/random',[show])
  const DogResult = data as IShowResult;
  function toggleTheme (){
    if(theme.color === '#000'){
      setTheme(themes.dark)
      return
    }
    setTheme(themes.light)
  }
  return (
    <div className="App">
      <ThemeContext.Provider value={theme}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button onClick={()=>{setShow(!show)}}>Refresh Dog Photo</button>
        </p>
        <p>X:{positions.x} Y:{positions.y}</p>
        {loading?<p>读取中</p>:<img src={DogResult&&DogResult.message}/>}
        <button onClick={()=> toggleTheme()}>Toggle THEME</button>
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
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
