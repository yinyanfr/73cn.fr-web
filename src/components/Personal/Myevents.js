import React, { useEffect, useState } from 'react'
import mapUser from "../mapUser"
import {Link} from "react-router-dom"
import request from "superagent"
import Sp2020Form from '../Special/Sp2020Form'

const Myevents = ({user}) => {

    const [sp2020, setSp2020] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(user){
            request.get("/mysp2020")
                .set("x-auth", token)
                .then(res => res.body)
                .then(({notfound}) => {
                    if(notfound){
                        setSp2020(false)
                    }else{
                        setSp2020(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [user])

    return (
        <div>
            <h1 className="title">已报名的活动</h1>
            <h2 className="subtitle">
                本页面用于显示您已报名的活动，更多活动请查看
                <Link to="/events">活动列表</Link>
            </h2>
            <div className="card">
                <div className="card-header">
                    <div className="card-header-title">
                        <Link to="/2020">尚贝里2020年春节联欢会</Link>
                    </div>
                </div>
                <div className="card-content">
                    <div className="content">
                        <Sp2020Form />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default mapUser(Myevents)
