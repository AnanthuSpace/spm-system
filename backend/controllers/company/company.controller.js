const pongFromCompany = async (req, res) => {
    console.log("Pong from Company Controller")
    res.send("Pong from Company Controller")
}

const companyRegistration = async (req, res) => {
    try {
        res.render("company/companyRegister");
    } catch (error) {
        next(error);
    }
}

module.exports = { pongFromCompany, companyRegistration }