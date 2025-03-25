import {useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    selectMessages,
    selectMessagesLoading,
} from "./messagesSlice";
import {fetchAllMessages, fetchMessagesByDate} from "./messagesThunk";
import { CircularProgress, List, ListItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from 'dayjs';
import UserForm from "./components/UserForm/UserForm.tsx";

const Messages = () => {
    const messages = useAppSelector(selectMessages);
    const loading = useAppSelector(selectMessagesLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllMessages())
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (messages.length) {
                await dispatch(fetchMessagesByDate(messages[0].datetime))
            } else if (messages.length <= 1) {
                await dispatch(fetchAllMessages())
            }
        }, 3000)

        return () => clearInterval(interval);

    },[dispatch, messages]);



    return (
        <div>
            <UserForm />

            {loading ? (
                <Grid style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                    <CircularProgress />
                </Grid>
            ) : (
                <List style={{ width: "50%", margin: "10px auto", padding: "0", listStyleType: "none" }}>
                    {messages.map((message, index) => (
                        <ListItem key={index} style={{ display: "flex", flexDirection: "column", width: "100%", border: '1px solid', marginBottom: '10px' }}>
                            <Grid style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                                <Typography style={{ fontWeight: "bold", marginBottom: '0' }}>
                                    {message.author}
                                </Typography>
                                <Typography>
                                    {dayjs(message.datetime).format('DD.MM.YYYY HH:mm')}
                                </Typography>
                            </Grid>
                            <Grid className="card-body">
                                <Typography style={{ marginBottom: '0' }}>
                                    {message.message}
                                </Typography>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default Messages;
