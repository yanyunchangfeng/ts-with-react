import React, { FC,useRef,useImperativeHandle, forwardRef } from 'react';

let FancyInput:FC<any> =(props,ref:any)=>{
    const inputRef = useRef<any>();
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      }
    }));
    return <input ref={inputRef}  />;
}
FancyInput = forwardRef(FancyInput as any)
export default FancyInput