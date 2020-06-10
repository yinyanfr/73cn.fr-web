import React, { useState, useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import AdminMenu from "../../Admin/AdminMenu"
import request from "superagent"

import "./tools.scss"

const Toolbox = () => {

    const history = useHistory()
    const [union, setUnion] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        request.get("/union")
            .set("x-auth", token)
            .then(res => {
                setUnion(res.body.union)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className={
            localStorage.getItem("column") === "true"
                && window.innerWidth > 768
                ? "space-between"
                : "toolbox-wrapper"
        }>
            <div>
                <label className="label">实用工具</label>
                <div className="toolbox">
                    <div className="tool">
                        <div
                            className="tool-icon"
                            style={{
                                color: "#379863",
                                backgroundColor: "#8ee4af"
                            }}
                            onClick={() => {
                                history.push("/home/compte")
                            }}
                        >
                            <i className="fas fa-file-invoice"></i>
                        </div>
                        <div
                            className="tool-name"
                        >
                            记账Beta
                        </div>
                    </div>

                    <div className="tool">
                        <div
                            className="tool-icon"
                            style={{
                                color: "gold",
                                backgroundColor: "#2d283e"
                            }}
                            onClick={() => {
                                history.push("/home/currency")
                            }}
                        >
                            <i className="fas fa-coins"></i>
                        </div>
                        <div
                            className="tool-name"
                        >
                            汇率转换
                        </div>
                    </div>

                    <div className="tool">
                        <div
                            className="tool-icon"
                            style={{
                                color: "#97CAEF",
                                backgroundColor: "#CAFAFE"
                            }}
                            onClick={() => {
                                history.push("/home/brochure")
                            }}
                        >
                            <i className="fas fa-book-open"></i>
                        </div>
                        <div
                            className="tool-name"
                        >
                            新生手册
                        </div>
                    </div>

                    <div className="tool">
                        <div
                            className="tool-icon"
                            style={{
                                color: "#b39bc8",
                                backgroundColor: "#f0ebf4"
                            }}
                            onClick={() => {
                                history.push("/home/links")
                            }}
                        >
                            <i className="fas fa-link"></i>
                        </div>
                        <div
                            className="tool-name"
                        >
                            常用链接
                        </div>
                    </div>
                </div>


                {
                    union
                        ? (
                            <>
                                <label className="label">学联工具</label>
                                <div className="toolbox">
                                    <div className="tool">
                                        <div
                                            className="tool-icon"
                                            style={{
                                                color: "#43aa8b",
                                                backgroundColor: "#99e1d9"
                                            }}
                                            onClick={() => {
                                                history.push("/home/trip")
                                            }}
                                        >
                                            <i className="fas fa-plane"></i>
                                        </div>
                                        <div
                                            className="tool-name"
                                        >
                                            回国统计
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                        : ""
                }


                <label className="label">网站导航</label>
                <div className="toolbox">
                    <div
                        className="tool"
                        onClick={() => {
                            history.push("/home/info")
                        }}
                    >
                        <div
                            className="tool-icon"
                            style={{
                                color: "#d83f87",
                                backgroundColor: "#edb5bf"
                            }}
                        >
                            <i className="fas fa-user-circle"></i>
                        </div>
                        <div
                            className="tool-name"
                        >
                            个人资料
                        </div>
                    </div>

                    <div className="tool"
                        onClick={() => {
                            history.push("/home/myevents")
                        }}
                    >
                        <div
                            className="tool-icon"
                            style={{
                                color: "#659dbd",
                                backgroundColor: "#def2f1"
                            }}
                        >
                            <i className="far fa-calendar-alt"></i>
                        </div>
                        <div
                            className="tool-name"
                        >
                            活动报名
                        </div>
                    </div>

                    <div className="tool"
                        onClick={() => {
                            history.push("/home/contact")
                        }}
                    >
                        <div
                            className="tool-icon"
                            style={{
                                color: "#e98074",
                                backgroundColor: "#ffcb9a"
                            }}
                        >
                            <i className="fas fa-address-card"></i>
                        </div>
                        <div
                            className="tool-name"
                        >
                            联系我们
                        </div>
                    </div>

                    <div className="tool"
                        onClick={() => {
                            history.push("/home/setting")
                        }}
                    >
                        <div
                            className="tool-icon"
                            style={{
                                color: "#9b786f",
                                backgroundColor: "#eae7dc"
                            }}
                        >
                            <i className="fas fa-cog"></i>
                        </div>
                        <div
                            className="tool-name"
                        >
                            网站设置
                        </div>
                    </div>
                </div>

                <AdminMenu />
            </div>
        </div>
    )
}

export default Toolbox
