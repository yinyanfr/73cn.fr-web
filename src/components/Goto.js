import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Goto extends Component{

    render(){

        return (
            <a
                href="#"
                className={this.props.className || ""}
                onClick={e => {
                    this.props.history.push(this.props.to)
                }}
            >{this.props.children}</a>
        )
    }
}

export default withRouter(Goto)
