const constants = require('../constants')

function errorHandler(err, req, res, next) {
    console.log("In error handler")
    const statusCode = req.statusCode ? req.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                "title": "Validation Failed",
                "message": err.message
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                "title": "Unauthorized",
                "message": err.message,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                "title": "Forbidden",
                "message": err.message,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                "title": "Not Found",
                "message": err.message,
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                "title": "Server Error",
                "message": err.message,
            });
            break;
        default:
            console.log("No errors all good!")
            break;
    }
    next();
}

module.exports = { errorHandler }; 