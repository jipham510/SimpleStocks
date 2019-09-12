import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: []
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
    // decideLineColor(data){
    //     console.log(data);
    //     return "green";
    // }
    render() {        
        const data = this.state.chart;
        // const data = [{ name: 'Page A', uv: 400}, { name: 'Page B', uv: 500}];

        const renderLineChart = (
            // <ResponsiveContainer>
                <LineChart width={700} height={300} data={data} className="stock-show-chart">
                <Line type="monotone" dataKey="open" stroke="green" dot={false}/>
                    {/* <CartesianGrid stroke="#ccc" /> */}
                    {/* <XAxis dataKey="date" /> */}
                    <YAxis domain={['dataMin', 'dataMax']} hide={true} />
                    <Tooltip />
                </LineChart>
            // </ResponsiveContainer>
        )
        return (
            <div className="stock-show-chart-wrapper">
                {renderLineChart}
            </div>
        )
    }
}
export default Chart;