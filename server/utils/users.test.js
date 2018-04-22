const expect = require('expect');

const { Users } = require('./users');

describe('User class', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            { id: '1', name: 'zz', room: 'roomA' },
            { id: '2', name: 'sly', room: 'roomB' },
            { id: '3', name: 'c', room: 'roomA' },
        ];
    });

    it('should add user', () => {
        const users = new Users();
        const user = { id: '123', name: 'zz', room: 'roomA' };
        users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const userId = '2';
        expect(users.removeUser(userId).id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a non-exist user', () => {
        const userId = '4';
        expect(users.removeUser(userId)).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        const userId = '1';
        expect(users.getUser(userId)).toEqual(users.users[0]);
    });

    it('should not find non-exist user', () => {
        const userId = '4';
        expect(users.getUser(userId)).toBeFalsy();
    });

    it('should return user names for a room', () => {
        const userNames = users.getUserList('roomA');
        expect(userNames).toEqual(['zz', 'c']);
    });
});
