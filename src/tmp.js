const uuid = () => "some uuid"
let html = `
<h1>hhh1</h1>
<h2 class="title">hhh2<p>ppp</p></h2>
<p>something else</p>
ssss
<h3>hhh3</h3>
<h4>hhh4</h4>
<h5>hhh5</h5>
`

const titlelist = []

const regex = /<(h[1-5])((?! *id)[^>]*)>(.*)<\/\1>/

while(html.match(regex)){
    const id = uuid()
    html = html.replace(regex, `<$1 id="${id}"$2>$3</$1>`)
    titlelist.push({
        tag: RegExp.$1,
        id,
        title: RegExp.$3
    })
}

console.log(html)
console.log(titlelist)
