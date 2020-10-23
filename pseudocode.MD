## App.js

# Model
    pages to swap between each page
    States
        menu that is an array with objects that hold each section of the menu
        page on
    bind each function needed outside this class

# Controller
    api Call
        get the api and return the it and set it in the state
    componentDidmount
        sets local storage to state or state to local storage
    compoenentDidupdate
        sets teh localStorage to the state
    getString
        gets the name from the description key
    getPrice
        gets the price randomly

# View
    render method
        renders the navbar and the name, hours, and location constantly
        depending on page on it will display the rest differently

## MenuItem.js

# Model

# Controller
    

# View
    Render Method
        display each title by calling getString
        display each description
        display each price getPrice