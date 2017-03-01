import React from 'react';
import Sidebar from 'react-sidebar';

import Content from './App.jsx'
import './Sidebar.css'

import books from '../reference/books.json'

var App = React.createClass({
  getInitialState() {
    return {sidebarOpen: false, sidebarDocked: false, bookTitle:'Swift Language'};
  },

  onSetSidebarOpen: function(open) {
    this.setState({sidebarOpen: open});
  },

  openDraw: function() {
    this.setState({sidebarOpen: true, sidebarDocked:false, bookTitle:this.state.bookTitle});
  },

  componentWillMount: function() {
    var mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
  },

  componentWillUnmount: function() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  },

  mediaQueryChanged: function() {
    this.setState({sidebarDocked: this.state.mql.matches});
  },

  selectBookTitle: function(title) {
     this.setState({sidebarOpen: false, sidebarDocked:false, bookTitle:title});
  },

  render: function() {
    const sidebarContent = (<div className="sidebar">
      <div className="sidenav"> <a className="logo" href="https://tonnysunm.github.io">
        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MnB4IiB2aWV3Qm94PSIwIDAgNDAgNDIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQxLjIgKDM1Mzk3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5sb2dvPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlN5bWJvbHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJsb2dvIj4KICAgICAgICAgICAgPGcgaWQ9InNsb3dzbGFiIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2LjAwMDAwMCwgNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLjc1LDI3Ljc1IEMzLjc1LDI3Ljc1IDguNDMzMDI4ODUsMjkuMjUzMTczMSA5LDI5LjI1IEM5LjU2Njk3MTE1LDI5LjI0Njc1NDggOS4yMzA3NzY0NCwxOS4yNjM5NjYzIDkuMjMwNzc2NDQsMTkuMjYzOTY2MyBDOS4yMzA3NzY0NCwxOS4yNjM5NjYzIDYuMTczMDY5NzEsMjAuNjQ0Njg3NSAzLjc1LDI3Ljc1IFoiIGlkPSJGaWxsLTEiIGZpbGw9IiNDMjdFMTUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNS42NDkwMzg1LDIxLjQyNzQyNzkgQzE0Ljc1MzUwOTYsMjIuMzU2MTI5OCAxMi41ODkzOTksMjcuMTY0OTI3OSAxMi42OTIzMDc3LDMwLjk0NjY1ODcgQzEyLjY5MjMwNzcsMzAuOTQ2NjU4NyA4LjgwOTAzODQ2LDMwLjM5MDE0NDIgNS4xMjAxOTIzMSwyOS41NzY0NjYzIEM1LjEyMDE5MjMxLDI5LjU3NjQ2NjMgNS4wNDE0NDIzMSwyMy44OTgyNDUyIDkuMTU4NjUzODUsMTkuNDgwMzEyNSBDOS4xNTg2NTM4NSwxOS40ODAzMTI1IDE0LjkwMjcxNjMsMjAuOTk2MjUgMTUuNjQ5MDM4NSwyMS40Mjc0Mjc5IiBpZD0iRmlsbC0zIiBmaWxsPSIjRUNCRjM3Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjguMDI0MDM4NSwxMy44NTUzMTk3IEMyOC4wMjQwMzg1LDEzLjg1NTMxOTcgMjIuMzU1NzY5MiwxNC43OTI4MTk3IDE4LjYwNTc2OTIsMTYuMjM1MTI3NCBDMjEuMTI5ODA3NywxNy4xMDA1MTIgMjYuMDAzNTA5NiwxOC4xMzc0NTE5IDI5LjI1LDE4IiBpZD0iRmlsbC01IiBmaWxsPSIjMjU3MkFDIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjguNDEzNDYxNSw4LjA4NjA4MTczIEMyOC40MTM0NjE1LDguMDg2MDgxNzMgMjkuNDQyMDQzMywxMi45ODUyNDA0IDMwLDE1LjczMDMxMjUgQzMwLDE1LjczMDMxMjUgMjMuODMzMTk3MSwxNy4wNzAwNzIxIDE4LjQ2MTUzODUsMTYuMTYzMDA0OCBMMTcuNDUxOTIzMSw5LjQ1NjI3NDA0IEMxNy40NTE5MjMxLDkuNDU2Mjc0MDQgMjIuNjk5Njg3NSw5LjU1ODgyMjEyIDI4LjQxMzQ2MTUsOC4wODYwODE3MyIgaWQ9IkZpbGwtNyIgZmlsbD0iIzVFQjdGMSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTguMTM0NjE1MzgsMi44ODQ2MTUzOGUtMDUgQzguMTM0NjE1MzgsMi44ODQ2MTUzOGUtMDUgMTEuNjE2OTk1Miw3LjMzMzk0NzEyIDEwLjk2MTUzODUsMTAuMzIxNjg3NSBMMy43NSwyLjY3NzQ1NjczIEw4LjEzNDYxNTM4LDIuODg0NjE1MzhlLTA1IFoiIGlkPSJGaWxsLTkiIGZpbGw9IiM4QjE4MUEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDUuMjczNTgxNzMgTDUuNDA4NjUzODUsMC4xNTMzODk0MjMgQzUuNDA4NjUzODUsMC4xNTMzODk0MjMgOC43Njg1ODE3MywzLjA5NDkwMzg1IDExLjAzMzY1MzgsOS4wOTU2OTcxMiBDNy43ODE2MTA1OCwxMC45NDczMzE3IDUuOTg1NTc2OTIsMTMuMDYyMDQzMyA1Ljk4NTU3NjkyLDEzLjA2MjA0MzMgQzUuOTg1NTc2OTIsMTMuMDYyMDQzMyA0LjkzOTAzODQ2LDkuNDA4Njc3ODggMCw1LjI3MzU4MTczIiBpZD0iRmlsbC0xMSIgZmlsbD0iI0RGMjQyQiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTEzLjEyNSwxNS4zNjk3MzU2IEMxMy4zMjMxNzMxLDE0LjY0OTY2MzUgMTEuNjAxNDkwNCw5LjE1IDExLjEwNTc2OTIsOC44MDcyMzU1OCBDMTAuOTY2MTUzOCw4LjgwOTk3NTk2IDEwLjkwNzE2MzUsOC43NzE5NzExNSAxMC42NzMwNzY5LDguODA3MjM1NTggQzkuNTI0Mjc4ODUsOC45ODAyNDAzOCA3LjYzMDk2MTU0LDEwLjE4MjU0ODEgNS43NjkyMzA3NywxMi45MTc4MTI1IEM1Ljc2OTIzMDc3LDEyLjkxNzgxMjUgOC4xNTQwODY1NCwxOS43MjQ3MTE1IDguNTgxNzMwNzcsMTkuNzY4Nzc0IEM5LjUxNDI1NDgxLDE4LjQyMjg4NDYgMTEuMjgzMzE3MywxNi4yOTcwNjczIDEyLjU0ODA3NjksMTUuNTEzOTY2MyBDMTIuNzcxNjM0NiwxNS4zNzU1NzY5IDEyLjg5MzY1MzgsMTUuMzI1MTY4MyAxMy4xMjUsMTUuMzY5NzM1NiIgaWQ9IkZpbGwtMTMiIGZpbGw9IiM1RUI3RjEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS4xMDU3NjkyLDguNzM1MTIwMTkgQzExLjQwNzY0NDIsOS4xMDYwODE3MyAxMi44NjE3Nzg4LDEzLjE3MjE2MzUgMTMuMTI1LDE0LjkzNzA0MzMgQzEzLjE1Nzc0MDQsMTUuMTU2NjM0NiAxMy4xNDE4MDI5LDE1LjM0ODMxNzMgMTMuMDUyODg0NiwxNS40NDE4NTEgQzEzLjY3NTc0NTIsMTUuODg1OTM3NSAxNS45OTE3MzA4LDE2LjMxNzExNTQgMTkuMDM4NDYxNSwxNi41MjM1ODE3IEMxOS4xMzM4NzAyLDE2LjQwMDE5MjMgMTkuMjUzNTgxNywxNi4yMTExNzc5IDE5LjMwNDcxMTUsMTUuOTczNDEzNSBDMTkuNDYxMjc0LDE1LjI0NDc1OTYgMTkuMTU4OTY2MywxMi41MzY5NzEyIDE3LjY2ODI2OTIsOS4yMzk5Mjc4OCBDMTcuNjY4MjY5Miw5LjIzOTkyNzg4IDEzLjcyMDI0MDQsOC4zNzMwMjg4NSAxMS4xMDU3NjkyLDguNzM1MTIwMTkiIGlkPSJGaWxsLTE1IiBmaWxsPSIjRURCRjM2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTkuMTgyNjkyMywxNi41MjM1ODE3IEMxOC4zMzI2NjgzLDE4LjExNjE3NzkgMTcuMDY5MjA2NywyMC4wODM5MTgzIDE1LjUwNDgwNzcsMjEuODYwMTIwMiBDMTIuNDQ5MjA2NywyMS40ODEyOTgxIDkuODE3NDI3ODgsMjAuOTM3NDc2IDkuMDE0NDIzMDgsMjAuMjAxNDY2MyBDOC43ODY5NzExNSwxOS45OTI5ODA4IDguNzQzODQ2MTUsMTkuODkzODIyMSA4LjU4MTczMDc3LDE5LjY5NjY1ODcgQzguNTgxNzMwNzcsMTkuNjk2NjU4NyA4LjY2NjgyNjkyLDE4LjkwMDkzNzUgMTAuMDk2MTUzOCwxNy4zODg5NjYzIEMxMC42Nzk0OTUyLDE2Ljc3MTg3NSAxMS42MzU2MDEsMTUuOTYxODAyOSAxMi43NjQ0MjMxLDE1LjIyNTUwNDggQzEzLjAyNzkzMjcsMTUuMDUzNjUzOCAxMi45MjY2MTA2LDE1LjM3NjU4NjUgMTMuMTI1LDE1LjUxMzk2NjMgQzEzLjMyMzM4OTQsMTUuNjUxMzQ2MiAxNS4xMTkxMzQ2LDE2LjIzMjgxMjUgMTkuMTgyNjkyMywxNi41MjM1ODE3IiBpZD0iRmlsbC0xNyIgZmlsbD0iI0RFMjQyQiI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="/>
        <span>Tonny&Sunm</span>
      </a></div>
      <ul className="menuTitle">
        {books.map((item, i)=>{
          return <li><a onClick={()=>this.selectBookTitle(item)}>{item}</a></li>  
        })}
      </ul>
    </div>)

    return (
      <Sidebar sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               docked={this.state.sidebarDocked}
               onSetOpen={this.onSetSidebarOpen}
               shadow={false}
               transitions={false}
               touch={true}>
         <Content openDraw={this.openDraw} bookTitle={this.state.bookTitle} />
      </Sidebar>
    );
  }
});

module.exports = App;