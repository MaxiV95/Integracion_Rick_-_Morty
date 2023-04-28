import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddeleware from 'redux-thunk'
import reducer from './reducer';

//conectamos nuestra app con la extencion
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddeleware)) 
    //para poder hacer peticiones a una api/servidor
);

export default store;