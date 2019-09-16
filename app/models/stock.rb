class Stock < ApplicationRecord
  validates :name, :ticker, presence: true
  validates :ticker, uniqueness: true

  has_many :orders,
  primary_key: :id,
  foreign_key: :ticker,
  class_name: "Order"
  
end
