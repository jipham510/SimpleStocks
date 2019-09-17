export const fetchWatchedStocks = () => (
    $.ajax({
        method: "GET",
        url: `api/watches`
    })
)
export const postWatchedStock = (watch) => (
    $.ajax({
        method: "POST",
        url: `api/watches`,
        data: { watch },
    })
)
export const deleteWatchedStock = (watchId) => (
    $.ajax({
        method: "DELETE",
        url: `api/watches/${watchId}`
    })
)

// export const postUser = user => (
//     $.ajax({
//         url: '//',
//         method: 'POST',
//         data: { user },
//     })
// );