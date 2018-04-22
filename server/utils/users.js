
class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let user;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                user = this.users[i];
                this.users.splice(i, 1);
                break;
            }
        }
        return user;
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    getUserList(room) {
        const users = this.users.filter(user => user.room === room);
        const namesArray = users.map(user => user.name);
        return namesArray;
    }
}

module.exports = { Users };
