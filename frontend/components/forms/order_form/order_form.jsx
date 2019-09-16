import React from 'react';

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "BUY",
            shares: "",
            price: 0
        }
        this.activeBtn = this.activeBtn.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateShare = this.updateShare.bind(this);
    }
    componentDidUpdate(prevProps){
        if (this.props.stock !== prevProps.stock) {
            const intradayData = this.props.stock.intradayData;
            if (intradayData) this.setState({ price: intradayData[intradayData.length - 1].open });
        } 
    }
    activeBtn(orderType) {
        let res = "order-form";
        if (this.state.active === orderType) {
            res = `order-form active`;
        }
        return res;
    }
    changeActive(active){
        if (active === "SELL" && this.state.active === "BUY") {
            this.setState({ active: "SELL" });
        } else if( active === "BUY" && this.state.active === "SELL" ) {
            this.setState({ active: "BUY" });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let shares;
        if (this.state.shares === "") {
            shares = 0;
        } else {
            shares = this.state.shares
        }
        const formOrder = Object.assign({}, { ticker: this.props.ticker, 
                                              order_type: this.state.active,
                                              price: this.state.price,
                                              shares
                                            });
        this.props.postOrder(formOrder);

    }
    updateShare(e){
        this.setState({
            shares: e.currentTarget.value
        });
    }
    render() {
        return (
            <div className="order-sidebar">
                <header className="order-form-header">
                    <div className={this.activeBtn("BUY")} onClick={() => this.changeActive("BUY")}>
                        BUY {this.props.ticker}
                    </div>
                    <div className={this.activeBtn("SELL")} onClick={ () => this.changeActive("SELL")}>
                        SELL {this.props.ticker}
                    </div>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <div className="order-form-row">
                        <h3>Shares</h3> 
                        <input type="text" className="input-shares" value={this.state.shares} onChange={this.updateShare} placeholder="0"/>
                    </div>
                    <input type="submit" value="SUBMIT BUY"/>
                </form>
                <ul className="errors">
                    {this.props.errors.map((error, i) => (
                        <li key={i}>
                            {error}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
export default OrderForm;
{/* <div className="password">
    <div className="text2">
        <h2>Password</h2>
    </div>
    <input type="password" className="input-field" value={this.state.password} onChange={this.update('password')} />
</div> */}