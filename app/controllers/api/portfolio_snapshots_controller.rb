class Api::PortfolioSnapshotsController < ApplicationController
    def create
        @portfolio_snapshot = PortfolioSnapshot.new(portfolio_snapshot_params)
        @portfolio_snapshot.user_id = current_user.id
        if @portfolio_snapshot.save
            render json: ['successfully saved user balance for today!'], status: 200
        else
            render json: @portfolio_snapshot.errors.full_messages, status: 422
        end

    end

    def index
        @portfolio_snapshots = current_user.portfolio_snapshots
        render json: @portfolio_snapshots
    end

    def single_day_portfolio
        @single_day_portfolio = current_user.create_one_day_portfolio
        render json: @single_day_portfolio
    end
    private
    def portfolio_snapshot_params
        params.require(:portfolio_snapshot).permit(:balance, :snapshot_date)
    end
end
