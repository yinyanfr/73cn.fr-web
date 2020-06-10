const langDefaultState = "fr"

export default (state = langDefaultState, action) => {
    switch(action.type){
        case "CHANGELANG":
            return action.data
        default:
            return state
    }
}
