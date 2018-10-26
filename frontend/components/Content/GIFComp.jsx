import React from 'react';
// import { connect } from 'react-redux';

class GIFComp extends React.Component{
    constructor(props){
        super(props);
        this.handleGIFCompResize = this.handleGIFCompResize.bind(this)
        this.handleGIFClick = this.handleGIFClick.bind(this)
        let heartStyle;

        if (window.localStorage.getItem(this.props.gifData.id)) {
            heartStyle = {
                fill: '#e06498',
                animation: 'none'
            }
        }
        this.state = {
            gifQuality: 'preview_gif',
            componentOpen: false,
            heartStyle,
        };
    }

    handleGIFClick(e){  
        // debugger;    
        if (e.target.className === 'gif-prev') {
            this.setState({ componentOpen: true, heartStyle: this.state.heartStyle })
            window.addEventListener('resize', this.handleGIFCompResize)
        } else if (e.target.className === 'gif-show-bg') {
            this.setState({ componentOpen: false, heartStyle: this.state.heartStyle });
            window.removeEventListener('resize', this.handleGIFCompResize);
        }
    }

    handleGIFCompResize(e){
        this.setState({ componentOpen: false, heartStyle: this.state.heartStyle });
        window.removeEventListener('resize', this.handleGIFCompResize);
    }

    handleFavoriteClick(e){
        if (window.localStorage.getItem(this.props.gifData.id)){
            window.localStorage.removeItem(this.props.gifData.id)
            this.setState({heartStyle: {}})
        }else{
            window.localStorage.setItem(this.props.gifData.id, true)
            this.setState({ heartStyle: { fill: '#e06498', animation: 'ping 0.2s cubic-bezier(.21,-0.01,.82,.14) 1 normal both' } })
        }
    }

    render(){
        let gifShow;
        
        if (this.state.componentOpen) {
            let largeGIFHeight = (window.innerWidth * .9) * (this.props.gifData.images['original'].height) / (this.props.gifData.images['original'].width)
            let title = this.props.gifData.title.split('by');
            if(title.length === 1){
                title = title.join(' ')
            }else{
                title = title.slice(0, title.length - 1).join(' ');
            }
            let username;
            let avatar;
            let userHref;
            if(this.props.gifData.user){
                username = this.props.gifData.username;
                avatar = this.props.gifData.user.avatar_url;
                userHref = this.props.gifData.user.profile_url;
            }else{
                username = 'unknown';
            }
            
            gifShow = (
                <div className="gif-show" style={{ height: `${largeGIFHeight + 150}px`, maxHeight: 'fit-content'}}>
                    <img className="gif-large" src={this.props.gifData.images['original'].url} alt="" style={{ maxWidth: `${this.props.gifData.images['original'].width}px`, maxHeight: this.props.gifData.images['original'].height, width:'100%'}} />
                    
                    <div className='gif-info' style={{ height: 'fit-content', width: '100%', maxWidth: `${this.props.gifData.images['original'].width}px`}}>
                        <a href={this.props.gifData.url} target="_blank" style={{ textDecoration: 'none', width: 'fit-content', maxWidth: '90%' }}><span className='gif-title'>
                            {title}
                        </span></a>
                        <a href={userHref} target="_blank" style={{ textDecoration: 'none', marginTop: '5px', display: 'flex', alignItems: 'center', width: 'fit-content' }}>
                            <div style={{ height: '25px', width: '25px', borderRadius: '50%', backgroundImage: `url(${avatar})`, backgroundSize: 'cover', marginRight: '8px'}}></div>

                            <span className='gif-author' style={{ textDecoration: 'none' }}>
                                {username}
                            </span>
                        </a>
                        
                        <svg style={this.state.heartStyle} onClick={ e => this.handleFavoriteClick(e) } className='favorite-button' width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path  opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M14.5 5.5C13.495 2.902 10.6795 1 7.75 1C3.9355 1 1 3.898 1 7.75C1 13.0435 6.6895 17.137 14.5 25C22.3105 17.137 28 13.0435 28 7.75C28 3.898 25.0645 1 21.25 1C18.3175 1 15.505 2.902 14.5 5.5Z" stroke="#E06498" strokeWidth="2" />
                        </svg>

                    </div>

                    <div className='gif-show-bg' style={{width: window.innerWidth, height: window.screen.height}}></div>
                </div>
            );
        }

        return (
            <article className="gif-comp" onClick={ e => this.handleGIFClick(e) }>
                <img className="gif-prev" src={this.props.gifData.images[this.state.gifQuality].url} alt="" style={{width: '100%', maxWidth: '100%'}}/>
                {gifShow}
            </article>
        );
    }
}

export default GIFComp;