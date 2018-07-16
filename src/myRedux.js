
export function createStore(reducer){
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