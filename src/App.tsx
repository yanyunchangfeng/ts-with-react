import React, { useState, useEffect, useMemo, useCallback, useRef ,lazy,Suspense, Component} from 'react';
import logo from './logo.svg';
import Hello from './components/Hello';
import LikeButton from './components/LikeButton';
import MouseTracker from './components/MouseTracker';
import ClassLike from './components/classLike';
import useMousePosition from './hooks/useMousePosition';
import useURLLoader from './hooks/useURLLoader';
import FancyInput from './components/fancyInput'
import { Form, Input, Button } from 'antd';
import './App.css';
import 'antd/dist/antd.css'
import axios from 'axios'
import RenderArray from './components/RenderArray';
import RenderDy from './components/RenderDy';
import useCount from './hooks/useCount';
import CounterMeMo from './components/memo'
import Warp from './components/Warp';
import Counters from './components/Counter'
import { HashRouter as Router, useHistory, Route, Switch, Redirect } from 'react-router-dom'
import useCounter from './hooks/useCounter';
import Todo from './components/Todo'
import TodoList from './components/TodoList'
import Foo from './components/Foo';
import ErrorBoundary from './errorBoundory';
import HookLifeCycle from './components/hookLifeCycle';
import HookLife from './components/hookLifeCycle';
  const About  = lazy(()=>import(/*webpackChunkName:"about"*/'./about')); //注释相当于给异步的chunk添加别名
// 原来类组件的pureComponent局限性1 只有传入的props第一级发生变化，才会重新渲染
// 原来类组件的pureComponent局限性2 传入的回调函数必须绑定到类属性上 否则会引发重新渲染
// 推论：拆分那些细的组件，传入的属性越简单，那么使用memo和pureComponent的机会就越多


 // getSnapshotBeforeUpdate,componentDidCatch,getDerivedStateFromError 这些生命周期函数 ，函数组件无法实现
