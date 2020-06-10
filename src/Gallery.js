import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/css/image-gallery.css"

import chunwan18 from "./media/chunwan18.jpg"
import yingxin from "./media/yingxin.jpeg"
import shaokao from "./media/shaokao.jpeg"
import zuguo from "./media/zuguo.jpg"
import zuguo2 from "./media/zuguo2.jpg"
import alb from "./media/alb.jpg"
import zhanglei from "./media/zhanglei.jpg"
import yingxin18 from "./media/yingxin18.jpg"
import zhongwen from "./media/zhongwen.jpg"

class Gallery extends Component {

    render() {

        const images = [
            alb, yingxin, chunwan18, shaokao,
            zuguo, zuguo2, zhanglei, yingxin18,
            zhongwen
        ].map(e => ({
            original: e,
            thumbnail: e
        }))

        return (
            <ImageGallery items={images} originalClass="is-16by9" autoPlay />
        );
    }
}

export default Gallery
