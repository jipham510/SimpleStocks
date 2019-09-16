class User < ApplicationRecord
  attr_reader :password
  validates :username, presence: true, uniqueness: true 
  validates :password_digest, :session_token, :first_name, :last_name, :email, presence: true
  validates :password, length: { minimum: 6}, allow_nil: true
  after_initialize :ensure_session_token

  has_many :orders
  has_many :deposits
  has_many :watches
  
  has_many :watchedStocks,
  through: :watches,
  source: :stock
  
  def current_balance
    all_deposits = deposits.inject(0) { |sum, deposit| sum + deposit.deposit_money}
    sum = all_deposits + overall_profit
    return sum
  end

  def overall_profit
    profit = 0
    orders.each do |order|
      if order.order_type === "BUY" 
        profit -= order.price * order.shares
      else 
        profit += order.price * order.shares
      end
    end
    return profit
  end

  def owned_shares
    res = Hash.new(0)
    orders.each do |order|
      if order.order_type === "BUY"
        res[order.ticker] += order.shares
      else
        res[order.ticker] -= order.shares
      end
    end
    return res.select { |ticker, shares| shares > 0 }
  end


  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    # Set temporary instance variable so that we can validate length
    @password = password
    # Create a password_digest so that we do not have to store the plain-text password in our DB
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    # Use BCrypt's built-in method for checking if the password provided is the user's password
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    # Generate the initial session_token so that we pass the validation
    # This method runs right after the model is initialized, before any validations are run
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    # When a user logs out, we want to scramble their session_token so that bad people cannot use the old one
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end

end
