# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'


ActiveRecord::Base.transaction do
    User.destroy_all
    Stock.destroy_all
    Deposit.destroy_all
    Order.destroy_all

    # stock data from datahub.io
    # https://pkgstore.datahub.io/core/nyse-other-listings/nyse-listed_csv/data/3c88fab8ec158c3cd55145243fe5fcdf/nyse-listed_csv.csv
    # https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed-symbols_csv/data/595a1f263719c09a8a0b4a64f17112c6/nasdaq-listed-symbols_csv.csv

    nasdaq_csv = File.read(Rails.root.join('lib', 'seeds', 'nasdaq.csv'))    
    nasdaq = CSV.parse(nasdaq_csv, :headers => true, :encoding => 'ISO-8859-1')
    nasdaq.each do |row|
        stock = Stock.create!(ticker: row["Symbol"], name: row["Company Name"])
    end

    nyse_csv = File.read(Rails.root.join('lib', 'seeds', 'nyse.csv'))
    nyse = CSV.parse(nyse_csv, :headers => true, :encoding => 'ISO-8859-1')
    nyse.each do |row|
        stock = Stock.create!(ticker: row["Symbol"], name: row["Company Name"])
    end
    
    # stock = Stock.create!(name: "Apple Inc", ticker: "AAPL")
    # stock = Stock.create!(name: "Google", ticker: "GOOGL")
    # stock = Stock.create!(name: "Tesla", ticker: "TSLA")
    # stock = Stock.create!(name: "Netflix", ticker: "NFLX")
    # stock = Stock.create!(name: "Microsoft", ticker: "MSFT")
    # stock = Stock.create!(name: "Starbucks", ticker: "SBUX")
    
    my_login = User.create!(username: 'jpham', first_name: "jimmy", last_name: "pham", email: "demo_user@gmail.com", password: 'password')
    demo_user = User.create!(username: 'Demo_User', first_name: "demo", last_name: "user", email: "demo_user@gmail.com", password: 'password')
    Deposit.create!( user_id: demo_user.id, deposit_money: 100000)
    Deposit.create!( user_id: my_login.id, deposit_money: 10000000)
    
    Time.zone = 'Eastern Time (US & Canada)'
    # Time.zone.local(2007, 2, 1, 15, 30, 45) # => Thu, 01 Feb 2007 15:30:45 HST -10:00
    Order.create!( user_id: demo_user.id, ticker: "AAPL", order_type: "BUY", price: 100, shares: 1,created_at: Time.zone.local(2017, 2, 1, 15, 0, 0))
    Order.create!( user_id: demo_user.id, ticker: "AAPL", order_type: "BUY", price: 100, shares: 2, created_at: Time.zone.local(2017, 6, 2, 12, 0, 0))
    Order.create!( user_id: demo_user.id, ticker: "GOOGL", order_type: "BUY", price: 200, shares: 2, created_at: Time.zone.local(2018, 2, 1, 14, 0, 0))
    Order.create!( user_id: demo_user.id, ticker: "GOOGL", order_type: "SELL", price: 250, shares: 1, created_at: Time.zone.local(2019, 5, 1, 10, 0, 0))
    Order.create!( user_id: demo_user.id, ticker: "TSLA", order_type: "BUY", price: 1000, shares: 10, created_at: Time.zone.local(2019, 5, 3, 10, 0, 0))
    Order.create!( user_id: demo_user.id, ticker: "NFLX", order_type: "BUY", price: 1200, shares: 4, created_at: Time.zone.local(2019, 5, 5, 10, 0, 0))
    Order.create!( user_id: demo_user.id, ticker: "MSFT", order_type: "BUY", price: 500, shares: 5, created_at: Time.zone.local(2019, 5, 7, 10, 0, 0))
    Order.create!( user_id: demo_user.id, ticker: "SBUX", order_type: "BUY", price: 400, shares: 3, created_at: Time.zone.local(2019, 5, 9, 10, 0, 0))

# 
end