const apiKey = "bdc2169d1a2c44c8902f98865fc6a33f";

export const fetchNews = () => (
    $.ajax({
        method: "GET",
        url: `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&category=business&apiKey=${apiKey}`
    })
)
export const fetchCompanyNews = (company) => (
    $.ajax({
        method: "GET",
        url: `https://newsapi.org/v2/everything?q=${company}&language=en&pageSize=20&apiKey=${apiKey}`
    })
)