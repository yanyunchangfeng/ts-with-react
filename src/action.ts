export function createAdd<T>(payload:T){
    return {
        type:'add',
        payload
    }
}
export function createRemove<T>(payload:T){
    return {
        type:'remove',
        payload
    }
}
export function createToggle<T>(payload:T){
    return {
        type:'toggle',
        payload
    }
}
export function createEdit<T>(payload:T){
    return {
        type:'edit',
        payload
    }
}