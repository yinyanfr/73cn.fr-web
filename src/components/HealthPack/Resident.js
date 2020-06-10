import React, { useState } from 'react'

import unions from "./cities.json"

const Resident = ({ union, setResident }) => {

    const [noti, setNoti] = useState(false)
    const city = unions.find(e => e.value === union)

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <h1 className="title">您现在是否住在{city ? city.label : union}？</h1>
                <div className="level-wrapper">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <div
                                    className="big-button green"
                                    onClick={() => {
                                        setResident("true")
                                    }}
                                >
                                    是
                                </div>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <div
                                    className="big-button red"
                                    onClick={() => {
                                        setNoti(true)
                                    }}
                                >
                                    否
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                noti
                    ? (
                        <div className="noti">
                            请联络所在地学联负责人
                        </div>
                    )
                    : ""
            }
        </div>
    )
}

export default Resident
