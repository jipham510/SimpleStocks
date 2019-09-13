export const parseFloatToDollars = (float) => {
    let dollars = "";
    if (float < 0) {
        dollars = "-$" + parseFloat(-float).toFixed(2); 
    } else {
        dollars = "$" + parseFloat(float).toFixed(2); 
    }
    return dollars
}