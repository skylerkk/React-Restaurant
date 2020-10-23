import React from 'react';

class Navbar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='container-fluid bg-dark p-0'>
                <nav className='navbar navbar-expand-lg navbar-dark'>
                    <a className="navbar-brand text-light">Suped Up Random</a>
                    <ul className='navbar-nav ml-auto'>
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
        )
    }
}

export default Navbar