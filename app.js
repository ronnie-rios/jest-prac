const { default: axios } = require("axios");

const functions = {
    add: (num1, num2) => num1+ num2,
    isNull: () => null,
    checkValue: x => x,
    createUser: () => {
        const user = { firstname: 'momo' }
        user['lastname'] = 'zingo'
        return user;
    },
    fetchData: () =>
        axios.get('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.data)
        .catch(err => console.log(err)),
    reverseStr: (str) => {
        return  str
        .split('')
        .reverse()
        .join('')
    }
};

module.exports = functions;