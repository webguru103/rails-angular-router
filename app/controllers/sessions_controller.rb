class SessionsController < ApplicationController
skip_before_action :require_login
  def create
    u = User.find_by(username: params[:username])
    if u && u.authenticate(params[:password])
      session[:user_id] = u.id
    end
    render_current_user
  end

  def show
    render_current_user
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  private

  def render_current_user
    if current_user
      render json: {userId: current_user.id, username: current_user.username}
    else
      render json: {userId: 0, username: ""}
    end
  end

end