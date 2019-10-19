import React from 'react';
import {parseFloatToDollars} from '../../../util/util';

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "BUY",
            shares: "",
            price: null,
            disabled: false
        }
        this.activeBtn = this.activeBtn.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateShare = this.updateShare.bind(this);
        this.renderOrderFormFooter = this.renderOrderFormFooter.bind(this);
        this.hideOrderForm = this.hideOrderForm.bind(this);
    }
    componentDidUpdate(prevProps){
        if (this.props.stock !== prevProps.stock) {
            if (!this.props.stock) return;
            if ('intradayData' in this.props.stock) {
                const intradayData = this.props.stock.intradayData;
                let price;
                for (let i = intradayData.length - 1; i >= 0; i--) {
                    if(intradayData[i].close !== null) {
                        price = intradayData[i].close
                        break;
                    }
                }
                this.setState({ price });
            }
        } 
    }
    componentWillUnmount(){
        this.props.clearErrors();
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
        this.setState({ disabled: true })
        const orderFormSubmit = document.querySelector(".order-form-submit");
        orderFormSubmit.classList.add("disabled")
        if (!this.state.disabled) {
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
            this.props.postOrder(formOrder).then ( res => 
                window.location.reload(),
                () => this.setState({ disabled: false })
            )
        }


    }
    updateShare(e){
        this.setState({
            shares: e.currentTarget.value
        });
    }
    renderOrderFormFooter() {
        if(this.state.active === "BUY") {
            return(
                <footer className="order-form-footer">
                    {parseFloatToDollars(this.props.buyingPower)} Buying Power Available
                </footer>
            )
        } else {            
            return(
                <footer className="order-form-footer">
                    {this.props.ownedShares === undefined ? 0 : this.props.ownedShares} Shares Available
                </footer>
            )
        }
    }
    hideOrderForm() {
        const orderForm = document.querySelector('.stock-show-right-content');
        if (orderForm.classList.contains("open")) {
            orderForm.classList.remove("open");
        } else {
            orderForm.classList.add("open");
        }
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
                    <div className="hamburger-btn close" onClick={this.hideOrderForm}>
                        <div className="btn-line"></div>
                        <div className="btn-line"></div>
                        <div className="btn-line"></div>
                    </div>
                </header>
                <form onSubmit={this.handleSubmit}>
                    <div className="order-form-row">
                        <h3>Shares</h3> 
                        <input type="text" className="input-shares" value={this.state.shares} onChange={this.updateShare} placeholder="0"/>
                    </div>
                    <div className="order-form-row">
                        <h3>Market Price</h3> 
                        <div className="order-form-price">{parseFloatToDollars(this.state.price)}</div>
                    </div>
                    <div className="order-form-row">
                        <h3>Estimated Cost</h3> 
                        <div className="order-form-cost">{parseFloatToDollars(this.state.price*this.state.shares)}</div>
                    </div>
                    <div className="order-form-row">
                        <ul className="errors">
                            {this.props.errors.map((error, i) => (
                                <li key={i}>
                                    {error}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-form-row">
                        <input type="submit" value={this.state.active === "BUY" ? "SUBMIT BUY" : "SUBMIT SELL"} className="order-form-submit"/>
                        {/* <input type="submit" value="SUBMIT BUY" className="order-form-submit"/> */}
                    </div>
                </form>
                {this.renderOrderFormFooter()}
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