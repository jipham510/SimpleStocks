desc "add portfolio snapshots to all users"
task :add_snapshots => :environment do
  puts "Adding user portfolio snapshots..."

  date = Date.today
  # skip stock day if on weekend since markets are closed
  next if date.on_weekend?

  # add portfolio snapshots to all users
  users = User.all
  users.each do |user| 
    balance = user.current_balance
    PortfolioSnapshot.create({ user_id: user.id, snapshot_date: date, balance: balance })
  end
  puts "done."

end