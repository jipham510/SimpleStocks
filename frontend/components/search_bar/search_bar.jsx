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
        this.blurSearchBar = this.blurSearchBar.bind(this);
        this.addColorIfMatch = this.addColorIfMatch.bind(this);
    }
    componentDidMount(){
        if (!this.props.stocks ) {
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

        if (this.props.stocks) {
            const maxSize = 6;
            let i = 0;
            while( searchResults.length < maxSize && i < this.props.stocks.length ) {
                if (this.match(this.props.stocks[i]) ) searchResults.push(this.props.stocks[i]);
                i++;
            }
        }

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
    addColorIfMatch(string){
        for (let i = 0; i < string.length - this.state.user_input.length + 1; i++) {
            if (string.slice(i, this.state.user_input.length).toLowerCase() === this.state.user_input.toLowerCase()) {
                let divText = string.slice(i, this.state.user_input.length);
                return (
                    <span>
                        <span className="colorResult">
                            {divText}
                        </span>
                        {string.slice(this.state.user_input.length)}
                    </span>
                )
            }
        }

        return string;
    }
    renderSearchResults(){
        if(this.state.user_input.length > 0 && this.state.searchbarFocused) {

            return (
                <ul className="search-results">
                    <div className="stock-heading">Stocks</div>
                    {  this.searchStocks().map( (stock,idx) =>(
                        <li key={idx} className="search-item" onMouseDown={() => this.redirectStockPageompanyPage(stock.ticker)}>
                            <div className="search-item-ticker" >{this.addColorIfMatch(stock.ticker)}</div>
                            <div className="search-item-name">{this.addColorIfMatch(stock.name)}</div>
                        </li>
                    ))}
                </ul>
            )
        }
    }
    focusSearchBar(e){
        const searchBar = document.querySelector(".searchbar");
        const searchBarInput = document.querySelector(".search-bar-input");
        const searchBarSvg = document.querySelector(".searchbar-svg");

        if (searchBar) {
            searchBar.classList.add('focus');
        }
        if (searchBarInput) {
            searchBarInput.classList.add('focus');
        }
        if (searchBarSvg) {
            searchBarSvg.classList.add('focus');
        }
        if (e.type === "focus") {
            this.setState({ searchbarFocused: true });
        }
    }
    blurSearchBar(e){
        const searchBar = document.querySelector(".searchbar");
        const searchBarInput = document.querySelector(".search-bar-input");
        const searchBarSvg = document.querySelector(".searchbar-svg");
        if (this.state.searchbarFocused === false) {
            if (searchBar) {
                searchBar.classList.remove('focus');
            }
            if (searchBarInput) {
                searchBarInput.classList.remove('focus');
            }
            if (searchBarSvg) {
                searchBarSvg.classList.remove('focus');
            }
        }
        if ( e && e.type === "blur") {
            this.setState({ searchbarFocused: false }, this.blurSearchBar);
        }
    }
    render() {
        return (
            <div className="searchbar" 
                onMouseEnter={this.focusSearchBar} 
                onMouseLeave={this.blurSearchBar} 
                onFocus={this.focusSearchBar} 
                onBlur={this.blurSearchBar}
            >
                <div className="searchbar-svg"/>
                <input 
                    type="text" 
                    className="search-bar-input" 
                    placeholder="Search" 
                    onChange={this.update}
                    spellCheck="false"
                />
                {this.renderSearchResults()}
            </div>
        )
    }
}
export default withRouter(SearchBar);