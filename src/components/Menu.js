import React from 'react'
import { Link, useHistory } from "react-router-dom"

import signout from './Personal/signout'
import AdminMenu from './Admin/AdminMenu'

const Menu = () => {

    const history = useHistory()

    return (
        <aside className="menu">
            <AdminMenu />

            <p className="menu-label">
                账号安全
                </p>
            <ul className="menu-list">
                <li><Link to="/home/reset">修改密码</Link></li>
                <li><a onClick={() => {
                    signout()
                    history.push("/")
                }}>退出登录</a></li>
            </ul>
        </aside>
    )
}

export default Menu
