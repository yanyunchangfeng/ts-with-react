import { useState, useEffect, useRef } from "react"

const useCount = (defaultCount: number) => {
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
        it.current = setInterval(() => {
            setCount((count: number) => count + 1)
        }, 1000)
    }, [])
    useEffect(() => {
        if (count > 10) {
            clearInterval(it.current)
        }  // 错误写法 因为函数重新渲染 it的句柄会发生变化
    })
    return [count, setCount]
}

export default useCount