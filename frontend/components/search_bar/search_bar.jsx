import React from 'react';
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount() {
    //     this.props.fetchStockChart(this.props.ticker, "1m").then(res => this.setState(res))
    // }

    render() {
        return (
            <div className="searchbar">
                <div className="searchbar-svg"></div>
                <input type="text" className="search-bar-input" placeholder="Search"/>
            </div>
        )
    }
}
export default SearchBar;