import React from 'react'
import { useHistory } from 'react-router-dom'

const list = [
    {
        name: "实时追踪",
        link: "/"
    },
    {
        name: "视频讲座",
        link: "/video"
    },
    {
        name: "新型冠状病毒感染的肺炎知识普及",
        link: "/info"
    },
    {
        name: "如何预防新型冠状病毒",
        link: "/prevent"
    },
    {
        name: "什么是法国防疫的Stade 1， 2，3阶段 ？",
        link: "/stade"
    },
    {
        name: "大使馆提醒在法中国公民警惕不法分子冒充警察等行骗",
        link: "/rumor"
    },
    {
        name: "驻法国使馆提醒在法中国公民加强疫情防范",
        link: "/ambassade"
    },
    {
        name: "里昂地区留学人员回国信息登记",
        link: "/lyon"
    },
    {
        name: "大使馆联系方式",
        link: "/contact"
    },
]

const Menu = () => {

    const history = useHistory()

    return (
        <nav className="panel">
            <p className="panel-heading">
                目录
            </p>

            {
                list.map((e, i) => (
                    <a
                        key={i}
                        className="panel-block"
                        href="#health-content"
                        onClick={() => {
                            history.push(`/health${e.link}`)
                        }}
                    >
                        <span className="panel-icon">
                            <i className="fas fa-book" aria-hidden="true"></i>
                        </span>
                        {e.name}
                    </a>
                ))
            }
        </nav>
    )
}

export default Menu
