import React from 'react';

class Desserts extends React.Component {

    render() {
        return (
            <div className = 'py-3'>
            <h1>Desserts</h1>
            <ul className='list-group'>
                {this.props.data.items.map((item, index) => {
                    return (
                        <li className='list-group-item' key={index}>
                            <h3>{this.props.nameGen(item.description)}</h3>
                            <p className='float-left'>{item.description}</p>
                            <p className='float-right'>${(Math.random() * (20 - 8) + 8).toFixed(2)}</p>
                        </li>
                    )
                })}
            </ul>
            </div>
        )
    }
}

export default Desserts