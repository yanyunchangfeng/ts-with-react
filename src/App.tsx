import React, { useState } from 'react';
import logo from './logo.svg';
import Hello from './components/Hello';
import LikeButton from './components/LikeButton';
import MouseTracker from './components/MouseTracker';
import ClassLike from './components/classLike';
import useMousePosition from './hooks/useMousePosition';
import useURLLoader from './hooks/useURLLoader';
import {Form,Input,Button} from 'antd';
import './App.css';
import 'antd/dist/antd.css'
import RenderArray from './components/RenderArray';
import RenderDy from './components/RenderDy';
import Warp from './components/Warp'
import {BrowserRouter as Router,useHistory,Route,Switch} from 'react-router-dom'


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
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [show,setShow] = useState(true);
  const [theme,setTheme]= useState(themes.light)
  const positions = useMousePosition()
  const [data,loading]  = useURLLoader('https://dog.ceo/api/breeds/image/random',[show])
  const DogResult = data as IShowResult;
  const [form] = Form.useForm()
  function toggleTheme (){
    if(theme.color === '#000'){
      setTheme(themes.dark)
      return
    }
    setTheme(themes.light)
  }
  function onFinish(val:any){
  console.log(val)
  }
  function onFill(){
    form.setFieldsValue({
      userName:'admin1',
      userPwd:'123456'
    })
  }
  return (
     <Router>
    <div className="App">
      <ThemeContext.Provider value={theme}>
        <RenderArray/>
        <Warp>
          {/* {RenderDy()} */}
          <div>2</div>
          <div>2</div>
          <div>2</div>
          <div>2</div>
          <div>2</div>
        </Warp>
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
      <Form {...layout} onFinish={onFinish} form={form} className='pd-20 wd-600' id="control-hook">
        <Form.Item name="userName" label="用户名" rules={[{ required: true,pattern:/^\w{6}$/ ,message:'用户名为6位数字字母或下滑线'}]}>
          <Input />
        </Form.Item>
        <Form.Item name="userPwd" label="密 码" rules={[{ required: true,pattern:/^\d{6}$/, message:'密码为6位数字'}]}>
         <Input />
       </Form.Item>
       <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="primary" htmlType="button" onClick={onFill}>
            onFill
        </Button>
        </Form.Item>
      </Form>
    </div>

    <Switch>
      {/* <Route path = "/login" component={}></Route>
      <Route path="/public" component={}></Route> */}
    </Switch>
    </Router>
  );
}

export default App;
