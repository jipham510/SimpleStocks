class Order < ApplicationRecord
    validates :user_id, :ticker, :price, :shares, presence: true
    validates :order_type, inclusion: { in: %w(BUY SELL),
    message: "%{value} is not a valid order type" }

    validate :shares_greater_than_zero, :enough_in_balance

    belongs_to :user

    belongs_to :stock,
    primary_key: :ticker,
    foreign_key: :ticker,
    class_name: "Stock"

    def enough_in_balance 
        unless user.current_balance >= price*shares
            errors[:base] << "You do not have enough in your balance to pay for this!"
        end
    end

    def shares_greater_than_zero 
        return if shares > 0
        errors[:base] << "Shares must be greater than zero"
    end
end

