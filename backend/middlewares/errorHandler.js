export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong!",
    });
};

export const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: "Page Not Found",
    });
};

