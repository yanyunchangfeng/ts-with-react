import React from 'react'
interface Istate {
    count:number;
}
export default class ClassLike extends React.Component{
    state:Istate;
    constructor(props:any){
        super(props)
        this.state  = {
            count:0
        }
        
    }
    componentDidMount(){
        // console.log('class')
        document.title = `you clicked${this.state.count}`
    }
    componentDidUpdate(){
        document.title  = `you clicked${this.state.count}`
    }
    onButtonClick(){
       this.setState({
           count:this.state.count+1
       })
    }
    render (){
        return(
        <button onClick={()=>{this.onButtonClick()}}>{this.state.count}</button>
        )
    }

}