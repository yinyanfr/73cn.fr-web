import React, { useState, useEffect } from 'react'
import request from "superagent"

const AddCompte = ({ modify, compteId, onFinish }) => {

    const [name, setName] = useState("")
    const [balance, setBalance] = useState("")
    const [currency, setCurrency] = useState("EUR")

    const [status, setStatus] = useState("ready")

    const isReady = (
        status === "ready"
        && name.length
        && !Number.isNaN(parseFloat(balance))
        && currency.length
    )

    useEffect(() => {
        if(modify){
            const token = localStorage.getItem('token')
            request.get(`/compte/${compteId}`)
                .set("x-auth", token)
                .then(res => res.body)
                .then(({name, balance, currency}) => {
                    setName(name)
                    setBalance(balance)
                    setCurrency(currency)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [compteId])

    const submit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (isReady) {
            setStatus("pending")
            request[modify ? "patch" : "post"]("/compte")
                .set("x-auth", token)
                .send({ name, balance, currency, compteId })
                .then(() => {
                    setStatus("success")
                    setTimeout(() => {
                        onFinish()
                    }, 1000)
                })
                .catch(err => {
                    setStatus("fail")
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <h2 className="subtitle">{modify ? "编辑账簿信息" : "新建账簿"}</h2>
            <div className="field">
                <label className="label">账簿名</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        value={name}
                        onChange={e => {
                            setName(e.target.value)
                        }}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">余额</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="请设定余额"
                        value={balance}
                        onChange={e => {
                            setBalance(e.target.value)
                        }}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">币种</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        value={currency}
                        onChange={e => {
                            setCurrency(e.target.value)
                        }}
                    />
                </div>
                <p className="help">使用币种的字母简称来标记，常用币种：EUR 欧元，CNY 人民币，USD 美元</p>
            </div>

            <div className="field is-grouped">
                <div className="control" onClick={submit}>
                    <button className="button is-link" disabled={!isReady}>
                        提交
                    </button>
                </div>

                <div className="control" onClick={onFinish}>
                    <button className="button is-link is-light">
                        取消
                    </button>
                </div>
            </div>

            {
                status === "success"
                ? (
                    <div className="notification is-success">
                        发送成功
                    </div>
                )
                : ""
            }

            {
                status === "fail"
                ? (
                    <div className="notification is-warning">
                        发送失败
                    </div>
                )
                : ""
            }
        </div>
    )
}

export default AddCompte
