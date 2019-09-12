import React from 'react';
class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: ""
        }
    }
    componentDidMount() {
        this.props.fetchStockChart(this.props.ticker,"1m").then(res => this.setState(res))
    }
    // componentDidUpdate(prevProps){
    //     if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
    //         const ticker = this.props.ticker;
    //         this.props.fetchCompanyInfo(ticker).then(res => this.setState(res));
    //         this.props.fetchStockStats(ticker).then(res => this.setState(res));
    //     } 
    // }
    render() {
        debugger
        return (
            <div>
                {/* {this.state.chart} */}

            </div>
        )
    }
}
export default Chart;