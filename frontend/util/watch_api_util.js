export const fetchWatchedStocks = () => (
    $.ajax({
        method: "GET",
        url: `api/watches`
    })
)