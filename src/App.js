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
    // Set pages and state with menu items, renderChild, and page. Also bind getName and getPage methods
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

    //let menu and page set to those local storage names
    let menu = window.localStorage.getItem('menu')
    let page = window.localStorage.getItem('page')

    //if menu exist then set the state to the local storage value
    if (menu) {
      await this.setState({ menu: JSON.parse(menu) })
    }

    //else fill the menu
    else {
      await this.fillMenu();
    }

    //if page exist then set the state as the local storage value
    if (page) {
      this.setState({ page: JSON.parse(page) })
    }

    //else set the page item to this.state.page
    else {
      window.localStorage.setItem('page', this.state.page)
    }
  }


  componentDidUpdate() {

    //set both menu and page items to their states
    window.localStorage.setItem('menu', JSON.stringify(this.state.menu))
    window.localStorage.setItem('page', JSON.stringify(this.state.menu))

    //if menu has anyhting in it and if renderChild is false then change renderChild to True
    if (this.state.menu[0].length > 0 && this.state.renderChild === false) {
      this.setState({ renderChild: true })
    }
  }


  async fillMenu() {

    //get an array called menu that is the mapped out object array
    let menu = await Promise.all(this.state.menu.map(async (item) => {

      //api call is equal to the url with item.length amount of itmes
      let apiCall = `https://entree-f18.herokuapp.com/v1/menu/${item.length}`

      //get an item varialbe that will ahve all menu items
      let items = await axios.get(apiCall)
        .then(function (response) {
          return response.data.menu_items;
        })
        .catch(function (error) {
          console.log('failed ', error);
        })

      //the items array in each menu section is equal to the returned data from above
      item.items = items;
      //return this to the array
      return item;
    }))
    //set the menu state equal to the new menu
    this.setState({ menu: menu });
  }

  getName(string) {
    //get teh first few words by stopping at the first with
    return string.substring(0, string.indexOf('with'));
  }

  getPage(newPage) {
    //set the page state equal to the new page
    this.setState({ page: newPage })
  }

  render() {
    return (
      <div>
        {/* render navbar */}
        <Navbar
          pages={this.pages}
          currentPage={this.state.page}
          getPage={this.getPage}
        />
        {/* Render the top text */}
        <div className='py-4 text-center'>
          <h1 className='font-weight-bold'>Suped Up Random</h1>
          <h4>348 E Main St, Lexington, KY</h4>
          <h5>Hours: </h5>
          <h5>10 A.M. - 9 P.M.</h5>
          <h5>Monday - Saturday</h5>
        </div>
        {/* If page is equal 0 display all this */}
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

          {/* If page is equal 1 display all this */}
        {this.state.renderChild ? ((this.state.page === 1) ? <Appitizers
          data={this.state.menu[0]}
          nameGen={this.getName}
        /> : '') : ''}

          {/* If page is equal 2 display all this */}
        {this.state.renderChild ? ((this.state.page === 2) ? <Snacks
          data={this.state.menu[1]}
          nameGen={this.getName}
        /> : '') : ''}

        {/* If page is equal 3 display all this */}
        {this.state.renderChild ? ((this.state.page === 3) ? <Lunchs
          data={this.state.menu[2]}
          nameGen={this.getName}
        /> : '') : ''}

        {/* If page is equal 4 display all this */}
        {this.state.renderChild ? ((this.state.page === 4) ? <Dinners
          data={this.state.menu[3]}
          nameGen={this.getName}
        /> : '') : ''}

        {/* If page is equal 5 display all this */}
        {this.state.renderChild ? ((this.state.page === 5) ? <Desserts
          data={this.state.menu[4]}
          nameGen={this.getName}
        /> : '') : ''}
      </div>
    )
  }
}

export default App;
