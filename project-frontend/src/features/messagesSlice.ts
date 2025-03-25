import {createSlice} from "@reduxjs/toolkit";
import {Message} from "../types";
import {createMessage, fetchAllMessages, fetchMessagesByDate} from "./messagesThunk.ts";
import {RootState} from "../app/store.ts";

interface MessagesState {
    items: Message[];
    newItems: Message[];
    loading: boolean;
}

const initialState: MessagesState = {
    items: [],
    newItems: [],
    loading: false,
}

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllMessages.pending, (state) => {
            state.loading = true;
        }).addCase(fetchAllMessages.fulfilled, (state, {payload: messages}) => {
            state.items = messages;
            state.loading = false;
        })
            .addCase(fetchAllMessages.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchMessagesByDate.fulfilled, (state, {payload: newMessages}) => {
            if (newMessages.length > 0) {
                state.newItems = newMessages;
                state.items = [...newMessages, ...state.items];
            }
        })

            .addCase(createMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMessage.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createMessage.rejected, (state) => {
                state.loading = false;
            })
    }
})

export const messagesReducer = messagesSlice.reducer;
export const selectMessages = (state: RootState) => state.messages.items;
export const selectMessagesLoading = (state: RootState) => state.messages.loading;
