@watches.each do |watch|
   json.set! watch.ticker do 
      json.extract! watch, :ticker, :id
   end
end


