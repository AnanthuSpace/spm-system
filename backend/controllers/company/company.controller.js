export const pongFromCompany = async (req, res) => {
    console.log("Pong from Company Controller");
    res.json({ message: "Pong from Company Controller" });
};

export const companyRegistration = async (req, res, next) => {
    try {
        res.status(201).json({ message: "Company registered successfully" });
    } catch (error) {
        next(error);
    }
};
