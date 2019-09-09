//random tests

let username = "user"
let password = "password"

const demoLogin = (user,password) => {
    let result = "";
    user = user.split("");
    password = password.split("");
    while (user.length !== 0) {
        let char = user.shift();
        // when shifting, input letter in field
        result += char;
    }
    result += " ";
    
    while (password.length !== 0) {
        let char = password.shift();
        result += char;
    }
    return result;    
}

console.log(demoLogin(username,password));