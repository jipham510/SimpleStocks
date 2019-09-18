class CreatePortfolioSnapshots < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolio_snapshots do |t|
      t.integer :user_id, null: false
      t.float :balance, null: false
      t.date :snapshot_date, null: false

      t.timestamps
    end
    add_index :portfolio_snapshots, :user_id
  end
end
