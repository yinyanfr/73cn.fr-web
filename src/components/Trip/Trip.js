import React, { useState, useEffect } from 'react'
import request from "superagent"
import mapUser from "../mapUser"
import TripIntro from './TripIntro'
import TripForm from './TripForm'
import TripList from './TripList'

import "./Trip.scss"

const Trip = ({ user }) => {

    const [union, setUnion] = useState(null)
    const [tag, setTag] = useState("form")
    const [tripId, setTripId] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        request.get("/union")
            .set("x-auth", token)
            .then(res => {
                setUnion(res.body.union)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            {
                union
                    ? (
                        <div>
                            <TripIntro />
                            <div className="tabs">
                                <ul>
                                    <li className={tag === 'form' ? "is-active" : ""}>
                                        <a onClick={() => {setTag("form")}}>
                                            新增回国
                                        </a>
                                    </li>
                                    <li className={tag === 'list' ? "is-active" : ""}>
                                        <a onClick={() => {setTag("list")}}>
                                            提交记录
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {
                                tag === "form"
                                ? <TripForm union={union} tripId={tripId} onModified={() => {
                                    setTripId(null)
                                }} />
                                : ""
                            }
                            {
                                tag === "list"
                                ? <TripList union={union} modify={(tripId) => {
                                    setTripId(tripId)
                                    setTag("form")
                                }} />
                                : ""
                            }
                        </div>
                    )
                    : "haha"
            }


        </div>
    )
}

export default mapUser(Trip)