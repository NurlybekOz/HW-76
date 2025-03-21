export interface MessageWithoutIdAndDate {
    author: string;
    message: string;
}
export interface Message {
    id: string;
    author: string;
    message: string;
    datetime: string;
}