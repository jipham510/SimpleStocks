import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RED = "#EB5333"
const GREEN = "#67CF9A"
class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            lineColor: GREEN,
            active: "1D",
            timestamp: "",
            hoverBalance: 0
        }
        this.renderLineChart = this.renderLineChart.bind(this);
        this.setData = this.setData.bind(this);
        this.handleChangeRange = this.handleChangeRange.bind(this);
        this.activeBtn = this.activeBtn.bind(this);
        this.setColorStatus = this.setColorStatus.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this); //REWRITE
    }
    componentDidMount(){
        this.props.fetchIntradayData("GOOGL")
            .then( res => this.setData(res))
    }
    setData(res){
        let data = res.intradayData;
        data = data.filter(chart => {
            return chart.close !== null;
        })
        let lastIdx = data.length - 1;
        let color;
        data[0].close > data[lastIdx].close ? color = RED : color = GREEN;

        return this.setState(
            {
                chartData: data,
                lineColor: color
            }, 
            this.setColorStatus 
        )
    }
    setColorStatus() {
        // debugger
        const body = document.querySelector("body");
        if (this.state.lineColor === GREEN) {
            body.removeAttribute("data-status")
        } else {
            body.setAttribute("data-status", "red")
        }
    }
    handleMouseHover(e) { 
        if (e.activePayload) {
            let balance = e.activePayload[0].payload.close; 
///////////////////////////would be BALANCE instead of close
            // this.calculateFlux(e.activePayload[0].payload);
            if (balance) {
                balance = e.activePayload[0].payload.close;
                let timestamp = e.activePayload[0].payload.date;
                this.setState({
                    hoverBalance: balance,
                    timestamp
                });
            }
        }
    }
    renderLineChart() {
        // const renderTimeStamp = () => (
        //     <div className="timestamp">
        //         inside tooltip
        //     </div>
        // )
        const renderTimeStamp = () => (
            <div className="timestamp">
                {this.state.timestamp}
            </div>
        )

        return (
            // <LineChart data={this.state.chartData} width={700} height={300} onMouseMove={this.handleMouseHover} onMouseLeave={this.resetHoverPrice} className="stock-show-chart">
            <ResponsiveContainer width='100%' height="100%">
                <LineChart data={this.state.chartData} className="stock-show-chart" onMouseMove={this.handleMouseHover}>
                    <Line type="monotone" dataKey="close" stroke={this.state.lineColor} strokeWidth={2} dot={false} />
                    {/* <CartesianGrid stroke="#ccc" /> */}
                    {/* <XAxis dataKey={xAxisData} /> */}
                    <YAxis domain={['dataMin', 'dataMax']} hide={true} />

                    {/* <Tooltip content="test" */}
                    <Tooltip content={renderTimeStamp}
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
        // this.changeDates(range); WRITE LOGIC FOR THIS AFTER PORTFOLIO SEEDED
        
    }
    render() {
        return (
            <div className="portfolio">
                {/* <h1>Inside Portfolio component</h1> */}
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