import React, { useState, useEffect } from 'react'
import request from "superagent"
import hpapi from './hpapi'
import { json2excel } from "js2excel"
import moment from "moment"
import { useHistory, useLocation } from "react-router-dom"

const getPage = (pathname) => {
    // /hpadmin/23 => 23
    return Math.ceil(pathname.split("/").slice(-1)[0])
}

const Num = 20

const HPAdmin = () => {

    const history = useHistory()
    const location = useLocation()

    const [students, setStudents] = useState([])
    const p = getPage(location.pathname)
    const [page, setPage] = useState(p ? p : 0)

    const [search, setSearch] = useState("")
    const [inc, setInc] = useState(true)

    const [nameFilter, setNameFilter] = useState("")

    useEffect(() => {
        const p = getPage(location.pathname)
        setPage(p ? p : 0)
    }, [location])

    const xlsx = (filtered) => () => {
        const data = []

        let list = []

        if (filtered) {
            list = students
                .filter(e => e.name.match(new RegExp(nameFilter, "i")))
                .filter(e => {
                    try {
                        const re = new RegExp(search, "i")
                        if (inc) {
                            return e.address.match(re)
                        }
                        else {
                            return !e.address.match(re)
                        }
                    }
                    catch (err) {
                        return true
                    }
                })
        }
        else {
            list = students
        }

        list.map((e) => {
            const t = {}
            const visaPath = e.visa.split("/").slice(-2)
            const schoolPath = e.school.split("/").slice(-2)
            const token = localStorage.getItem("token")


            t["姓名"] = e.name
            t["护照号"] = e.passport
            t["邮箱"] = e.email
            t["电话"] = e.phone
            t["地址"] = e.address
            t["身份证明"] = "https://73cn.fr" + hpapi(`${visaPath.join("/")}/${token}`)
            t["学校证明"] = "https://73cn.fr" + hpapi(`${schoolPath.join("/")}/${token}`)
            data.push(t)
        })
        json2excel({
            data,
            name: moment().format(),
            formateDate: 'yyyy/mm/dd'
        })
    }


    useEffect(() => {
        const token = localStorage.getItem("token")
        request.get(hpapi("students"))
            .set("x-auth", token)
            .then(res => {
                setStudents(res.body)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="box almost-width">
            <h1 className="title">
                学生信息
            </h1>
            <h2 className="请登录后查看"></h2>

            <div className="field is-grouped">
                <div className="control">
                    <button
                        className="button is-primary"
                        onClick={xlsx()}
                    >
                        导出xlsx
                    </button>
                </div>

                {
                    nameFilter.length || search.length
                        ? (
                            <div className="control">
                                <button
                                    className="button is-primary"
                                    onClick={xlsx(true)}
                                >
                                    导出过滤后的xlsx
                            </button>
                            </div>
                        )
                        : ""
                }
            </div>

            <div className="field">
                <label className="label">按姓名查找</label>
                <div className="control has-icons-left">
                    <input
                        type="text"
                        className="input"
                        value={nameFilter}
                        onChange={(e) => {
                            setNameFilter(e.target.value)
                        }}
                        placeholder="支持正则表达式"
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">按地址过滤</label>
                <div className="control has-icons-left">
                    <input
                        type="text"
                        className="input"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        placeholder="支持正则表达式"
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-filter"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <label className="radio">
                        <input
                            type="radio"
                            value="inc"
                            checked={inc}
                            onChange={() => { setInc(true) }}
                        />
                        包含
                    </label>
                    <label className="radio">
                        <input
                            type="radio"
                            value="inc"
                            checked={!inc}
                            onChange={() => { setInc(false) }}
                        />
                        排除
                    </label>
                </div>
            </div>

            <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                <a
                    className="pagination-previous"
                    onClick={() => {
                        history.push(`/hpadmin/${Math.max(page - 1, 0)}`)
                    }}
                >
                    上一页
                </a>
                <a
                    className="pagination-next"
                    onClick={() => {
                        history.push(`/hpadmin/${Math.min(page + 1, Math.ceil(students.length / Num) - 1)}`)
                    }}
                >
                    下一页
                </a>
                <ul className="pagination-list">
                    {
                        (() => {
                            if (Math.max(Math.ceil(students.length / Num) - 1 < 8)) {
                                return (
                                    new Array(Math.max(Math.ceil(students.length / Num), 0)).fill(0).map((e, i) => (
                                        <li key={i}>
                                            <a
                                                className={
                                                    page === i
                                                        ? "pagination-link is-current"
                                                        : "pagination-link"
                                                }
                                                aria-label={`Goto page ${i}`}
                                                onClick={() => {
                                                    history.push(`/hpadmin/${i}`)
                                                }}
                                            >
                                                {i}
                                            </a>
                                        </li>
                                    ))
                                )
                            }
                            else {
                                if (page < 3) {
                                    return (
                                        <>
                                            {
                                                new Array(4).fill(0).map((e, i) => (
                                                    <li key={i}>
                                                        <a
                                                            className={
                                                                page === i
                                                                    ? "pagination-link is-current"
                                                                    : "pagination-link"
                                                            }
                                                            aria-label={`Goto page ${i}`}
                                                            onClick={() => {
                                                                history.push(`/hpadmin/${i}`)
                                                            }}
                                                        >
                                                            {i}
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                            <li>
                                                <span className="pagination-ellipsis">&hellip;</span>
                                            </li>
                                            <li>
                                                <a
                                                    className="pagination-link"
                                                    aria-label="last page"
                                                    onClick={() => {
                                                        history.push(`/hpadmin/${Math.ceil(students.length / Num) - 1}`)
                                                    }}
                                                >
                                                    {Math.ceil(students.length / Num) - 1}
                                                </a>
                                            </li>
                                        </>
                                    )
                                }
                                else if (page > Math.ceil(students.length / Num) - 4) {
                                    return (
                                        <>
                                            <li>
                                                <a
                                                    className="pagination-link"
                                                    aria-label="first page"
                                                    onClick={() => {
                                                        history.push(`/hpadmin/0`)
                                                    }}
                                                >
                                                    {0}
                                                </a>
                                            </li>
                                            <li>
                                                <span className="pagination-ellipsis">&hellip;</span>
                                            </li>
                                            {
                                                new Array(4).fill(0).map((e, i) => (
                                                    <li key={i + Math.ceil(students.length / Num) - 4}>
                                                        <a
                                                            className={
                                                                page === i + Math.ceil(students.length / Num) - 4
                                                                    ? "pagination-link is-current"
                                                                    : "pagination-link"
                                                            }
                                                            aria-label={`Goto page ${i + Math.ceil(students.length / Num) - 4}`}
                                                            onClick={() => {
                                                                history.push(`/hpadmin/${i + Math.ceil(students.length / Num) - 4}`)
                                                            }}
                                                        >
                                                            {i + Math.ceil(students.length / Num) - 4}
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                            <li>
                                                <a
                                                    className="pagination-link"
                                                    aria-label="first page"
                                                    onClick={() => {
                                                        history.push(`/hpadmin/0`)
                                                    }}
                                                >
                                                    {0}
                                                </a>
                                            </li>
                                            <li>
                                                <span className="pagination-ellipsis">&hellip;</span>
                                            </li>

                                            {
                                                new Array(3).fill(0).map((e, i) => (
                                                    <li key={page + i - 1}>
                                                        <a
                                                            className={
                                                                page === page + i - 1
                                                                    ? "pagination-link is-current"
                                                                    : "pagination-link"
                                                            }
                                                            aria-label={`Goto page ${page + i - 1}`}
                                                            onClick={() => {
                                                                history.push(`/hpadmin/${page + i - 1}`)
                                                            }}
                                                        >
                                                            {page + i - 1}
                                                        </a>
                                                    </li>
                                                ))
                                            }

                                            <li>
                                                <span className="pagination-ellipsis">&hellip;</span>
                                            </li>
                                            <li>
                                                <a
                                                    className="pagination-link"
                                                    aria-label="last page"
                                                    onClick={() => {
                                                        history.push(`/hpadmin/${Math.ceil(students.length / Num) - 1}`)
                                                    }}
                                                >
                                                    {Math.ceil(students.length / Num) - 1}
                                                </a>
                                            </li>
                                        </>
                                    )
                                }
                            }




                            return ""
                        })()
                    }

                </ul>
            </nav>

            <table className="table is-striped is-hoverable">
                <thead>
                    <tr>
                        <td>姓名</td>
                        <td>护照</td>
                        <td>email</td>
                        <td>电话</td>
                        <td>地址</td>
                        <td>身份证</td>
                        <td>学校证明</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        students
                            .filter(e => e.name.match(new RegExp(nameFilter, "i")))
                            .filter(e => {
                                try {
                                    const re = new RegExp(search, "i")
                                    if (inc) {
                                        return e.address.match(re)
                                    }
                                    else {
                                        return !e.address.match(re)
                                    }
                                }
                                catch (err) {
                                    return true
                                }
                            })
                            .slice(page * Num, Math.min(students.length, (page + 1) * Num)).map((e, i) => {

                                const visaPath = e.visa.split("/").slice(-2)
                                const schoolPath = e.school.split("/").slice(-2)
                                const token = localStorage.getItem("token")

                                return (
                                    <tr key={i}>
                                        <td>{e.name}</td>
                                        <td>{e.passport}</td>
                                        <td>{e.email}</td>
                                        <td>{e.phone}</td>
                                        <td>{e.address}</td>
                                        <td>
                                            <a target="_blank" href={hpapi(`${visaPath.join("/")}/${token}`)}>
                                                {
                                                    visaPath[1] && visaPath[1].match(/.pdf$/)
                                                        ? <span>pdf</span>
                                                        : <img alt="visa" src={hpapi(`${visaPath.join("/")}/${token}`)} width={100} />
                                                }
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href={hpapi(`${schoolPath.join("/")}/${token}`)}>
                                                {
                                                    schoolPath[1] && schoolPath[1].match(/.pdf$/)
                                                        ? <span>pdf</span>
                                                        : <img alt="school" src={hpapi(`${schoolPath.join("/")}/${token}`)} width={100} />
                                                }
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </table>
            <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                <a
                    href="#"
                    className="pagination-previous"
                    onClick={() => {
                        history.push(`/hpadmin/${Math.max(page - 1, 0)}`)
                    }}
                >
                    上一页
                </a>
                <a
                    href="#"
                    className="pagination-next"
                    onClick={() => {
                        history.push(`/hpadmin/${Math.min(page + 1, Math.ceil(students.length / Num) - 1)}`)
                    }}
                >
                    下一页
                </a>

                <ul className="pagination-list">
                    <li>
                        <a
                            className="pagination-link is-current"
                            aria-label="this page"
                            onClick={() => {
                                history.push(`/hpadmin/${page}`)
                            }}
                        >
                            {page}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default HPAdmin
