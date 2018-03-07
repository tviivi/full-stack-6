const filtersAtStart = ''

const filterReducer = (state = filtersAtStart, action) => {
    switch (action.type) {
        case 'SET_FILTER':
        console.log(state)
            return action.filter
        default:
            return state
    }
}

export const filterChange = (filter) => {
    return {
        type: 'SET_FILTER',
        filter
    }
}

export default filterReducer