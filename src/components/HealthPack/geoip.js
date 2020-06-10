import request from "superagent"

const api = "https://freegeoip.app/json/"

const citys = []

citys[69] = "lyon"
citys[73] = "chambery"
citys[38] = "grenoble"
citys[42] = "loire"
citys[49] = "loire"

const geoip = async () => {
    const {body} = await request.get(api)
    if(body){
        const {zip_code: zip} = body
        if(zip){
            const code = parseInt(zip.slice(0, 2))
            if(code){
                return citys[code]
            }
        }
    }
    return null
}

export default geoip
