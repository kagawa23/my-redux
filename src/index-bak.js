import React from 'react'
import { render } from 'react-dom'
// import { createStore, applyMiddleware, compose} from 'redux'
// import thunk from 'redux-thunk'
// import { counter } from './index.redux'
// import { Provider } from 'react-redux';
// import App from './App'
// import './learn.redux';

// const store = createStore(counter, compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// ))
// ReactDOM.render(
//   (
//     <Provider store={store}>
//       <App />
//     </Provider>
//   ),
//   document.getElementById('root'))

const ThemContext = React.createContext('light');
class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {  }
  }
  render() { 
      return (<ThemContext.Provider value="dark"> <Navbar theme="test"/></ThemContext.Provider> );
  }
}

const Navbar = (props) => {
  return ( <ThemButton></ThemButton> );
}

const ThemButton = (props) => {
  return (<ThemContext.Consumer> 
    {theme => <div>{theme}</div>}
    </ThemContext.Consumer> );
}

render(
<App/>,
  document.getElementById('root'))


