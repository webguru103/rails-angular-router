class CreateCats < ActiveRecord::Migration
  def change
    create_table :cats do |t|
      t.string :name
      t.string :age
      t.string :breed
      t.integer :daily_sleep_hours
      t.string :img_url

      t.timestamps null: false
    end
  end
end
