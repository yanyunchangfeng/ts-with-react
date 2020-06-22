import { useState, useEffect, useRef } from "react"

const useCount = (defaultCount:number)=>{
    const [count,setCount] = useState<any>(defaultCount);
    const it = useRef<any>();
    useEffect(()=>{
        it.current = setInterval(()=>{
            setCount((count:number)=>count+1)
        },1000)
    },[])
    useEffect(()=>{
        if(count>10){
            clearInterval(it.current)       }
    })
    return [count,setCount]
}

export default useCount