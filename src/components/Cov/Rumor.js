import React from 'react'
import Contact from './Contact'

const Rumor = () => {

    return (
        <div>
            <h1 className="title">大使馆提醒在法中国公民警惕不法分子冒充警察等行骗</h1>

            <p>
                近日，个别在法中国籍留学生反映，由于在公共场合佩戴口罩，
                被“警察”以违法为由处以150欧元的罚款。
                经向法国警方和法律人士核实，上述情况应系<b>不法分子假冒警察</b>所为，
                <b>出于健康原因而佩戴口罩并不违法。</b>
            </p>

            <p>此外，还有个别旅法侨胞反映，有<b>不法分子假冒政府防疫人员进入侨胞家中实施抢劫。</b></p>

            <p>
                中国驻法国大使馆提醒在法中国公民提高安全防范意识，警惕不法分子通过假冒警察、政府公务人员等以防疫为由实施诈骗、抢劫等行为。
                <b>如遇紧急情况，请及时报警，或联系中国驻法国使领馆寻求协助</b>
            </p>

            <p>法国报警电话：+33-17</p>
            
            <Contact />
        </div>
    )
}

export default Rumor
