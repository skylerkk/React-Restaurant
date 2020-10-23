import React from 'react';

class Menu extends React.Component {

  render() {
    return (
      <div className='py-3'>
        {/* Title */}
        <h1>{this.props.data.name}</h1>
        <ul className='list-group'>
          {/* Loop through all items in data and get a title, description and random price */}
          {this.props.data.items.map((item, index) => {
            return (
              <li className='list-group-item' key={index}>
                <h3>{item.title}</h3>
                <p className='float-left'>{item.item}</p>
                <p className='float-right'>${item.price}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Menu