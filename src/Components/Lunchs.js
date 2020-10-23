import React from 'react';

class Lunchs extends React.Component {

    render() {
        return (
            <div className = 'py-3'>
            {/* Title */}
            <h1>Lunches</h1>
            <ul className='list-group'>
            {/* Loop through all items in data and get a title, description and random price */}
                {this.props.data.items.map((item, index) => {
                    return (
                        <li className='list-group-item' key={index}>
                            <h3>{this.props.nameGen(item.description)}</h3>
                            <p className='float-left'>{item.description}</p>
                            <p className='float-right'>${(Math.random() * (16 - 10) + 10).toFixed(2)}</p>
                        </li>
                    )
                })}
            </ul>
            </div>
        )
    }
}

export default Lunchs