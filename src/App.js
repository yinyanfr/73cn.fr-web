import React from 'react'
import Nav from './components/Nav'
import Gallery from './Gallery'
import { Route, useHistory } from "react-router-dom"
import News from './components/Main/News'
import Comments from "./Comments"
import Contact from './components/About/Contact'
import Events from './components/Main/Events'

import mapUser from "./components/mapUser"
import userReducer from './redux/userReducer'
import Cov from './components/Cov/Cov'
import CovIndex from './components/Cov/CovIndex'
import HealthPack from './components/HealthPack/HealthPack'
import HPAdmin from './components/HealthPack/HPAdmin'
import HPIndex from './components/HealthPack/HPIndex'

const App = ({ user }) => {

    const history = useHistory()

    return (
        <div>
            <Nav transparent />
            <div className="main-frame">
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title is-white">
                                尚贝里学联
                            </h1>
                            <h2 className="subtitle is-white">
                                UCEC - Chambery
                            </h2>
                        </div>
                    </div>
                </section>

                {/* <div className="notification almost-width gone">
                    <p>这是学联网站的预览版，正式版将于迎新晚会时上线。</p>
                    <p>您可能会发现有一部分按钮无法点击，这是因为一部分待完善的功能暂时被隐藏了，正式版上线时即会恢复正常。</p>
                    <p>感谢您的理解。</p>
                </div> */}

                <Route exact path="/" component={() => (
                    <div>
                        {/* <div className={
                            window.innerWidth >= 770
                                ? "three-quarter-width"
                                : "almost-width"
                        }>
                            <Gallery />
                        </div> */}
                        {
                            window.innerWidth < 768
                                ? (
                                    <div className="center-main-button almost-width">
                                        {
                                            user
                                                ? (
                                                    <button
                                                        className="button is-primary"
                                                        onClick={() => {
                                                            history.push("/home")
                                                        }}
                                                    >
                                                        个人中心
                                                    </button>
                                                )
                                                : (
                                                    <>
                                                        <button
                                                            className="button is-primary"
                                                            onClick={() => {
                                                                history.push("/login")
                                                            }}
                                                        >
                                                            登录
                                                        </button>

                                                        <button
                                                            className="button is-primary is-light"
                                                            onClick={() => {
                                                                history.push("/register")
                                                            }}
                                                        >
                                                            注册
                                                        </button>
                                                    </>
                                                )
                                        }
                                    </div>
                                )
                                : ""
                        }

                        <div className="split"></div>
                        <HPIndex />
                        <div className="split"></div>
                        <CovIndex />

                        <div className="split"></div>
                        <div>
                            <News preview />
                        </div>
                        <div className="split"></div>
                        <div>
                            <Events preview />
                        </div>
                        <div className="split"></div>
                    </div>
                )} />

                <Route exact path="/news" component={() => (
                    <News />
                )} />

                <Route exact path="/events" component={() => (
                    <Events />
                )} />

                <Route exact path="/comments" component={() => (
                    <Comments />
                )} />

                <Route exact path="/contact" component={() => (
                    <div className="almost-width">
                        <Contact white />
                    </div>
                )} />

                <Route path="/health">
                    <div className="almost-width">
                        <Cov />
                    </div>
                </Route>

                <Route path="/hp">
                    <HealthPack />
                </Route>

                <Route path="/hpadmin">
                    <HPAdmin />
                </Route>

                <Route path="/gallery">
                    <div className={
                        window.innerWidth >= 770
                            ? "three-quarter-width"
                            : "almost-width"
                    }>
                        <Gallery />
                    </div>
                </Route>
            </div>
        </div>
    )
}

export default mapUser(App)
