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
    
    # puts "There are now #{Stock.count} rows in the stocks table"

    demo_user = User.create!(username: 'Demo_User', first_name: "demo", last_name: "user", email: "demo_user@gmail.com", password: 'password')
    my_login = User.create!(username: 'jpham', first_name: "jimmy", last_name: "pham", email: "demo_user@gmail.com", password: 'password')
    

    
end