const insatnces = {}
export function register(id , callback) {
    insatnces[id] = callback;
}
export function unregister(id) {
    delete insatnces[id]
}