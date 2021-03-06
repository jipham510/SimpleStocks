import React from 'react';
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { parseFloatToPostNegPercent, parseFloatToPosNegDollars } from '../../util/util';
import Odometer from 'react-odometerjs';
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const RED = "#EB5333"
const GREEN = "#67CF9A"
class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            historicalData: [],
            intradayData: [],
            stockName: "",
            lineColor: GREEN,
            active: "1D",
            hoverPrice: 0,
            timestamp: "",
            currentPrice: 0,
            flux: 0,
            fluxPercent: 0,
            initialLoad: 0
        }
        this.activeBtn = this.activeBtn.bind(this);
        this.handleChangeRange = this.handleChangeRange.bind(this);
        this.changeDates = this.changeDates.bind(this);
        this.renderLineChart = this.renderLineChart.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.setColorStatus = this.setColorStatus.bind(this);
        this.resetHoverPrice = this.resetHoverPrice.bind(this);
        this.setIntradayData = this.setIntradayData.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
            this.setState({active: "1D"});
            this.props.fetchStock(this.props.ticker).then(res => {
                return this.setState({ stockName: res.stock.name })
            });
            if (this.props.intradayData.length === 0) {
                this.props.fetchIntradayData(this.props.ticker).then(res => this.setIntradayData(res.intradayData.chart))

            } else {
                this.setIntradayData(this.props.intradayData)
            }
            if (this.props.historicalData.length === 0) {
                this.props.fetch1YrHistoricalData(this.props.ticker).then(res => this.setState( {historicalData: res.historicalData.chart}));
            } else {
                this.setState({ historicalData: this.props.historicalData })
            }
        }
    }
    componentDidMount() {
        this.props.fetchStock(this.props.ticker).then(res => {
            return this.setState({ stockName: res.stock.name })
        });
        if (this.props.intradayData.length === 0) {
            this.props.fetchIntradayData(this.props.ticker).then(res => this.setIntradayData(res.intradayData.chart))

        } else {
            this.setIntradayData(this.props.intradayData)
        }
        if (this.props.historicalData.length === 0) {
            this.props.fetch1YrHistoricalData(this.props.ticker).then(res => {
                this.setState({ historicalData: res.historicalData.chart })
            });
        } else {
            this.setState({ historicalData: this.props.historicalData })
        }
    }
    setIntradayData(res) {
        let data = res;
        data = data.filter(chart => {
            return chart.close !== null;
        })
        let lastIdx = data.length - 1;
        let color;
        if (data.length > 0) {
            data[0].close > data[lastIdx].close ? color = RED : color = GREEN;
            return this.setState({
                intradayData: data,
                chartData: data,
                currentPrice: data[lastIdx].close,
                hoverPrice: data[lastIdx].close,
                lineColor: color,
                initialLoad: 1
            }, () => {
                this.setColorStatus();
                this.calculateFlux(data[lastIdx]);
            })
        }
    }
    calculateFlux(dataPoint) {
        let flux = 0;
        let fluxPercent = 0;
        if (dataPoint) {
            let firstDataPoint = this.state.chartData[0];
            flux = dataPoint.close - firstDataPoint.close;
            fluxPercent = (1 - firstDataPoint.close / dataPoint.close) * 100;
        }
        return this.setState({
            flux,
            fluxPercent
        });
    }
    activeBtn(range) {
        let res = "range-btn";
        if (this.state.active === range) {
            res = `range-btn active`;
        }
        return res;
    }

    setColorStatus() {
        const stockShowPage = document.querySelector("body");
        if (this.state.lineColor === GREEN) {
            stockShowPage.removeAttribute("data-status")
        } else {
            stockShowPage.setAttribute("data-status", "red")
        }
    }
    changeDates(range) {
        let newChartData;
        let historicalLength = this.state.historicalData.length;
        if (range === "1D") {

            newChartData = this.state.intradayData
            newChartData = newChartData.filter(chart => {
                return chart.close !== null;
            })
        } else if (range === "1W") {
            newChartData = this.state.historicalData.slice(historicalLength - 5, historicalLength)
        } else if (range === "1M") {
            newChartData = this.state.historicalData.slice(historicalLength - 22, historicalLength)
        } else if (range === "3M") {
            newChartData = this.state.historicalData.slice(historicalLength - 66, historicalLength)
        } else if (range === "1Y") {
            if(this.state.historicalData.length > 300) {
                newChartData = this.state.historicalData.slice(historicalLength - 264, historicalLength)
             
            } else {
                newChartData = this.state.historicalData;
            }
        } else if (range === "5Y") {
            newChartData = this.state.historicalData
            if (newChartData.length < 300 ) {
                this.props.fetch5YrHistoricalData(this.props.ticker).then(res => 
                    this.setState({ 
                        historicalData: res.historicalData.chart,
                        chartData: res.historicalData.chart
                    })
                );
            } else {
                newChartData = this.state.historicalData;
            }
        }
        let newColor;
        if (newChartData.length !== 0 && newChartData[0].close > newChartData[newChartData.length - 1].close) {
            newColor = RED;
        } else {
            newColor = GREEN;
        }
        this.setState({
            chartData: newChartData,
            lineColor: newColor
        }, this.setColorStatus)
    }
    handleChangeRange(e) {
        let range = e.target.innerText;
        this.setState({ active: range })
        this.changeDates(range);
    }
    handleMouseHover(e) {
        if (e.activePayload) {
            let price = e.activePayload[0].payload.close;
            this.calculateFlux(e.activePayload[0].payload);
            if (price) {
                price = e.activePayload[0].payload.close;
                let timestamp;
                if (this.state.active === "1D") {
                    timestamp = e.activePayload[0].payload.label + " ET";
                } else {
                    timestamp = e.activePayload[0].payload.date;
                }
                this.setState({
                    hoverPrice: price,
                    timestamp: timestamp
                });
            }
        }
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
            <div className="line-chart-stock-show-page">
                <ResponsiveContainer width='100%' height="100%">
                    <LineChart data={this.state.chartData} onMouseMove={this.handleMouseHover} onTouchStart={this.handleMouseHover} onMouseLeave={this.resetHoverPrice} key={this.state.initialLoad} className="stock-show-chart">
                        <Line type="linear" dataKey="close" stroke={this.state.lineColor} strokeWidth={2} dot={false} />
                        <YAxis domain={['dataMin', 'dataMax']} hide={true} />

                        <Tooltip className="tooltip" content={renderTimeStamp}
                            offset={-40}
                            position={{ y: -20 }}
                            isAnimationActive={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
    resetHoverPrice() {
        this.calculateFlux(this.state.chartData[this.state.chartData.length - 1]);
        return this.setState({ hoverPrice: this.state.currentPrice })
    }
    render() {
        return (
            
            <div className="stock-show-chart-wrapper">

                <div className="chart-header">
                    <h1>{this.state.stockName}</h1>
                    <h2>$<Odometer value={this.state.hoverPrice} /></h2>
                    <h3>{parseFloatToPosNegDollars(this.state.flux)} ({parseFloatToPostNegPercent(this.state.fluxPercent)})</h3>

                </div>
                {(this.state.active !== "5Y" || this.state.chartData.length > 300) ? ( 
                    <div>
                        {this.renderLineChart()} 
                    </div>
                ) : (
                    <div className="line-chart-stock-show-page">

                    <BeatLoader
                        className={override}
                        sizeUnit={"px"}
                        size={10}
                        color={"#67CF9A"}
                        loading={true}
                        />
                    </div>
                )}
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