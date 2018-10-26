import React from 'react';

class LoaderAnim extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='loader'>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }
}

export default LoaderAnim;