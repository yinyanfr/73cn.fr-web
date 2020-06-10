import React, { Component } from 'react'

import zuguo from "../../media/zuguo.jpeg"
import yingxin from "../../media/yingxin.jpeg"
import sp2020web from "../../media/poster2020web.jpg"
import OneEvent from './OneEvent'

import {withRouter, Link} from "react-router-dom"

class Events extends Component {

    state = {
        events: [
            {
                title: "尚贝里2020年春节联欢会",
                subtitle: "1月25日 周六 上午九点半",
                pic: sp2020web,
                text: "",
                status: false
            },
            {
                title: "2019学年迎新晚会",
                subtitle: "10月18日 周五 晚七点",
                pic: yingxin,
                text: (<div>
                    <p>2019学年迎新晚会将于10月18日周五晚七点在市中心的社团之家举行，
                    晚会全程免费，并为大家提供晚餐，卡拉ok，互动游戏，还有专业的钢琴演奏等文艺节目，
                    欢迎同学们报名参加。</p>
                    <p><b>本活动入场自愿签到。</b></p>
                </div>),
                status: false
            },
            {
                title: "《我和我的祖国》观影活动",
                subtitle: "10月12日 周六 上午十点 下午五点",
                pic: zuguo,
                text: (<div>
                    <p>万众期待的电影《我和我的祖国》终于要在尚贝里上映了，
                    电影将于10月12日周六在Aix-les-bains市中心的的Cinéma Victoria上映，
                    我们为大家安排了两个场次，上午十点和下午五点，入场免费，欢迎观影。
                    </p>
                    <p><b>本活动入场自愿签到。</b></p>
                </div>),
                status: false
            }
        ]
    }

    goto = where => e => {
        this.props.history.push(where)
    }

    render(){

        return (
            <div>
                <div className="box almost-width" onClick={this.goto("/events")}>
                    <h1 className="subtitle">
                        最新活动
                    </h1>
                </div>
                <div>
                    {
                        this.state.events.map((e, i) => (

                            <OneEvent
                                key={i}
                                title={e.title}
                                subtitle={e.subtitle}
                                preview={this.props.preview}
                                pic={e.pic}
                                status={e.status}
                            >{e.text}</OneEvent>

                        ))
                    }
                </div>

                <div className="split"></div>

                {
                    this.props.preview
                        ? ""
                        : (
                            <nav className="pagination is-centered almost-width" role="navigation" aria-label="pagination">
                                <a className="pagination-previous background-white">上一页</a>
                                <a className="pagination-next background-white">下一页</a>
                                <ul className="pagination-list">
                                    <li><a className="pagination-link is-current" aria-label="Goto page 1">1</a></li>
                                </ul>
                            </nav>
                        )
                }

                <div className="split"></div>
            </div>
        )
    }
}

export default withRouter(Events)
