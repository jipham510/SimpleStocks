// api/portfolio_snapshots

export const fetchPortfolioSnapshots = () => (
    $.ajax({
        url: `api/portfolio_snapshots`,
        method: 'GET',
    })
);

export const fetchPortfolioSnapshot = () => (
    $.ajax({
        url: `api/portfolio/daily`,
        method: 'GET',
    })
);