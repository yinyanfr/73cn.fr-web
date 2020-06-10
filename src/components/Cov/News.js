import React from 'react'

const src = "https://73cn.fr/news.jpg"

const News = () => {

    return (
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    实时追踪
                </p>
            </header>

            <div className="card-image">
                <figure className="image">
                    <img src={src} alt="news" />
                </figure>
            </div>
        </div>
    )
}

export default News
