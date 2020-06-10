import React, { Component } from 'react'
import mapUser from "../mapUser"
import Select from "react-select"
import request from "superagent"

const optionSchool = [
    {
        value: "usmb",
        label: "萨瓦大学(USMB)"
    },
    {
        value: "accent",
        label: "语言学校(ACCENT)"
    },
    {
        value: "iut",
        label: "IUT/DUT"
    },
    {
        value: "business",
        label: "商校(INSEEC)"
    },
    {
        value: "scholar",
        label: "科研设施"
    },
    {
        value: "art",
        label: "艺术学校(Cité des Arts)"
    },
    {
        value: "others",
        label: "其他"
    }
]

const optionGrade = [
    {
        value: "bac",
        label: "BAC/申请学校中/语言学校"
    },
    {
        value: "bac1",
        label: "BAC+1/本科一年级"
    },
    {
        value: "bac2",
        label: "BAC+2/本科二年级"
    },
    {
        value: "bac3",
        label: "BAC+3/本科三年级"
    },
    {
        value: "bac4",
        label: "BAC+4/研究生一年级"
    },
    {
        value: "bac5",
        label: "BAC+5/研究生二年级"
    },
    {
        value: "doctor",
        label: "博士/学者/研究人员"
    },
    {
        value: "other",
        label: "其他"
    }
]

const findOption = (option, value) => {
    for(let i = 0; i < option.length; i++){
        if(option[i].value === value){
            return option[i]
        }
    }
    return ""
}

class Info extends Component {

    componentDidMount = () => {
        const token = localStorage.getItem("token")
        request.get("/myinfo")
            .set("x-auth", token)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                else {
                    if(res.body){
                        const {
                            realname,
                            phone,
                            school,
                            grade,
                            major,
                            open
                        } = res.body
                        this.setState(() => ({
                            realname: realname || "",
                            phone: phone || "",
                            school: (school && findOption(optionSchool, school)) || "",
                            grade: (grade && findOption(optionGrade, grade)) || "",
                            major: major || "",
                            open: open || "false"
                        }))
                    }
                }
            })
    }

    state = {
        realname: "",
        phone: "",
        school: "",
        grade: "",
        major: "",
        open: "false",
        sending: false,
        err: false,
        success: false
    }

    onInput = which => e => {
        const { value } = e.target
        this.setState(() => ({
            [which]: value
        }))
    }

    onSchool = school => {
        this.setState(() => ({ school }))
        console.log(school)
    }

    onGrade = grade => {
        this.setState(() => ({ grade }))

    }

    onOpen = e => {
        const { value } = e.target
        this.setState(() => ({ open: value }))
    }

    onSubmit = e => {
        
        this.setState(() => ({sending: true}))
        const token = localStorage.getItem("token")
        const {
            realname,
            phone,
            school,
            grade,
            major,
            open
        } = this.state
        
        const {_id} = this.props.user

        request.post("/info")
            .set("x-auth", token)
            .send({
                userId: _id,
                realname, phone, 
                school: school.value,
                grade: grade.value, 
                major, open
            })
            .end((err, res) => {
                if(err){
                    console.log(err)
                    this.setState({
                        err: true,
                        sending: false
                    })
                }else{
                    this.setState(() => ({
                        success: true,
                        sending: false
                    }))
                }
            })
    }


    render() {

        return (
            <div>
                <h1 className="title">完善个人资料</h1>
                <h2 className="subtitle">您提供的信息将用于学联进行统计和紧急情况下的联络，不会泄露给第三方和其他用户。</h2>
                <div className="field">
                    <label className="label">用户名</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            type="text"
                            placeholder="请输入您的名字"
                            onChange={this.onInput("realname")}
                            value={this.state.realname}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-id-card"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label">电话号码</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            type="text"
                            placeholder="请输入您的电话或手机号码"
                            onChange={this.onInput("phone")}
                            value={this.state.phone}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-phone-alt"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label">请选择您的学校</label>
                    <div className="control">
                        <Select
                            value={this.state.school}
                            options={optionSchool}
                            onChange={this.onSchool}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">请选择您的年级</label>
                    <div className="control">
                        <Select
                            value={this.state.grade}
                            options={optionGrade}
                            onChange={this.onGrade}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">专业</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            type="text"
                            placeholder="请输入您的专业"
                            onChange={this.onInput("major")}
                            value={this.state.major}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-graduation-cap"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label">是否接收学联活动相关的邮件</label>
                    <div className="control">
                        <label className="radio">
                            <input
                                type="radio"
                                name="answer"
                                value="true"
                                checked={this.state.open === "true"}
                                onChange={this.onOpen}
                            />
                            是
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                name="answer"
                                value="false"
                                checked={this.state.open === "false"}
                                onChange={this.onOpen}
                            />
                            否
                        </label>
                    </div>
                    <p className="help">若选“是”，我们将会定期通过邮件告知您学联活动的相关信息，您不会收到广告。</p>
                </div>

                <div className="field">
                    <div className="control">
                        <button
                            className={
                                this.state.sending
                                    ? "button is-link is-loading"
                                    : "button is-link"
                            }
                            
                            onClick={this.onSubmit}
                        >更新</button>
                    </div>
                </div>

                {
                    this.state.err
                        ? (
                            <div className="notification is-warning">
                                未能成功更新您的个人资料，请稍后再试。
                            </div>
                        )
                        : ""
                }

                {
                    this.state.success
                        ? (
                            <div className="notification is-primary">
                                已成功更新您的个人资料。
                            </div>
                        )
                        : ""
                }
            </div>
        )
    }
}

export default mapUser(Info)
