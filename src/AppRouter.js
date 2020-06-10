import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import mapUser from "./components/mapUser"
import request from "superagent"
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import Forgot from './components/Personal/Forgot'
import Repassword from './components/Personal/Repassword'
import Footer from './components/Footer'
import Intervention from './Intervention'

class AppRouter extends Component {

  componentDidMount = () => {
    const token = localStorage.getItem("token")

    if (token) {
      request.get("/me")
        .set("x-auth", token)
        .end((err, res) => {
          if (err) {
            console.log(err.status)
            if (err.status !== 401) {
              this.setState(() => ({
                maintenance: true
              }))
            }
          }
          else {
            this.props.dispatch({
              type: "SETUSER",
              data: res.body
            })
          }
        })
    }
  }

  state = {
    maintenance: false
  }


  render() {

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={() => <App />} />
            <Route exact path="/news" component={() => <App />} />
            <Route exact path="/events" component={() => <App />} />
            <Route exact path="/comments" component={() => <App />} />
            <Route exact path="/contact" component={() => <App />} />
            <Route path="/home" component={() => <Auth><Dashboard /></Auth>} />
            <Route exact path="/forgot" component={() => (
              <div className="background-white">
                <div className="almost-width">
                  <Forgot />
                </div>
              </div>
            )} />
            <Route exact path="/reset/:jwt" component={() => (
              <div className="background-white">
                <div className="almost-width">
                  <Repassword />
                </div>
              </div>
            )} />
            <Route exact path="/login" component={() => <Auth><Dashboard /></Auth>} />
            <Route exact path="/register" component={() => <Auth register><Dashboard /></Auth>} />
            <Route path="/health">
              <App />
            </Route>

            <Route path="/Gallery">
              <App />
            </Route>

            <Route path="/hp">
              <App />
            </Route>

            <Route path="/hpadmin">
              <App />
            </Route>

            <Route component={() => <Intervention />} />
          </Switch>
          <Footer />
        </Router>
      </div>
    )
  }
}

export default mapUser(AppRouter)
