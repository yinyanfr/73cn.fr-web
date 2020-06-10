import React, { useEffect, useState } from 'react'
import request from "superagent"
import randomColor from "randomcolor"

const Danmakulist = () => {

    const [msg, setMsg] = useState([])

    useEffect(() => {
        request.get("/msg")
            .then(res => res.text)
            .then(data => {
                setMsg(data.split("\n"))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h1 className="title">弹幕管理</h1>
            <div className="admin-danmaku-wrapper">
                {
                    msg.reverse().map((e, i) => (
                        <div 
                        key={i} 
                        className="admin-danmaku"
                        style={
                            {
                                color: randomColor()
                            }
                        }
                        >{e}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default Danmakulist
