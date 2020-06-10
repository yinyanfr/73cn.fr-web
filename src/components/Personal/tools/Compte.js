import React, { useState, useEffect } from 'react'
import mapUser from "../../mapUser"
import request from "superagent"
import Select from "react-select"
import AddCompte from './AddCompte'
import categories from "./categories.json"
import AddPayment from './AddPayment'

const sum = (payments) => {
    let res = 0
    payments.forEach(e => {
        res += parseFloat(e.amount)
    })
    return res
}

const Compte = ({ user }) => {

    const [ready, setReady] = useState(false)
    const [mycomptes, setMycomptes] = useState([])

    const [status, setStatus] = useState("ready")

    const [addcompte, setaddCompte] = useState(false)
    const [modifycompte, setModifycompte] = useState(null)

    const [danger, setDanger] = useState(false)

    const updateMycomptes = () => {
        const token = localStorage.getItem("token")
        return request.get("/mycomptes")
            .set("x-auth", token)
            .then(res => res.body)
            .then(data => {
                console.log(data)
                setMycomptes(data)
                setReady(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteCompte = (compteId) => {
        const token = localStorage.getItem("token")
        return request.delete("/compte")
            .set("x-auth", token)
            .send({ compteId })
            .then(() => {
                setStatus("success")
            })
            .catch(err => {
                setStatus("fail")
                console.log(err)
            })
    }

    const loadPayments = (compteId) => {
        const token = localStorage.getItem("token")
        return request.get(`/payments/${compteId}`)
            .set("x-auth", token)
            .then(res => res.body)
            .then(data => {
                setMycomptes(prev => {
                    const res = []
                    prev.forEach(e => {
                        if (e._id === compteId) {
                            res.push({
                                ...e,
                                payments: data
                            })
                        }
                        else {
                            res.push(e)
                        }
                    })
                    return res
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        updateMycomptes()
    }, [])

    return (
        <div>
            <h1 className="title">记账Beta</h1>
            <h2 className="subtitle">简明的记账应用，欢迎尝试</h2>

            {
                ready && mycomptes.length
                    ? (
                        <div>
                            <AddPayment
                                comptes={mycomptes}
                                onFinish={() => {

                                }}
                            />
                            <hr />
                        </div>
                    )
                    : ""
            }
            <div id="addcompte">
                <div className="field">
                    <a href="#addcompte">
                        <div className="control">
                            <button
                                className="button is-primary"
                                onClick={() => {
                                    setaddCompte(true)
                                }}
                            >添加账簿</button>
                        </div>
                    </a>
                </div>

                {
                    addcompte
                        ? (
                            <AddCompte onFinish={() => {
                                setaddCompte(false)
                                updateMycomptes()
                            }} />

                        )
                        : ""
                }

                {
                    modifycompte
                        ? (
                            <AddCompte
                                modify
                                compteId={modifycompte}
                                onFinish={() => {
                                    setModifycompte(null)
                                    updateMycomptes()
                                }}
                            />
                        )
                        : ""
                }
            </div>

            {
                status === "success"
                    ? (
                        <div className="notification is-success">
                            操作成功
                    </div>
                    )
                    : ""
            }

            {
                status === "fail"
                    ? (
                        <div className="notification is-warning">
                            操作失败
                        </div>
                    )
                    : ""
            }

            {
                mycomptes.map((e, i) => (
                    <div key={i} className="card compte-card">
                        <header className="card-header">
                            <p className="card-header-title">
                                账簿信息
                            </p>
                            <a
                                href="#"
                                className="card-header-icon"
                                aria-label="delete this"
                                onClick={() => {
                                    setDanger(e._id)
                                }}
                            >
                                <span className="icon">
                                    <i className="delete" aria-hidden="true"></i>
                                </span>
                            </a>
                        </header>
                        <div className="card-content">
                            <h1 className="title">{e.name}</h1>
                            <h2 className="subtitle">币种：{e.currency}</h2>
                            <div className="content">


                                {
                                    e.payments
                                        ? (
                                            <>
                                                <h1 className="title">余额：{
                                                    e.balance - sum(e.payments)
                                                }</h1>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>数额</th>
                                                            <th>类别</th>
                                                            <th>备注</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            e.payments.map((e, i) => (
                                                                <tr key={i}>
                                                                    <td>{parseFloat(e.amount) * -1}</td>
                                                                    <td>
                                                                        {
                                                                            categories
                                                                                .find(el => el.value === e.category)
                                                                                .label
                                                                        }
                                                                    </td>
                                                                    <td>{e.remarks}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </>
                                        )
                                        : ""
                                }
                            </div>
                        </div>
                        <footer className="card-footer">
                            <a
                                className="card-footer-item"
                                onClick={() => {
                                    loadPayments(e._id)
                                }}
                            >显示明细</a>
                            <a
                                href="#addcompte"
                                className="card-footer-item"
                                onClick={() => {
                                    setModifycompte(e._id)
                                }}
                            >编辑信息</a>
                        </footer>
                    </div>
                ))
            }

            {
                ready && !mycomptes.length
                    ? <p className="help">欢迎来到记账，点击“添加账簿”按钮建立一个新的账簿。</p>
                    : ""
            }

            {
                ready
                    ? ""
                    : <p>加载中</p>
            }

            <div className={
                danger
                    ? "modal is-active"
                    : "modal"
            }>
                <div
                    className="modal-background"
                    onClick={() => {
                        setDanger(null)
                    }}
                ></div>
                <div className="modal-content">
                    <div className="notification">
                        <h1 className="title">提示</h1>
                        <h2 className="subtitle">删除账簿的操作不可逆，您确定要继续吗？</h2>
                        <div className="danger-buttons">
                            <button
                                className="button is-danger"
                                onClick={() => {
                                    deleteCompte(danger).then(() => {
                                        setDanger(null)
                                        updateMycomptes()
                                    })
                                        .catch(() => {
                                            setDanger(null)
                                        })
                                }}
                            >删除</button>
                            <button
                                className="button is-text is-light"
                                onClick={() => {
                                    setDanger(null)
                                }}
                            >取消</button>
                        </div>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={() => {
                        setDanger(null)
                    }}
                ></button>
            </div>
        </div >
    )
}

export default mapUser(Compte)
