import React, { Component } from 'react'
import mapUser from "./mapUser"
import validator from "validator"
import request from "superagent"
import { withRouter, Link } from "react-router-dom"

class Account extends Component {

    componentDidMount = () => {
        if (this.props.register) {
            this.setState(() => (
                {
                    mode: "register"
                }
            ))
        } else {
            this.setState(() => ({
                mode: "login"
            }))
        }
    }

    state = {
        email: "",
        password: "",
        mode: "",
        err: false,
        success: false,
        sending: false
    }

    onEmail = e => {
        const email = e.target.value
        this.setState(() => ({ email }))
    }

    onPassword = e => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

    onSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state
        if (validator.isEmail(email)
            && password.length >= 6
            && !this.state.sending
        ) {
            this.setState(() => ({
                sending: true
            }))
            request.post(
                this.state.mode === "register"
                    ? "/register"
                    : "/login"
            ).send({ email, password })
                .end((err, res) => {
                    console.log(res)
                    if (err) {
                        console.log(err)
                        if (this.state.mode === "register") {
                            this.setState(() => ({
                                err: true,
                                sending: false
                            }))
                        }
                        else {
                            this.setState(() => ({
                                err: true,
                                sending: false
                            }))
                        }
                    }
                    else {
                        const {token, _id, email} = res.body
                        localStorage.setItem("token", token)

                        request.get("/myinfo")
                            .set("x-auth", token)
                            .end((err, res) => {
                                if(err){
                                    console.log(err)
                                }
                                // still
                                this.props.dispatch({
                                    type: "SETUSER",
                                    data: {
                                        _id, email,
                                        info: res.body
                                    }
                                })
                            })
                        
                    }
                })
        }
    }

    onCancel = e => {
        e.preventDefault()
        this.props.history.push(this.props.returnTo || "/")
    }

    onMode = which => e => {
        e.preventDefault()
        this.setState(() => ({mode: which}))
    }

    render() {

        return (
            <div>

                <div className="tabs">
                    <ul>
                        <li
                            className={
                                this.state.mode !== "register"
                                    ? "is-active"
                                    : ""
                            }
                            onClick={this.onMode("login")}
                        ><a>登录</a></li>
                        <li
                            className={
                                this.state.mode === "register"
                                    ? "is-active"
                                    : ""
                            }
                            onClick={this.onMode("register")}
                        ><a>注册</a></li>
                    </ul>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            type="email"
                            placeholder="请输入您的电子邮件地址"
                            onChange={this.onEmail}
                            value={this.state.email}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                    <p className="help">请填写真实电子邮箱地址，若您忘记密码，可以通过邮箱找回。</p>
                </div>

                <div className="field">
                    <label className="label">密码</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            type="password"
                            placeholder={
                                this.state.mode === "register"
                                ? "请输入您的密码(至少6个字符)"
                                : "请输入您的密码"
                            }
                            onChange={this.onPassword}
                            value={this.state.password}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-key"></i>
                        </span>
                    </div>
                    <p className="help">密码长度至少6个字符，为了您的账号安全，请选用安全性高的复杂密码。</p>
                </div>

                <div><Link to="/forgot">忘记密码</Link></div>

                <div className="field is-grouped">
                    <div className="control">
                        <button
                            className={
                                this.state.sending
                                    ? "button is-link is-loading"
                                    : "button is-link"
                            }
                            disabled={
                                !validator.isEmail(this.state.email)
                                || this.state.password.length < 6
                                || this.state.sending
                            }
                            onClick={this.onSubmit}
                        >{
                            this.state.mode === "register"
                            ? "注册"
                            : "登录"
                        }</button>
                    </div>
                    {
                        this.props.returnTo
                            ? (
                                <div className="control">
                                    <button
                                        className="button is-text"
                                        onClick={this.onCancel}
                                    >取消</button>
                                </div>
                            )
                            : ""
                    }
                </div>

                {
                    this.state.err
                        ? (
                            <div className="notification is-warning">
                                {
                                    this.state.mode === "register"
                                    ? "处理您的注册请求时出错，您使用的邮件地址可能已被注册。"
                                    : `处理您的登录请求时出错，请检查您输入的邮件地址和密码。`
                                }
                            </div>
                        )
                        : ""
                }

                {
                    this.state.success
                        ? (
                            <div className="notification is-primary">
                                {`${(this.state.mode === "register"
                                    ? "注册"
                                    : "登录")}成功，即将跳转回原页面`}
                            </div>
                        )
                        : ""
                }

            </div>
        )
    }
}

export default withRouter(mapUser(Account))
