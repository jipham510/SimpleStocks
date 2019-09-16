import React from 'react';
import StockInfoContainer from './stock_info_container';
import ChartContainer from './chart_container';
import UserNavContainer from '../nav/user_nav_container';
import OrderFormContainer from '../forms/order_form/order_form_container';
import NewsIndexContainer from '../news/news_index_container'
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
                    <OrderFormContainer ticker={this.props.ticker}/>
                </div>
            </div>
        )
    }
}
export default StockShow;