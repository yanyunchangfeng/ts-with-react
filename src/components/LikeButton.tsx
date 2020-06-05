import React, {useState} from 'react'

const LikeButton:React.FC =()=>{
    // const [like,setLike] = useState(0)
    // const [obj,setObj] = useState({like:0,on:true})
    // 拆分
    const [like,setLike] = useState(0)
    const [on,setOn] = useState(true)
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
        return (
        <>
            <button onClick ={()=>{ 
                setLike(like+1)
            }}>
                {like}
            </button>
            <button onClick ={()=>{ 
                setOn(!on)
            }}>
                {on?'ON':'OFF'}
            </button>
        </>
    )

}

export default LikeButton