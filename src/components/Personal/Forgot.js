import React, { Component } from 'react'
import request from "superagent"
import validator from "validator"

class Forgot extends Component {

    state = {
        email: "",
        sending: false,
        err: false,
        success: false
    }

    onEmail = e => {
        const { value } = e.target
        this.setState(() => ({
            email: value
        }))
    }

    onSubmit = e => {
        e.preventDefault()
        const { email } = this.state
        this.setState(() => ({
            sending: false
        }))
        if (validator.isEmail(email)) {
            request.post("/iforgot")
                .send({ email })
                .end((err, res) => {
                    if (err) {
                        this.setState(() => ({
                            err: true,
                            sending: false
                        }))
                    }
                    else {
                        this.setState(() => ({
                            success: true,
                            sending: false
                        }))
                    }
                })
        }
    }

    render() {

        return (
            <div>
                <h1 className="title">重设密码</h1>
                <p>
                    您的密码在服务器中以加密的形式保存，所以为了找回密码，
                    请重设密码。
                <br />
                    请输入您用于注册尚贝里学联ID的电子邮件地址，
                    一封包含修改密码的链接的邮件将会发送到您的邮箱中，
                    收到链接后请尽快修改您的密码，
                    若您始终未收到邮件，请检查垃圾箱。
                <br />
                    本功能每ip每24小时只能使用一次，若您始终未收到邮件，
                    或有任何其他问题，请与我联系。
                </p>
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
                                !validator.isEmail(this.state.email)
                            }
                            onClick={this.onSubmit}
                        >发送</button>
                    </div>
                </div>

                {
                    this.state.err
                        ? (
                            <div className="notification is-warning">
                                未能成功发送请求，请检查您输入的电子邮件地址。
                            </div>
                        )
                        : ""
                }

                {
                    this.state.success
                        ? (
                            <div className="notification is-primary">
                                已发送包含重置密码链接的邮件，请尽快修改密码，没有收到邮件的情况请检查邮箱。
                            </div>
                        )
                        : ""
                }
            </div>
        )
    }
}

export default Forgot
