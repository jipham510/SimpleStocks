@stocks.each do |single_stock|
     json.set! single_stock.ticker do 
         json.partial! 'api/stocks/stock', stock: single_stock
     end
 end
