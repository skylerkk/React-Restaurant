import React from 'react';

class Navbar extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <div className='container-fluid bg-dark p-0'>
          <nav className='navbar navbar-expand-lg navbar-dark'>
            <a className="navbar-brand text-light">Suped Up Random</a>
            <ul className='navbar-nav ml-auto'>
              {/* go thourgh all pages and make a navbar with them and add an onlcick with the index as the pass through variable */}
              {
                this.props.pages.map((item, index) => {
                  return (
                    <li className="nav-item" key={index}>
                      <a
                        onClick={() => this.props.getPage(index)}
                        className={'nav-link text-light' + (this.props.currentPage === index ? 'active' : '')}
                      >
                        {item.readableName}
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        </div>
        <div className='py-4 text-center'>
          <h1 className='font-weight-bold'>Suped Up Random</h1>
          <h4>348 E Main St, Lexington, KY</h4>
          <h5>Hours: </h5>
          <h5>10 A.M. - 9 P.M.</h5>
          <h5>Monday - Saturday</h5>
        </div>
      </>
    )
  }
}

export default Navbar