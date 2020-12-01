import  React, { FC, useEffect, useRef, useState,memo } from 'react';

const HookLife:FC = memo(()=>{
    const [count,setCount] = useState(0)
    const didUpdateRef = useRef(false);// 模拟生命周期componentDidUpdate
    useEffect(()=>{
        console.log('componentDidMout')
      return ()=>{
          console.log('componet willUnmount')
      }
    },[])
    let renderCount:any = useRef(0);
    renderCount.current ++;
    useEffect(()=>{
        if(renderCount.current > 1){
          console.log('componentDidUpdate')
        }
    })
    useEffect(() => {
        if (!didUpdateRef.current) {
            didUpdateRef.current = true
        } else {
            console.log('componentDidUpdate')
        }
    })
    return (<>
        <button onClick={()=>setCount(count+1)}> click</button>
    </>)
})
export default HookLife