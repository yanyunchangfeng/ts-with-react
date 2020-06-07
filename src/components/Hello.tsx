import React, { useContext } from 'react'
import {ThemeContext} from '../App';
interface IHelloProps {
    message?: string;
}
// 好处 1自动补全message属性
// 2 在我们使用的时候获得了验证 如果类型不匹配会报错 


// const Hello = (props: IHelloProps) => {
// return <h2>{props.message}</h2>
// }
//如何改造获得极限 // React.FunctionComponent
const Hello:React.FC<IHelloProps> =(props)=>{
    const theme = useContext(ThemeContext)
    const style = {
        background:theme.background,
        color:theme.color
    }
return <h2 style ={style}>{props.message}</h2>
}
Hello.defaultProps = {
    message:'Hello World'
}


export default Hello