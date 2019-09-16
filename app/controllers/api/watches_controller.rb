class Api::WatchesController < ApplicationController
    def create 
        @watch = Order.new(order_params)
        @watch.user_id = current_user.id
        if @watch.save 
            render json: ['successfully watched stocks!'], status: 200
        else
            render json: @watch.errors.full_messages, status: 422
        end
    end

    def index 
        @watches = current_user.watchedStocks
    end

    def destroy
    @watch = Watch.find_by( user_id: current_user.id, ticker: params[:ticker])
    if @watch
      @watch.destroy
      render :show
    else
      render ['Could not find watched stock']
    end
    end

    def watch_params
        params.require(:watch).permit(:ticker)
    end
end


#   resources :watches, only: [:create, :destroy, :index]
