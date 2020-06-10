import React, { useState, useEffect } from 'react'
import request from "superagent"
import mapUser from "../mapUser"
import { Link } from "react-router-dom"

const Sp2020Form = ({ user }) => {

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (user) {
            request.get("/mysp2020")
                .set("x-auth", token)
                .then(res => res.body)
                .then(({ name, number, notfound }) => {
                    if (!notfound) {
                        setName(name)
                        setNumber(number)
                        setFound(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [user])

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [sending, setSending] = useState("ready")
    const [found, setFound] = useState(false)

    // const history = useHistory()

    const isSubmitReady = (
        name.length
        && number >= 1
        && sending !== "pending"
    )

    const onSubmit = e => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (isSubmitReady) {
            setSending("pending")
            request[found ? "patch" : "post"]("/sp2020")
                .set("x-auth", token)
                .send({name, number})
                .then(res => {
                    setSending("success")
                })
                .catch(err => {
                    console.log(err)
                    setSending("fail")
                })

        }

    }

    return (
        <div>
            {
                user
                    ? ""
                    : (
                        <p className="sp2020-font125">
                            您尚未登录，建议您
                            <Link to="/login">登录</Link>
                            或
                            <Link to="/register">注册</Link>
                            后填写该表格</p>
                    )
            }
            {
                found
                ? (
                    <div className="notification is-info">
                        您已报名，您可以修改您的报名信息
                        <br />
                        Votre reservation est bien enregistrée, vous pouvez la modifier.
                    </div>
                )
                : ""
            }
            <div className="field">
                <label className="label">您的姓名 / Votre Nom</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="您的姓名 / Votre Nom"
                        value={name}
                        onChange={e => {
                            setName(e.target.value)
                        }}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">参加人数 / Nombre de Personnes</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="参加人数 / Nombre de Personnes"
                        value={number}
                        onChange={e => {
                            const { value } = e.target
                            const parsed = parseInt(value)
                            if (value === "" || !Number.isNaN(parsed)) {
                                setNumber(value === "" ? value : parsed)
                            }
                        }}
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button
                        className={
                            sending === "pending"
                            ? "button is-primary is-loading"
                            : "button is-primary"
                        }
                        onClick={onSubmit}
                        disabled={!isSubmitReady}
                    >
                        Submit
                    </button>
                </div>
            </div>

            {
                sending === "success"
                ? (
                    <div className="notification is-primary">
                        发送成功 / Votre reservation est bien enregistrée
                    </div>
                )
                : ""
            }

            {
                sending === "fail"
                ? (
                    <div className="notification is-warning">
                        发送失败 / Une erreur. Veuillez réessayer.
                    </div>
                )
                : ""
            }
        </div>
    )
}

export default mapUser(Sp2020Form)
