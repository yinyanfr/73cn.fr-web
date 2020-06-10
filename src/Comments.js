import React, { Component } from 'react'

import request from "superagent"
import xss from "xss"

import Danmaku from "danmaku"
import randomColor from "randomcolor"
import Goto from './components/Goto'

class Comments extends Component {

    danmaku
    pendingTimeout

    state = {
        text: "",
        pending: false
    }

    componentDidMount = () => {
        this.danmaku = new Danmaku({
            container: document.getElementById("danmaku-container")
        })

        request.get("/msg")
            .then(data => {
                const list = data.text.split("\n")
                for (let i = 0; i < list.length; i++) {
                    setTimeout(() => {
                        this.danmaku.emit({
                            text: list[i],
                            style: {
                                color: randomColor({ luminosity: "light" }),
                                fontSize: "30px",
                                opacity: 0.9,
                                speed: 0.5,
                                font: "Arial",
                                fontWeight: "bold",
                                textShadow: '10px 0px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)'
                            }
                        })
                    }, 300 * i)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    onText = e => {
        const { value } = e.target
        this.setState(() => ({
            text: value
        }))
    }

    onEnter = e => {
        if (e.keyCode === 13) {
            this.onSubmit()
        }
    }

    onSubmit = e => {
        if (e) {
            e.preventDefault()
        }
        const text = xss(this.state.text)
        this.setState(() => ({
            text: ""
        }))

        if (this.state.text.length && !this.state.pending) {
            request.post("/msg")
                .send({ msg: text })
                .end((err, res) => {
                    if (err) console.log(err)
                    else {
                        // this.setState(() => ({ modal: true }))
                        this.danmaku.emit({
                            text,
                            style: {
                                color: randomColor({ luminosity: "light" }),
                                fontSize: "30px",
                                opacity: 0.9,
                                speed: 0.5,
                                font: "Arial",
                                fontWeight: "bold",
                                border: "1px solid white"
                            }
                        })
                    }
                })

            this.setState(() => ({
                pending: true
            }), () => {
                setTimeout(() => {
                    this.pendingTimeout = this.setState(()=> ({pending: false}))
                }, 2000)
            })
        }
    }

    componentWillUnmount = () => {
        clearTimeout(this.pendingTimeout)
    }

    render() {

        return (
            <div>
                <div id="danmaku-container"></div>
                <div className="field">
                    <div className={
                        window.innerWidth >= 700
                            ? "control half-width flrow"
                            : "control almost-width flrow"
                    }>
                        <input
                            className="input transparent is-white"
                            type="text"
                            placeholder="发送弹幕"
                            value={this.state.text}
                            onChange={this.onText}
                            onKeyDown={this.onEnter}
                        />

                        <button
                            className={
                                this.state.pending
                                ? "button is-primary is-light is-loading"
                                : "button is-primary is-light"
                            }
                            onClick={this.onSubmit}
                        >发送</button>
                    </div>
                </div>

                <article className="message is-info almost-width">
                    <div className="message-header">
                        <div>什么是弹幕</div>
                    </div>
                    <div className="message-body">
                        传统意义上的留言板正在制作中，正式上线之前暂时以弹幕的形式代替。
                        您发送的弹幕会显示并留存在屏幕上。
                        若您有事要找学联，请<Goto to="/contact">联系我们</Goto>
                    </div>
                </article>
            </div>
        )
    }
}

export default Comments
