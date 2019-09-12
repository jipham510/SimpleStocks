
import React from 'react';
import { Link } from 'react-router-dom';
// const StockIndexItem = (props) => {
//     debugger
//     return ( 
//         <Link to={`/stocks/${props.stock.ticker}`}>
            
//             <div className="stock-index-item">
//                 <div className="stock-index-item-ticker">{props.stock.ticker}</div>
//                 {/* <div className="stock-index-item-ticker">{props.stock.ticker}</div> */}
//             </div>
//         </Link>
//     )
// }
// export default StockIndexItem;

class StockIndexItem extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.fetchLatestStockPrice(this.props.stock.ticker)
    }
    render(){  
        return(
        <Link to={`/stocks/${this.props.stock.ticker}`}>

            <div className="stock-index-item">
                <div className="stock-index-item-ticker">{this.props.stock.ticker}</div>
                <div className="stock-index-item-price">${this.props.stock.price}</div>
            </div>
        </Link>
        )
    }
}
export default StockIndexItem;