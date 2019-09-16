export const postOrder = (order) => (
    $.ajax({
        method: "POST",
        url: "/api/orders",
        data: {order}
    })
);