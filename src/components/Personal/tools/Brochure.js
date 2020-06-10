import React from 'react'
import { Link } from 'react-router-dom'

const Brochure = () => {

    return (
        <div>
            <h1 className="title">新生手册</h1>
            <h2 className="subtitle">新生手册编撰中，请稍后再来。</h2>

            <p>如果你希望贡献内容，欢迎<Link to="/home/contact">联系我们</Link></p>
        </div>
    )
}

export default Brochure
