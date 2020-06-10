import React from 'react'
import { Link } from "react-router-dom"
import mapUser from '../mapUser'

const AdminMenu = ({user}) => {

    return (
        user.email === "i@yinyan.fr"
            ? (
                <>
                    <p className="menu-label">
                        管理员工具
                    </p>
                    <ul className="menu-list">
                        <li><Link to="/home/admin/sp2020">2020年春晚报名信息</Link></li>
                    </ul>
                    <ul className="menu-list">
                        <li><Link to="/home/admin/userlist">用户管理</Link></li>
                    </ul>
                    <ul className="menu-list">
                        <li><Link to="/home/admin/danmakulist">弹幕管理</Link></li>
                    </ul>
                </>
            )
            : ""
    )
}

export default mapUser(AdminMenu)
