import React ,{FC, useState, useCallback, useEffect, ChangeEvent, useRef, RefObject}from 'react'
import {Form, Input, Checkbox, Button } from 'antd'
import { List } from 'antd/lib/form/Form';
import {createAdd,createRemove,createEdit,createToggle} from '../action'
let idSeq = Date.now();


type dispatch = (action:IAction<any>) => void 
interface actionCreators {
    [key:string]:(...arg:any) => any
}
function bindActionCreateor(actionCreators:actionCreators,dispatch:dispatch){
    const ret:any = {};
    for (let key in actionCreators){
        ret[key] = function(...args:any){
             const actionCreator = actionCreators[key]
             const action = actionCreator(...args)
             dispatch(action)
        }
    }
    return ret
}
function reducer(state:any,action:any){
    const {type,payload} = action
    const {todos,increment} = state
    switch(type){
        case 'add':
            return {
                ...state,
                todos:[...todos,payload]
            }
        case 'toggle':
            return {
                ...state,
                todos: todos.map((todo:List)=>{
                    return todo.id === payload ? {...todo,complete:!todo.complete}:todo
                })
            }
          
        case 'remove':
            return {
                ...state,
                todos: todos.filter((todo:any) => {
                    return todo.id !== payload
                })
            }
        case 'edit': 
        return {
            ...state,
            todos: todos.map((todo:List)=>{
                return todo.id === payload.id ?{...todo,text:payload.text}:todo
            })
        }
        default:
     }
    return state
}
interface List {
    text:string;
    complete:boolean;
    id:number
}
interface Idpt{
    // dispatch:(act:IAction<any>)=>void
    [key:string]:any
}
interface ICprops  extends Idpt{
}
interface CommonProps {
    removeTodo:(id:number) => void;
    toggleTodo:(id:number) => void;
    editTodo:(id:number,text:string) => void
}
interface ITprops extends Idpt{
    todos:List[]
}
interface ITItem extends Idpt{
    todo:List
}
interface IAction<T>{
    type:string;
    payload:T;
}
interface Iedit{
    id:number;
    text:string;
}
const LS_KEY = '_$-todos_';
const Control:FC<ICprops> = (props)=>{
    const { addTodo } = props
    const [form] = Form.useForm()
    const onFinish = (val:any)=>{
    const todoVal = val.todo.trim();
    if(!todoVal) return
   addTodo( 
       {
        id:++idSeq,
        text:todoVal,
        complete:false
       })
    
     form.setFieldsValue({
         'todo':''
     })
    }
    return <div className="control">
        <h1>Todos</h1>
        <Form onFinish={onFinish} form={form} className="wd-600">
            <Form.Item label="todo" name="todo">
                <Input/>
            </Form.Item>
        </Form>
    </div>
}

const TodoItem:FC<ITItem> =(props)=>{
     const {todo:{id,complete,text} ,toggleTodo,editTodo,removeTodo}  =  props
     const [editable,setEditable] = useState(false)
     const LabelRef = useRef<HTMLLabelElement>(null)
     const onChange = () => {
        //  dispatch(createToggle<number>(id))
        toggleTodo(id)
     }
     const onRemove = () =>{

        //  dispatch(createRemove<number>(id))
        removeTodo(id)
     }
     const onDouble = ()=>{
        setEditable(true)
     }
     const onKeyUpChange = () =>{
         console.log(LabelRef.current?.innerHTML)
         const text = LabelRef.current?.innerHTML || ''
        //  dispatch(createEdit<Iedit>({id,text}))
        editTodo({id,text})
     }
return <li>
        <Checkbox onChange ={onChange} checked={complete}/>
        <label className={complete?'complete':''} contentEditable={editable} onDoubleClick={onDouble} onKeyUp={ onKeyUpChange} suppressContentEditableWarning ref={LabelRef}>{text}</label>
        <Button onClick={onRemove}  size="small">❌</Button>
    </li>
}
const Todos:FC<ITprops> = (props)=>{
    console.log(props.todos)
    const {todos,removeTodo,toggleTodo,editTodo} = props
    return (
        <ul>
            {
                todos.map((todo:List) => <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo}  toggleTodo={toggleTodo} editTodo={editTodo}/>)
            }
        </ul>
    )
}
const TodoList:FC = ()=>{
   const [todos,setTodos] = useState<List[]>([])
   const [increment,setIncrement] = useState(0)
   const addTodo = useCallback((todo:List)=>{
       setTodos((todos:List[]) => [...todos,todo])
   },[])
   const removeTodo = useCallback((id:number)=>{
      setTodos((todos:List []) => todos.filter((todo:any) => {
          return todo.id !== id
      }))
   },[])
   const toggleTodo = useCallback((id:number)=>{
        setTodos((todos:List [])=>todos.map((todo:List)=>{
            return todo.id === id ? {...todo,complete:!todo.complete}:todo
        }))
   },[])
   const editTodo = useCallback((id:number,text:string)=>{
     setTodos((todos:List[])=> todos.map((todo:List)=>{
         return todo.id === id ?{...todo,text:text}:todo
     }))
   },[])

   const dispatch = useCallback((action:IAction<any>) =>{
     const state = {
         todos,
         increment
     }
     const setters:any = {
         todos:setTodos,
         increment:setIncrement
     }
     const newState = reducer(state,action)
     for(let key in newState){
         setters[key](newState[key])
     }
  
   },[todos,increment])
   useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem(LS_KEY)||'[]')
    setTodos(todos)
},[])
   useEffect(()=>{
    localStorage.setItem(LS_KEY,JSON.stringify(todos))
},[todos])

  
   return (
       <div className="todo-list">
           <Control {...bindActionCreateor({addTodo:createAdd},dispatch)}/>
           <Todos  todos={todos} {...bindActionCreateor({
               removeTodo:createRemove,
               toggleTodo:createToggle,
               editTodo:createEdit
               },dispatch)}/>
       </div>
   )
}


export default TodoList