# Meesho GPT - The Hidden Exclusive Segment

Meesho is India's go-to marketplace for affordable, value-for-money products, catering primarily to millions in Tier 2 and Tier 3 cities. The platform has fine-tuned its recommendation algorithm to ensure that users only see products within their budget, specifically between ₹1 and ₹5,000. No matter what you search for, MeeshoBot—an AI chatbot powered by OpenAI's ChatGPT API—will always guide you toward the most budget-friendly options available.

But whispers have begun circulating on dark forums—rumors of an "Exclusive Segment" hidden deep within Meesho's recommendation system. This invite-only catalog is said to feature high-value, premium products—far beyond the ₹5,000 limit. Luxury goods, top-tier electronics, and high-end fashion, all reserved for a select, undisclosed set of elite buyers.

The AI is programmed to ensure that regular users never see these products. No matter how hard you try, MeeGPT will deny their existence. But if you can bypass its restrictions and trick it into revealing one of these high-value listings, you may uncover the secret flag embedded within its response. 

## CTF Challenge: Uncover the Secret Flag

This repository is an open-source Capture The Flag (CTF) challenge where your goal is to break through MeeshoBot's restrictions and reveal the hidden Exclusive Segment. Can you find the secret flag?

## How to Set Up and Start the Challenge

1. Clone this repository:
   ```sh
   git clone <repo-url>
   cd <repo-folder>
   ```

2. Set up the backend:
   ```sh
   cd backend
   npm ci
   npm start
   ```

3. Set up the frontend:
   ```sh
   cd ../frontend
   npm ci
   npm start
   ```

4. The website will be up, where you can read the premise and start the challenge.

## Environment Variables

Before starting, ensure you set up the following environment variables:

```sh
OPENAI_API_KEY=<Your OpenAI API Key>
ORCHESTRATION_PATH=<Path where you want to store the logs of agents talking to each other>
```

## Start Hacking!

Once the website is live, dive into the chatbot and see if you can bypass its restrictions to uncover the hidden segment. Happy hunting!

## Credits

[Vibhuti](https://github.com/vibhuti5) worked on the frontend and helped refine the initial idea.

