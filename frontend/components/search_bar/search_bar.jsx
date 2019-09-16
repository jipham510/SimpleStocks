import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_input: "",
            searchbarFocused: false
        }
        this.searchStocks = this.searchStocks.bind(this);
        this.update = this.update.bind(this);
        this.match = this.match.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
        this.focusSearchBar = this.focusSearchBar.bind(this);
        // this.blurSearchBar = this.blurSearchBar.bind(this);
    }
    componentDidMount(){
        if (!this.props.stocks.length) {
            this.props.fetchStocks();
        }
    }
    match(stock){
        let match = false;
        let input = this.state.user_input.toLowerCase();
        function _match(field){
            field = field.toLowerCase();
            return input.length <= field.length && field.slice(0, input.length) === (input); 
        }
        if (stock.name && (_match(stock.name) || _match(stock.ticker)) ) match = true;

        return match;
    }
    searchStocks(){
        const searchResults = [];
        const maxSize = 6;
        let i = 0;
        while( searchResults.length < maxSize && i < this.props.stocks.length ) {
            if (this.match(this.props.stocks[i]) ) searchResults.push(this.props.stocks[i]);
            i++;
        }
        console.log("finished searching");
        console.log(searchResults);
        return searchResults;
    }
    update(e){
        return this.setState({
            user_input: e.target.value
        })
    }
    redirectStockPageompanyPage(ticker) {
        this.props.history.push(`/stocks/${ticker}`);
    }
    renderSearchResults(){
        if(this.state.user_input.length > 0 && this.state.searchbarFocused) {
            return (
                <ul className="search-results">
                    <div className="stock-heading">Stocks</div>
                    {this.searchStocks().map( (stock,idx) =>(
                        <li key={idx} className="search-item" onClick={() => this.redirectStockPageompanyPage(stock.ticker)}>
                            {stock.ticker}, {stock.name}
                        </li>
                    ))}
                </ul>
            )
        }
    }
    focusSearchBar(e){
        const searchBar = document.querySelector(".searchbar");
        const searchBarInput = document.querySelector(".search-bar-input");

        if (searchBar) {
            searchBar.classList.add('focus');
        }
        if (searchBarInput) {
            searchBarInput.classList.add('focus');
        }
        if (e.type === "focus") {
            this.setState({ searchbarFocused: true });
        }
    }
    // blurSearchBar(e){
    //     const searchBar = document.querySelector(".searchbar");
    //     const searchBarInput = document.querySelector(".search-bar-input");
    //     if (this.state.searchbarFocused === false) {
    //         if (searchBar) {
    //             searchBar.classList.remove('focus');
    //         }
    //         if (searchBarInput) {
    //             searchBarInput.classList.remove('focus');
    //         }
    //     }
    //     if ( e && e.type === "blur") {
    //         // debugger
    //         this.setState({ searchbarFocused: false }, this.blurSearchBar);
    //     }
    // }
    render() {
        return (
            // <div className="searchbar" onMouseEnter={this.focusSearchBar} onMouseLeave={this.blurSearchBar} onFocus={this.focusSearchBar} onBlur={this.blurSearchBar}>
            <div className="searchbar" onMouseEnter={this.focusSearchBar} onFocus={this.focusSearchBar} >
                <div className="searchbar-svg"></div>
                <input type="text" className="search-bar-input" placeholder="Search" onChange={this.update}/>
                {this.renderSearchResults()}
            </div>
        )
    }
}
export default withRouter(SearchBar);