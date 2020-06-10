import React from 'react'
import "./Sp2020.scss"
import Sp2020Form from './Sp2020Form'
import sp2020web from "./poster2020web.jpg"

const Sp2020 = () => {


    return (
        <>
            <div className="box sp2020">
                <h1 className="title">尚贝里2020年春节联欢会专题页面</h1>
                <h2 className="subtitle">L'Invitation pour le Spectacle Nouvel An Chinois</h2>

                <div className="control">
                    <a
                        href="#reservation"
                        role="button"
                        className="button is-link"
                    >
                        在线报名 / Reservez vos places
                    </a>
                </div>

                <hr />

                <div>
                    <img alt="sp2020web" src={sp2020web} />
                </div>
                
                <div className="split"></div>

                <h2 className="title is-4">活动信息</h2>
                <h3 className="subtitle">Information</h3>
                <div className="sp2020-font125">
                    <p>2020年1月5日 星期六 上午10点～下午1点30</p>
                    <p>Samedi 25 Janvier</p>
                    <p>10h00 - 13h30</p>
                    <p>Cinéma Victoria, 36 Avenue Victoria, 73100 Aix-les-Bains</p>
                </div>

                <div className="split"></div>
                <hr />

                <h2 className="title is-4">节目单</h2>
                <h3 className="subtitle">Le Programme</h3>
                <div className="sp2020-font125">
                    <p>敬请期待</p>
                    <p>à bientôt</p>
                </div>

                <div className="split"></div>
                <hr />

                <h2 id="reservation" className="title is-4">在线报名</h2>
                <h3 className="subtitle">Reservez vos places</h3>
                <div className="sp2020-form-wrapper">
                    <Sp2020Form />
                </div>
            </div>

            <div className="split"></div>
        </>
    )
}

export default Sp2020
