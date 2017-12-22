class HomeController < ApplicationController
  #We just render app/views/home/index.html.erb
  skip_before_action :require_login
end