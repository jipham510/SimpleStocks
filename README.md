# SimpleStocks

SimpleStocks is an investment app which simplifies stock trading and lets users practice investing for free.

[Live Demo](https://simplestocks-fsp.herokuapp.com/#/)

![](https://media.giphy.com/media/cOcCtxNoy6OZYh5ps9/giphy.gif)
## Technologies

* Frontend: React, Redux, CSS, HTML5
* Backend: Ruby on Rails, PostgreSQL
* [IEX Trading API](https://iexcloud.io/)
* [News API](https://newsapi.org/)
* [Odometer JS](https://github.hubspot.com/odometer/docs/welcome/)
* [Recharts JS Library](http://recharts.org/en-US/)

## Features
### Responsive Web Design
SimpleStocks is a fully responsive website that can be used on any device! I made 5 separate CSS media queries that account for a wide range of desktop, tablet, and phone sizes. On phone, the navigation bar turns into a hamburger menu on the top right and helps users navigate through the site effortlessly. There is also a dark mode feature that was made using CSS variables. It can be toggled on or off at any time through the navigation menu.
![](https://media.giphy.com/media/UUmCxRkVEMCC3o858A/giphy.gif)

### Data Visualization
Using IEX Cloud to pull historical stock info and recharts JS to transform the data into line charts, I made visualizations of the stock data prices in real time. Once my chart component is mounted, it fetches the historical data for the past 5 years of a stock. Event handlers are set on the 1D, 1W, 1M, 3M, 1Y, and 5Y buttons. The chart component has a data state that changes its range depending on what event handler is triggered.
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
One of the biggest challenges I faced in this project was making my user portfolio. The portfolio is the user's balance at any point in the past 5 years. My first approach was trying to fetch all of the user's stocks for the past five years. This was very costly to do, so instead I used heroku scheduler and set a rake task that will be ran once everyday. This task will calculate the user's balance for the day and save it to my database which stores the user's balance for the past 5 years. 

Creating the user's 1 day portfolio balance was even more challenging due to having to account for more factors, such as when a user buys or sells a stock, how many they own at a specific time in the day, and the fluctuating nature of stocks every minute. The following code makes a batch request for the intraday data of all the stocks a user owns at a given time of the day and combines them with the user's buying power at that time.

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
