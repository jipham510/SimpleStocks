class StocksController < ApplicationController
    def index
        @stocks = Stock.all
        render :index
    end

    def show
        # debugger 
        #check if id can be a ticker here
        @stock = Stock.find(params[:id])
        render :show
    end
end
