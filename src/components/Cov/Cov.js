import React from 'react'
import { Route, Link } from 'react-router-dom'
import "./Cov.scss"
import Info from './Info'
import Prevent from './Prevent'
import Stade from "./Stade"
import Rumor from './Rumor'
import Ambassade from './Ambassade'
import Lyon from './Lyon'
import Contact from './Contact'
import Menu from './Menu'
import News from './News'
import mapUser from '../mapUser'
import Video from './Video'

const Cov = ({ user }) => {

    return (
        <div className="box almost-width">
            <h1 id="health-top" className="title">新型冠状病毒防疫专题</h1>

            <Menu />

            <div id="health-content"></div>

            <Route exact path="/health">
                <News />
            </Route>

            <div className="cov">
                <Route exact path="/health/video">
                    <Video />
                </Route>
                <Route exact path="/health/info">
                    <Info />
                </Route>
                <Route exact path="/health/prevent">
                    <Prevent />
                </Route>
                <Route exact path="/health/stade">
                    <Stade />
                </Route>
                <Route exact path="/health/rumor">
                    <Rumor />
                </Route>
                <Route exact path="/health/ambassade">
                    <Ambassade />
                </Route>
                <Route exact path="/health/lyon">
                    <Lyon />
                </Route>
                <Route exact path="/health/contact">
                    <div>
                        <h1 className="title">联系方式</h1>
                        <Contact />
                    </div>
                </Route>

                {
                    user
                        ? ""
                        : (
                            <>
                                <hr />
                                <p>
                                    <Link to="/login">登录</Link> 或 <Link to="/register">注册</Link> 尚贝里学联账号，探索更多功能
                                </p>
                            </>
                        )
                }

                <hr />

                <div className="control">
                    <a
                        role="button"
                        className="button is-link"
                        href="#health-top"
                    >
                        返回目录
                    </a>
                </div>
            </div>
        </div>
    )
}

export default mapUser(Cov)
