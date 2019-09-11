import React from 'react';

class StockIndex extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.fetchStocks();
    }
    render() {
        return (
            <div>
                <ul className="Stock-list">
                {this.props.stocks.map( stock => ( <li key={stock.ticker}>{stock.ticker}</li>)
                )}
                </ul>
            </div>
        )
    }
}
export default StockIndex;