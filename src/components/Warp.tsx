
import React,{FC} from 'react'
//这个组件的唯一作用就是免去子组件使用key属性，实际上是骗过react，我这个就是确定的唯一的大小的数组，这个也确实能够确定，
// 因为props.children存在就是在jsx里面写的，那么就是固定的
const Warp:FC=(props)=><> {props.children}</>
export default Warp
const renderDynamic = ()=>{
    return [1,2,3].map(i => <div key={i}>{i}</div>)
    }
const Demo = () =>
   <Warp>
        {renderDynamic() /** react 在编译时根本无法知道运行时会有几个子组件，所以需要key来支持*/}
       <div>he</div>
       <div>wo</div>
   </Warp>
// 如果没有Wrap，就要返回一个数组， [<div key={1}>1</div>,<div key={2}>2</div>] ,在渲染的时候react会警告，没有key的话会认为是动态产生的