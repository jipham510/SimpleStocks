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
            <div className="stock-info">
                <div className="stock-info-heading--about">
                    <h3>About</h3>
                </div>
                <ul>
                    <li>name: {this.state.company_info.companyName}</li>
                    <li>ticker: {this.state.ticker} </li>
                    <li>week52high: {this.state.stats.week52high}</li>
                </ul>
            </div>
        )
    }
}
export default StockInfo;