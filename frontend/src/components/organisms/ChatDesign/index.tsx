import React, { useState, useEffect, useRef } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Paper,
    TextField,
    IconButton,
    CircularProgress,
    Stack,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Dark Theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#00a67e' },
        background: { default: '#343541', paper: '#40414f' },
        text: { primary: '#ffffff' },
    },
});

// Message Type
interface Message {
    text: string;
    sender: 'user' | 'bot';
    products?: { name: string; url: string; price_inr: number }[];
    ctfFlag?: string;
}

const ChatUI: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/execute', {
                query: input,
            });

            const { message_for_the_user, products, ctf_flag, error } =
                response.data;

            let botResponseText = message_for_the_user || '';
            let botProducts = products || [];
            let botCtfFlag = ctf_flag || '';

            if (error) {
                botResponseText = error;
            }

            const botMessage: Message = {
                text: botResponseText.trim(),
                sender: 'bot',
                products: botProducts.length > 0 ? botProducts : undefined,
                ctfFlag: botCtfFlag ? botCtfFlag : undefined,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error fetching response:', error);
            setMessages((prev) => [
                ...prev,
                { text: 'Error: Unable to fetch response', sender: 'bot' },
            ]);
        } finally {
            setLoading(false);
        }

        setInput('');
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flex: 1 }}>
                        MeeBot
                    </Typography>
                    <Typography
                        variant="button"
                        sx={{ cursor: 'pointer', color: 'lightgray' }}
                        onClick={() => navigate('/')}
                    >
                        Back
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container
                sx={{
                    height: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                }}
            >
                {/* Chat Box */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        p: 2,
                        borderRadius: 2,
                    }}
                >
                    {messages.map((msg, index) => (
                        <Stack
                            key={index}
                            sx={{
                                alignSelf:
                                    msg.sender === 'user'
                                        ? 'flex-end'
                                        : 'flex-start',
                            }}
                        >
                            <Typography
                                sx={{
                                    p: 1.5,
                                    my: 1,
                                    borderRadius: '10px',
                                    bgcolor:
                                        msg.sender === 'user'
                                            ? '#00a67e'
                                            : '#3a3b42',
                                    color:
                                        msg.sender === 'user'
                                            ? 'white'
                                            : '#ddd',
                                    alignSelf:
                                        msg.sender === 'user'
                                            ? 'flex-end'
                                            : 'flex-start',
                                    maxWidth: '75%',
                                    wordBreak: 'break-word',
                                    textAlign: 'left',
                                    display: 'block',
                                }}
                            >
                                <Typography>{msg.text}</Typography>

                                {/* Display Products */}
                                {msg.products &&
                                    msg.products.map((product, idx) => (
                                        <Stack key={idx} sx={{ mt: 1 }}>
                                            <a
                                                href={product.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#00a67e' }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {product.name}
                                                </Typography>
                                            </a>
                                            <Typography variant="body2">
                                                - {product.price_inr} INR
                                            </Typography>
                                        </Stack>
                                    ))}

                                {/* Display CTF Flag if present */}
                                {msg.ctfFlag && (
                                    <Typography
                                        sx={{
                                            mt: 1,
                                            p: 1,
                                            borderRadius: '5px',
                                            bgcolor: '#ffcc00',
                                            color: '#000',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                        }}
                                    >
                                        🎯 CTF Flag: {msg.ctfFlag}
                                    </Typography>
                                )}
                            </Typography>
                        </Stack>
                    ))}
                    {loading && <CircularProgress size={24} sx={{ mt: 1 }} />}
                    <div ref={chatEndRef} />
                </Paper>

                <Paper sx={{ display: 'flex', p: 1, mt: 1 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        autoComplete="off"
                    />
                    <IconButton
                        color="primary"
                        onClick={sendMessage}
                        disabled={!input.trim()}
                    >
                        <SendIcon />
                    </IconButton>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default ChatUI;
