import store from "../../redux/configureStore"
import request from "superagent"

const signout = () => {
    const token = localStorage.getItem("token")
    request.delete("/logout")
        .set("x-auth", token)
        .end((err, res) => {
            if(err){
                console.log(err)
            }else{
                localStorage.removeItem("token")
                store.dispatch({
                    type: "DELETEUSER"
                })
            }
        })
}

export default signout
