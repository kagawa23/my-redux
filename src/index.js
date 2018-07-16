import React from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'
// import { createStore, applyMiddleware, compose} from 'redux'
import { createStore } from './myRedux'
import thunk from 'redux-thunk'
import { counter } from './index.redux'
// import { Provider } from 'react-redux';
import { Provider } from './myReactRedux';
import App from './App'
// import './learn.redux';

// const store = createStore(counter, compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// ))
const store = createStore(counter);
ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root'))

// constext
// class App extends React.Component {
//   constructor(props) {
//       super(props);
//       this.state = {  }
//   }
//   getChildContext(){
//     return {theme:'test'}
//   }
//   render() { 
//       return (<Navbar/>);
//   }
// }

// App.childContextTypes = {
//   theme:PropTypes.string,
// }
// const Navbar = (props) => {
//   return ( <ThemButton>
//   </ThemButton> );
// }

// const ThemButton = (props,context) => {
//   return (<div>{context.theme}</div>);
// }
// ThemButton.contextTypes = {
//   theme:PropTypes.string,
// }

// render(
// <App/>,
//   document.getElementById('root'))


