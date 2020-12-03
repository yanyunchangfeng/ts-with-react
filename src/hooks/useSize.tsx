import React, { useState, useEffect, useCallback } from 'react';

const useSize = () => {
    const [size,setSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight,
    });
    const onReSize = useCallback(()=>{
        setSize({
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight,
        })
    },[])
    useEffect(()=>{
        window.addEventListener('resize',onReSize);
        return ()=>{
            window.removeEventListener('resize',onReSize);
        }
    },[])
    return size
}
export default useSize