const functions = {
    add: (num1, num2) => num1+ num2,
    isNull: () => null,
    checkValue: x => x,
    createUser: () => {
        const user = { firstname: 'momo' }
        user['lastname'] = 'zingo'
        return user;
    },
    fethchData: () =>
    fetch('//jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))
};

module.exports = functions;