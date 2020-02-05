const db = require('./db')

const getAllUsers = async () => {
    // db.any("SELECT * FROM users")
    // .then(res => console.log(res))
    // .catch(err => console.log('Error!', err))
    // Error caught in Route with custom message!
        const users = await db.any("SELECT id, username FROM users")
        return users;
}

// user = {
//     username: 'alejo',
//     password: '123'
// }

const addNewUser = async (user) => {

    const newUserQuery = `
    INSERT INTO users (username, password_digest) 
        VALUES ($1, $2)
        RETURNING id, username
    `

    const newUser = await db.one(newUserQuery, [user.username, user.password])
    return newUser;
}

const getUserByUsername = async (username) => {
        const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [username])
        return user;
}

module.exports = {
    getAllUsers,
    addNewUser,
    getUserByUsername
}