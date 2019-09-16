class Api::StocksController < ApplicationController
    def index
        @stocks = Stock.all
        render :index
    end

end
