import React from 'react';
class SeachBar extends React.Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount() {
    //     this.props.fetchStockChart(this.props.ticker, "1m").then(res => this.setState(res))
    // }

    render() {
        return (
            <div className="searchbar">
                <input type="text" className="seach-bar-input" placeholder="WIP searchbar"/>

            </div>
        )
    }
}
export default SeachBar;