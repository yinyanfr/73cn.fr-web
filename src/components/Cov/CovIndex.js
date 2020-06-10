import React from 'react'
import { useHistory } from 'react-router-dom'

import index from "./index.jpg"

const CovIndex = () => {

    const history = useHistory()

    return (
        <div
            className="cov-index-wrapper"
            onClick={() => {
                history.push("/health")
            }}
        >
            <div className="card cov-index">
                <div className="card-header">
                    <p className="card-header-title">
                        新型肺炎防疫专题页面
                </p>
                </div>

                <div className="card-image">
                    <figure className="image">
                        <img src={index} alt="news" />
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default CovIndex
