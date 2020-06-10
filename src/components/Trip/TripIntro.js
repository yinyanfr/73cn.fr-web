import React from 'react'
import Noti from '../Noti'

const TripIntro = () => {

    return (
        <div>
            <h1 className="title">
                中部地区近期回国人员统计
            </h1>

            <Noti color="is-link" identifier="trip">
                <ul>
                    <li>请学联主席汇总后填写，无需发给学生个人</li>
                    <li>学联名称自动填入，请确认是否正确，若不正确，请联系我</li>
                    <li>本页面只有获得权限的用户才能访问和提交内容，若访问者没有登录或者没有访问权限，本页面将显示为空白</li>
                </ul>
            </Noti>

            
        </div>
    )
}

export default TripIntro
