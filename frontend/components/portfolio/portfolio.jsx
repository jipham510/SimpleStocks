import React from 'react';
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { parseFloatToPosNegDollars, parseFloatToPostNegPercent } from '../../util/util'
import { fetchPortfolioSnapshots, fetchPortfolioSnapshot } from '../../util/portfolio_snapshot_api_util'
import Odometer from 'react-odometerjs';

const RED = "#EB5333"
const GREEN = "#67CF9A"
class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            fiveYearData: [],
            intradayData: [],
            lineColor: GREEN,
            active: "1D",
            timestamp: "",
            currentBalance: this.props.currentBalance,
            hoverBalance: this.props.currentBalance,
            flux: 0,
            fluxPercent: 0, 
            initialLoad: 0
        }
        this.renderLineChart = this.renderLineChart.bind(this);
        this.setData = this.setData.bind(this); 
        this.handleChangeRange = this.handleChangeRange.bind(this);
        this.activeBtn = this.activeBtn.bind(this);
        this.setColorStatus = this.setColorStatus.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this); //REWRITE
        this.changeDates = this.changeDates.bind(this)
        this.resetHoverBalance = this.resetHoverBalance.bind(this);

    }
    componentDidMount(){
        fetchPortfolioSnapshot()
            .then(res => this.setData(res));
        fetchPortfolioSnapshots()
            .then(res => this.setState({ fiveYearData: res}));
    }
    setData(intradayData){
        // responseJSON: Array(1258) [0 … 99] 0: balance: 100000 created_at: "2019-09-18T16:33:01.896Z" id: 1258 snapshot_date: "2014-09-18"

        let lastIdx = intradayData.length - 1;
        let color;
        intradayData[0].balance > intradayData[lastIdx].balance ? color = RED : color = GREEN;

        return this.setState(
            {
                chartData: intradayData,
                intradayData,
                lineColor: color,
                initialLoad: 1
            }, () => {
                this.setColorStatus();
                this.calculateFlux(intradayData[lastIdx]);
            }
        )
    }
    calculateFlux(dataPoint) {
        let flux = 0;
        let fluxPercent = 0;
        if (dataPoint) {
            let firstDataPoint = this.state.chartData[0];
            flux = dataPoint.balance - firstDataPoint.balance;
            fluxPercent = (1 - firstDataPoint.balance / dataPoint.balance) * 100;
        }
        return this.setState({
            flux,
            fluxPercent
        });
    }

    setColorStatus() {
        const body = document.querySelector("body");
        if (this.state.lineColor === GREEN) {
            body.removeAttribute("data-status")
        } else {
            body.setAttribute("data-status", "red")
        }
    }
    handleMouseHover(e) { 
        if (e.activePayload) {
            let balance = e.activePayload[0].payload.balance; 
            this.calculateFlux(e.activePayload[0].payload);
            if (balance) {
                let timestamp;
                if (this.state.active === "1D") {
                    timestamp = e.activePayload[0].payload.date + " ET";
                } else {
                    timestamp = e.activePayload[0].payload.snapshot_date;
                }
                this.setState({
                    hoverBalance: balance,
                    timestamp
                });
            }
        }
    }
    renderLineChart() {
        const renderTimeStamp = () => (
            <div className="timestamp">
                {this.state.timestamp}
            </div>
        )
        return (
            <ResponsiveContainer width='100%' height="100%">
                <LineChart data={this.state.chartData} key={this.state.initialLoad} className="stock-show-chart" onMouseMove={this.handleMouseHover} onMouseLeave={this.resetHoverBalance} >
                    <Line type="linear" dataKey="balance" stroke={this.state.lineColor} strokeWidth={2} dot={false} />

                    <YAxis domain={['dataMin', 'dataMax']} hide={true} />

                    <Tooltip className="tooltip" content={renderTimeStamp}
                        offset={-40}
                        position={{ y: -15 }}
                        isAnimationActive={false} />
                </LineChart>
            </ResponsiveContainer>
        )
    }
    activeBtn(range) {
        let res = "range-btn";
        if (this.state.active === range) {
            res = `range-btn active`;
        }
        return res;
    }
    handleChangeRange(e) {
        let range = e.target.innerText;
        this.setState({ active: range })
        this.changeDates(range); 
        
    }
    changeDates(range) {
        let newChartData;
        let fiveYearLength = this.state.fiveYearData.length;
        if (range === "1D") {
            newChartData = this.state.intradayData
        } else if (range === "1W") {
            newChartData = this.state.fiveYearData.slice(fiveYearLength - 5, fiveYearLength)
        } else if (range === "1M") {
            newChartData = this.state.fiveYearData.slice(fiveYearLength - 21, fiveYearLength)
        } else if (range === "3M") {
            newChartData = this.state.fiveYearData.slice(fiveYearLength - 66, fiveYearLength)
        } else if (range === "1Y") {
            newChartData = this.state.fiveYearData.slice(fiveYearLength - 253, fiveYearLength)
        } else if (range === "5Y") {
            newChartData = this.state.fiveYearData
        }
        let newColor;
        if (newChartData && newChartData[0].balance > newChartData[newChartData.length - 1].balance) {
            newColor = RED;
        } else {
            newColor = GREEN;
        }
        this.setState({
                chartData: newChartData,
                lineColor: newColor
            }, 
            this.setColorStatus
        )
    }
    resetHoverBalance() {
        this.calculateFlux(this.state.chartData[this.state.chartData.length - 1]);
        return this.setState({ hoverBalance: this.state.currentBalance })
    }
    render() {
        return (
            <div className="portfolio">
                <div className="chart-header">
                    <h1>Balance</h1>
                    <h2>$<Odometer value={this.state.hoverBalance}></Odometer></h2>
                    <h3>{parseFloatToPosNegDollars(this.state.flux)} ({parseFloatToPostNegPercent(this.state.fluxPercent)})</h3>
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
export default Portfolio;