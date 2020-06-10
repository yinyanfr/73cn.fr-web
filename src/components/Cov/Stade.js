import React from 'react'

import stade1 from "./stade1.jpg"
import stade2 from "./stade2.jpg"
import stade3 from "./stade3.jpg"

const Stade = () => {

    return (
        <div>
            <h1 className="title">什么是法国防疫的Stade 1， 2，3阶段 ？</h1>

            <p>
                根据法国国家卫生与社会事务部2月20日出台的《Covid-19流行病风险防范指导》（以下简称《Covid-19指导》），法国的疫情目前处于第1和第2阶段，还没有病毒的活跃传播，只有个别的确诊病例被隔离。
            </p>

            <p>
                根据《Covid-19指导》，通过对病毒活跃程度和病例数目的判断，将疫情发展分为四个阶段，其中前三个阶段需要做出相应的举措来控制疫情的发展。
            </p>

            <figure className="image">
                <img src={stade1} alt="stade" />
            </figure>

            <h2 className="subtitle">第1和2阶段：阻止病毒输入和传播！</h2>
            <p>在这个阶段，目标是减缓病毒进入国家的速度，并抑制其蔓延。</p>

            <figure className="image">
                <img src={stade2} alt="stade" />
            </figure>

            <p>具体措施</p>
            <ul>
                <li>针对【确诊病例、疑似病例】：及时发现隔离、定位、确保医疗</li>
                <li>针对【确诊病例的密切接触者】：及时监测其状况</li>
                <li>确认疫情传播源地区</li>
                <li>部分严重地区的学校停学</li>
                <li>限制集会</li>
                <li>确保卫生产品的供应</li>
                <li>要求各入境口岸（国际机场和港口）采取措施，限制病毒从他国入境。</li>
            </ul>
            <p>目前，已有法令出台【用于个人卫生的水醇凝胶（就是干洗洗手液）的价格限制为每100毫升3欧元】，旨在保护消费者免于市场抬价的困扰。</p>

            <h2 className="subtitle">第3阶段：减轻疫情的影响</h2>
            <figure className="image">
                <img src={stade3} alt="stade" />
            </figure>

            <p>具体措施</p>
            <ul>
                <li>公共交通受影响（视情况暂停）</li>
                <li>学校停学</li>
                <li>限制集会</li>
                <li>对旅客采取控制措施</li>
                <li>所有专业医疗人员做好准备</li>
            </ul>

            <p>《Covid-19指导》强调：在这一阶段，医疗资源要高效利用，所有医疗机构都要参与对Covid-19的防控，严格隔离疫区和感染源。</p>

            <h2 className="subtitle">根据法媒 20 minutes报道，当前对于疫情的发展，有三个重要论断</h2>
            <ol>
                <li>法国正处于对抗新冠病毒计划的第2阶段。</li>
                <li>根据法国总统马克龙的说法：“法国进入了一个持续数周甚至数月的阶段，要做好打持久战的准备。”</li>
                <li>如果疫情进入第3阶段，政府可以借鉴2011年制定的应对流感大流行的措施。</li>
            </ol>

            <p>扩展阅读：<a target="_blank" href="https://mp.weixin.qq.com/s/Z3toCVpp_tWjv06wgAKVbA">2011年制定的应对流感大流行的措施</a></p>
        </div>
    )
}

export default Stade
