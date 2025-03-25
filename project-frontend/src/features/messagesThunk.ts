import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import {Message, MessageMutation} from "../types";

export const fetchAllMessages = createAsyncThunk<Message[], void>(
    'messages/fetchAllMessages',
    async () => {
        const response = await axiosApi<Message[]>('/messages')
        return response.data || [];
    }
)

export const fetchMessagesByDate = createAsyncThunk<Message[], string>(
    'messages/fetchMessagesByDate',
    async (message_date) => {
        const response = await axiosApi<Message[]>('/messages?datetime=' + message_date)
        return response.data || [];
    }
)


export const createMessage = createAsyncThunk<void, MessageMutation>(
    'messages/createMessage',
    async (messageToAdd) => {
        await axiosApi.post('/messages', messageToAdd);
    }
)