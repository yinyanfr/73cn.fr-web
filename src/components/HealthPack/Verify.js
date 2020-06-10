import React, { useState, useEffect } from 'react'
import Select from "react-select"
import geoip from './geoip'
import request from "superagent"
import hpapi from './hpapi'

import options from "./cities.json"

const Verify = ({ popInfo }) => {
    const [union, setUnion] = useState(options[0])
    const [passport, setPassport] = useState("")
    const [name, setName] = useState("")
    const [status, setStatus] = useState("ready")

    useEffect(() => {
        geoip().then(city => {
            if (city) {
                setUnion(options.find(e => e.value === city))
            }
        })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const isValid = passport.length && name.length

    const submit = () => {
        if (isValid) {
            request.post(hpapi("verify"))
                .send({
                    union: union.value,
                    passport,
                    name
                })
                .then(() => {
                    popInfo({
                        union: union.value,
                        passport,
                        name
                    })
                })
                .catch(err => {
                    console.log(err)
                    setStatus("fail")
                })
        }
    }

    return (
        <div>
            <article className="message is-info">
                <div className="message-header">
                    健康包发放的说明
                </div>
                <div className="message-body">
                    健康包发放的对象为已在“法国留学服务网”注册登记的、目前在法国学校注册在籍的、且在法国境内的留学人员及访问学者（包括自费和公派，含港澳台学生），国家公派汉语教师、志愿者
                <br />
                    请填写您在“法国留学服务网”登记时填入的城市、护照号码和中文姓名。
                </div>
            </article>
            <div className="field">
                <label className="label">城市</label>
                <div className="control">
                    <Select
                        options={options}
                        value={union}
                        onChange={setUnion}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">护照号码</label>
                <div className="control has-icons-left">
                    <input
                        type="text"
                        className="input"
                        placeholder="护照号码"
                        value={passport}
                        onChange={(e) => {
                            setPassport(e.target.value)
                        }}
                        required
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-passport"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">姓名</label>
                <div className="control has-icons-left">
                    <input
                        type="text"
                        className="input"
                        placeholder="中文姓名"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        required
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-file-signature"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button
                        className="button is-link"
                        disabled={!isValid}
                        onClick={submit}
                    >
                        提交
                    </button>
                </div>
            </div>

            {
                status === "fail"
                    ? (
                        <div className="notification is-warning">
                            您未于“法国留学服务网”注册登记
                            <br />
                            本应用并非实时数据，若您已登记，请等待本应用数据更新
                        </div>
                    )
                    : ""
            }
        </div>
    )
}

export default Verify
