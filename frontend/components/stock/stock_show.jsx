import React from 'react';
class StockShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.stock;
    }
    componentDidMount() {
        let ticker = this.props.match.params.ticker;
        this.props.fetchCompanyInfo(ticker).then(res => this.setState(res));
        this.props.fetchStockStats(ticker).then(res => this.setState(res));
        this.props.fetchCompanyInfo(ticker).then(res => this.setState(res));
    }
    render() {
        // debugger
        return (
            <div>
                {this.state.companyName}
                {this.state.ticker}
                {this.state.name}
                {this.state.name}
            </div>
        )
    }
}
export default StockShow;