require 'open-uri'

class User < ApplicationRecord
  attr_reader :passwodr
  validates :username, presence: true, uniqueness: true 
  validates :password_digest, :session_token, :first_name, :last_name, :email, presence: true
  validates :password, length: { minimum: 6}, allow_nil: true
  after_initialize :ensure_session_token

  has_many :orders
  has_many :deposits
  has_many :watches
  has_many :portfolio_snapshots
  

  has_many :watchedStocks,
  through: :watches,
  source: :stock

  # API_TOKEN = "pk_b357a793cf184f798b22ece36112c791" #throwaway email
  API_TOKEN = "pk_2829b7a80f7b43e1ae31342f9bfd10a4" #throwaway email
  # API_TOKEN = "pk_fa06e2b91bce45c6a774b2a1ae8c678b" #production2 api kayn05555

# demo_user = User.find_by(username: "Demo_User")

  def create_one_day_portfolio 
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


  def owned_shares_before(date_time) # Fri, 19 Sep 2014 14:00:00 UTC +00:00 (want input like this)
    res = Hash.new(0)
    orders.each do |order|
      if order.order_type == "BUY"
        res[order.ticker] += order.shares
      else
        res[order.ticker] -= order.shares
      end
    end
    return res.select { |ticker, shares| shares > 0 }
  end



  # https://cloud.iexapis.com/stable/stock/market/batch?types=chart&range=1d&last=5&token=#{your_token_here}&symbols=
  def current_balance
    return owned_shares_value + buying_power
  end

  def owned_shares_value
    url = "https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=#{API_TOKEN}&symbols="

    shares = Hash.new(0)
    orders.each do |order|
      if order.order_type == "BUY" 
        shares[order.ticker] += order.shares
      else 
        shares[order.ticker] -= order.shares
      end
    end

    total_shares_value = 0;
    request = url + shares.keys.join(',')
    if shares.keys.length > 0
      response = JSON.parse(open(request).read)
      response.keys.each do |ticker| 
        latestPrice = response[ticker]["quote"]["latestPrice"]
        total_shares_value += shares[ticker] * latestPrice
      end
    end
    
    return total_shares_value
  end

  def buying_power # just buying power rn, buying_power = buying_power + owned_stocks_value
    all_deposits = deposits.inject(0) { |sum, deposit| sum + deposit.deposit_money}
    sum = all_deposits + overall_profit
    return sum
  end

  def overall_profit
    profit = 0
    orders.each do |order|
      if order.order_type == "BUY" 
        profit -= order.price * order.shares
      else 
        profit += order.price * order.shares
      end
    end
    return profit
  end

  def owned_shares_of_company(ticker)
    shares = 0
    shares = owned_shares[ticker] if owned_shares[ticker]
    return shares
  end

  def owned_shares
    res = Hash.new(0)
    orders.each do |order|
      if order.order_type == "BUY"
        res[order.ticker] += order.shares
      else
        res[order.ticker] -= order.shares
      end
    end
    return res.select { |ticker, shares| shares > 0 }
  end



  #User auth
  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    # Set temporary instance variable so that we can validate length
    @password = password
    # Create a password_digest so that we do not have to store the plain-text password in our DB
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    # Use BCrypt's built-in method for checking if the password provided is the user's password
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    # Generate the initial session_token so that we pass the validation
    # This method runs right after the model is initialized, before any validations are run
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    # When a user logs out, we want to scramble their session_token so that bad people cannot use the old one
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end

####### code below is ran one time in seed file ##############################
  def create_five_year_portfolio!
    five_year_charts = create_five_year_charts
    url = "https://cloud.iexapis.com/stable/stock/market/batch?types=chart&range=5Y&token=#{API_TOKEN}&symbols=AAPL"
    response = JSON.parse(open(url).read)
    five_year_chart = response["AAPL"]["chart"]
    five_year_buying_power = create_five_year_buying_power(five_year_chart)
    # puts "buying power: #{five_year_buying_power[-1]}"


    five_year_chart = five_year_chart.each_with_index.map do |day_data,idx| 
      total_balance = 0
      total_balance = five_year_buying_power[idx] 
      five_year_charts.each do |chart| 
        total_balance += chart[idx]
        # if idx == chart.length - 1
        #   puts "balance: #{total_balance}"
        # end
      end
      
      # validates :user_id, :balance, :snapshot_date, presence: true

      PortfolioSnapshot.create!( user_id: id, snapshot_date: day_data["date"], balance: total_balance)
    end
    return five_year_chart
  end

  def create_five_year_buying_power(five_year_chart)
    all_deposits = deposits.inject(0) { |sum, deposit| sum + deposit.deposit_money}

    buying_power_chart = []
    five_year_chart.each do |day|
      orders.each do |order|
        if Date.parse(order.created_at.to_s) == Date.parse( day["date"] )
          if (order.order_type == "BUY")
            all_deposits -= order.shares * order.price
          else
            all_deposits += order.shares * order.price
          end
        end
      end
      buying_power_chart.push(all_deposits)
      # Date.parse(demo_user.orders.first.created_at.to_s) == Date.parse("2014-09-19")
    end

    return buying_power_chart
  end
  def create_five_year_charts
    charts = []
    # https://cloud.iexapis.com/stable/stock/market/batch?types=chart&range=5Y&token=pk_de82e1c265ce403880d83e5d17770609&symbols=AAPL,GOOGL,
    
    url = "https://cloud.iexapis.com/stable/stock/market/batch?types=chart&range=5Y&token=#{API_TOKEN}&symbols="
    tickers = orders.map { |order| order.ticker }
    request = url + tickers.join(',')

    response = JSON.parse(open(request).read)
    orders.each do |order|
      charts.push(create_five_year_stock_chart(response,order))
    end
    return charts
  end

  def create_five_year_stock_chart(five_year_response, order) 
    filtered = five_year_response[order.ticker]["chart"].map do |day_data|
      if date_greater_or_equal?(day_data["date"], order.created_at)
        order.shares * day_data["close"]
      else
        0
      end
    end
    return filtered
  end

  def date_greater_or_equal?(date1,date2) # takes in date objects,
    Date.parse(date1.to_s) >= Date.parse(date2.to_s)
    # Date.parse(demo_user.orders.first.created_at.to_s) == Date.parse("2014-09-19")
  end

###################################################################################
end
