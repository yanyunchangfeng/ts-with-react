import { useState, useEffect, useRef } from "react"
import { setUncaughtExceptionCaptureCallback } from "process";
import { setInterval } from "timers";

const useCount = (defaultCount: number) => {
    console.log('useCount render')
    const [count, setCount] = useState<any>(defaultCount);
    const it = useRef<any>();
    // let it:any;
    // useEffect(() => {
    //     it = setInterval(()=>{
    //         setCount((count:number)=>count+1)
    //     },1000)
    // }, [])
    // useEffect(() => {
    //     if(count>10){
    //         clearInterval(it)       }  // 错误写法 因为函数重新渲染 it的句柄会发生变化
    // })
    useEffect(() => {
        // it.current = setInterval(() => {
        //     setCount((count: number) => count + 1)
        // }, 1000)
        // let a = new Promise((resolve,reject)=>{
        //     // setCount(100),
        //     setCount(1000000)
        //     resolve('')
        // });
        // setCount(1000000)
        // console.log(count)
        // for(let i = 0;i<100;i++){
        //     setCount(i)
        // }
        // setTimeout(()=>setCount(999999999),0)
    }, [])
    useEffect(() => {
        // if (count > 10) {
        //     clearInterval(it.current)
        // }  // 错误写法 因为函数重新渲染 it的句柄会发生变化
    })
    return [count, setCount]
}

export default useCount