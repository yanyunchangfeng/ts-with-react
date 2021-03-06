import React, { useState, useEffect, useRef, useContext } from 'react'
import useMousePosition from '../hooks/useMousePosition'
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { ThemeContext } from '../App'
const LikeButton: React.FC = () => {
    // const [like,setLike] = useState(0)
    // const [obj,setObj] = useState({like:0,on:true})
    // 拆分
    const match = useRouteMatch('/likeButton/:id')
    // let {id} = useParams()
    // console.log(id)
    const history = useHistory();
    const location = useLocation();
    // console.log(history)
    // console.log(location)
    const [like, setLike] = useState(0)
    const [on, setOn] = useState(true)
    const likeRef = useRef(0);
    const positions = useMousePosition()
    const didUpdateRef = useRef(false);// 模拟生命周期componentDidUpdate
    const domRef = useRef<HTMLInputElement>(null)
    // {current:12} ref 和直接一个对象有什么区别 ref在所有的render当中都保持着唯一的引用 因此对ref的取值赋值 拿到的都是最终的状态
    const theme = useContext(ThemeContext)
    // console.log(theme)
    const style = {
        background: theme.background,
        color: theme.color
    }
    //空节点包含两个button
    // return (
    //     <>
    //     <button onClick ={()=>{ 
    //         setObj({like:obj.like+1,on:obj.on})
    //     }}>
    //         {obj.like}
    //     </button>
    //     <button onClick ={()=>{ 
    //         setObj({like:obj.like,on:!obj.on})
    //     }}>
    //         {obj.on?'ON':'OFF'}
    //     </button>
    //     </>
    // )
    function handleClick() {
        // history.push('/hello')
        setTimeout(() => {
            alert(`you clicked on ${likeRef.current}`)
            //   alert(`you clicked on ${like}`)
        }, 3000)
    }
    useEffect(() => {
        if (!didUpdateRef.current) {
            didUpdateRef.current = true
        } else {
            console.log('componentDidUpdate')
            document.title = `点击了${like}次`
        }
    })
    return (
        match && <>
            <input type="text" ref={domRef} />
            <h2>X:{positions.x} Y:{positions.y}</h2>
            <button style={style} onClick={() => {
                setLike(like + 1);
                likeRef.current++
            }}>
                {like}
            </button>
            <button onClick={() => {
                setOn(!on)
            }}>
                {on ? 'ON' : 'OFF'}
            </button>
            <button onClick={handleClick
            }>
                Alert！
            </button>
        </>
    )

}

export default LikeButton