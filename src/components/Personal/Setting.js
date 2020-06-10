import React, { useState } from 'react'
import { useHistory, useLocation, Route } from "react-router-dom"
import signout from './signout'
import useStorage from './useStorage'

const Setting = () => {

    const history = useHistory()
    const location = useLocation()

    const [dev, setDev] = useState(localStorage.getItem("dev") || "false")

    const [hideBack, setHideBack] = useState(localStorage.getItem("hideBack") || "false")
    const [column, setColumn] = useState(localStorage.getItem("column") || "false")
    const [apple, toggleApple] = useStorage("apple")

    console.log(location)
    return (
        <div>
            <nav className="panel">
                <p className="panel-heading">
                    网站设置
                </p>

                <p className="panel-tabs">
                    <a
                        className={
                            location.pathname === "/home/setting"
                                ? "is-active"
                                : ""
                        }
                        onClick={
                            () => {
                                history.push("/home/setting")
                            }
                        }
                    >账号设定</a>
                    <a
                        className={
                            location.pathname === "/home/appsetting"
                                ? "is-active"
                                : ""
                        }
                        onClick={
                            () => {
                                history.push("/home/appsetting")
                            }
                        }
                    >外观设定</a>
                    {
                        dev === "true"
                            ? (
                                <a
                                    className={
                                        location.pathname === "/home/devsetting"
                                            ? "is-active"
                                            : ""
                                    }
                                    onClick={
                                        () => {
                                            history.push("/home/devsetting")
                                        }
                                    }
                                >开发者菜单</a>
                            )
                            : ""
                    }
                </p>

                <Route path="/home/setting">
                    <>
                        <a
                            className="panel-block"
                            onClick={() => {
                                history.push("/home/reset")
                            }}
                        >
                            <span className="panel-icon">
                                <i className="fas fa-key" aria-hidden="true"></i>
                            </span>
                            修改密码
                        </a>

                        <label className="panel-block">
                            <input
                                type="checkbox"
                                checked={dev === "true"}
                                onChange={() => {
                                    if (dev === "false") {
                                        localStorage.setItem("dev", "true")
                                        setDev("true")
                                    } else {
                                        localStorage.setItem("dev", "false")
                                        setDev("false")
                                    }
                                }}
                            />
                            我是开发者，请向我显示开发者菜单
                        </label>

                        <div className="panel-block">

                            <button
                                className="button is-link is-outlined is-fullwidth"
                                onClick={() => {
                                    signout()
                                    history.push("/")
                                }}
                            >
                                <a href="#">
                                    退出登录
                                </a>
                            </button>
                        </div>
                    </>
                </Route>

                <Route path="/home/appsetting">
                    <>
                        <label className="panel-block">
                            <input 
                                type="checkbox"
                                checked={hideBack === "true"}
                                onChange={() => {
                                    if (hideBack === "false") {
                                        localStorage.setItem("hideBack", "true")
                                        setHideBack("true")
                                    } else {
                                        localStorage.setItem("hideBack", "false")
                                        setHideBack("false")
                                    }
                                }}
                            />
                            隐藏手机版界面顶端的“返回”按钮，我的手机上已经有返回键了
                            （该按钮和手机上的返回键用途完全相同）
                        </label>

                        <label className="panel-block">
                            <input 
                                type="checkbox"
                                checked={apple}
                                onChange={toggleApple}
                            />
                            “返回”按钮在我的设备无效（已知：桌面版safari），
                            将其改为“返回主屏”（点击后返回个人中心主页）
                        </label>

                        <label className="panel-block">
                            <input 
                                type="checkbox"
                                checked={column === "true"}
                                onChange={() => {
                                    if (column === "false") {
                                        localStorage.setItem("column", "true")
                                        setColumn("true")
                                    } else {
                                        localStorage.setItem("column", "false")
                                        setColumn("false")
                                    }
                                }}
                            />
                            电脑版界面下，把页面布局从左右更换为上下
                        </label>
                    </>
                </Route>


                <Route path="/home/devsetting">
                    <>
                        <a className="panel-block">
                            <span className="panel-icon">
                                <i className="fas fa-atlas" aria-hidden="true"></i>
                            </span>
                            API Key 申请
                                </a>

                        <a className="panel-block">
                            <span className="panel-icon">
                                <i className="fas fa-layer-group" aria-hidden="true"></i>
                            </span>
                            API 文档
                                </a>

                        <a className="panel-block">
                            <span className="panel-icon">
                                <i className="fas fa-road" aria-hidden="true"></i>
                            </span>
                            Roadmap
                                </a>

                        <a className="panel-block">
                            <span className="panel-icon">
                                <i className="fas fa-code" aria-hidden="true"></i>
                            </span>
                            参与网站开发
                                </a>

                        <a className="panel-block">
                            <span className="panel-icon">
                                <i className="fab fa-js-square" aria-hidden="true"></i>
                            </span>
                            JavaScript 基础测试题
                                </a>
                    </>
                </Route>
            </nav>
            
            <Route path="/home/appsetting">
                <p>对外观的修改保存在设备上，请刷新页面查看效果</p>
            </Route>

            <Route path="/home/devsetting">
                <p>开发者工具准备中，请稍后再来</p>
            </Route>
        </div>
    )
}

export default Setting
