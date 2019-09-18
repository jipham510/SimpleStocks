class PortfolioSnapshot < ApplicationRecord
    validates :user_id, :balance, :snapshot_date, presence: true
    belongs_to :user
end
