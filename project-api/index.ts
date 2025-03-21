import fileDb from "./fileDb";
import express from "express";
import messageRouter from "./routers/messages";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/messages', messageRouter);

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    })
}
run().catch(console.error);