//shouldComponentUpdate 对应的就是memo组件了
interface IThemeProps {
  [key: string]: { color: string; background: string }
}
interface IShowResult {
  message: string;
  status: string;
}
const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#eee'
  },
  'dark': {
    color: '#fff',
    background: '#222'
  }
}
const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  return (
    <>
      <h2>Dog show:{data.status}</h2>
      <img src={data.message} />
    </>
  )
}
export const ThemeContext = React.createContext(themes.light)
const App: React.FC = () => {
  const history = useHistory();
  const inputRef = useRef<any>()
  // console.log(history)
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const  [person,setPerson] = useState<any>({
    person:{
      age:0
    }
  })
  const [count, setCount] = useCount(0)
  const [clickCount, setClickCount] = useState(0)
  const double = useMemo(() => {
    console.log('one')
    return count * 2
  }, [count === 3]) //当count为3或4的时候double会改变

  const half = useMemo(() => {
    return double / 4
  }, [double])
  // useMomo与useEffcet最大的不同就是执行时机 ，useEffect执行是在渲染之后完成的 useMemo需要返回值的 返回值可以直接参与渲染，因此是在渲染期间完成的，有这样一前一后的区别
  const Counter = useCounter(count as number)
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [show, setShow] = useState(true);
  const [theme, setTheme] = useState(themes.light)

  const positions = useMousePosition()
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show])
  const DogResult = data as IShowResult;
  const [form] = Form.useForm()
  function toggleTheme() {
    if (theme.color === '#000') {
      setTheme(themes.dark)
      return
    }
    setTheme(themes.light)
  }
  function onFinish(val: any) {
    console.log(val)
  }
  function goTo(path: string) {
    //  history.push('/'+path)
  }
  function onFill() {
    form.setFieldsValue({
      userName: 'admin1',
      userPwd: '123456'
    })
  }
  const onClick = () => {
    console.log('Click')
  }
  const onClickMemo = useMemo(() => {
    return () => {
      console.log('click')
    }
  }, [])
  // const onClickCallback = useCallback(() => {
  //   console.log('click')
  //   setClickCount(clickCount => clickCount + 1)
  // }, [])

  const onclickmemo = useMemo(()=>{
    return ()=>{
        console.log('click')
    }
  },[])
  const onClickCb = ()=>{
    console.log('click')
  }
  // useMemo(()=>fn) 如果useMemo返回的是一个函数 那么就等价于useCallback
  // useCallback(fn)

  // 使用useCallback 确实会创建新的函数，但是不一定会被返回，换句话说很有可能创建的函数就直接抛弃不用了
  // useCallback解决的问题是传入子组件的参数过多变化，导致子组件过多渲染的问题
  // useMemo依赖发生变化一定会重新执行，但不能肯定依赖不发生变化就一定不重新执行，就是说它也可能重新执行
  useEffect(() => {
    // const history  =useHistory()
    // console.log(history)
    // axios.get(per'/posts').then(data=>{
    //   console.log(data)
    // })
    window.addEventListener('load',()=>{
      console.log('addd')
    })
  },[])
  const onButtonClick = ()=>{
      inputRef.current.focus()
  }
  const onButtonClickF = ()=>{
      person.person.age++;
      setPerson(person)
  }
  useEffect(()=>{
       
  },[])
  return (
    
   
    <Router>
      
      <Todo />
      {count==0?<HookLife/>:''}
      <Counters/>
      <div className="App">
        {/* <div className="border">
          <div className="img-container">
            <div className="image"></div>
          </div>
        </div> */}
        <ThemeContext.Provider value={theme}>
          <TodoList/>
          {/* <RenderArray/> */}
          <button onClick={() => setCount(count + 1)}>Click({count}),Double({double}),Half({half}),clickCount({clickCount})</button>
          <CounterMeMo count={double} onClick={onclickmemo}/>
          <ErrorBoundary>
              <Suspense fallback={'loading'}>
                  <About/>
              </Suspense>
          </ErrorBoundary>
          <FancyInput ref={inputRef} count={count}/>
          <button onClick={onButtonClick}>Focus the input</button>
          <Button onClick= {onButtonClickF}>addAge</Button>
          <Foo person={person.person} />
          {/* <header className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <p>
          <button onClick={()=>{setShow(!show)}}>Refresh Dog Photo</button>
        </p> */}
          {/* <p>X:{positions.x} Y:{positions.y}</p> */}
          {/* {loading?<p>读取中</p>:<img src={DogResult&&DogResult.message}/>} */}
          {/* <button onClick={()=> toggleTheme()}>Toggle THEME</button> */}
          {/* <Hello message="Hello World"/> */}
          {/* <ClassLike/> */}
          <LikeButton/>
          {/* {show&&<MouseTracker/>} */}
          {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
          {/* </header> */}
          {/* {Counter} */}
        </ThemeContext.Provider>
        <Warp>
          {/* {[1,2,3,4,5].map(val=><div>val</div>)}
           */}
           <div>1</div>
           <div>1</div>
           <div>1</div>
           <div>1</div>
        </Warp>
        {/* <Form {...layout} onFinish={onFinish} form={form} className='pd-20 wd-600' id="control-hook">
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
        <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="button" onClick={()=>setCount(count+1)}>
            setCount
        </Button>
        </Form.Item>
      </Form> */}
      </div>

      <Switch>
        <Route path="/" render={() => <Redirect to="/hello" />}></Route>
        <Route path="/hello" render={(val) => {
          //  console.log(val,'val')
          // return <div>4</div>
          return <Redirect to={{ pathname: 'login', state: { from: val } }} />
        }} exact></Route>
        <Route path="/likeButton/:id" component={LikeButton} exact></Route>
      </Switch>
    </Router>
  );
}

export default App;
// export default class App extends Component{
//      state ={
//        hasError:false
//      }
//        static getDerivedStateFromError(error:any) {
//         // 更新 state 使下一次渲染能够显示降级后的 UI
//         return { hasError: true };
//       }
//       render(){
//         if(this.state.hasError){
//             return <>someThing we wrong</>
//         }
//         return  <Suspense fallback={'loading'}>
//               <About/>
//     </Suspense>
//     }
// }
