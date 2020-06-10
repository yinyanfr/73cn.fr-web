import React, { Component } from 'react'

class Roadmap extends Component {

    render(){

        return (
            <div>
                <h1 className="title">Road Map</h1>
                <h2 className="subtitle">感谢您关注尚贝里学联网站开发进度</h2>

                <article>
                    <h2 className="title">开发计划</h2>
                    <p>网站开发是一个巨大的工程，因此也会分成多个部分来完成。</p>
                    <p>这里记录了网站开发的记录和将要实现的功能，和开发的日程计划</p>
                    <p>这里更多的是一些日记性质的内容，网站代码以非公开的形式托管于GitHub，
                    对源代码感兴趣或想要参与开发的话，请与我联系。</p>

                    <p><b>10月16日 网站进度延迟</b></p>
                    <p>
                    最近发生了太多的事情，无论是电影的事情超出常理的工作量，还是迎新晚会的准备工作，
                    还是学校的事情以及家里的问题，每一项都在拖延我的进度，
                    到现在内站的部分（用户的个人中心）已经完成了，要赶在迎新晚会开始之前把外站（网站本身）做好。
                    </p>

                    <p><b>10月11日 网站预公开</b></p>
                    <p>
                    网站预先在尚贝里留学生群里公开了，加了一个简单的弹幕功能，希望大家有点兴趣来看一看。
                    同时也加了一个倒计时，希望能在时间结束之前完成。
                    </p>

                    <p><b>10月10日 网站上线计划</b></p>
                    <p>
                    网站是为了电影活动报名建立的，但是基本上无法赶上在电影上线之前完成了，
                    但是无论如何作为能够上线必须具有的功能，活动报名的功能被确定为第一个要实现的功能了，
                    但实际上这也意味着同时要实现一个还算可以用的用户系统，
                    包括用户的登录注册，个人信息，设置，之类的事情。
                    </p>

                    <p><b>10月8日 网站立项</b></p>
                    <p>用来进行活动报名的微信群被封了，我认为微信群功能孱弱，步骤繁琐，而且不可靠，
                    所以把当年做网站的想法又捡了回来，买了域名直接开始写代码。</p>
                </article>
                <br />
                <article className="is-white">
                    <h2 className="title is-white">关于网站</h2>
                    <p>我很早就想做学联的网站了，甚至两年前在迎新晚会上就公开说要做了。</p>
                    <p>后来的事情大家都知道了，当时的网站并没有做成。</p>
                    <br />
                    <p>
                    在尚贝里待得时间比较久的同学可能都知道，两年前的时候学联的状况很糟糕，
                    那时候学联在学生中评价不高，和周边华人华侨的关系也彻底破裂了，
                    又赶上当年学校整体学费涨价，新生数量骤减，
                    我当时在迎新晚会上提了网站的事情，说要解决举办活动，二手物品交易，租房，一系列问题。
                    </p>
                    <p>毫无意外，没有人把它当回事。</p>
                    <br />
                    <p>而做网站本身也是一项巨大的工程，
                    当时我刚升上研究生，一下子变得很忙，业务水平也不够高，所以网站的事情就不了了之了。</p>
                    <br />
                    <p>
                    在现在这个时间点上把做网站这件事情重新提出来，也是因为当时面对的种种困难，
                    无论是靠时间还是我们的努力，都在一定程度上有了改善，
                    学生的数量有所恢复，我们也和尚贝里的各个学生群体重新取得了联系。
                    华人华侨那边我们今年成立了中文班，以此为基础建立了和周边地区华人华侨们的联系，
                    因此电影活动的报名人数超出了我的预计，也让我觉得做网站这件事又变得可行了。
                    </p>
                    <br />
                    <p>所以我希望重新开始做这个网站，以此弥补当初做的承诺。</p>
                </article>

            </div>
        )
    }
}

export default Roadmap
