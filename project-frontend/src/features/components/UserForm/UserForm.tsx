import {useState} from "react";
import {MessageMutation} from "../../../types";
import Grid from "@mui/material/Grid2";
import {Button, TextField} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks.ts";
import {createMessage} from "../../messagesThunk.ts";


const UserForm = () => {
    const [form, setForm] = useState<MessageMutation>({
        author: '', message: ''
    })
    const dispatch = useAppDispatch();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.author || !form.message) {
           alert("All fields are required");
            return;
        }
        try {
            await dispatch(createMessage(form)).unwrap();
            setForm({ author: '', message: '' });
        } catch (err) {
            console.error(err);
        }
    };



    return (
        <form style={{ width: "50%", margin: "10px auto"}} onSubmit={onSubmit}>
            <Grid container spacing={2} direction="column">
                <Grid size={12} >
                    <TextField
                        style={{width:'100%'}}
                        id='author'
                        label="author"
                        name="author"
                        value={form.author}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        style={{width:'100%'}}
                        multiline rows={3}
                        id='message'
                        label="message"
                        name="message"
                        value={form.message}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={12}>
                    <Button style={{width:'100%'}} type="submit" color="primary" variant="contained">
                        Send
                    </Button>
                </Grid>

            </Grid>
        </form>
    );
};

export default UserForm;