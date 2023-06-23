import { User } from "./user.js";

export const userMongoStore = {
    async getAllUsers() {
        const us = await User.find().lean();
        return us;
    },

    async getCountUsers(){
        const users = await User.countDocuments();
        return users;
    },

    async getUserById(id) {
        if (id) {
            const u = await User.findOne({ _id: id }).lean();
            return u;
        }
        return null;
    },

    async addUser(user) {
        const newU = new User(user);
        const uObj = await newU.save();
        const u = await this.getUserById(uObj._id);
        return u;
    },

    async getUserByEmail(email) {
        const u = await User.findOne({ email: email }).lean();
        return u;
    },

    async isAdmin(id) {
        const u = this.getUserById(id);
        return u.isAdmin;
    },

    async deleteUserById(id) {
        try {
            await User.deleteOne({ _id: id });
        } catch (error) {
            console.log("this is a bad id");
        }
    },

    async deleteAllUsers() {
        await User.deleteMany({});
    }
};
