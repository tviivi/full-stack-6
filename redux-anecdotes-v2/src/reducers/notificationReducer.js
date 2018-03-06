const notificationAtStart = ''

export const notificationReducer = (store = notificationAtStart, action) => {
    if (action.type === 'CHANGE') {
        return action.cont
    }
    if (action.type === 'CREATENEW') {
        return action.cont
    }
    return store
}

export default notificationReducer