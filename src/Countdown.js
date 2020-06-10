import React, { Component } from 'react'

import UnderConstruction from 'react-under-construction';
import 'react-under-construction/build/css/index.css';

import construction from "./construction.png"
import chambery from "./chambery.jpg"

import request from "superagent"
import xss from "xss"

import Timer from "react-date-countdown-timer"
import Danmaku from "danmaku"
import randomColor from "randomcolor"

class Countdown extends Component {

    danmaku

    componentDidMount = () => {
        this.danmaku = new Danmaku({
            container: document.querySelector("#danmaku-screen"),
        })

        request.get("/msg")
            .then(data => {
                data.text.split("\n").forEach(e => {
                    this.danmaku.emit({
                        text: e,
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
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    state = {
        modal: false
    }


    render() {

        return (
            <div className="temp">
                <div id="danmaku-screen"></div>
                <UnderConstruction
                    background={{
                        image: chambery,
                        textColor: '#fff',
                        overlay: {
                            color: '#000',
                            opacity: '.5'
                        }
                    }}
                    logo={{
                        src: construction,
                        alt: '建设中'
                    }}
                    title={{
                        text: "尚贝里学联网站建设中"
                    }}
                    description={{
                        text: (
                            <div>
                                <div>
                                    耽误了一点时间，网站改为在迎新晚会上公布（10月18日 星期五）
                                </div>
                            </div>
                        ),
                        style: {
                            maxWidth: '440px',
                        }
                    }}
                    subscribe={{
                        placeholder: '发送弹幕',
                        buttonText: '发送',
                        onSubmit: (value) => {
                            if (value.length) {
                                request.post("/msg")
                                    .send({ msg: xss(value) })
                                    .end((err, res) => {
                                        if (err) console.log(err)
                                        else {
                                            // this.setState(() => ({ modal: true }))
                                            this.danmaku.emit({
                                                text: xss(value),
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
                            }
                        },
                        buttonStyle: {
                            background: "violet"
                        }
                    }}
                />

                <div className={
                    this.state.modal
                        ? "modal is-active"
                        : "modal"
                }>
                    <div className="modal-background" onClick={() => { this.setState(() => ({ modal: false })) }}></div>
                    <div className="modal-content">
                        <div className="notification">发送成功</div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={() => { this.setState(() => ({ modal: false })) }}></button>
                </div>

            </div>
        )
    }
}

export default Countdown
