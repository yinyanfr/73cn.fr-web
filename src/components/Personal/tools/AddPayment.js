import React, { useState, useEffect } from 'react'
import request from "superagent"
import Select from 'react-select'

import categories from "./categories.json"

const AddPayment = ({ modify, paymentId, comptes, onFinish }) => {

    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState(null)
    const [remarks, setRemarks] = useState("")
    const [compte, setCompte] = useState(
        comptes.length
            ? { value: comptes[0]._id, label: comptes[0].name }
            : null
    )
    const compteId = compte ? compte.value : ""

    const [status, setStatus] = useState("ready")

    const isReady = (
        status !== "pending"
        && !Number.isNaN(parseFloat(amount))
        && category
        && compteId
    )

    useEffect(() => {
        if (modify) {
            const token = localStorage.getItem('token')
            request.get(`/payment/${paymentId}`)
                .set("x-auth", token)
                .then(res => res.body)
                .then(({ amount, category, remarks }) => {
                    setAmount(amount)
                    setCategory(category)
                    setRemarks(remarks)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [paymentId])

    const submit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (isReady) {
            setStatus("pending")
            request[modify ? "patch" : "post"]("/payment")
                .set("x-auth", token)
                .send({
                    amount, category: category.value,
                    remarks, compteId, paymentId
                })
                .then(() => {
                    setStatus("success")
                    setTimeout(() => {
                        setAmount("")
                        setCategory(null)
                        setRemarks("")
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
            <h2 className="subtitle">{modify ? "编辑支出信息" : "新建支出"}</h2>

            <div className="field">
                <label className="label">账簿</label>
                <div className="control">
                    <Select
                        options={comptes.map(({ name, _id }) => ({
                            value: _id,
                            label: name
                        }))}
                        value={compte}
                        onChange={c => {
                            setCompte(c)
                        }}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">数额</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        value={amount}
                        onChange={e => {
                            setAmount(e.target.value)
                        }}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">类别</label>
                <div className="control">
                    <Select
                        options={categories}
                        value={category}
                        onChange={c => {
                            setCategory(c)
                        }}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">备注</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        value={remarks}
                        onChange={e => {
                            setRemarks(e.target.value)
                        }}
                    ></textarea>
                </div>
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

export default AddPayment
