class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :name, null: false
      t.string :ticker, null: false

      t.timestamps
    end
    add_index :stocks, :ticker, unique: true
  end
end
