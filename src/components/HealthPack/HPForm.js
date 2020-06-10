import React, { useState, useEffect } from 'react'
import ImageUploader from "react-images-upload"
import request from "superagent"

import unions from "./cities.json"
import hpapi from './hpapi'

const HPForm = ({ union, passport, name }) => {

    const city = unions.find(e => e.value === union)

    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const [visa, setVisa] = useState(null)
    const [school, setSchool] = useState(null)

    const [visaDone, setVisaDone] = useState(false)
    const [schoolDone, setSchoolDone] = useState(false)

    const [progress, setProgress] = useState(0)

    const [status, setStatus] = useState("ready")

    useEffect(() => {
        request.post(hpapi("verify"))
            .send({ union, passport, name })
            .then(res => {
                const { 电话, 邮箱, 法国住址 } = res.body
                if (邮箱) {
                    setEmail(邮箱)
                }

                if (电话) {
                    setPhone(电话)
                }

                if (法国住址) {
                    setAddress(法国住址)
                }

                return request.get(hpapi(`me/${passport}`))
                    .then(res => {
                        if (res.body) {
                            const { email, phone, address, visa, school } = res.body
                            if (email) setEmail(email)
                            if (phone) setPhone(phone)
                            if (address) setAddress(address)
                            if (visa) setVisaDone(true)
                            if (school) setSchoolDone(true)
                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const submit = () => {
        setStatus("pending")
        const fd = new FormData()
        fd.append("union", union)
        fd.append("passport", passport)
        fd.append("name", name)
        fd.append("resident", "true")
        fd.append("email", email)
        fd.append("phone", phone)
        fd.append("address", address)
        if (visa && visa[0]) fd.append("visa", visa[0])
        if (school && school[0]) fd.append("school", school[0])
        console.log(visa)
        request.post(hpapi("update"))
            .send(fd)
            .on("progress", ({ percent }) => {
                setProgress(parseInt(percent))
            })
            .then(() => {
                setStatus("success")
            })
            .catch(err => {
                console.log(err)
                setStatus("fail")
            })
    }


    return (
        <div>

            <article className="message is-info">
                <div className="message-header">关于收集实名个人信息的说明</div>
                <div className="message-body">
                    <ul>
                        <li>您的个人信息仅用于确认您的身份，<b>健康包将优先发放到已确认身份的人手中</b></li>
                        <li>您提交的信息只有您和您所在城市的学联主席能够查看，<b>在任何情况下都不会被转交给第三方</b></li>
                        <li>这意味着您于本网站填写的信息将<b>不会同步至法国留学服务网</b></li>
                        <li>所有信息存储于学联网站所在的服务器上，将<b>于健康包发放结束后全部删除</b></li>
                    </ul>
                </div>
            </article>

            <div className="notification is-info">
                请确认并完善您的信息，并点击提交
                <br />
                提示：<b>即使不需要修改信息，也请点击提交</b>
            </div>

            <div className="field">
                <label className="label">城市</label>
                <div className="control has-icons-left">
                    <input
                        type="text"
                        className="input"
                        value={city ? city.label : union}
                        readOnly
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-home"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">护照号码</label>
                <div className="control has-icons-left">
                    <input
                        type="text"
                        className="input"
                        value={passport}
                        readOnly
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
                        value={name}
                        readOnly
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-file-signature"></i>
                    </span>
                </div>
            </div>

            <hr />

            <h2 className="subtitle">
                请更新您的信息
            </h2>

            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left">
                    <input
                        type="text"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">电话号码</label>
                <div className="control has-icons-left">
                    <input
                        type="text"
                        className="input"
                        placeholder="电话号码"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value)
                        }}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-phone-alt"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">详细地址 <b>包含邮编、城市</b></label>
                <div className="control">
                    <textarea
                        className="textarea"
                        rows="5"
                        placeholder="详细地址"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                    >
                    </textarea>

                    <p>请更新您的详细地址，格式如下：门牌号，街道，城市，邮编</p>
                </div>
            </div>

            <hr />

            <h2 className="subtitle">
                请完成实名认证
            </h2>

            <div className="field">
                <label className="label">
                    请上传有效期内的【居留卡正面】扫描件或照片（如尚未获得居留卡，请上传有效期内的【护照中的法国签证页】照片）
                </label>
                <div className="control">
                    <ImageUploader
                        withIcon={true}
                        label={"文件长度限制：10MB，格式限制：jpg, png, webp, pdf"}
                        withPreview={true}
                        maxFileSize={10 * 1024 * 1024}
                        singleImage={true}
                        buttonText={"选择图片"}
                        imgExtension={[".jpg", ".png", ".jpeg", ".jiff", ".webp", ".pdf"]}
                        onChange={setVisa}
                    />

                    {
                        visaDone
                            ? <p>您已上传本项，如需修改可以再次上传</p>
                            : ""
                    }
                </div>
            </div>

            <div className="field">
                <label className="label">
                    请上传有效期内的【学校注册证明】或【学生证】，扫描件或照片均可。（访问学者请提供访学证明）
                </label>
                <div className="control">
                    <ImageUploader
                        withIcon={true}
                        label={"文件长度限制：10MB，格式限制：jpg, png, webp, pdf"}
                        withPreview={true}
                        maxFileSize={10 * 1024 * 1024}
                        singleImage={true}
                        buttonText={"选择图片"}
                        imgExtension={[".jpg", ".png", ".jpeg", ".jiff", ".webp", ".pdf"]}
                        onChange={setSchool}
                    />

                    {
                        schoolDone
                            ? <p>您已上传本项，如需修改可以再次上传</p>
                            : ""
                    }
                </div>
            </div>

            <hr />

            <progress
                className="progress is-primary"
                value={progress}
                max={100}
            >
                {progress}
            </progress>

            <div className="field">
                <div className="control">
                    <button
                        className={
                            status === "pending"
                                ? "button is-link is-loading"
                                : "button is-link"
                        }
                        onClick={submit}
                        disabled={status === "pending"}
                    >
                        提交
                    </button>
                </div>
            </div>

            {
                status === "success"
                    ? <div className="notification is-success">提交成功</div>
                    : ""
            }

            {
                status === "fail"
                    ? <div className="notification is-warning">提交失败</div>
                    : ""
            }

        </div>
    )
}

export default HPForm
