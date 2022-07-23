var typeToStatusCode = {
    conflict: 409,
    not_found: 404,
    unauthorized: 401,
    wrong_schema: 422
};
export function errorHandler(error, req, res, next) {
    console.log(error);
    if (error.type) {
        return res.status(typeToStatusCode[error.type]).send(error.message);
    }
    res.sendStatus(500);
}
