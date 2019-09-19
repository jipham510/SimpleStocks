import React from 'react';
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RED = "#EB5333"
const GREEN = "#67CF9A"

const TinyChart = (props) => {
    const lineColor = () => {
        return GREEN;
    }

    return (
        <div className="mini-chart">
            <ResponsiveContainer width='100%' height="100%">
                <LineChart data={props.chartData} key={props.initialLoad} className="stock-show-chart">
                    <Line type="linear" dataKey="close" stroke={lineColor()} strokeWidth={2} dot={false} />
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

export default TinyChart;