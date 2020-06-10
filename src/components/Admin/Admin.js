import React from 'react'
import { Route } from 'react-router-dom'
import Sp2020Admin from '../Special/Sp2020Admin'
import Userlist from './Userlist'
import Danmakulist from './Danmakulist'

import "./Admin.scss"


const Admin = () => {

    return (
        <div>
            <Route path="/home/admin/sp2020">
                <Sp2020Admin />
            </Route>
            <Route path="/home/admin/userlist">
                <Userlist />
            </Route>
            <Route path="/home/admin/danmakulist">
                <Danmakulist />
            </Route>
        </div>
    )
}

export default Admin
