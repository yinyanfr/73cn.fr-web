import React, { useEffect, useState } from 'react'
import request from "superagent"

const sum = l => {
    let res = 0
    l.forEach(e => {
        res += parseInt(e.number)
    })
    return res
}

const Sp2020Admin = () => {

    const [list, setList] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        request.get("/allsp2020")
            .set("x-auth", token)
            .then(res => res.body)
            .then(data => {
                setList(data)
                // console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h1 className="title">2020年春晚报名统计</h1>
            <p>报名人数：{list.length ? sum(list) : "加载中"}</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((e, i) => (
                            <tr key={i}>
                                <td>{e.name}</td>
                                <td>{e.number}</td>
                                <td>{e.userId ? e.userId.email : "Anonymous"}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Sp2020Admin
