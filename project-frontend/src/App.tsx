import {Route, Routes } from 'react-router-dom';
import './App.css'
import {Container, CssBaseline, Typography} from "@mui/material";
import Messages from "./features/Messages.tsx";

const App = () => {
    return (
        <>
            <CssBaseline>

            <main>
                <Container>
                    <Routes>
                        <Route path='/' element={<Messages/>}/>
                        <Route path='/messages' element={<Messages/>}/>
                        <Route path='*' element={<Typography variant="h4">Not found page</Typography>}/>
                    </Routes>
                </Container>
            </main>

            </CssBaseline>

        </>

    )
};

export default App
