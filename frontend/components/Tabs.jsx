import React from 'react';
import { connect } from 'react-redux';
import { setAppTab } from '../actions/uiActions'
import { fetchSearchGIFS } from '../actions/gifActions'

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            tabStyles:{
                trending: { background: '#e06498'},
                fav: {},
                search: {}
            },
            currentSearch: '',
        };
        this.searchbar;
    }

    componentDidMount() {
        this.props.setAppTab('trending');
    }

    handleKeyPress(e) {
        // e.preventDefault();
        if (e.key === 'Enter') {
            e.preventDefault();
            this.props.fetchSearchGIFS(e.target.value);
            this.searchbar = undefined;
            this.setState({currentSearch: '', tabStyles: { trending: {}, fav: {}, search: { background: '#e06498' }, tabNav: {} } })
        }
    }


    handleTabSwitch(e){
        if(e.target.id !== this.props.appTab){
            this.props.setAppTab(e.target.id);

            if (e.target.id === 'fav') {
                this.searchbar = undefined;
                this.setState({ tabStyles: { trending: {}, fav: { background: '#e06498' }, search: {}, tabNav: {}}})
            } else if (e.target.id === 'trending'){
                this.searchbar = undefined;
                this.setState({ tabStyles: { trending: { background: '#e06498' }, fav: {}, search: {}, tabNav: {} } })
            } else{
                this.searchbar = (
                    <form id='searchbar' onSubmit={e => console.log(e)} style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '40px', width: '100%', position: 'absolute',top: '-40px', zIndex:'-1', background: 'var(--secondary)'}}>
                        <input id='search-input' 
                                onKeyPress={e => this.handleKeyPress(e)}
                                // onChange={e => this.updateCurrentSearch(e)}
                                // value={this.state.currentSearch}
                                placeholder="Search GIFS" 
                                type="text" name='searchStr' 
                                style={{ borderRadius: '5px', background: 'var(--dark-bg)', width: '70%', height: '32px', borderStyle: 'none', color: '#727272', fontSize: '15px', fontFamily: 'Mont', boxSizing: 'border-box', padding: '5px', paddingLeft: '10px', paddingRight: '25px'}}/>
                    </form>
                );
                this.setState({ tabStyles: { trending: {}, fav: {}, search: { background: '#e06498' }, tabNav: {top: '130px'}} })
            }

        }
    }

    render() {
        

        return (
            <div id='tab-nav' style={this.state.tabStyles.tabNav}>
                <div id='trending' className='tab' style={this.state.tabStyles.trending} onClick={e => this.handleTabSwitch(e)}>
                    trending
                    <div className='tab-border'></div>
                </div>
                <div id='fav' className='tab' style={this.state.tabStyles.fav} onClick={e => this.handleTabSwitch(e)}>
                    favorites
                    <div className='tab-border'></div>
                </div>
                
                <div id='search' className='tab' style={this.state.tabStyles.search}  onClick={e => this.handleTabSwitch(e)}>
                    search
                </div>
                {this.searchbar}
            </div>
        );
    }
}

// export default Tabs;

const mapStateToProps = (state, ownProps) => {
    let appTab;
    if (state.ui.appTab) {
        appTab = state.ui.appTab;
    }
    return ({ appTab });
};
const mapDispatchToProps = dispatch => ({
    setAppTab: appTab => dispatch(setAppTab(appTab)),
    fetchSearchGIFS: searchStr => dispatch(fetchSearchGIFS(searchStr)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tabs);