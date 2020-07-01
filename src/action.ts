import TodoList from "./components/TodoList";

export function createSet<T>(payload:T){
    return {
        type:'set',
        payload
    }
}
export function createAdd(payload:any){
    // return {
    //     type:'add',
    //     payload
    // }
    return (dispatch:any,getState:any) =>{
     

        setTimeout(()=>{
            const {todos} = getState();
            if(!todos.find( (todo:any) => todo.text === payload.text)){
                dispatch({
                    type:'add',
                    payload:payload
                })
            }
        },3000)
    }
}

// addTodo = (payload) => dispatch(createAdd(payload)) 改造

// {
//     addTodo:createAdd
//     removeTodo:createRemove
// }
export function createRemove<T>(payload:T){
    return {
        type:'remove',
        payload
    }
}
export function createToggle<T>(payload:T){
    return {
        type:'toggle',
        payload
    }
}
export function createEdit<T>(payload:T){
    return {
        type:'edit',
        payload
    }
}