import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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
        console.log(this.state.chart)
        
        const data = this.state.chart;
        // const data = [{ name: 'Page A', uv: 400}, { name: 'Page B', uv: 500}];

        const renderLineChart = (
            <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="open" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
            </LineChart>
        )
        return (
            <div>
                {renderLineChart}
            </div>
        )
    }
}
export default Chart;