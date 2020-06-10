import React, { Component } from 'react'
import mapUser from "./mapUser"
import Info from './Personal/Info'
import { withRouter, Route } from "react-router-dom"
import Repassword from './Personal/Repassword'
import Nav from './Nav'
import Contact from './About/Contact'
import Style from './Personal/Style'
import Star from './Personal/Star'
import Setting from './Personal/Setting'
import Myevents from './Personal/Myevents'
import Home from './Personal/Home'
import Roadmap from './About/Roadmap'
import Side from './Side'
import Admin from './Admin/Admin'
import Toolbox from './Personal/tools/Toolbox'
import Currency from './Personal/tools/Currency'
import Brochure from './Personal/tools/Brochure'
import Links from './Personal/tools/Links'
import Compte from './Personal/tools/Compte'
import Trip from './Trip/Trip'

class Dashboard extends Component {

    componentDidMount = () => {
        if(!(/^\/home/.test(this.props.match.url))){
            this.props.history.push("/home")
        }
    }

    state = {
        menu: false
    }

    onMenu = e => {
        e.preventDefault()
        this.setState(prev => ({
            menu: !prev.menu
        }))
    }

    render() {

        // console.log(this.props.match)
        return (
            <div className="background-white">
                <Nav />
                <div className="is-padding">
                    <div className={
                        localStorage.getItem("column") === "true"
                        ? "columns horizontal"
                        : "columns"
                    }>
                        {
                            window.innerWidth >= 770
                                ? (
                                    <div className={
                                        localStorage.getItem("column") === "true"
                                        ? "column"
                                        : "column is-one-fifth"
                                    }>
                                        <Side />
                                    </div>
                                )
                                : (
                                    <div>
                                        <Side />
                                    </div>
                                )
                        }

                        <div className="column home">

                            <Route exact path="/home" component={() => <Home />} />
                            <Route path="/home/info" component={() => <Info />} />
                            <Route path="/home/reset" component={() => <Repassword />} />
                            <Route path="/home/contact" component={() => <Contact />} />
                            <Route path="/home/style" component={() => <Style />} />
                            <Route path="/home/star" component={() => <Star />} />
                            <Route path="/home/setting" component={() => <Setting />} />
                            <Route path="/home/appsetting" component={() => <Setting />} />
                            <Route path="/home/devsetting" component={() => <Setting />} />
                            <Route path="/home/myevents" component={() => <Myevents />} />
                            <Route path="/home/roadmap" component={() => <Roadmap />} />

                            <Route path="/home/admin">
                                <Admin />
                            </Route>

                            <Route path="/home/toolbox">
                                <Toolbox />
                            </Route>

                            <Route path="/home/currency">
                                <Currency />
                            </Route>

                            <Route path="/home/brochure">
                                <Brochure />
                            </Route>

                            <Route path="/home/links">
                                <Links />
                            </Route>

                            <Route path="/home/compte">
                                <Compte />
                            </Route>

                            <Route path="/home/trip">
                                <Trip />
                            </Route>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(mapUser(Dashboard))
