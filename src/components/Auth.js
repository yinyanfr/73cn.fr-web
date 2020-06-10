import React, { Component } from 'react'
import request from "superagent"
import xss from "xss"
import Account from './Account'

import mapUser from "./mapUser"
import {withRouter} from "react-router-dom"

// load Component Comp
// add token and user to it's props
// return Account if token is not found

class Auth extends Component {


    render() {

        return (
            <div className="background-white">
                {
                    this.props.user
                        ? this.props.children
                        : (
                            <div className="is-padding">
                                <h2 className="subtitle">
                                    您好，您需要登录才能浏览本页面，
                                    若您没有尚贝里学联ID，
                                    请点击“注册”选项卡注册
                                </h2>
                                <Account register={this.props.register} />
                            </div>
                        )
                }
            </div>
        )
    }
}

export default withRouter(mapUser(Auth))
