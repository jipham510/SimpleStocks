class Api::WatchesController < ApplicationController
    def create 
        @watch = Watch.new(watch_params)
        @watch.user_id = current_user.id
        if @watch.save 
            render :show
        else
            render json: @watch.errors.full_messages, status: 422
        end
    end

    def index 
        @watches = current_user.watches
    end

    def destroy
    # debugger
    @watch = Watch.find( params[:id])
    if @watch
      @watch.destroy
      render :show
    else
      render json: ['Could not find watched stock'], status: 401
    #   ['Could not find watched stock']
    end
    end

    def watch_params
        params.require(:watch).permit(:ticker)
    end
end


#   resources :watches, only: [:create, :destroy, :index]
