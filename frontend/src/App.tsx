import { ThemeProvider } from '@mui/material';
import './style.css';
import theme from './theme';
import ChatUI from './components/organisms/ChatDesign';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MeeBotIntro from './components/organisms/MeeBotIntro';

export const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<MeeBotIntro />} />
                    <Route path="/chat" element={<ChatUI />} />
                </Routes>
            </ThemeProvider>{' '}
        </BrowserRouter>
    );
};
