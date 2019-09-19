
import React from 'react';
import { Link } from 'react-router-dom';
import { parseFloatToDollars } from '../../util/util';


class StockIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.renderShares = this.renderShares.bind(this);
        this.state = {
            intradayData: [],
            price: 0
        }
        this.setData = this.setData.bind(this);
    }
    componentDidMount(){
        if (this.props.intradayData) {
            this.setData(this.props.intradayData)
        } else {
            this.props.fetchIntradayData(this.props.stock.ticker)
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.intradayData !== prevProps.intradayData){
            this.setData(this.props.intradayData)
        }
    }
    setData(chart){

        // let firstValidPrice
        // for (let i = 0; i < chart.length; i++) {
        //     if (chart[i].close !== null) {
        //         firstValidPrice = chart[i].close
        //         break;
        //     }
        // }

        let lastValidPrice
        for (let i = chart.length - 1; i >= 0 ; i--) {
            if (chart[i].close !== null) {
                lastValidPrice = chart[i].close
                break;
            }
        }
        return this.setState({
            intradayData: chart,
            price: lastValidPrice
        })        

    }
    renderShares(){
        if (this.props.stock.shares) 
        {
            return (
                <div className="stock-index-item-shares">
                    {this.props.stock.shares} shares
                </div>
            )
        }
    }

    render(){  
        return(
        <Link to={`/stocks/${this.props.stock.ticker}`}>

            <div className="stock-index-item">
                <div className="stock-index-item-left-wrapper">
                    <div className="stock-index-item-ticker">
                        {this.props.stock.ticker}
                    </div>
                    {this.renderShares()}
                </div>
                <div className="stock-index-item-price">
                    {parseFloatToDollars(this.state.price)}
                </div>
            </div>
        </Link>
        )
    }
}
export default StockIndexItem;