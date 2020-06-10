import React, { Component } from 'react'
import wx from "../../wx.jpg"

class Contact extends Component {

    render() {

        return (
            <div>
                <div className="box">
                    <h1 className="subtitle">联系我们</h1>
                </div>

                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            您可以通过邮件联系我们
                        </p>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            ucec_chambery@hotmail.com
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a
                            className="card-footer-item"
                            href="mailto:ucec_chambery@hotmail.com"
                        >发送邮件</a>
                    </footer>
                </div>

                <div className="split"></div>

                <div className="card half-width">
                    <div className="card-image">
                        <figure className="image is-1by1">
                            <img src={wx} alt="qr code" />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="content has-text-centered">
                            扫码关注学联公众号
                        </div>
                    </div>
                </div>

                <div className="split"></div>
            </div>
        )
    }
}

export default Contact
