import React from 'react';

class Dinners extends React.Component {

    render() {
        return (
            <div className = 'py-3'>
            <h1>Dinners</h1>
            <ul className='list-group'>
                {this.props.data.items.map((item, index) => {
                    return (
                        <li className='list-group-item' key={index}>
                            <h3>{this.props.nameGen(item.description)}</h3>
                            <p className='float-left'>{item.description}</p>
                            <p className='float-right'>${(Math.random() * (34 - 12) + 12).toFixed(2)}</p>
                        </li>
                    )
                })}
            </ul>
            </div>
        )
    }
}

export default Dinners