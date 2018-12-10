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
        };

        this.compBucket = [];
        this.gifCols = [[],[],[],[]];

        this.contentContainer = (<div></div>);
    }

    componentWillReceiveProps(newProps){ 
        //New gifs received
        let currLength = this.compBucket.length;
        let newLength = newProps[`${this.props.contentType}GIFs`].length;

        if (newLength === currLength && currLength !== 0 && this.props.contentType === 'search') {
            if (newProps.searchGIFs[0].id !== this.props.searchGIFs[0].id) {
                this.compBucket = [];
                this.gifCols = [[], [], [], []];
                this.contentContainer = (<div></div>);
                this.forceUpdate()
                for (let k = 0; k < currLength; k++) {
                    let newGIFData = newProps[`${this.props.contentType}GIFs`][k];
                    let newGIFComp = (<GIFComp key={k} gifData={newGIFData} />);
                    this.compBucket.push(newGIFComp)
                    this.gifCols[(k % newProps.numCols)].push(newGIFComp);
                } 
                this.contentContainer = (
                    <main id='content'>
                        <div id='content-col-1' className='content-col' style={{ gridColumn: 1 }}>
                            {this.gifCols[0]}
                        </div>
                        <div id='content-col-2' className='content-col' style={{ gridColumn: 2 }}>
                            {this.gifCols[1]}
                        </div>
                        <div id='content-col-3' className='content-col'>
                            {this.gifCols[2]}
                        </div>
                        <div id='content-col-4' className='content-col'>
                            {this.gifCols[3]}
                        </div>
                        {/* <LoaderAnim /> */}
                    </main>
                );
                this.forceUpdate()
            }
        }

        // Device resize received
        if (newProps.numCols !== this.props.numCols && currLength !== 0) {
            //We redistribute all gif components across the new numCols
            this.gifCols = [[], [], [], []];
            for (let j = 0; j < currLength; j++) {
                let oldGIFComp = this.compBucket[j];
                let colIdx = (j % newProps.numCols);
                this.gifCols[colIdx].push(oldGIFComp);
            }
        }

        // Adding new gifs to compBucket
        if (newLength > currLength){
            for (let i = currLength; i < newLength; i++) {
                let newGIFData = newProps[`${this.props.contentType}GIFs`][i];     
                let newGIFComp = (<GIFComp gifData={newGIFData} />);              
                this.compBucket.push(newGIFComp)
                this.gifCols[(i % newProps.numCols)].push(newGIFComp);
            }
        } 

    
        // show content when the new appTab is the same as this component's contentType
        if (this.props.contentType === newProps.appTab && newProps.appTab !== this.props.appTab) {
            this.contentContainer = (
                <main id='content'>
                    <div id='content-col-1' className='content-col' style={{ gridColumn: 1 }}>
                        {this.gifCols[0]}
                    </div>
                    <div id='content-col-2' className='content-col' style={{ gridColumn: 2 }}>
                        {this.gifCols[1]}
                    </div>
                    <div id='content-col-3' className='content-col'>
                        {this.gifCols[2]}
                    </div>
                    <div id='content-col-4' className='content-col'>
                        {this.gifCols[3]}
                    </div>
                    {/* <LoaderAnim /> */}
                </main>
            );
        } else if (newProps.appTab !== this.props.appTab){
            this.contentContainer = (<div></div>);
        }
    }

    render(){
        return (
            this.contentContainer
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



