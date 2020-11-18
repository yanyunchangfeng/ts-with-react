import React , {FC, useReducer, useEffect} from 'react';

const store = {
    count:0
}
const LS_KEY = '$count'
function reducer (state:any,action:any){
    const {type,payload} = action
   switch(type){
       case 'set': 
            return {count:payload}
       case 'increment':
           return {count:state.count+1}
       case 'decrement':
           return {count:state.count-1}
        default:
            throw new Error()
   }
}
const Todo:FC = ()=>{
    const [state,dispatch] = useReducer(reducer,store)

    useEffect(()=>{
         const count = localStorage.getItem(LS_KEY)|| 0 
         console.log(count)
         dispatch({type:'set',payload:count})
    },[])
    useEffect(()=>{
        localStorage.setItem(LS_KEY,state.count)
    },[state.count])
    return (<>
         Count:{state.count}
         <button onClick={()=>dispatch({type:'increment'})}>+</button>
         <button onClick={()=>dispatch({type:'decrement'})}>-</button>
    </>)
}
export default Todo
