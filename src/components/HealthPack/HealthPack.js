import React, { useState, useEffect } from 'react'
import Verify from './Verify'
import HPForm from './HPForm'

import "./HP.scss"
import Resident from './Resident'

const HealthPack = () => {

    const [union, setUnion] = useState("")
    const [passport, setPassport] = useState("")
    const [name, setName] = useState("")
    const [resident, setResident] = useState("false")


    return (
        <div className="box almost-width">
            <h1 className="title">健康包领取确认表</h1>
            {
                passport.length && name.length
                    ? (
                        resident === "true"
                        ? (
                            <HPForm
                            union={union}
                            passport={passport}
                            name={name}
                        />
                        )
                        : (
                            <Resident 
                                union={union}
                                setResident={setResident}
                            />
                        )
                    )
                    : (
                        <Verify popInfo={({ union, passport, name }) => {
                            setUnion(union)
                            setPassport(passport)
                            setName(name)
                        }} />
                    )
            }
        </div>
    )
}

export default HealthPack
