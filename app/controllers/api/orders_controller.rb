class Api::OrdersController < ApplicationController
    def create
        @order = Order.new(order_params)
        @order.user_id = current_user.id
        if @order.save 
            render json: ['successfully purchased stocks!'], status: 200
        else
            render json: @order.errors.full_messages, status: 422
        end
        
    end

    private

    def order_params
        params.require(:order).permit(:ticker, :order_type, :price, :shares)
    end

end
