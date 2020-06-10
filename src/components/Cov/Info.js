import React from 'react'

import info1 from "./info1.jpg"
import info2 from "./info2.jpg"

const Info = () => {

    return (
        <div>
            <h1 className="title">新型冠状病毒感染的肺炎知识普及</h1>
            <h2 className="subtitle">什么是新型冠状病毒？</h2>
            <figure className="image">
                <img src={info1} alt="info" />
            </figure>
            <figure className="image">
                <img src={info2} alt="info" />
            </figure>

            <dl>
                <dt>哪些人容易感染新型冠状病毒？</dt>
                <dd>人群普遍易感。新型冠状病毒感染的肺炎在免疫功能低下和免疫功能正常人群均可发生，与接触病毒的量有一定关系。对于免疫功能较差的人群，例如老年人、孕产妇或存在肝肾功能异常，有慢性病人群，感染后病情更重。</dd>
                <dt>新型冠状病毒的传播途径有哪些？</dt>
                <dd>主要传播方式是经飞沫传播、接触传播（包括手污染导致的自我接种）以及不同大小的呼吸道气溶胶近距离传播。目前近距离飞沫传播应该是主要途径。</dd>
                <dt>什么是飞沫传播？</dt>
                <dd>飞沫：一般认为直径＞5um的含水颗粒，飞沫可以通过一定的距离（一般为1米）进入易感的粘膜表面。</dd>
                <dd>飞沫的产生：</dd>
                <dd>（1）咳嗽、打喷嚏或说话</dd>
                <dd>（2）实施呼吸道侵入性操作，如：吸痰或气管插管、翻身、拍背等刺激咳嗽的过程中和心肺复苏等。</dd>
                <dt>什么是密切接触者？</dt>
                <dd>指14天内曾与病毒的确诊或高度疑似病例有过共同生活或工作的人。</dd>
                <dd>包括办公室的同事，同一教室、宿舍的同事、同学，同机的乘客等。以及其它形式的直接接触者包括病毒感染病人的陪护、乘出租车、乘电梯等。</dd>
            </dl>
        </div>
    )
}

export default Info
