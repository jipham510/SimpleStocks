import React from 'react';
class StockInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company_info: "",
            stats: ""
        }
    }
    componentDidMount() {
        let ticker = this.props.match.params.ticker;
        this.props.fetchCompanyInfo(ticker).then(res => this.setState(res));
        this.props.fetchStockStats(ticker).then(res => this.setState(res))
    }
    // componentDidUpdate(prevProps){
    //     if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
    //         const ticker = this.props.ticker;
    //         this.props.fetchCompanyInfo(ticker).then(res => this.setState(res));
    //         this.props.fetchStockStats(ticker).then(res => this.setState(res));
    //     } 
    // }
    render() {
        return (
            <div>
                {this.state.company_info.companyName}
                {this.state.ticker}
                {this.state.stats.week52high}

            </div>
        )
    }
}
export default StockInfo;