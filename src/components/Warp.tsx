
import React,{FC} from 'react'
//这个组件的唯一作用就是免去西组件使用key属性
const Warp:FC=(props)=><> {props.children}</>
export default Warp