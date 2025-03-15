const pongFromStudent = async (req, res) => {
    console.log("Pong from Student Controller")
    res.send("Pong from Student Controller")
}


const renderHome = async (req, res) => {
    res.render("Home")
}


module.exports = {
    renderHome, pongFromStudent
}