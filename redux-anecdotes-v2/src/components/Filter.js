import React from 'react'
import { filterChange } from './../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
    handleChange = (event) => {
        const muuttuja = event.target.value
        this.props.setFilter(muuttuja)
    }

    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
                filter <input onChange={this.handleChange} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFilter: (nimi) => {
            dispatch({ type: 'SET_FILTER', filter: nimi })
        }
    }
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter