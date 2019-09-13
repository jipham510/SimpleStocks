import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { parseFloatToDollars } from '../../util/util'
import { ETIME } from 'constants';
class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            historicalData: [],
            intradayData: [],
            stockName: "",
            lineColor: "#67CF9A",
            active: "1M",
            hoverPrice: "",
            timestamp:  ""
        }
        this.activeBtn = this.activeBtn.bind(this);
        this.handleChangeRange = this.handleChangeRange.bind(this);
        this.changeDates = this.changeDates.bind(this);
        this.renderLineChart = this.renderLineChart.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this);
    }
    componentDidMount() {
        this.props.fetchStockChart(this.props.ticker, "1m").then(res => this.setState(res));
        this.props.fetchStock(this.props.ticker).then(res => {
            return this.setState({ stockName: res.stock.name })
        });
        this.props.fetchHistoricalData(this.props.ticker).then(res => this.setState(res));
        this.props.fetchIntradayData(this.props.ticker).then(res => this.setState(res));
    }
    activeBtn(range) {
        let res = "range-btn";
        if (this.state.active === range) {
            res = `range-btn active`;
        }
        return res;
    }

    changeDates(range) {
        let newChartData;
        if (range === "1D") {

            newChartData = this.state.intradayData
            newChartData = newChartData.filter(chart => {
                return chart.close !== null;
            })
        } else if (range === "1W") {
            newChartData = this.state.historicalData.slice(0, 5)
        } else if (range === "1M") {
            newChartData = this.state.historicalData.slice(0, 22)
        } else if (range === "3M") {
            newChartData = this.state.historicalData.slice(0, 66)
        } else if (range === "1Y") {
            newChartData = this.state.historicalData.slice(0, 264)
        } else if (range === "5Y") {
            newChartData = this.state.historicalData
        }
        let newColor;
        if (newChartData[0].close > newChartData[newChartData.length - 1].close) {
            newColor = "red";
        } else {
            newColor = "#67CF9A";
        }
        this.setState({
            chartData: newChartData,
            lineColor: newColor
        })
    }
    handleChangeRange(e) {
        let range = e.target.innerText;
        this.setState({ active: range })
        this.changeDates(range);
    }
    handleToolTip(e){
        let timestamp = "";
        if ( e.activePayload && e.activePayload[0] !== undefined){
            if (this.state.active === "1D"){
                timestamp = e.activePayload[0].payload.label + " ET";
            } else {
                timestamp = e.activePayload[0].payload.date;
            }
        }
        this.setState({
            timestamp: timestamp
        })
    }

    renderLineChart() {
        const renderTimeStamp = () => (<div className="timestamp">{this.state.timestamp}</div>)
        let xAxisData;
        if (this.state.active === "1D") {
            xAxisData = "label"
        } else {
            xAxisData = "date"
        }
        return (
            <LineChart data={this.state.chartData} width={700} height={300} onMouseMove={this.handleMouseHover} className="stock-show-chart">
                <Line type="monotone" dataKey="close" stroke={this.state.lineColor} strokeWidth={2} dot={false} />
                {/* <CartesianGrid stroke="#ccc" /> */}
                <XAxis dataKey={xAxisData} />
                <YAxis domain={['dataMin', 'dataMax']} hide={true} />

                <Tooltip content={renderTimeStamp}
                    offset={-40}
                    position={{ y: -20 }}
                    isAnimationActive={false} />
            </LineChart>
        )
    }
    handleMouseHover(e) {
        let price = e.activePayload[0].payload.close;
        if (price) {
            price = parseFloatToDollars(e.activePayload[0].payload.close);
            let timestamp = e.activePayload[0].payload.date;
            this.setState( {hoverPrice: price,
                timestamp: timestamp
                });
            // this.state.handleToolTip(e);
        }
    }
    render() {
        return (
            <div className="stock-show-chart-wrapper">
                <div className="chart-header">
                    <h1>{this.state.stockName}</h1>
                    <h2>{this.state.hoverPrice}</h2>
                </div>
                {this.renderLineChart()}
                <ul className="chart-ranges">
                    <li className={this.activeBtn("1D")} onClick={this.handleChangeRange}>1D</li>
                    <li className={this.activeBtn("1W")} onClick={this.handleChangeRange}>1W</li>
                    <li className={this.activeBtn("1M")} onClick={this.handleChangeRange}>1M</li>
                    <li className={this.activeBtn("3M")} onClick={this.handleChangeRange}>3M</li>
                    <li className={this.activeBtn("1Y")} onClick={this.handleChangeRange}>1Y</li>
                    <li className={this.activeBtn("5Y")} onClick={this.handleChangeRange}>5Y</li>
                </ul>
            </div>
        )
    }
}
export default Chart;