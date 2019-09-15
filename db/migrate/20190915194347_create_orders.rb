class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :user_id, null: false
      t.string :ticker, null: false
      t.string :order_type, null: false
      t.float :price_bought, null: false
      t.integer :shares, null: false

      t.timestamps
    end
    add_index :orders, :user_id
    add_index :orders, :ticker
  end
end
