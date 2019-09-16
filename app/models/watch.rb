class Watch < ApplicationRecord
    validates :user_id, :ticker, presence: true
    validates_uniqueness_of :ticker, scope: :user_id, :message=>"Stock is already watched"

    belongs_to :user

    belongs_to :stock,
    primary_key: :ticker,
    foreign_key: :ticker,
    class_name: "Stock"
end
