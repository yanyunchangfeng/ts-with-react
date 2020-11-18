import React,{FC, useState, useRef, useEffect } from 'react'
//hooks 中如何获取历史props和state 其实就是利用useRef的特性
const Counter:FC = () =>{


  const [count, setCount] = useState(0)
  const prevCountRef = useRef<number>();
  const prevCount = prevCountRef.current;
  const name = useRef('yycf');
  // 如何强制更新一个组件   主动创建一个不参与渲染的state 然后更新他的值
 //   forceUpdate就是重新render。有些变量不在state上，当时你又想达到这个变量更新的时候，刷新render；或者state里的某个变量层次太深，更新的时候没有自动触发render。
// 这些时候都可以手动调用forceUpdate自动触发render
  const [updater,setUpdater] = useState(0);
  function forceUpdate(){
      name.current = 'yanyunchangfeng'
      setUpdater(updater => updater+1)
  }
  useEffect(()=>{
      prevCountRef.current = count
  })

  return (
      <>
  <h1>Now:{count},before:{prevCount}</h1>
  <h3>name:{name.current}</h3>
  <button onClick={() => setCount(count+1)}>ADD</button>
  <button onClick ={forceUpdate}>强制更新组件</button>
  
  </>)
}

export default Counter