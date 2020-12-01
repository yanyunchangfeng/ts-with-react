import React, { FC,useRef,useImperativeHandle, forwardRef,MutableRefObject,Ref } from 'react';
// 建议useImperativeHandle和forwardRef同时使用，减少暴露给父组件的属性，避免使用 ref 这样的命令式代码
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




//只暴露value、getType、focus给父级
const InputEl1 = forwardRef((props: {}, ref: Ref<any>): JSX.Element=>{
    const inputEl: MutableRefObject<any> = useRef();

    useImperativeHandle(ref, ()=>({//第一个参数：暴露哪个ref；第二个参数：暴露什么
        value: (inputEl.current as HTMLInputElement).value,
        getType: () => (inputEl.current as HTMLInputElement).type,
        focus: () => (inputEl.current as HTMLInputElement).focus()
    }));

    return(
        <input ref={inputEl} type="text" {...props}/>
    )
})
// //暴露整个input节点给父级
const InputEl = forwardRef((props: {}, ref: Ref<any>): JSX.Element=>{
    return(
        <input ref={ref} type="text" {...props}/>
    )
});


//父级
function InputWithFocusButton() {
  const inputEl: MutableRefObject<any> = useRef(null);

  function onButtonClick() {
      console.log('子组件input的对象:', inputEl.current);
      inputEl.current.focus();
  };
  return (
      <>
          <InputEl ref={inputEl} />
          <button onClick={onButtonClick}>Focus the input</button>
      </>
  );
}
// 通过forwardRef，父组件获取子组件的ref，子组件在暴露ref中，限制暴露的一些参数
