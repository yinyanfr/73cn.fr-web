import React, { Component } from 'react'

class OneNew extends Component {

    state = {
        text: false
    }

    onText = e => {
        e.preventDefault()
        if (this.props.preview) {
            this.setState(() => ({ text: true }))
        }
    }


    render() {

        return (
            <div className="box almost-width" onClick={this.onText}>
                <article className="media">
                    {
                        this.props.preview && !this.state.text
                            ? (
                                <div className="media-left">
                                    <figure className="image is-64x64">
                                        <img src={this.props.pic} alt="Image" />
                                    </figure>
                                </div>
                            )
                            : ""
                    }
                    <div className="media-content">
                        <h1 className="title">{this.props.title}</h1>
                        <h2 className="subtitle">{this.props.subtitle || "&nbsp;"}</h2>
                        {
                            this.props.preview
                                ? ""
                                : (
                                    <div className="indent-two">
                                        <img src={this.props.pic} alt="image" className="news-image" />
                                        {this.props.children}
                                    </div>
                                )
                        }

                        {
                            this.state.text
                                ? (
                                    <div className="indent-two">
                                        <img src={this.props.pic} alt="image" className="news-image" />
                                        {this.props.children}
                                    </div>
                                )
                                : ""
                        }
                    </div>
                </article>
            </div>
        )
    }
}

export default OneNew
