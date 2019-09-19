import React from 'react';
import StockInfoContainer from './stock_info_container';
import ChartContainer from './chart_container';
import UserNavContainer from '../nav/user_nav_container';
import OrderFormContainer from '../forms/order_form/order_form_container';
import NewsIndexContainer from '../news/news_index_container';
import WatchButtonContainer from '../watches/watch_button_container';
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  border-color: red;
  width: 1050px;
`;

// const GREEN = "#67CF9A"
class StockShow extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchIntradayData(this.props.ticker)
    }
    render() {
        return (
            <div>
                <UserNavContainer />
                {(this.props.intradayData.length > 2) ? (
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
                    ) : (
                    <div className="stock-show-wrapper">
                        <BeatLoader
                            className={override}
                            sizeUnit={"px"}
                            size={10}
                                color={"#67CF9A"}
                            loading={true}
                        />
                    </div>

                )}
            </div>
        )
    }
}
export default StockShow;