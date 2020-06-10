import React from 'react'
import {useHistory} from "react-router-dom"
import hp from "./hp.jpg"

const HPIndex = () => {

    const history = useHistory()

    return (
        <div
            className="cov-index-wrapper"
            onClick={() => {
                history.push("/hp")
            }}
        >
            <div className="card cov-index">
                <div className="card-header">
                    <p className="card-header-title">
                        点此领取健康包
                    </p>
                </div>

                <div className="card-image">
                    <figure className="image">
                        <img src={hp} alt="news" />
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default HPIndex
