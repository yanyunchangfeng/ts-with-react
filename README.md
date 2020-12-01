 ## Hooks的常见问题
 ##    对传统React编程的影响
1. 生命周期 函数如何映射到Hooks？  [hookLifeCycle](src/components/hookLifeCycle.tsx)  |  [getDerivedStateFromProps](src/components/getDerivedStateFromProps.tsx)   
-- shouldComponentUpdate 对应的就是memo组件了
2. 类实例成员变量如何映射到Hooks？ [Ref](src/omponents/LikeButton.tsx) 
-- ref 和直接一个对象有什么区别 ref在所有的render当中都保持着唯一的引用 因此对ref的取值赋值 拿到的都是最终的状态 
3. Hooks中如何获取历史的props和state？[Ref&useEffect](src/components/Counter.tsx)  
-- 其实就是利用useRef的特性
4. 如何强制更新一个Hooks组件？[传建一个不参与渲染的state](src/components/Counter)  
-- forceUpdate就是重新render。有些变量不在state上，当时你又想达到这个变量更新的时候，刷新render；或者state里的某个变量层次太深，更新的时候没有自动触发render。这些时候都可以手动调用forceUpdate自动触发render


## useMomo与useEffcet的区别
* useMomo与useEffcet最大的不同就是执行时机 ，useEffect执行是在渲染之后完成的 useMemo需要返回值的 返回值可以直接参与渲染，因此是在渲染期间完成的，有这样一前一后的区别   
  
## memo与useMomo的区别  
* memo 是用来优化函数组件重新渲染的行为 函数组件的属性值不发生变化就不会重新渲染 否则就会触发重新渲染
* memo函数针对的是一个组件的渲染是否重复执行 而useMeMo则是定义了一段函数逻辑是否重复执行
* useMemo  ()=>{} 
* memo(< Foo/>) 
* [memo和useMemo](src/components/memo.tsx) 
  
## useMomo和useCallback的区别  
* useMemo(()=>fn) 如果useMemo返回的是一个函数 那么就等价于useCallback
* useCallback(fn)
* 使用useCallback 确实会创建新的函数，但是不一定会被返回，换句话说很有可能创建的函数就直接抛弃不用了
* useCallback解决的问题是传入子组件的参数过多变化，导致子组件过多渲染的问题
* useMemo依赖发生变化一定会重新执行，但不能肯定依赖不发生变化就一定不重新执行，就是说它也可能重新执行
* [useMomo和useCallbac](src/App.tsx) 

##  函数组件的局限性
 1. getSnapshotBeforeUpdate,componentDidCatch,getDerivedStateFromError 这些生命周期函数 ，函数组件无法实现
## pureComponent对比memo
1. 原来类组件的pureComponent局限性1 只有传入的props第一级发生变化，才会重新渲染
2. 原来类组件的pureComponent局限性2 传入的回调函数必须绑定到类属性上 否则会引发重新渲染
   --  推论：拆分那些细的组件，传入的属性越简单，那么使用memo和pureComponent的机会就越多
## 如何避免使用key属性
* 这个组件的唯一作用就是免去子组件使用key属性，实际上是骗过react，我这个就是确定的唯一的大小的数组，这个也确实能够确定，
-- 因为props.children存在就是在jsx里面写的，那么就是固定的
-- const Warp:FC=(props)=><> {props.children}</>
-- 动态子组件react 在编译时根本无法知道运行时会有几个子组件，所以需要key来支持
-- 如果没有Wrap，就要返回一个数组， [< div key={1}>1<\/div>,< div key={2}>2<\/div>] ,
__ 在渲染的时候react会警告，没有key的话会认为是动态产生的
* [warp](src/components/Warp.tsx) 

## Hooks的优势
优化类组件的三大问题
1. 方便复用状态逻辑 Custom Hooks
## npx 小知识  

* 1. 避免安装全局模块 
   npx 可以运行它避免全局安装 将安装包下载到临时目录 使用以后再删除 以后再执行命令会重新下载 
* 2. 调用项目内部安装的模块  dev中的mocha测试工具想要直接使用 直接通过npx 调用即可
每当执行npm run 的时候 会创建一个sheel 在这个sheel 里执行指定的脚本命令  比较特别的是 npm run 会将node-module/.bin/子目录加入path变量
 执行结束后再将path变量恢复原样