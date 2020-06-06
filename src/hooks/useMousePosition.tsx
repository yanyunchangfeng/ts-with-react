import React, {useState, useEffect} from 'react'
//自定义hook
const useMousePosition = ()=> {
    const [positions, setPositions] = useState({x:0,y:0})
    useEffect(()=>{
        console.log('add effect',positions.x);
        const updateMouse = (e:MouseEvent) =>{
            console.log('inner')
            setPositions({x:e.clientX,y:e.clientY})
        }
        document.addEventListener('click',updateMouse)
        return ()=>{
         console.log('remove effect',positions.x);
         document.removeEventListener('click',updateMouse)
        }
    },[])
    return positions
}
export default useMousePosition