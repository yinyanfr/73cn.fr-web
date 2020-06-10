import React, { Component } from 'react'
import {Link} from "react-router-dom"

class Style extends Component{

    render(){

        return (
            <article>
                <h1 className="title">更换外观</h1>

                <p>本功能正在开发中，开发进度请参考<Link to="/home/roadmap">Road Map</Link></p>
                <p>网站的样式使用 <a href="https://bulma.io/">bulma.io</a> 开发</p>
                <p>
                    <a href="https://jenil.github.io/bulmaswatch/">这里</a>
                    有一些现有的替换主题
                </p>
                <p>若您有兴趣参与网站的开发，请<Link to="/home/contact">联系我们</Link></p>
            </article>
        )
    }
}

export default Style
