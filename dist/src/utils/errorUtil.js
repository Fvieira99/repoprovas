export function conflictError(message) {
    return { type: "conflict", message: message };
}
export function notFoundError(message) {
    return { type: "not_found", message: message };
}
export function unauthorizedError(message) {
    return { type: "unauthorized", message: message };
}
export function wrongSchemaError(message) {
    return { type: "wrong_schema", message: message };
}
