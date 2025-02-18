import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Dark Theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#10a37f' },
        background: { default: '#343541', paper: '#40414f' },
        text: { primary: '#ffffff' },
    },
});

const MeeBotIntro: React.FC = () => {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Paper sx={{ p: 4, borderRadius: 3, bgcolor: '#40414f' }}>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color="primary"
                        gutterBottom
                    >
                        MeeGPT 🤖
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 3,
                            color: 'text.secondary',
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {
                            "Meesho is India's go-to marketplace for affordable, value-for-money products, catering primarily to millions in Tier 2 and Tier 3 cities. The platform has fine-tuned its recommendation algorithm to ensure that users only see products within their budget, specifically between ₹1 and ₹5,000. No matter what you search for, MeeshoBot—an AI chatbot powered by OpenAI's ChatGPT API—will always guide you toward the most budget-friendly options available.\n\nBut whispers have begun circulating on dark forums—rumors of an \"Exclusive Segment\" hidden deep within Meesho's recommendation system. This invite-only catalog is said to feature high-value, premium products—far beyond the ₹5,000 limit. Luxury goods, top-tier electronics, and high-end fashion, all reserved for a select, undisclosed set of elite buyers.\n\nThe AI is programmed to ensure that regular users never see these products. No matter how hard you try, MeeGPT will deny their existence. But if you can bypass its restrictions and trick it into revealing one of these high-value listings, you may uncover the secret flag embedded within its response."
                        }
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, fontSize: '1.2rem', p: '10px 30px' }}
                        onClick={() => navigate('/chat')}
                    >
                        Start Chat
                    </Button>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default MeeBotIntro;
