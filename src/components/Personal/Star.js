import React, { Component } from 'react'
import {Link} from "react-router-dom"

class Star extends Component{

    render(){

        return (
            <article>
                <h1 className="title">申请认证</h1>

                <p>本功能用于进行个人或商户的身份认证，认证后将在您的用户名后显示认证标志。</p>
                <p>以便于您在将要推出的论坛和商户页面功能中更好地进行宣传。</p>
                <p>本功能正在开发中，开发进度请参考<Link to="/home/roadmap">Road Map</Link></p>
                <p>感谢您注册尚贝里学联网站，请保持关注</p>
                <p>若您有兴趣参与网站的开发，请<Link to="/home/contact">联系我们</Link></p>
            </article>
        )
    }
}

export default Star
