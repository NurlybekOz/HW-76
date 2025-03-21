import { promises as fs} from 'fs';
import {existsSync} from "node:fs";
import {Message, MessageWithoutIdAndDate} from "./types";
import crypto from "node:crypto";

const pathMessages = './db.json';
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            if (!existsSync(pathMessages)) {
                return fs.writeFile(pathMessages, JSON.stringify([]));

            } else {
                const fileContent = await fs.readFile(pathMessages);
                data = JSON.parse(fileContent.toString()) as Message[];
            }
        } catch (e) {
            data = [];
            console.error(e);
        }
    },

    async getAllMessages() {
        await this.init();
        return data.slice(-30).reverse();
    },

    async addNewMessage(messageToAdd: MessageWithoutIdAndDate) {
        const newMessage = {id: crypto.randomUUID(), datetime: new Date().toISOString(), ...messageToAdd};
        data.push(newMessage)
        await this.save();
        return newMessage;
    },
    async save () {
        return fs.writeFile(pathMessages, JSON.stringify(data));
    }
};

export default fileDb;