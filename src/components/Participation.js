import React, { Component } from 'react'
import mapUser from "./mapUser"
import Select from "react-select"
import request from "superagent"
import xss from "xss"

const findOption = (option, value) => {
    for (let i = 0; i < option.length; i++) {
        if (option[i].value === value) {
            return option[i]
        }
    }
    return ""
}

class Participation extends Component {

    componentDidMount = () => {
        const { _id } = this.props.user
        const { eventId, option } = this.props
        const token = localStorage.getItem("token")
        request.get(`/application/${eventId}`)
            .set("x-auth", token)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    if (!Object.keys(res.body).length) {
                        const { choice, number, remarks } = req.body
                        this.setState(() => ({
                            registered: true,
                            choice: (choice && findOption(option, choice)) || "",
                            number: parseInt(number) || 1,
                            remarks: remarks || ""
                        }))
                    }
                }
            })
    }

    state = {
        choice: "",
        number: 1,
        remarks: "",
        registered: false,
        sending: false,
        err: false,
        success: false
    }

    onChoice = value => {
        this.setState(() => ({ choice: value }))
    }

    onNumber = e => {
        const {value} = e.target
        if(/^[0-9]*$/.test(value)){
            this.setState(() => ({
                number: value
            }))
        }
    }

    onRemarks = e => {
        const {value} = e.target
        this.setState(() => ({
            remarks: xss(value)
        }))
    }

    onSubmit = e => {
        e.preventDefault()
        this.setState(() => ({sending: true}))
        const token = localStorage.getItem("token")
        const {eventId} = this.props
        const {
            choice, number, remarks
        } = this.state
        request.post("/application")
            .set("x-auth", token)
            .send({
                eventId,
                choice: choice.value,
                number,
                remarks
            }).end((err, res) => {
                if(err){
                    this.setState(() => ({
                        err: true,
                        sending: false
                    }))
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
                {
                    this.state.registered
                        ? (
                            <div className="notification is-info">
                                您已经成功报名，您可以随时修改报名信息
                            </div>
                        )
                        : ""
                }

                {
                    this.props.option
                        ? (
                            <div className="field">
                                <label className="label">
                                    选项
                                </label>
                                <div className="control">
                                    <Select
                                        value={this.state.choice}
                                        options={this.props.option}
                                        onChange={this.onChoice}
                                    />
                                </div>
                            </div>
                        )
                        : ""
                }

                <div className="field">
                    <label className="label">报名人数</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            type="number"
                            placeholder=""
                            onChange={this.onNumber}
                            value={this.state.number}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user-friends"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label">留言</label>
                    <div className="control has-icons-left">
                        <textarea
                            className="input"
                            type="textarea"
                            placeholder=""
                            onChange={this.onRemarks}
                            value={this.state.remarks}
                        ></textarea>
                        <span className="icon is-small is-left">
                            <i className="fas fa-user-friends"></i>
                        </span>
                    </div>
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
                        >{
                            this.state.registered
                            ? "更新"
                            : "报名"
                        }</button>
                    </div>
                </div>

                {
                    this.state.err
                        ? (
                            <div className="notification is-warning">
                                未能成功发送您的报名信息，请稍后再试。
                            </div>
                        )
                        : ""
                }

                {
                    this.state.success
                        ? (
                            <div className="notification is-primary">
                                报名成功。
                            </div>
                        )
                        : ""
                }

            </div>
        )
    }
}

export default mapUser(Participation)
