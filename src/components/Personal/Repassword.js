import React, { Component } from 'react'
import mapUser from "../mapUser"
import {withRouter} from "react-router-dom"
import request from "superagent"

const betterPassword = password => (
    password.length >= 8
    && /[0-9]/.test(password)
    && /[A-Z]/.test(password)
)

class Repassword extends Component {

    state = {
        password: "",
        repassword: "",
        sending: false,
        err: false,
        success: false
    }

    onPassword = which => e => {
        const {value} = e.target
        this.setState(() => ({
            [which]: value
        }))
    }

    // componentDidMount = () => {
    //     const token = localStorage.getItem("token") || this.props.match.params.jwt
    //     console.log(token, this.props.match)
    // }

    onSubmit = e => {
        e.preventDefault()
        const token = localStorage.getItem("token") || this.props.match.params.jwt
        console.log(token)
        const {password} = this.state
        request.post("/repassword")
            .set("x-auth", token)
            .send({password})
            .end((err, res) => {
                if(err){
                    this.setState(() => ({
                        err: true,
                        sending: false
                    }))
                }else{
                    this.props.dispatch({
                        type: "DELETEUSER"
                    })
                    localStorage.removeItem("token")
                    this.setState(() => ({
                        success: true,
                        sending: false
                    }))
                    setTimeout(() => {
                        this.props.history.push("/home")
                    }, 3000)
                }
            })
    }

    render() {

        return (
            <div>
                <h1 className="title">重设密码</h1>
                <article className="message is-info">
                    <div className="message-header">
                        为什么重设密码时，要求更高的密码复杂度？
                    </div>
                    <div className="message-body">
                        <p>为了您的账号安全，请使用高复杂度的密码，请使用未于他处使用过的密码</p>
                        <br />
                        <p>高强度的密码更加难以破解，建议您使用包含大小写字母，数字和特殊符号，且长度超过10个字符的密码，
                        部分浏览器和安全工具提供自动生成高强度密码的功能。</p>
                        <p>修改密码之后，所有已登录本网站的设备的登录状态会立即自动失效。</p>
                        <p><b></b></p>
                        <br />
                        <p>若您认为您的ID或操作环境存在安全问题，请与学联联系。</p>
                    </div>
                </article>

                <div className="field">
                    <label className="label">新密码</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className={
                                betterPassword(this.state.password)
                                ? "input is-success"
                                : "input"
                            }
                            type="password"
                            placeholder="请输入新密码(至少8个字符，包含至少一个大写字母和一个数字)"
                            onChange={this.onPassword("password")}
                            value={this.state.password}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-key"></i>
                        </span>
                        {
                            betterPassword(this.state.password)
                                ? (
                                    <span className="icon is-small is-right">
                                        <i className="fas fa-check"></i>
                                    </span>
                                )
                                : ""
                        }
                    </div>
                    <p className="help">请使用安全的密码，长度不少于8且至少一个大写字母和一个数字</p>
                </div>

                <div className="field">
                    <label className="label">确认密码</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className={
                                this.state.password === this.state.repassword && this.state.password.length
                                ? "input is-success"
                                : "input"
                            }
                            type="password"
                            placeholder="请再次输入新密码"
                            onChange={this.onPassword("repassword")}
                            value={this.state.repassword}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-key"></i>
                        </span>
                        {
                            this.state.password === this.state.repassword
                                ? (
                                    <span className="icon is-small is-right">
                                        <i className="fas fa-check"></i>
                                    </span>
                                )
                                : ""
                        }
                    </div>
                    <p className="help">请使用安全的密码，长度不少于8且至少一个大写字母和一个数字</p>
                </div>

                <div className="field">
                    <div className="control">
                        <button
                            className={
                                this.state.sending
                                    ? "button is-link is-loading"
                                    : "button is-link"
                            }
                            disabled={
                                !betterPassword(this.state.password)
                                || this.state.password !== this.state.repassword
                            }
                            onClick={this.onSubmit}
                        >更新</button>
                    </div>
                </div>

                {
                    this.state.err
                        ? (
                            <div className="notification is-warning">
                                未能成功修改密码，请稍后再试。
                            </div>
                        )
                        : ""
                }

                {
                    this.state.success
                        ? (
                            <div className="notification is-primary">
                                已成功修改您的密码，请重新登录，页面即将跳转。
                            </div>
                        )
                        : ""
                }
            </div>
        )
    }
}

export default withRouter(mapUser(Repassword))
