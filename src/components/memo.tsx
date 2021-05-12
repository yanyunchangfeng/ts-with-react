import React,{FC,memo} from 'react'
//memo 是用来优化函数组件重新渲染的行为 函数组件的属性值不发生变化就不会重新渲染 否则就会触发重新渲染
//memo函数针对的是一个组件的渲染是否重复执行 而useMeMo则是定义了一段函数逻辑是否重复执行
//useMemo  ()=>{}
//memo </Foo>
interface IProps{
    count:number;
    onClick:Function
}
const Counter:FC<IProps> = memo( (props)=>{
console.log("jianba ~🚀: props", props);
    console.log('counter render')
return <h2 onClick = {() => props.onClick()}> {props.count}</h2>
})
export default Counter