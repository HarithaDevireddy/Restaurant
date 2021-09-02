import { Modal } from 'bootstrap';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import MainComponent from './components/MainComponent';
import ModalExample from './components/modal';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configurestore'

const store = ConfigureStore();





class App extends Component {
  constructor(props) {
    super(props)


  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div className="App">


          <MainComponent />



        </div>
      </BrowserRouter>


      </Provider>
      

    )

  }
}


export default App;
