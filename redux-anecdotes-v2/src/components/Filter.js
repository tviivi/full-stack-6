import React from 'react'
import { filterChange } from './../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (event) => {
        this.props.store.dispatch(filterChange(event.target.value.toLowerCase()))
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

export default Filter