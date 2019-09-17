class Order < ApplicationRecord
    validates :user_id, :ticker, :price, :shares, presence: true
    validates :order_type, inclusion: { in: %w(BUY SELL),
    message: "%{value} is not a valid order type" }

    validate :shares_greater_than_zero, :enough_in_balance, :enough_shares_to_sell

    belongs_to :user

    belongs_to :stock,
    primary_key: :ticker,
    foreign_key: :ticker,
    class_name: "Stock"

    def enough_in_balance 
        unless user.buying_power >= price*shares
            errors[:base] << "Not enough buying power"
        end
    end
    def enough_shares_to_sell
        return if order_type === "BUY" || shares <= user.owned_shares_of_company(ticker)
            errors[:base] << "Not enough shares"
    end

    def shares_greater_than_zero 
        return if shares > 0
        errors[:base] << "Shares must be greater than zero"
    end
end

