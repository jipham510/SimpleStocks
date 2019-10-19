import React from 'react';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

const RED = "#EB5333"
const GREEN = "#67CF9A"

const TinyChart = (props) => {
    const lineColor = () => {

        if (props.intradayData.length !== 0 && props.intradayData[0].close > props.intradayData[props.intradayData.length - 1].close) {
            return RED;
        } else {
            return GREEN;
        }
    }

    // const counter = (function () {
    //     var counter = 0;
    //     return function () { counter += 1; return counter }
    // })();

    return (
        <div className="mini-chart">
            <ResponsiveContainer width='100%' height="100%">
            <LineChart data={props.intradayData} key={props.initialLoad} cursor="pointer">
                    <Line type="linear" dataKey="close" stroke={lineColor()} strokeWidth={2} dot={false} />
                    <YAxis domain={['dataMin', 'dataMax']} hide={true} />
    
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TinyChart;