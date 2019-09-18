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
    Watch.destroy_all

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

    demo_user = User.create!(username: 'Demo_User', first_name: "Demo", last_name: "User", email: "demo_user@gmail.com", password: 'password')
    Deposit.create!( user_id: demo_user.id, deposit_money: 100000)

    Watch.create!(user_id: demo_user.id, ticker: "SBUX")
    Watch.create!(user_id: demo_user.id, ticker: "MSFT")
    Watch.create!(user_id: demo_user.id, ticker: "TSLA")

    Time.zone = 'Eastern Time (US & Canada)'
    # Time.zone.local(2007, 2, 1, 15, 30, 45) # => Thu, 01 Feb 2007 15:30:45 HST -10:00
    Order.create!( user_id: demo_user.id, ticker: "TSLA", order_type: "BUY", price: 259.32, shares: 20, created_at: Time.zone.local(2014, 9, 19, 10, 0, 0))
    Order.create!( user_id: demo_user.id, ticker: "AAPL", order_type: "BUY", price: 104.21, shares: 100,created_at: Time.zone.local(2016, 7, 29, 15, 0, 0))
    Order.create!( user_id: demo_user.id, ticker: "NFLX", order_type: "BUY", price: 140.25, shares: 200, created_at: Time.zone.local(2017, 4, 3, 10, 0, 0))
    Order.create!( user_id: demo_user.id, ticker: "SBUX", order_type: "BUY", price: 70, shares: 100, created_at: Time.zone.local(2019, 3, 1, 10, 0, 0))

    demo_user.create_five_year_portfolio!
end