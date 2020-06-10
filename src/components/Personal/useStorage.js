import { useState } from 'react'

const useStorage = (key, defaultValue = "false", notBoolean) => {
    const [item, setItem] = useState(localStorage.getItem(key) || defaultValue)
    const itemBoolean = item === "true" ? true : false

    const setStorage = (value) => {
        localStorage.setItem(key, value)
        setItem(value)
    }

    const setTrue = () => {
        setStorage("true")
    }

    const setFalse = () => {
        setStorage("false")
    }

    const toggle = () => {
        if(item === "true"){
            setFalse()
        }
        if(item === "false"){
            setTrue()
        }
    }

    if(notBoolean){
        return [
            item,
            setItem
        ]
    }else {
        return [
            itemBoolean,
            toggle,
            setItem,
            setTrue,
            setFalse,
        ]
    }
}

export default useStorage
