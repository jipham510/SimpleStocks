import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            stockName: "",
            lineColor: "#67CF9A",
            active: "1m",
            // active: "1m",
            // active: "1m",
        }
    }
    componentDidMount() {
        // debugger
        this.props.fetchStockChart(this.props.ticker,"1m").then(res => this.setState(res));
        this.props.fetchStock(this.props.ticker).then( res => {
            return this.setState({ stockName: res.stock.name })
        });

    }
    // componentDidUpdate(prevProps){
    //     if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
    //         const ticker = this.props.ticker;
    //         this.props.fetchCompanyInfo(ticker).then(res => this.setState(res));
    //         this.props.fetchStockStats(ticker).then(res => this.setState(res));
    //     } 
    // }

    render() {        
        // debugger
        const placeholder = () => ( <h1>placeholder date</h1> )
        const renderLineChart = (
            <LineChart data={this.state.chartData} width={700} height={300} className="stock-show-chart">
                    <Line type="monotone" dataKey="open" stroke={this.state.lineColor} strokeWidth={2} dot={false}/>
                    {/* <CartesianGrid stroke="#ccc" /> */}
                    {/* <XAxis dataKey="date" /> */}
                    <YAxis domain={['dataMin', 'dataMax']} hide={true}  />
                    
                <Tooltip content={placeholder}
                        offset={-40}
                        position={{ y: -20 }}
                        isAnimationActive={false}/>
                </LineChart>
        )
        return (
            <div className="stock-show-chart-wrapper">
                <div className="chart-header">
                    <h1>{this.state.stockName}</h1>
                </div>
                {renderLineChart}
                <ul className="chart-ranges">
                    <li className="range-label">1D</li>
                    <li className="range-label">1W</li>
                    <li className="range-label">1M</li>
                    <li className="range-label">3M</li>
                    <li className="range-label">1Y</li>
                    <li className="range-label">5Y</li>
                </ul>
            </div>
        )
    }
}
export default Chart;