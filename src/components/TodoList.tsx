import React ,{FC, useState, useCallback, useEffect}from 'react'
import {Form, Input, Checkbox, Button } from 'antd'
let idSeq = Date.now();
interface List {
    text:string;
    complete:boolean;
    id:number
}
interface ICprops{
    addTodo:(obj:List) => void
}
interface CommonProps {
    removeTodo:(id:number) => void;
    toggleTodo:(id:number) => void;
}
interface ITprops extends CommonProps{
    todos:List[]
}
interface ITItem extends CommonProps{
    todo:List
}

const LS_KEY = '_$-todos_';
const Control:FC<ICprops> = (props)=>{
    const { addTodo } = props
    const [form] = Form.useForm()
    const onFinish = (val:any)=>{
    const todoVal = val.todo.trim();
    if(!todoVal) return
    addTodo({
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
     const {todo:{id,complete,text} ,toggleTodo,removeTodo}  =  props

     const onChange = () => {
         toggleTodo(id)
     }
     const onRemove = () =>{
         removeTodo(id)
     }
return <li>
        <Checkbox onChange ={onChange} checked={complete}/>
        <label className={complete?'complete':''}>{text}</label>
        <Button onClick={onRemove}  size="small">❌</Button>
    </li>
}
const Todos:FC<ITprops> = (props)=>{
    console.log(props.todos)
    const {todos,removeTodo,toggleTodo} = props
    return (
        <ul>
            {
                todos.map((todo:any) => <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo ={toggleTodo}/>)
            }
        </ul>
    )
}
const TodoList:FC= ()=>{
   const [todos,setTodos] = useState<List[]>([])
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
   useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem(LS_KEY)||'[]')
    setTodos(todos)
},[])
   useEffect(()=>{
    localStorage.setItem(LS_KEY,JSON.stringify(todos))
},[todos])

  
   return (
       <div className="todo-list">
           <Control addTodo={addTodo}/>
           <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}/>
       </div>
   )
}


export default TodoList