# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
20.times do
Cat.create!(name:Faker::Name.name, age:rand(1..8), breed:Faker::Lorem.word, daily_sleep_hours:rand(13..22))
Dog.create!(name:Faker::Name.name, age:rand(1..8), breed:Faker::Lorem.word, special_trick:Faker::App.name)
ActiveRecord::Base.connection.execute("update cats set img_url = '/images/' || id || '.jpg' ")
User.create!(username:'username', email:'steven@example.com', password:'password')
end