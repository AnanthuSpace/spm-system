const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).render("error", { error: err.message || "Something went wrong!" });
};

const notFoundHandler = (req, res) => {
    res.status(404).render("404", { error: "Page Not Found" });
};

module.exports = { errorHandler, notFoundHandler };
