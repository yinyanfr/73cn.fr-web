import React, { Component } from 'react'
import OneNew from './OneNews'

import zuguo from "../../media/zuguo.jpg"
import nihao from "../../media/nihao.jpeg"

import {withRouter} from "react-router-dom"

class News extends Component {

    state = {
        news: [
            {
                title: "《我和我的祖国》观影活动顺利举办",
                subtitle: "10月12日，《我和我的祖国》顺利在Aix-les-bains上映",
                pic: zuguo,
                text: (
                    <div>
                        <p>10月12日应尚贝里学联广大学生、学者及华侨家庭的强烈要求，尚贝里学联和华人华侨合作成功组织了观赏电影《我和我的祖国》的学联国庆活动。</p>
                        <p>活动当日学联分别派出了两组人员带领上午观影和下午观影的两批学生前往影院，同时安排人员在影院接待自行前往观影的学生及华侨家庭。
                学联为观影精心打印了签名册，准备了中国和法国国旗，在上午和下午两场观影开始之前分别组织了部分观影群众与国旗合影留念。</p>
                        <p>观影前在学联组织的中文班上课的孩子们和老师及家长为了此次观影活动特意组织了我和我的祖国歌曲欣赏及国歌的学习活动，在课堂上播放了庄严的奏国歌升国旗视频，孩子们自发模仿足球队员们的样子全程肩搭肩向国旗行注目礼。</p>
                        <p>电影观众产生了强烈的共鸣，大家纷纷表示为电影所表达的爱国、奋进、奉献、拼搏的高尚情操所感染和激励。</p>
                    </div>
                )
            },
            {
                title: "中文班新学期正式开学",
                subtitle: "学联中文班第二学期正式开学，参与家庭达到15家",
                pic: nihao,
                text: (
                    <div>
                        <p>9月14日，由尚贝里学联举办的中文班第二学期正式开课。</p>
                        <p>中文班是学联应尚贝里和周边地区的华人华侨家庭的要求开设的长期活动，为尚贝里和周边地区的华人华侨家庭的孩子们提供学习中文的机会。</p>
                        <p>中文班第一学期从年初开始试行，经过一学期，中文班得到了家长们的肯定评价，参与家庭也增加到了15家。</p>
                        <p>新学期中文班将由更加经验丰富的老师进行教学。</p>
                    </div>
                )
            }
        ]
    }

    goto = where => e => {
        this.props.history.push(where)
    }

    render() {

        return (
            <div>
                <div className="box almost-width" onClick={this.goto("/news")}>
                    <h1 className="subtitle">
                        最新文章
                    </h1>
                </div>
                <div>
                    {
                        this.state.news.map((e, i) => (

                            <OneNew
                                key={i}
                                title={e.title}
                                subtitle={e.subtitle}
                                preview={this.props.preview}
                                pic={e.pic}
                            >{e.text}</OneNew>

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

export default withRouter(News)
