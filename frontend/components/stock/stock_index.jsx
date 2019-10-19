import React from 'react';
import StockIndexItemContainer from './stock_index_item_container'
class StockIndex extends React.Component {
    constructor(props) {
        super(props);
        this.hideStocks = this.hideStocks.bind(this);
    }
    componentDidMount(){
        this.props.fetchWatchedStocks()
    }
    hideStocks(){
        const watchlist = document.querySelector('.watchlist');
        // const closeStocks = document.querySelector('.closeStocks .hamburger-btn');
        if (watchlist.classList.contains("open")) {
            watchlist.classList.remove("open");
        } else {
            watchlist.classList.add("open");
        }
    }
    render() {
        return (
            <div>
                <ul className="Stock-list">
                    <div className="hamburger-btn close" onClick={this.hideStocks}>
                        <div className="btn-line"></div>
                        <div className="btn-line"></div>
                        <div className="btn-line"></div>
                    </div>
                <div className="stock-index-header">Stocks Owned</div>

                {this.props.ownedStocks.map( stock => 
                    (<StockIndexItemContainer stock={stock} key={stock.ticker} />)
                )}

                <div className="stock-index-header watch-list">Watch List</div>
                    {this.props.watchedStocks.map( stock => 
                    (<StockIndexItemContainer stock={stock} key={stock.ticker} />)
                )}
                </ul>
            </div>
        )
    }
}
export default StockIndex;