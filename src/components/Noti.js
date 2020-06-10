import React, { useState } from 'react'

const Noti = ({ children, color, identifier }) => {

    const [show, setShow] = useState(localStorage.getItem(identifier) || "true")

    return (
        show === "true"
            ? (
                <div className={`notification ${color}`}>
                    <button
                        className="delete"
                        onClick={
                            () => {
                                localStorage.setItem(identifier, "false")
                                setShow("false")
                            }
                        }
                    ></button>
                    {children}
                </div>
            )
            : (<></>)
    )
}

export default Noti
