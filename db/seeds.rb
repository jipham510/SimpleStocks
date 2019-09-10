# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
    User.destroy_all
    Stock.destroy_all

    demo_user = User.create!(username: 'Demo_User', first_name: "demo", last_name: "user", email: "demo_user@gmail.com", password: 'password')
    my_login = User.create!(username: 'jpham', first_name: "jimmy", last_name: "pham", email: "demo_user@gmail.com", password: 'password')
    
    stock = Stock.create!(name: "Apple Inc", ticker: "aapl")
    stock = Stock.create!(name: "Google", ticker: "googl")
    
end