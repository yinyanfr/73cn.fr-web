import React, { useState, useEffect } from 'react'
import request from "superagent"
import { Cashify } from "cashify"
import Noti from '../../Noti'
import Select from "react-select"

const Currency = () => {

    const [ammounts, setAmmounts] = useState((() => {
        const local = localStorage.getItem("currencies")
        const c = local ? JSON.parse(local) : ["EUR", "CNY"]
        const a = {}
        c.forEach((e) => {
            a[e] = ""
        })
        return a
    })())

    const [ready, setReady] = useState(false)
    const [base, setBase] = useState({})
    const [rates, setRates] = useState({})

    const cashify = new Cashify({ base, rates })

    const currencies = Object.keys(rates).filter(e => Object.keys(ammounts).indexOf(e) === -1)

    const [option, setOption] = useState(null)


    useEffect(() => {
        const token = localStorage.getItem("token")
        request.get("/exchangerate")
            .set("x-auth", token)
            .then(res => res.body)
            .then(({ base, rates }) => {
                setBase(base)
                setRates(rates)
                setReady(true)
            })
    }, [])

    return (
        <div>
            <h1 className="title">汇率转换</h1>
            <h2 className="subtitle">{ready ? "汇率更新完成" : "汇率更新中"}</h2>

            <Noti color="is-info" identifier="exchangerate-info">
                实时汇率由OpenExchangeRate提供，每小时更新一次。
            </Noti>

            {
                Object.keys(ammounts).map((e, i) => (
                    <div key={i} className="field is-horizontal">
                        {/* <div className="field-label is-normal">
                            <button 
                                className="delete"
                                onClick={() => {
                                    localStorage.setItem("currencies", JSON.stringify(
                                        Object.keys(ammounts).filter(el => el !== e)
                                    ))

                                    setAmmounts(() => {
                                        const res = {}
                                        for(let key in ammounts){
                                            if(key !== e){
                                                res[key] = ammounts[key]
                                            }
                                        }
                                        return res
                                    })
                                }}
                            ></button>
                        </div> */}
                        <div className="field-label is-normal">
                            <label className="label">{e}</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="0"
                                        value={ammounts[e]}
                                        onChange={ev => {
                                            const { value } = ev.target
                                            if (ready) {
                                                if (!Number.isNaN(parseFloat(value))) {
                                                    setAmmounts(prev => {
                                                        const res = {}
                                                        for (let key in prev) {
                                                            if (key !== e) {
                                                                res[key] = cashify.convert(
                                                                    parseFloat(value),
                                                                    { from: e, to: key }
                                                                )
                                                            }
                                                            else {
                                                                res[key] = value
                                                            }
                                                        }
                                                        return res
                                                    })
                                                }
                                                else {
                                                    setAmmounts({
                                                        ...ammounts,
                                                        [e]: value
                                                    })
                                                }

                                            }
                                        }}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="field">
                <label className="label">新增币种</label>
                <div className="control">
                    <Select
                        options={currencies.map(e => ({
                            value: e,
                            label: e
                        }))}
                        value={option}
                        onChange={(s) => {
                            setOption(s)
                        }}
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button
                        className="button is-primary"
                        onClick={() => {
                            localStorage.setItem("currencies", JSON.stringify([...(Object.keys(ammounts)), option.value]))
                            setAmmounts({
                                ...ammounts,
                                [option.value]: ""
                            })
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Currency
