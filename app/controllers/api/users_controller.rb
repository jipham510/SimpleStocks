class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    
    if @user.save
      #default settings when user is created
      Deposit.create!( user_id: @user.id, deposit_money: 100000)
      Watch.create!(user_id: @user.id, ticker: "SBUX")
      Watch.create!(user_id: @user.id, ticker: "MSFT")
      Watch.create!(user_id: @user.id, ticker: "TSLA")
      Watch.create!(user_id: @user.id, ticker: "AAPL")
      Watch.create!(user_id: @user.id, ticker: "TWTR")
      Watch.create!(user_id: @user.id, ticker: "FB")
      Watch.create!(user_id: @user.id, ticker: "DIS")
      Watch.create!(user_id: @user.id, ticker: "GOOG")
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 401
    end
  end
  
  def update
    @user = User.find(params[:id])
    if @user && @user.update_attributes(user_params)
      render :show
    elsif !@user
      render json: ['Could not locate user'], status: 400
    else
      render json: @user.errors.full_messages, status: 401
    end
  end
  
  def show
    @user = User.find(params[:id])
  end
  
  def index
    @users = User.all
  end
  
  def destroy
    @user = User.find(params[:id])
    if @user
      @user.destroy
      render :show
    else
      render ['Could not find user']
    end
  end
  
  private
  
  def user_params #user_params = [user[username]]
    params.require(:user).permit(:username, :email, :password, :last_name, :first_name)
  end
end
