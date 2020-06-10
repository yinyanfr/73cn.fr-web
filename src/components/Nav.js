import React, { Component } from 'react'
import mapUser from "./mapUser"
import { withRouter } from "react-router-dom"
import u from "../u.png"

class Nav extends Component {

    // componentDidMount = () => {
    //     console.log(this.props.match)
    // }

    state = {
        burger: false
    }

    onBurger = e => {
        e.preventDefault()
        this.setState(prev => ({
            burger: !prev.burger
        }))
    }

    onHome = e => {
        e.preventDefault()
        this.props.history.push("/home")
    }

    goto = where => e => {
        e.preventDefault()
        this.props.history.push(where)
    }

    render() {

        return (
            <nav
                className={
                    this.props.transparent
                        ? "navbar transparent"
                        : "navbar shadowed"
                }
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item" href="#" onClick={this.goto("/")}>
                        <img src={u} width="128" height="50" />
                    </a>

                    <a
                        role="button"
                        className={
                            this.state.burger
                                ? "navbar-burger burger is-active"
                                : "navbar-burger burger"
                        }
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        onClick={this.onBurger}
                    >
                        <span aria-hidden="true" className={
                            this.props.match.path === "/home"
                                ? ""
                                : "is-white"
                        }></span>
                        <span aria-hidden="true" className={
                            this.props.match.path === "/home"
                                ? ""
                                : "is-white"
                        }></span>
                        <span aria-hidden="true" className={
                            this.props.match.path === "/home"
                                ? ""
                                : "is-white"
                        }></span>
                    </a>
                </div>

                {
                    this.state.burger
                        ? (
                            <div
                                className={this.state.burger ? "navbar-menu is-active" : "navbar-menu"}
                                onClick={this.onBurger}
                            >
                                <div className="navbar-end main-burger">
                                    <a className="navbar-item" href="#" onClick={this.goto("/")}>主页</a>
                                    <a className="navbar-item" href="#" onClick={this.goto("/home")}>{
                                        this.props.user
                                            ? "个人中心"
                                            : "登录"
                                    }</a>
                                    <a className="navbar-item" href="#" onClick={this.goto("/hp")}>健康包</a>
                                    <a className="navbar-item" href="#" onClick={this.goto("/health")}>防疫专题</a>
                                    <a className="navbar-item" href="#" onClick={this.goto("/news")}>新闻</a>
                                    <a className="navbar-item" href="#" onClick={this.goto("/events")}>活动</a>
                                    <a className="navbar-item" href="#" onClick={this.goto("/comments")}>留言板</a>
                                    <a className="navbar-item" href="#" onClick={this.goto("/gallery")}>相簿</a>
                                    <a className="navbar-item" onClick={this.goto("/contact")}>
                                        联系我们
                                    </a>
                                </div>
                            </div>
                        )
                        : ""
                }

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className={
                            this.props.transparent && window.innerWidth >= 770
                                ? "navbar-item is-white"
                                : "navbar-item"
                        }
                            onClick={this.goto("/")}
                        >
                            主页
                        </a>

                        <a className={
                            this.props.transparent && window.innerWidth >= 770
                                ? "navbar-item is-white"
                                : "navbar-item"
                        }
                            onClick={this.goto("/hp")}
                        >
                            健康包
                        </a>

                        <a className={
                            this.props.transparent && window.innerWidth >= 770
                                ? "navbar-item is-white"
                                : "navbar-item"
                        }
                            onClick={this.goto("/health")}
                        >
                            防疫专题
                        </a>

                        <a className={
                            this.props.transparent && window.innerWidth >= 770
                                ? "navbar-item is-white"
                                : "navbar-item"
                        }
                            onClick={this.goto("/news")}
                        >
                            新闻
                        </a>

                        <a className={
                            this.props.transparent && window.innerWidth >= 770
                                ? "navbar-item is-white"
                                : "navbar-item"
                        }
                            onClick={this.goto("/events")}
                        >
                            活动
                        </a>

                        <a className={
                            this.props.transparent && window.innerWidth >= 770
                                ? "navbar-item is-white"
                                : "navbar-item"
                        }
                            onClick={this.goto("/comments")}
                        >
                            留言板
                        </a>

                        <a className={
                            this.props.transparent && window.innerWidth >= 770
                                ? "navbar-item is-white"
                                : "navbar-item"
                        }
                            onClick={this.goto("/gallery")}
                        >
                            相簿
                        </a>

                        <a className={
                            this.props.transparent && window.innerWidth >= 770
                                ? "navbar-item is-white"
                                : "navbar-item"
                        } onClick={this.goto("/contact")}
                        >
                            联系我们
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {
                                    this.props.user
                                        ? (
                                            <a
                                                className="button is-primary"
                                                onClick={this.onHome}
                                            >
                                                <strong>个人主页</strong>
                                            </a>
                                        )
                                        : (
                                            <span>
                                                <a className="button is-primary" onClick={this.goto("/register")}>
                                                    <strong>注册</strong>
                                                </a>
                                                <a className="button is-primary is-light" onClick={this.goto("/login")}>
                                                    登录
                                            </a>
                                            </span>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(mapUser(Nav))
