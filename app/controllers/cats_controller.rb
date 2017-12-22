class CatsController < ApplicationController
skip_before_action :require_login, only: [:index, :show]

  def index
    cats = Cat.all
    render json: cats
  end

  def show
    cat = Cat.find(params[:id])
    render json: cat
  end

  def create
    meas = Cat.new(cat_params)
    if meas.save
      render json: meas, status: 201
    else
      p meas.errors
      render text: 'Failed', status: 422
    end
  end

  def update
    cat = Cat.find(params[:id])
    cat.update(cat_params)
    if (cat.save)
      render json: cat, status: 200
    else
      render text: 'Failed', status: 422
    end
  end

  private
  def cat_params
    params.permit(:name, :age, :img_url, :breed, :daily_sleep_hours)
  end

end
