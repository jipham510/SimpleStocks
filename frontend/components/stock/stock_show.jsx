import React from 'react';
import StockInfoContainer from './stock_info_container';
import ChartContainer from './chart_container';

class StockShow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StockInfoContainer />
                <ChartContainer />
            </div>
        )
    }
}
export default StockShow;