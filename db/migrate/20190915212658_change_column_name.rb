class ChangeColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :orders, :price_bought, :price
  end
end
