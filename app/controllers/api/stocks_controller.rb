class Api::StocksController < ApplicationController
    def index
        @stocks = Stock.all
        # render :index
        render json: @stocks
    end

end
