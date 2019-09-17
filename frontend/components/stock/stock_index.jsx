import React from 'react';
import StockIndexItemContainer from './stock_index_item_container'
class StockIndex extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        // this.props.fetchWatchedStocks().then(res => this.setState({ watchedStocks: res }))
        this.props.fetchWatchedStocks()
    }

    render() {
        return (
            <div>
                <ul className="Stock-list">
                <div className="stock-index-header">Stocks Owned</div>

                {this.props.ownedStocks.map( stock => 
                    (<StockIndexItemContainer stock={stock} key={stock.ticker} />)
                )}

                <div className="stock-index-header">Watch List</div>
                    {this.props.watchedStocks.map( stock => 
                    (<StockIndexItemContainer stock={stock} key={stock.ticker} />)
                )}
                </ul>
            </div>
        )
    }
}
export default StockIndex;