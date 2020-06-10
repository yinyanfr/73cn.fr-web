import React from 'react'

import prevent1 from "./prevent1.jpg"
import prevent2 from "./prevent2.jpg"
import prevent3 from "./prevent3.jpg"
import prevent4 from "./prevent4.jpg"
import prevent5 from "./prevent5.jpg"
import prevent6 from "./prevent6.jpg"

const Prevent = () => {

    return (
        <div>
            <h1 className="title">如何预防新型冠状病毒</h1>
            {
                [prevent1, prevent2, prevent3, prevent4, prevent5, prevent6].map((e, i) => (
                    <figure key={i} className="image">
                        <img src={e} alt="prevent" />
                    </figure>
                ))
            }
        </div>
    )
}

export default Prevent
