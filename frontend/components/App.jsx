import React from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar'; 
import Tabs from './Tabs'; 
import Content from './Content/Content'; 
import AbstractContent from './Content/AbstractContent'; 

import { fetchTrendingGIFS, fetchSearchGIFS, fetchFavGIFS } from '../actions/gifActions';
import { setAppSize } from '../actions/uiActions'

class App extends React.Component {
  constructor(props){
    super(props);
    this.handleResize = this.handleResize.bind(this);

    this.resizeRunning = false;
  }

  componentDidMount(){
    this.props.fetchTrendingGIFS(20, this.props.trendingLength)
    let app = document.getElementById('app')
    let appWidth = app.clientWidth;
    
    let device;
    if (appWidth < 760) {
      //Mobile width: change the app state to two columns of GIFs
      device = 'mobile';
    }else if(appWidth < 1024){
      //Tablet width: three columns of GIFs
      device = 'tablet';
    }else{
      //Desktop width: four columns of GIFs
      device = 'desktop';
    }
    this.props.setAppSize({device, appWidth})
    window.addEventListener('resize', this.handleResize)
  }

  componentWillReceiveProps(newProps){
    if (newProps.device !== this.props.device) {
      this.resizeRunning = false;
    }
    if (newProps.appTab !== this.props.appTab && newProps.appTab === 'fav') {
      let idsStr = Object.keys(window.localStorage).join(',');
      this.props.fetchFavGIFS(idsStr)
    }
  }

  handleScroll(e){
    //fetch more gifs if the bottom of content reached
    if(e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight){      
      if (this.props.appTab === 'trending') {        
        this.props.fetchTrendingGIFS(20, this.props.trendingLength);
      } 
    }
  }

  handleResize(e){
    if (!this.resizeRunning) {
      let device;
      let appWidth;

      if (this.props.device === 'mobile' && e.target.innerWidth >= 760) {
        if (e.target.innerWidth < 1024) {
          device = 'tablet';
        } else{
          device = 'desktop';
        }
        appWidth = e.target.innerWidth;
        this.resizeRunning = true;
        this.props.setAppSize({device, appWidth})
      } else if (this.props.device === 'tablet' && (e.target.innerWidth < 760 || e.target.innerWidth >= 1024)) {
        if (e.target.innerWidth < 760) {
          device = 'mobile';
        }else{
          device = 'desktop';
        }
        appWidth = e.target.innerWidth;
        this.resizeRunning = true;
        this.props.setAppSize({ device, appWidth })
      } else if (this.props.device === 'desktop' && e.target.innerWidth < 1024) {
        if (e.target.innerWidth < 760) {
          device = 'mobile';
        } else {
          device = 'tablet';
        }
        appWidth = e.target.innerWidth;
        this.resizeRunning = true;
        this.props.setAppSize({ device, appWidth })
      }
    }
  }

  render(){
    return (
      <div className="app" id='app' onScroll={ e => this.handleScroll(e) } >
        <Navbar />
        <Tabs />
        {/* <Content /> */}
        <AbstractContent contentType='trending'/>
        <AbstractContent contentType='fav' />
        <AbstractContent contentType='search' />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let trendingLength;
  let searchLength;
  let appWidth;
  let device;
  let appTab;

  if (state.gifs.trendingGIFs && state.gifs.trendingGIFs.data) {
    trendingLength = state.gifs.trendingGIFs.data.length;
  }
  if (state.gifs.searchGIFs && state.gifs.searchGIFs.data) {
    searchLength = state.gifs.searchGIFs.data.length;
  }

  // App size has been set once
  if(state.ui.app){
    appWidth = state.ui.app.appWidth;
    device = state.ui.app.device;
  }
  if (state.ui){
    appTab = state.ui.tab;
  }

  return ({
    trendingLength,
    searchLength,
    appWidth,
    device,
    appTab
  });
};

const mapDispatchToProps = dispatch => ({
  fetchTrendingGIFS: (num, offset) => dispatch(fetchTrendingGIFS(num, offset)),
  fetchSearchGIFS: (searchStr, num, offset) => dispatch(fetchSearchGIFS(searchStr, num, offset)),
  setAppSize: appInfo => dispatch(setAppSize(appInfo)),
  fetchFavGIFS: idsStr => dispatch(fetchFavGIFS(idsStr)),
});



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
