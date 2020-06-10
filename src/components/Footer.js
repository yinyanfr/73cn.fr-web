import React, { Component } from 'react'
import wx from "../wx.jpg"
import acecl from "../acecl.png"
import mapUser from "./mapUser"
import Goto from "./Goto"

class Footer extends Component {


    render() {

        return (
            <footer className="footer">
                <div className="content">

                    <div className="columns">
                        <div className="column site-map">
                            <p><b>网站地图</b></p>
                            <div><Goto to="/">主页</Goto></div>
                            <div><Goto to="/news">新闻</Goto></div>
                            <div><Goto to="/events">活动</Goto></div>
                            <div><Goto to="/comments">留言版</Goto></div>
                            <div><Goto to="/contact">联系我们</Goto></div>
                        </div>

                        <div className="column site-map">
                            <p><b>尚贝里学联ID</b></p>
                            {
                                this.props.user
                                    ? (
                                        <>
                                            <div><Goto to="/home">个人中心</Goto></div>
                                            <div><Goto to="/home/info">个人资料</Goto></div>
                                            <div><Goto to="/home/myevents">活动报名</Goto></div>
                                            <div><Goto to="/home/reset">修改密码</Goto></div>
                                        </>
                                    )
                                    : (
                                        <>
                                            <div><Goto to="/home">注册 / 登录</Goto></div>
                                        </>
                                    )
                            }
                        </div>

                        <div className="column site-map">
                            <p><b>尚贝里学联</b></p>
                            <div>学联邮箱</div>
                            <div>ucec_chambery@hotmail.com</div>
                            <div>公众号</div>
                            <div>
                                <img
                                    src={wx}
                                    alt="qr code"
                                    className="image is-128x128"
                                />
                            </div>
                        </div>

                        <div className="column site-map">
                            <p><b>里昂学联</b></p>
                            <div>学联邮箱</div>
                            <div>hj@acecl.fr</div>
                            <div>公众号</div>
                            <div>
                                <img
                                    src={acecl}
                                    alt="qr code"
                                    className="image is-128x128"
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </footer>
        )
    }
}

export default mapUser(Footer)
