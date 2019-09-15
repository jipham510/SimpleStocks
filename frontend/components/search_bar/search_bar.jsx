import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_input: ""
        }
        this.searchStocks = this.searchStocks.bind(this);
        this.update = this.update.bind(this);
        this.match = this.match.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
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
        if ( _match(stock.name) || _match(stock.ticker)) match = true;

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
        if(this.state.user_input.length > 0) {
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
    render() {
        return (
            <div className="searchbar">
                <div className="searchbar-svg"></div>
                <input type="text" className="search-bar-input" placeholder="Search" onChange={this.update}/>
                {this.renderSearchResults()}
            </div>
        )
    }
}
export default withRouter(SearchBar);