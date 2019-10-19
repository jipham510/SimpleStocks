import React from 'react';

class WatchButton extends React.Component {
    constructor(props) {
        super(props);
        let watched = false;
        if (this.props.watches[this.props.ticker]) watched = true;
        this.state = {
            watched, 
            watches: {}
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        this.props.fetchWatchedStocks();
    }
    componentDidUpdate(prevProps) {
        
        if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
            let watched = false;
            if (this.props.watches[this.props.ticker]) watched = true;
            this.setState({ watched});
        }
    }
    handleClick(e){
        if(e.target.innerText === "Remove from Watchlist") {
            this.setState({ watched: false})
            this.props.deleteWatchedStock(this.props.watches[this.props.ticker].id,this.props.ticker)
        } else {
            this.setState({ watched: true})
            this.props.postWatchedStock({ticker: this.props.ticker})
        }
    }
 
    render() {
        return (
            <div className="watch-btn" onClick={this.handleClick}>
                {this.state.watched ? "Remove from Watchlist" : "Add to Watchlist"}
            </div>
        )
    }
}
export default WatchButton;
