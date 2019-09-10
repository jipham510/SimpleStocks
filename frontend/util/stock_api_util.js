export const fetchStock = (ticker) => (
    $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/company/?token=pk_507026b3e85f4e4a889d2c112c20b532`
    })
)
export const fetchStocks = () => (
    $.ajax({
        method: "GET",
        url: `api/stocks`
    })
)
