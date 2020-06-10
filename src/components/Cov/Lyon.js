import React from 'react'

import lyon1 from "./lyon1.jpg"
import lyon2 from "./lyon2.jpg"

const Lyon = () => {

    return (
        <div>
            <h1 className="title">里昂地区留学人员回国信息登记</h1>
            <h2 className="subtitle">由里昂学联提供</h2>

            <p>现需统计自3月1号起，计划或已经【从法国返回中国】的留学生数量，请相关同学扫描下方二维码 / 小程序码如实填写相关信息</p>

            <figure className="image image-width">
                <img src={lyon1} alt="lyon" />
            </figure>

            <figure className="image image-width">
                <img src={lyon2} alt="lyon" />
            </figure>
        </div>
    )
}

export default Lyon
