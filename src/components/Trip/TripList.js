import React, { useState, useEffect } from 'react'
import Noti from '../Noti'
import request from "superagent"
import forminfo from "./forminfo.json"
import moment from "moment"
import "moment/locale/zh-cn"
import { json2excel } from "js2excel"
import o2ts from "objectid-to-timestamp"

const groupBy = (l, prop) => {
    const raw = {}
    l.forEach(e => {
        raw[e[prop]] = raw[e[prop]] || []
        raw[e[prop]].push(e)
    })
    let res = []
    for(let key in raw){
        res = res.concat(raw[key])
    }
    return res
}

const TripList = ({ union, modify }) => {

    const [list, setList] = useState([])
    const [modal, setModal] = useState(null)
    const [info, setInfo] = useState({})
    const [sortUnion, setSortUnion] = useState(false)
    const [sortDate, setSortDate] = useState(false)
    const [sortBy, setSortBy] = useState(null)

    const updateList = (token) => (
        request.get("/trips")
            .set("x-auth", token)
            .then(({ body }) => {
                setList(body)

                request.get("/alltrips")
                    .set("x-auth", token)
                    .then(({ body }) => {
                        setList(body)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    )

    useEffect(() => {
        const token = localStorage.getItem("token")
        updateList(token)
    }, [])

    const onDelete = () => {
        if (modal) {
            const token = localStorage.getItem("token")

            request.delete(`/trip/${modal}`)
                .set("x-auth", token)
                .then(() => {
                    setModal(null)
                    updateList(token)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const sortByUnion = () => {
        setSortUnion(sortUnion => !sortUnion)
        setSortBy("union")
        setList(list => groupBy(list, "union").reverse())
    }

    const sortByDate = () => {
        setSortDate(sortDate => !sortDate)
        setSortBy("date")
        setList(
            list => list.slice()
                .sort((m, n) => (sortDate ? 1 : -1) * (new Date(n.date) - new Date(m.date)))
        )
    }

    const format = (list) => {
        return list.map(e => {
            const res = {}
            res["学联"] = `${e.union}学联`
            forminfo.forEach(fi => {
                if (fi.name === "gender") {
                    if (e.gender === "male") {
                        res[fi.chs] = "男"
                    }
                    if (e.gender === "female") {
                        res[fi.chs] = "女"
                    }
                }
                else if (fi.name === "date") {
                    res[fi.chs] = moment(e.date).locale("zh-cn").format("LL")
                }
                else res[fi.chs] = e[fi.name]
            })
            return res
        })
    }

    const xlsx = () => {
        json2excel({
            data: format(list),
            name: moment().format(),
            formateDate: 'yyyy/mm/dd'
        })
    }

    return (
        <div>
            <Noti color="is-info" identifier="trip-list">
                <ul>
                    <li>你能够查看，编辑和删除你提交的信息，管理员能查看所有人提交的信息</li>
                    <li>若没有查看权限，本页面将不会加载任何信息</li>
                </ul>
            </Noti>

            <div className="field is-grouped">
                <div className="control">
                    <button
                        className="button is-primary"
                        onClick={xlsx}
                    >
                        导出xlsx
                    </button>
                </div>
            </div>

            <table className="table is-striped is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        {
                            list.length
                                ? (
                                    <>
                                        <th>操作</th>
                                        <th>添加日期</th>
                                        <th onClick={sortByUnion}>学联 <i className={
                                            sortBy === "union"
                                                ? (
                                                    sortUnion
                                                        ? "fas fa-sort-up"
                                                        : "fas fa-sort-down"
                                                )
                                                : "fas fa-sort"
                                        }></i></th>
                                        {
                                            forminfo.map((e, i) => {
                                                if (e.name === "date") {
                                                    return (
                                                        <th
                                                            key={i}
                                                            onClick={sortByDate}
                                                        >{e.chs} <i className={
                                                            sortBy === "date"
                                                                ? (
                                                                    sortDate
                                                                        ? "fas fa-sort-up"
                                                                        : "fas fa-sort-down"
                                                                )
                                                                : "fas fa-sort"
                                                        }></i></th>
                                                    )
                                                }
                                                return <th key={i}>{e.chs}</th>
                                            })
                                        }
                                    </>
                                )
                                : <th></th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((el, i) => (
                            <tr key={i}>
                                <td>{
                                    el.union === union
                                        ? (
                                            <span className="trip-icons">
                                                <a
                                                    href="#"
                                                    onClick={() => {
                                                        modify(el._id)
                                                    }}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </a>

                                                <a
                                                    onClick={() => {
                                                        setModal(el._id)
                                                        setInfo({
                                                            name: el.name,
                                                            date: el.date
                                                        })
                                                    }}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </a>
                                            </span>
                                        )
                                        : ""
                                }</td>
                                <td>{moment(o2ts(el._id)).locale("zh-cn").format("LL")}</td>
                                <td>{`${el.union}学联`}</td>
                                {
                                    forminfo.map((e, i) => {
                                        if (e.name === "gender") {
                                            if (el.gender === "male") {
                                                return <td key={i}>男</td>
                                            }
                                            if (el.gender === "female") {
                                                return <td key={i}>女</td>
                                            }
                                        }

                                        if (e.name === "date") {
                                            return <td key={i}>{
                                                moment(el.date).locale("zh-cn").format("LL")
                                            }</td>
                                        }

                                        return <td key={i}>{el[e.name]}</td>
                                    })
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className={
                modal
                    ? "modal is-active"
                    : "modal"
            }>
                <div
                    className="modal-background"
                    onClick={() => {
                        setModal(null)
                    }}
                ></div>
                <div className="modal-content">
                    <div className="box">
                        <h1 className="title">提示：删除动作不可撤销，请您确认</h1>
                        <h2 className="subtitle">
                            你正在删除{
                                info.date
                                    ? `于${moment(info.date).format("MMM Do YY")}出发的`
                                    : ""
                            }
                            {info.name}同学的回国信息
                        </h2>
                        <div className="field twin-buttons">
                            <div className="control">
                                <button
                                    className="button is-danger"
                                    onClick={onDelete}
                                >
                                    删除
                                </button>
                            </div>

                            <div className="control">
                                <button
                                    className="button is-text"
                                    onClick={() => {
                                        setModal(null)
                                    }}
                                >
                                    取消
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={() => {
                        setModal(null)
                    }}
                ></button>
            </div>

        </div>
    )
}

export default TripList
