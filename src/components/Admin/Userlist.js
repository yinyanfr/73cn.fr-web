import React, { useState, useEffect } from 'react'
import request from "superagent"

const Userlist = () => {

    const [users, setUsers] = useState({ userlist: [], infolist: [] })

    useEffect(() => {
        const token = localStorage.getItem("token")
        request.get("/userlist")
            .set("x-auth", token)
            .then(res => res.body)
            .then((data) => {
                setUsers(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h1 className="title">用户列表</h1>
            <h2 className="subtitle">已注册用户数：{users.userlist.length}</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>realname</th>
                        <th>phone</th>
                        <th>school</th>
                        <th>major</th>
                        <th>grade</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.userlist.map((e, i) => (

                            <tr key={i}>
                                <td>{e.email}</td>
                                {
                                    ((found) => {
                                        if (found) {
                                            return (
                                                <>
                                                    <td>{found.realname || ""}</td>
                                                    <td>{found.phone || ""}</td>
                                                    <td>{found.school || ""}</td>
                                                    <td>{found.major || ""}</td>
                                                    <td>{found.grade || ""}</td>
                                                </>
                                            )
                                        }
                                        return (
                                            <>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </>
                                        )
                                    })(users.infolist.find(element => element.userId._id === e._id))
                                }
                            </tr>


                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Userlist
