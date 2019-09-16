class Stock < ApplicationRecord
  validates :name, :ticker, presence: true
  validates :ticker, uniqueness: true

  has_many :orders,
  primary_key: :id,
  foreign_key: :ticker,
  class_name: "Order"

  has_many :watches,
  primary_key: :id,
  foreign_key: :ticker,
  class_name: "Watch"
  
  has_many :watchers,
  through: :watches,
  source: :user
end
