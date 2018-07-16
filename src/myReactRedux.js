import React from 'react'
import PropTypes from 'prop-types';
import { bindActionCreators } from './myRedux';

export const connect = (mapStateToProps=(state)=>state, mapDispatchToProps={}) =>(WrapComponent) => {
    return class ChildComponent extends React.Component {
        static contextTypes = {
            store:PropTypes.object,
        }

        constructor(props,context) {
            super(props,context);
            this.state = {
                props: {}
            }
        }

        componentDidMount() {
            const { store } = this.context;
            // const stateProps = mapStateToProps(store.getState());
            // this.setState({
            //     props: { 
            //         ...this.state.props, 
            //         stateProps},
            // })
            this.update();
            store.subscribe(()=>this.update());
        }

        update(){
            const { store } = this.context;
            const stateProps = mapStateToProps(store.getState());
            const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
            this.setState({
                props: { 
                    ...this.state.props, 
                    ...stateProps,
                    ...dispatchProps,
                },
            }) 
        }

        render() { 
            return ( <WrapComponent {...this.state.props}/> );
        }
    }     
}

export class Provider extends React.Component {
    static childContextTypes = {
        store: PropTypes.object,
    }
    getChildContext() {
        return { store:this.props.store};
    }
    render() { 
        return this.props.children;
    }
}