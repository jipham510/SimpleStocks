class Deposit < ApplicationRecord
    validates :user_id, :deposit_money , presence: true
    belongs_to :user
end
