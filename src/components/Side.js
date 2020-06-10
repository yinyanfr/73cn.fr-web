import React from 'react'
import { withRouter, Link } from "react-router-dom"
import mapUser from "./mapUser"
import Noti from './Noti'

const Side = ({ user, match, history }) => {

    return (
        <div>
            {
                localStorage.getItem("hideBack") === "true"
                    && window.innerWidth <= 768
                    ? ""
                    : (
                        localStorage.getItem("apple") === "true"
                        ? (
                            <div className="main-return-button">
                            <h2 className="subtitle">
                                <a href="#" onClick={() => {
                                    history.push("/home")
                                }}>
                                    <i className="fas fa-angle-left"></i>
                                    &nbsp;&nbsp;
                                    返回主屏
                                </a>
                            </h2>
                        </div>
                        )
                        : (
                            <div className="main-return-button">
                            <h2 className="subtitle">
                                <a href="#" onClick={() => {
                                    history.goBack()
                                }}>
                                    <i className="fas fa-angle-left"></i>
                                    &nbsp;&nbsp;
                                    返回
                                </a>
                            </h2>
                        </div>
                        )
                    )
            }

            <div className="almost-width padding-bottom">
                {
                    (
                        window.innerWidth <= 768
                        || localStorage.getItem("column") === "true"
                    )
                        && !match.isExact
                        ? ""
                        : <h1 className="title">欢迎回来，{user.info.realname}</h1>
                }
            </div>

            <Noti color="is-success" identifier="beta-2020">
                <strong>欢迎使用新版个人中心</strong>
                <br />
                我<s>们</s>更新了网站的视觉效果并推出了一系列新功能。
            </Noti>

            {
                user.info.realname
                    ? ""
                    : (
                        <Noti color="is-info" identifier="your-info">
                            <strong>感谢您注册尚贝里学联网站</strong>
                            <br />
                            <Link to="/home/info">请点击此处完善个人资料</Link>
                        </Noti>
                    )
            }

            <Noti color="is-link" identifier="health">
                <strong>新型肺炎防疫专题页面已上线</strong>
                <br />
                疫情追踪，防疫指南，<Link to="/health">访问专题页面</Link>。
            </Noti>
        </div>
    )
}

export default withRouter(mapUser(Side))
