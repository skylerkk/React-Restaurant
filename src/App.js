import React from 'react';
import './App.css';
import axios from 'axios'
import Appitizers from './Components/Appitizers';
import Snacks from './Components/Snacks'
import Lunchs from './Components/Lunchs'
import Dinners from './Components/Dinners'
import Desserts from './Components/Desserts'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.pages = [{ readableName: 'Full Menu', url: 'full' }, { readableName: 'Appitizers', url: 'apps' }, { readableName: 'Snacks', url: 'snacks' }, { readableName: 'Lunches', url: 'lunch' }, { readableName: 'Dinners', url: 'dinner' }, { readableName: 'Desserts', url: 'dessert' }];
    this.state = {
      fullMenu: [],
      menu: [{ name: 'App', length: 8, items: [] },
      { name: 'Snacks', length: 8, items: [] },
      { name: 'Lunch', length: 10, items: [] },
      { name: 'Dinner', length: 15, items: [] },
      { name: 'Desserts', length: 2, items: [] }],
      renderChild: false,
      page: 0
    }
    this.getName = this.getName.bind(this)
    this.getPage = this.getPage.bind(this)
  }

  async componentDidMount() {

    let menu = window.localStorage.getItem('menu')
    let page = window.localStorage.getItem('page')

    if (menu) {
      await this.setState({ menu: JSON.parse(menu) })
    }
    else {
      await this.fillMenu();
    }

    if (page) {
      this.setState({ page: JSON.parse(page) })
    }
    else {
      window.localStorage.setItem('page', this.state.page)
    }
  }

  componentDidUpdate() {

    window.localStorage.setItem('menu', JSON.stringify(this.state.menu))
    window.localStorage.setItem('page', JSON.stringify(this.state.menu))
    if (this.state.menu[0].length > 0 && this.state.renderChild === false) {
      this.setState({ renderChild: true })
    }
  }

  async fillMenu() {

    let menu = await Promise.all(this.state.menu.map(async (item) => {

      let apiCall = `https://entree-f18.herokuapp.com/v1/menu/${item.length}`

      let items = await axios.get(apiCall)
        .then(function (response) {
          return response.data.menu_items;
        })
        .catch(function (error) {
          console.log('failed ', error);
        })
      item.items = items;
      return item;
    }))
    this.setState({ menu: menu });
  }

  getName(string) {
    return string.substring(0, string.indexOf('with'));
  }

  getPage(newPage) {
    this.setState({ page: newPage })
  }

  render() {
    return (
      <div>
        <Navbar
          pages={this.pages}
          currentPage={this.state.page}
          getPage={this.getPage}
        />
        <div className='py-4 text-center'>
          <h1 className='font-weight-bold'>Suped Up Random</h1>
          <h4>348 E Main St, Lexington, KY</h4>
          <h5>Hours: </h5>
          <h5>10 A.M. - 9 P.M.</h5>
          <h5>Monday - Saturday</h5>
        </div>
        {this.state.renderChild ? ((this.state.page === 0)?
          <div>
            <Appitizers
              data={this.state.menu[0]}
              nameGen={this.getName}
            />
            <Snacks
              data={this.state.menu[1]}
              nameGen={this.getName}
            />
            <Lunchs
              data={this.state.menu[2]}
              nameGen={this.getName}
            />
            <Dinners
              data={this.state.menu[3]}
              nameGen={this.getName}
            />
            <Desserts
              data={this.state.menu[4]}
              nameGen={this.getName}
            />
          </div> : '')
          : ''}

        {this.state.renderChild ? ((this.state.page === 1) ? <Appitizers
          data={this.state.menu[0]}
          nameGen={this.getName}
        /> : '') : ''}
        {this.state.renderChild ? ((this.state.page === 2) ? <Snacks
          data={this.state.menu[1]}
          nameGen={this.getName}
        /> : '') : ''}
        {this.state.renderChild ? ((this.state.page === 3) ? <Lunchs
          data={this.state.menu[2]}
          nameGen={this.getName}
        /> : '') : ''}
        {this.state.renderChild ? ((this.state.page === 4) ? <Dinners
          data={this.state.menu[3]}
          nameGen={this.getName}
        /> : '') : ''}
        {this.state.renderChild ? ((this.state.page === 5) ? <Desserts
          data={this.state.menu[4]}
          nameGen={this.getName}
        /> : '') : ''}
      </div>
    )
  }
}

export default App;
