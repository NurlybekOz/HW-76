import express from "express";
const messageRouter = express.Router();
import fileDb from "../fileDb";
import {MessageWithoutIdAndDate} from "../types";


messageRouter.get('/', async (req, res) => {
    const queryDate = req.query.datetime as string;
    let messages = await fileDb.getAllMessages()
    if (queryDate) {
        const date = new Date(queryDate);

        if (isNaN(date.getTime())) {
            res.status(400).send({ error: "Invalid date" });
            return;
        }

        messages = messages.filter(message => new Date(message.datetime) > date);
    }
    res.send(messages);
});
messageRouter.post('/', async (req, res) => {

    if (!req.body.author || !req.body.message) {
        res.status(400).send({error: "Author and message is required"});
        return;
    }

    const newMessage: MessageWithoutIdAndDate = {
        author: req.body.author,
        message: req.body.message,
    }

    const savedNewMessage = await fileDb.addNewMessage(newMessage);
    res.send(savedNewMessage);
});
messageRouter.get('*', (req, res) => {
    res.status(404).send('Not Found');
})

export default messageRouter;