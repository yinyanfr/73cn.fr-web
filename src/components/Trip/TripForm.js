import React, { Component } from 'react'
import forminfo from "./forminfo.json"
import { RadioGroup, Radio } from "react-radio-group"
import DatePicker from "react-date-picker"
import moment from "moment"
import request from "superagent"

class TripForm extends Component {
    state = {
        name: "",
        gender: "",
        passport: "",
        date: new Date(),
        depart: "",
        arrive: "",
        via: "",
        destination: "",
        tel: "",
        remarks: "",
        status: "ready"
    }

    componentDidMount = () => {
        const { tripId } = this.props
        const token = localStorage.getItem("token")
        if (tripId) {
            request.get(`/trip/${tripId}`)
                .set("x-auth", token)
                .then(res => {
                    if (res.body) {
                        const {
                            name, gender, passport,
                            depart, arrive, via, destination,
                            tel, remarks, date
                        } = res.body

                        this.setState(() => ({
                            name, gender, passport,
                            depart, arrive, via, destination,
                            tel, remarks,
                            date: new Date(date)
                        }))
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    infoValid = () => (
        this.state.name.length
    )

    onSubmit = () => {
        const {
            name, gender, passport,
            depart, arrive, via, destination,
            tel, remarks, date
        } = this.state

        const { tripId, onModified } = this.props

        const token = localStorage.getItem("token")

        if (this.infoValid()) {
            request[tripId ? "patch" : "post"]("/trip")
                .set("x-auth", token)
                .send({
                    name, gender, passport,
                    depart, arrive, via, destination,
                    tel, remarks,
                    date: moment(date).format(),
                    tripId
                })
                .then(() => {
                    this.setState(() => ({ status: "success" }))

                    if (onModified) {
                        onModified()
                    }

                    setTimeout(() => {
                        this.setState(() => ({
                            name: "",
                            gender: "",
                            passport: "",
                            date: new Date(),
                            depart: "",
                            arrive: "",
                            via: "",
                            destination: "",
                            tel: "",
                            remarks: "",
                            status: "ready"
                        }))
                    }, 2000)
                })
                .catch(err => {
                    console.log(err)
                    this.setState(() => ({ status: "fail" }))
                })
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.tripId
                        ? (
                            <div className="notification is-primary">
                                提示：你正在编辑
                            </div>
                        )
                        : ""
                }
                <div className="field">
                    <label className="label">学联</label>
                    <div className="control has-icons-left">
                        <input
                            readOnly
                            className="input"
                            type="text"
                            value={`${this.props.union}学联`}
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-home"></i>
                        </span>
                    </div>
                </div>

                {
                    forminfo.map((e, i) => {
                        if (e.name === "gender") {
                            return (
                                <div key={i} className="field">
                                    <label className="label">{e.chs}</label>
                                    <div className="control">
                                        <RadioGroup
                                            name={e.name}
                                            selectedValue={this.state[e.name]}
                                            onChange={gender => {
                                                this.setState(() => ({ gender }))
                                            }}
                                        >
                                            <label className="radio">
                                                <Radio value="male" />男
                                            </label>
                                            <label className="radio">
                                                <Radio value="female" />女
                                            </label>
                                        </RadioGroup>
                                    </div>
                                </div>
                            )
                        }

                        if (e.name === "date") {
                            return (
                                <div key={i} className="field">
                                    <label className="label">{e.chs}</label>
                                    <div className="control">
                                        <DatePicker
                                            value={this.state.date}
                                            onChange={date => {
                                                this.setState(() => ({ date }))
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        }

                        if (e.name === "remarks") {
                            return (
                                <div key={i} className="field">
                                    <label className="label">{e.chs}</label>
                                    <div className="control">
                                        <textarea
                                            className="textarea"
                                            value={this.state.remarks}
                                            onChange={ev => {
                                                const { value } = ev.target
                                                this.setState(() => ({ remarks: value }))
                                            }}
                                        ></textarea>
                                    </div>
                                </div>
                            )
                        }

                        return (
                            <div key={i} className="field">
                                <label className="label">{e.chs}</label>
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="text"
                                        value={this.state[e.name]}
                                        onChange={ev => {
                                            const { value } = ev.target
                                            this.setState(() => ({
                                                [e.name]: value
                                            }))
                                        }}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className={`fas fa-${e.icon}`}></i>
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }

                <div className="field">
                    <div className="control">
                        <button
                            className="button is-link"
                            onClick={this.onSubmit}
                            disabled={!this.infoValid()}
                        >
                            提交
                        </button>
                    </div>
                </div>

                {
                    this.state.status === "success"
                        ? (
                            <div className="notification is-success">
                                {this.props.tripId ? "编辑" : "发送"}成功
                            </div>
                        )
                        : ""
                }

                {
                    this.state.status === "fail"
                        ? (
                            <div className="notification is-warning">
                                {this.props.tripId ? "编辑" : "发送"}失败
                            </div>
                        )
                        : ""
                }
            </div>
        )
    }
}

export default TripForm
