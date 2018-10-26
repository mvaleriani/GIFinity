import React from 'react';
import { connect } from 'react-redux';
import { fetchTrendingGIFS, fetchSearchGIFS, fetchFavGIFS } from '../../actions/gifActions';
import GIFComp from './GIFComp';
import LoaderAnim from './LoaderAnim';

import { log } from 'util';

class Content extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            currentTab: 'trendingGIFComps',
        };

        this.compBucket = {
            trending: [],
            search: [],
            fav: [],
        }
        // this.gifCols = [[],[],[],[]];
        this.gifCols = {
            trending: [[], [], [], []],
            search: [[], [], [], []],
            fav: [[], [], [], []]
        }
        

    }

    componentWillReceiveProps(newProps){
        //New gifs received
        let currLength = this.compBucket[newProps.appTab].length;
        let newLength = newProps[`${newProps.appTab}GIFs`].length;

        // Device resize received
        
        if (newProps.numCols !== this.props.numCols && currLength !== 0) {
            //We redistribute all gif components across the new numCols
            this.gifCols[this.props.appTab] = [[], [], [], []];
            for (let j = 0; j < currLength; j++) {
                let oldGIFComp = this.compBucket[newProps.appTab][j];
                let colIdx = (j % newProps.numCols);
                this.gifCols[newProps.appTab][colIdx].push(oldGIFComp);
            }
            this.setState()
        }
        if (newProps.appTab !== this.props.appTab) {
            this.setState({ currentTab: newProps.appTab})
        } else{
            this.compBucket[newProps.appTab] = [];
            this.gifCols[newProps.appTab] = [[], [], [], []];
            currLength = 0;
        }
        if (newLength > currLength && newProps.appTab){
            for (let i = currLength; i < newLength; i++) {
                let newGIFData = newProps[`${newProps.appTab}GIFs`][i];     
                let newGIFComp = (<GIFComp gifData={newGIFData} />);              
                this.compBucket[newProps.appTab].push(newGIFComp)
                this.gifCols[newProps.appTab][(i % newProps.numCols)].push(newGIFComp);
            }
            this.setState()
        }
    }

    render(){
        let col1, col2, col3, col4;
        if (this.props.appTab) {
            col1 = this.gifCols[this.props.appTab][0]
            col2 = this.gifCols[this.props.appTab][1]
            col3 = this.gifCols[this.props.appTab][2]
            col4 = this.gifCols[this.props.appTab][3]            
        }
        return (
            <main id='content'>
                
                <div id='content-col-1' className='content-col' style={{ gridColumn: 1 }}>
                    {col1}
                </div>
                <div id='content-col-2' className='content-col' style={{ gridColumn: 2 }}>
                    {col2}
                </div>
                <div id='content-col-3' className='content-col'>
                    {col3}
                </div>
                <div id='content-col-4' className='content-col'>
                    {col4}
                </div>
                {/* <LoaderAnim /> */}
            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let trendingGIFs = [];
    let searchGIFs = [];
    let favGIFs = [];
    let numCols;
    let appTab;

    if (state.gifs.trendingGIFs && state.gifs.trendingGIFs.data) {
        trendingGIFs = state.gifs.trendingGIFs.data;
    }
    if (state.gifs.searchGIFs && state.gifs.searchGIFs.data) {
        searchGIFs = state.gifs.searchGIFs.data;
    }
    if (state.gifs.favGIFs && state.gifs.favGIFs.data) {
        favGIFs = state.gifs.favGIFs.data;
    }

    //Update the number of columns in the component
    if(state.ui.app){
        if (state.ui.app.device === 'mobile') {
            numCols = 2;
        } else if (state.ui.app.device === 'tablet') {
            numCols = 3;
        } else if (state.ui.app.device === 'desktop') {
            numCols = 4;
        }
    }

    if (state.ui) {
        appTab = state.ui.tab;
    }
    
    return ({
        trendingGIFs,
        searchGIFs,
        favGIFs,
        numCols,
        appTab
    });
};
const mapDispatchToProps = dispatch => ({
    fetchTrendingGIFS: (num, offset) => dispatch(fetchTrendingGIFS(num, offset)),
    fetchSearchGIFS: (searchStr, num, offset) => dispatch(fetchSearchGIFS(searchStr, num, offset)),
    fetchFavGIFS: idsStr => dispatch(fetchFavGIFS(idsStr)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);



