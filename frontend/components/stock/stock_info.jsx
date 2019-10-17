import React from 'react';
import { parseLargeNum, parseFloatToDollars } from '../../util/util';

class StockInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company_info: "",
            stats: ""
        }
        this.parseCEOToLink = this.parseCEOToLink.bind(this);
    }
    componentDidMount() {
        let ticker = this.props.match.params.ticker;
        this.props.fetchCompanyInfo(ticker).then(res => this.setState(res));
        this.props.fetchStockStats(ticker).then(res => this.setState(res));
    }
    componentDidUpdate(prevProps){
        if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
            const ticker = this.props.ticker;
            this.props.fetchCompanyInfo(ticker).then(res => this.setState(res));
            this.props.fetchStockStats(ticker).then(res => this.setState(res));
        } 
    }
    
    expandDescription(e){
        const stockShowPage = document.querySelector(".stock-info-description");
        if (stockShowPage.getAttribute("expanded-read")) {
            stockShowPage.removeAttribute("expanded-read");
            e.target.innerHTML = "Read More"
        } else {
            stockShowPage.setAttribute("expanded-read", "true");
            e.target.innerHTML = "Read Less"
        }
    }
    expandStats(e){
        const stockShowPage = document.querySelector(".stock-stats-wrapper");
        if (stockShowPage.getAttribute("expanded-show")) {
            stockShowPage.removeAttribute("expanded-show");
            e.target.innerHTML = "Show More"
        } else {
            stockShowPage.setAttribute("expanded-show", "true");
            e.target.innerHTML = "Show Less"
        }
    }
    parseCEOToLink(ceo){
        if(ceo) {
            let ending_url = ceo.split(" ").join("_");
            return `https://en.wikipedia.org/wiki/${ending_url}`;
        }
        return "";
    }
    parseCEOName(ceo){
        if(ceo) {
            let name = ceo.split(' ');
            return name[0] + " " + name[name.length - 1];
        }
        return "";
    }
    render() {
        return (
            <div className="stock-info">
                <div className="stock-info-heading --about">
                    <h3>About</h3>
                    <div className="show-more" onClick={this.expandStats}> 
                        Show More
                    </div>
                </div>
                <div className="stock-info-description-wrapper">
                    <div className="stock-info-description">
                        <h4>{this.state.company_info.description}</h4>
                    </div>
                    <div className="read-more" onClick={this.expandDescription}>
                        Read More
                    </div>
                </div>
                <div className="stock-stats-wrapper">
                    <ul className="stock-stats">
                        <li className="stat">
                            <h5>CEO</h5>
                            <div className="stat-info">
                                <a target="_blank" className="link-CEO" href={this.parseCEOToLink(this.state.company_info.CEO)}>
                                    {this.parseCEOName(this.state.company_info.CEO)}
                                </a>
                            </div>
                        </li>
                        <li className="stat">
                            <h5>Employees</h5>
                            <div className="stat-info">
                                {this.state.company_info.employees}
                            </div>
                        </li>
                        <li className="stat">
                            <h5>Headquarters</h5>
                            <div className="stat-info">
                                {`${this.state.company_info.city}, ${this.state.company_info.state}`}
                            </div>
                        </li>
                        <li className="stat">
                            <h5>Exchange</h5>
                            <div className="stat-info">
                                {`${this.state.company_info.exchange}`}
                            </div>
                        </li>
                        <li className="stat">
                            <h5>Market Cap</h5>
                            <div className="stat-info">
                                {parseLargeNum(this.state.stats.marketcap)}
                            </div>
                        </li> {/*PARSE MARKETCAP AND ADD MORE STATS LATER, ALSO REPLACE SHOW MORE EVENT*/}
                        <li className="stat">
                            <h5>PE Ratio</h5>
                            <div className="stat-info">
                                {`${this.state.stats.peRatio}`}
                            </div>
                        </li> 
                        <li className="stat">
                            <h5>Dividend Yield</h5>
                            <div className="stat-info">
                                {[(this.state.stats.dividendYield * 100).toFixed(2)]}
                            </div>
                        </li> 
                        <li className="stat">
                            <h5>Average Volume</h5>
                            <div className="stat-info">
                                {parseLargeNum(this.state.stats.avg10Volume)}
                            </div>
                        </li> 
                        <li className="stat">
                            <h5>52 Week High</h5>
                            <div className="stat-info">
                                {parseFloatToDollars(this.state.stats.week52high)}
                            </div>
                        </li> 
                        <li className="stat">
                            <h5>52 Week Low</h5>
                            <div className="stat-info">
                                {parseFloatToDollars(this.state.stats.week52low)}
                            </div>
                        </li> 
                    </ul>
                </div>
            </div>
        )
    }
}
export default StockInfo;