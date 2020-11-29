import  React, { FC, useEffect, useRef, useState,memo } from 'react';

const HookLife:FC = memo(()=>{
    const [count,setCount] = useState(0)
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
    return (<>
        <button onClick={()=>setCount(count+1)}> click</button>
    </>)
})
export default HookLife