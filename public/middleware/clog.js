// Log requests
const clog = (req, res, next) => {console.info(`${req.method} request to ${req.path}`)};
exports.clog = clog;