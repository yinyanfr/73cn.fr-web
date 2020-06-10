import { connect } from "react-redux"

const mapStatetoProps = state => ({
    user: state.user
})

export default connect(mapStatetoProps)
