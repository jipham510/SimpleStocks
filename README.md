# SimpleStocks

SimpleStocks is an investment app which simplifies stock trading and lets users practice investing for free.

[Live Demo](https://simplestocks-fsp.herokuapp.com/#/)

## Technologies

* Frontend: React, Redux
* Backend: Ruby on Rails, PostgreSQL
* Data Visualization: Recharts Library
* IEX Trading API
* [News API]
* [Odometer JS](https://github.hubspot.com/odometer/docs/welcome/)
* CSS and HTML5

## Features
### Dark Mode
Dark mode is togglable on every page of the application. Using CSS variables, I made my css dynamic by having a corresponding color be triggered depending on whether or not my dark theme was applied to the body. 

![alt text](https://imgur.com/V7dhg70)

### Data Visualization
Using IEX Cloud to pull historical stock info and recharts JS to transform the data into line charts, I made visualizations of the stock data prices in real time. Once my chart component is mounted, it fetches the historical data of the past 5 years of a stock's value. Event handlers are set on the 1D, 1W, 1M, 3M, 1Y, and 5Y buttons. The chart component has a data state that changes its range depending on what event handler is triggered.
```
changeDates(range) {
        let newChartData;
        let historicalLength = this.state.historicalData.length;
        if (range === "1D") {

            newChartData = this.state.intradayData
            newChartData = newChartData.filter(chart => {
                return chart.close !== null;
            })
        } else if (range === "1W") {
            newChartData = this.state.historicalData.slice(historicalLength - 5, historicalLength)
        } else if (range === "1M") {
            newChartData = this.state.historicalData.slice(historicalLength - 22, historicalLength)
        } else if (range === "3M") {
            newChartData = this.state.historicalData.slice(historicalLength - 66, historicalLength)
        } else if (range === "1Y") {
            newChartData = this.state.historicalData.slice(historicalLength - 264, historicalLength)
        } else if (range === "5Y") {
            newChartData = this.state.historicalData
        }
        let newColor;
        if (newChartData.length !== 0 && newChartData[0].close > newChartData[newChartData.length - 1].close) {
            newColor = RED;
        } else {
            newColor = GREEN;
        }
        this.setState({
            chartData: newChartData,
            lineColor: newColor
        }, this.setColorStatus)
    }
```
### Portfolio
One of the biggest challenges I faced in this project was making my user portfolio. The portfolio is the user's balance at any point in the past 5 years. My first approach was trying to fetch all of the user's stocks for the past five years. This is very costly to do, so instead I made a portfolio snapshot table that saves the user's balance daily and stores it in my database. Doing the daily portfolio balance was also challenging due to having to account for many factors, like when a user buys or sells a stock, how many they own at a time, their deposits at different times, and the fluctuating nature of stocks every minute. The following code makes a batch request for the intraday data of all the stocks a user owns at a given time of the day and combines them with the user's buying power at that time.

```   def create_one_day_portfolio 
    result = []
    url = "https://cloud.iexapis.com/stable/stock/market/batch?types=chart&range=1d&chartInterval=5&last=5&token=#{API_TOKEN}&symbols="

    stock_orders = Hash.new { |h, k| h[k] = [] }
    orders.each do |order|
      stock_orders[order.ticker].push(order)
    end
    if stock_orders.length > 0
      request = url + stock_orders.keys.join(',')
      response = JSON.parse(open(request).read)

      all_deposits = deposits.inject(0) { |sum, deposit| sum + deposit.deposit_money}
      one_day_charts = []
      buying_power_chart = Hash.new(0)

      response.keys.each do |ticker|
        stock_chart = []
        current_owned = 0
        buying_power_one_day = 0
        response[ticker]["chart"].each_with_index do |day_data,idx|
          stock_orders[ticker].each do |order|
            if Time.zone.parse(order["created_at"].to_s) < Time.zone.parse(day_data["label"])
              if order.order_type == "BUY"
                buying_power_one_day -= order.net_value
                current_owned += order.shares
              else
                buying_power_one_day += order.net_value
                current_owned -= order.shares
              end
              stock_orders[ticker].delete(order)
            end
          end
          buying_power_chart[idx] += buying_power_one_day
          if current_owned > 0
            if idx == 0 && day_data["close"].nil? 
              fetch_latest_stock_price = "https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=#{API_TOKEN}&symbols=#{ticker}"
              latest_stock_price_response = JSON.parse(open(fetch_latest_stock_price).read)
              stock_chart.push(latest_stock_price_response[ticker]["quote"]["previousClose"]* current_owned)
            else
              day_data["close"].nil? ? stock_chart.push(stock_chart[-1]) : stock_chart.push(day_data["close"] * current_owned)
            end
          else
            stock_chart.push(0)
          end
        end
        one_day_charts.push(stock_chart)
      end
      response[response.keys.first]["chart"].each_with_index do |day_data,idx|
        balance = 0
        one_day_charts.each do |chart|
          balance += chart[idx] 
        end
        balance += buying_power_chart[idx] + all_deposits
        result.push( { balance: balance, date: day_data["label"] } )
      end
    end
    return result
  end

```
