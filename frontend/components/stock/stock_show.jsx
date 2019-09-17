import React from 'react';
import StockInfoContainer from './stock_info_container';
import ChartContainer from './chart_container';
import UserNavContainer from '../nav/user_nav_container';
import OrderFormContainer from '../forms/order_form/order_form_container';
import NewsIndexContainer from '../news/news_index_container';
import WatchButtonContainer from '../watches/watch_button_container';
class StockShow extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <UserNavContainer />
                <div className="stock-show-wrapper">
                    <main className="stock-show-left-content">
                        <ChartContainer />
                        <StockInfoContainer />
                        <NewsIndexContainer />
                    </main>
                    <div className="stock-show-right-content">
                        <OrderFormContainer ticker={this.props.ticker}/>
                        <WatchButtonContainer ticker={this.props.ticker}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default StockShow;