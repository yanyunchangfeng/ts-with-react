import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// npx 小知识
// 1.避免安装全局模块
// npx 可以运行它避免全局安装 将安装包下载到临时目录 使用以后再删除 以后再执行命令会重新下载
// 2. 调用项目内部安装的模块  dev中的mocha测试工具想要直接使用 直接通过npx 调用即可
// 每当执行npm run 的时候 会创建一个sheel 在这个sheel 里执行指定的脚本命令  比较特别的是 npm run 会将node-module/.bin/子目录加入path变量
// 执行结束后再将path变量恢复原样
