
import React from 'react';
import { Link } from 'react-router-dom';
import { parseFloatToDollars } from '../../util/util';
import TinyChart from '../stock/tiny_chart'
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class StockIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.renderShares = this.renderShares.bind(this);
        this.state = {
            intradayData: [],
            price: 0,
            initialLoad: 0
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
    setData(data){
        const chart = data.filter(chart => {
            return chart.close !== null;
        })
        return this.setState({
            intradayData: chart,
            price: chart[chart.length - 1].close,
            initialLoad: 1
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

            <div>
                {(this.props.intradayData) ? (
                    <div className="stock-index-item">
                        <div className="stock-index-item-left-wrapper">
                            <div className="stock-index-item-ticker">
                                {this.props.stock.ticker}
                            </div>
                            {this.renderShares()}
                        </div>
                        <TinyChart intradayData={this.state.intradayData} initialLoad={this.state.initialLoad}/>
                        <div className="stock-index-item-price">
                            {parseFloatToDollars(this.state.price)}
                        </div>
                    </div>
                    ) : (
                        <div className="stock-index-item">
                            <BeatLoader
                                className={override}
                                sizeUnit={"px"}
                                size={10}
                                color={"#67CF9A"}
                                loading={true}
                            />
                        </div>
                    )
                }
            </div>
        </Link>
        )
    }
}
export default StockIndexItem;