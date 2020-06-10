import request from "superagent"

request.post("/question")
    .send({}) // req.body
    .end((err, res) => {
        if (err) { }//traiter erreur
        else {
            // traiter resultat
            console.log(res.body)
            res.status
        }
    })

request.post("/question")
    .send({}) // req.body
    .then(res => {

    })
    .catch(err => {
        
    })