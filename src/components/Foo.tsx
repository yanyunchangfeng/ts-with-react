import React, { FC ,memo} from 'react';

interface Iprops {
    
    person:     {
        age:number
    }
    
}
const areEqul = (prevProps:any,nextProps:any)=>{
    console.log('prev',prevProps)
    console.log('next',nextProps)
    return prevProps === nextProps;
}
const Foo:FC<Iprops> = memo((props)=> {
    return (
        <>
           {props.person.age}
        </>
    )
},areEqul)

export default Foo