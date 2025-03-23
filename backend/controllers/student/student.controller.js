const pongFromStudent = async (req, res, next) => {
    try {
        res.send("Pong from Student Controller");
    } catch (error) {
        next(error); 
    }
};

const renderHome = async (req, res, next) => {
    try {
        res.render("Home");
    } catch (error) {
        next(error);
    }
};

const renderLogin = async (req, res, next) => {
    try {
        res.render("user/login");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    renderHome,
    pongFromStudent,
    renderLogin
};
