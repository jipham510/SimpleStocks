import React from 'react';
import StockInfoContainer from './stock_info_container';
import ChartContainer from './chart_container';
import Footer from '../home/footer';
import UserNavContainer from '../nav/user_nav_container';
import OrderFormContainer from '../forms/order_form/order_form_container';
import NewsIndexContainer from '../news/news_index_container';
import WatchButtonContainer from '../watches/watch_button_container';
import { css } from '@emotion/core';


const override = css`
  display: block;
  border-color: red;
  width: 1050px;
`;

// const GREEN = "#67CF9A"
class StockShow extends React.Component {
    constructor(props) {
        super(props);
        this.showOrderForm = this.showOrderForm.bind(this);
    }
    componentDidMount() {
        this.props.fetchIntradayData(this.props.ticker);
        if (this.props.stock === "Not Found") {
            this.props.history.push("/404");
        }

    }
    componentDidUpdate(prevProps) {
        if(prevProps.ticker !== this.props.ticker ){
            this.props.fetchIntradayData(this.props.ticker);
        }
        if(prevProps.stock !== this.props.stock){
            // debugger
            if (this.props.stock === "Not Found") {
                this.props.history.push("/404");
            }
        }
    }
    showOrderForm(){
        const orderForm = document.querySelector('.stock-show-right-content');
        // const closeStocks = document.querySelector('.closeStocks .hamburger-btn');
        if (orderForm.classList.contains("open")) {
            orderForm.classList.remove("open");
        } else {
            orderForm.classList.add("open");
        }
    }
    render() {
        return (
            <div>
                <UserNavContainer />
                {/* {(this.props.intradayData.length !== 0) ? ( */}
                    <div className="stock-show-wrapper">
                        <main className="stock-show-left-content">
                            <ChartContainer />
                            <div className="mobile-stock-show-wrapper">
                                <div className="mobile-stock-show">
                                    <div className="show-order-form" onClick={this.showOrderForm}>
                                        Buy/Sell Stock
                                    </div>
                                    <WatchButtonContainer ticker={this.props.ticker}/>
                                </div>
                            </div>
                            <StockInfoContainer />
                            <NewsIndexContainer />
                            <Footer />
                        </main>
                        <div className="stock-show-right-content">
                            <OrderFormContainer ticker={this.props.ticker}/>
                            <WatchButtonContainer ticker={this.props.ticker}/>
                        </div>
                    </div>
                    {/* ) : (
                    <div className="stock-show-wrapper">
                        <BeatLoader
                            className={override}
                            sizeUnit={"px"}
                            size={10}
                                color={"#67CF9A"}
                            loading={true}
                        />
                    </div> */}

            
            </div>
        )
    }
}
export default StockShow;