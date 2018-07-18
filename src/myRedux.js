export function createStore(reducer, enhancer){
    if(enhancer){
        return enhancer(createStore)(reducer)
    }
    let currentState = {};
    let listeners =[];
    function getState(){
        return currentState;
    }
    function dispatch(action) {
       // let state = currentState;
        currentState = reducer(currentState,action);
        listeners.forEach(v=>v());
        return action;
    }
    function subscribe(listener) {
        listeners.push(listener);
    }
    dispatch({type:'@IMOOC/INIT'})
    return {
        getState, dispatch, subscribe
    }
}

function bindActionCreator(action,dispatch){
    return (...args) => dispatch(action(...args));
}

export function bindActionCreators(mapDispatchToProps, dispatch){
    let bind = {};
    Object.keys(mapDispatchToProps).forEach(v =>{
        const mdp = mapDispatchToProps[v];
        bind[v] = bindActionCreator(mdp,dispatch);
    })
    return bind;
}


export function applyMiddleware(...middlewares){
    return (createStore) => (...args) => {
        const store = createStore(...args);
        let dispatch = store.dispatch;
        const midApi = {
            getState:store.getState,
            dispatch:(...args) => dispatch(...args)
        }

        const middlewareChain = middlewares.map(middleware => middleware(midApi));
        dispatch = compose(...middlewareChain)(store.dispatch);
        //dispatch = middleware(midApi)(store.dispatch);
        return {
            ...store,
            dispatch
        }
    }
}

export function compose(...funcs){
    if(funcs.length === 0 ){
        return arg => arg ;
    }
    if(funcs === 1){
        return funcs[0]
    }
    return funcs.reduce((ret,item) => (...args) => ret(item(...args)))
}