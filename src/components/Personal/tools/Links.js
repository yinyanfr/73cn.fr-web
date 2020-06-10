import React, { useState } from 'react'

const Links = () => {

    const [page, setPage] = useState("sites")

    const sites = [
        { src: "https://www.synchro-bus.fr/", label: "公交公司 Syncro-Bus", icon: "fas fa-bus" },
        { src: "https://www.sncf.com/fr", label: "SNCF", icon: "fas fa-train" },
        {
            src: "https://weather.com/zh-CN/weather/today/l/d0b7b7f88d9bb1d813c4ad95badb94a5f51e31acdd3f6be550bf2f5ed779874b",
            label: "尚贝里天气", icon: "fas fa-cloud-sun"
        },
        {
            src: "https://www.pagesjaunes.fr/annuaire/chambery-73",
            label: "尚贝里黄页", icon: "fas fa-book"
        }
    ]

    const tels = [
        { number: 18, label: "消防" },
        { number: 15, label: "紧急医疗救护" },
        { number: 17, label: "报警电话" },
        { number: 112, label: "欧盟紧急呼叫号码" }
    ]

    return (
        <>
            <nav className="panel is-primary">
                <p className="panel-heading">
                    常用网址和电话
            </p>

                <p className="panel-tabs">
                    <a onClick={() => { setPage("sites") }}>常用网址</a>
                    <a onClick={() => { setPage("tels") }}>电话号码</a>
                </p>

                {
                    page === "sites"
                        ? (
                            <>
                                {
                                    sites.map((e, i) => (
                                        <a href={e.src} target="_blank" key={i} className="panel-block">
                                            <span className="panel-icon">
                                                <i className={e.icon} aria-hidden="true"></i>
                                            </span>
                                            <strong>{e.label}</strong>
                                            {
                                                window.innerWidth > 768
                                                    ? (
                                                        <span>
                                                            &nbsp;&nbsp;
                                                            {e.src}
                                                        </span>
                                                    )
                                                    : ""
                                            }
                                        </a>
                                    ))
                                }
                            </>
                        )
                        : ""
                }

                {
                    page === "tels"
                        ? (
                            <>
                                {
                                    tels.map((e, i) => (
                                        <a href={`tel:${e.number}`} key={i} className="panel-block">
                                            <span className="panel-icon">
                                                <i className="fas fa-phone-alt" aria-hidden="true"></i>
                                            </span>
                                            <strong>{e.number}</strong>
                                            &nbsp;&nbsp;
                                    {e.label}
                                        </a>
                                    ))
                                }
                            </>
                        )
                        : ""
                }
            </nav>
            {
                page === "tels"
                    ? <p className="help">提示：点击相应的号码可以唤出手机或Skype的拨号界面。</p>
                    : ""
            }
        </>
    )
}

export default Links
