import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            lineColor: "#67CF9A"
        }
        this.renderLineChart = this.renderLineChart.bind(this);
    }
    // componentDidMount(){
        // this.props.ownedStockTickers.forEach( ticker => {
        //     if (stock.intradayData === undefined ) this.props.fetchIntradayData(ticker)
        // });
    // }

    // componentDidUpdate(prevProps) {
        // if (prevProps.ownedStocks !== this.props.ownedStocks){
        //     this.props.ownedStocks.forEach(stock => {
        //         // if (stock.intradayData === undefined) this.props.fetchIntradayData(stock.ticker)
        //         if (stock.intradayData === undefined) this.setState({ 
        //             chartData: this.props.ownedStocksIntradayData[0] 
        //         })
        //     })
        //     // if (this.props.ownedStocksIntradayData[0] !== undefined) {
        //     //     this.setState({ chartData: this.props.ownedStocksIntradayData[0]})
        //     // }
        // }
    // }
    renderLineChart() {
        const renderTimeStamp = () => (
            <div className="timestamp">
                inside tooltip
            </div>
        )
        // debugger
        // const renderTimeStamp = () => (<div className="timestamp">{this.state.timestamp}</div>)
        // let xAxisData;
        // if (this.state.active === "1D") {
        //     xAxisData = "label"
        // } else {
        //     xAxisData = "date"
        // }
        return (
            // <LineChart data={this.state.chartData} width={700} height={300} onMouseMove={this.handleMouseHover} onMouseLeave={this.resetHoverPrice} className="stock-show-chart">
            <LineChart data={this.state.chartData} width={700} height={300}  className="stock-show-chart">
                <Line type="monotone" dataKey="close" stroke={this.state.lineColor} strokeWidth={2} dot={false} />
                {/* <CartesianGrid stroke="#ccc" /> */}
                {/* <XAxis dataKey={xAxisData} /> */}
                <YAxis domain={['dataMin', 'dataMax']} hide={true} />

                {/* <Tooltip content="test" */}
                <Tooltip content={renderTimeStamp}
                    offset={-40}
                    position={{ y: -20 }}
                    isAnimationActive={false} />
            </LineChart>
        )
    }
    render() {
        return (
            <div className="portfolio">
                <h1>Inside Portfolio component</h1>
                {this.renderLineChart()}
            </div>
        )
    }
}
export default Portfolio;