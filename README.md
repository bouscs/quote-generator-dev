# ✨ AI Quote Generator

An AI-powered quote generator built with React, TypeScript, and Subscribe.dev. Generate inspiring quotes on any topic using OpenAI's GPT-4.

## Features

- 🤖 **AI-Powered**: Generate unique quotes using OpenAI GPT-4
- 🔐 **Authentication**: Built-in sign-in/sign-out with Subscribe.dev
- 💾 **Cloud Storage**: Your quote history is automatically synced to the cloud
- 💳 **Subscription Management**: Integrated billing and usage tracking
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- ⚡ **Real-time Updates**: See your credits and plan status instantly

## Getting Started

### Prerequisites

- Node.js 18 or higher
- A Subscribe.dev account and project token

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUBSCRIBE_DEV_PROJECT_TOKEN=your_project_token_here
```

Get your project token from [subscribe.dev](https://subscribe.dev) dashboard.

### Development

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## How It Works

1. **Sign In**: Click the sign-in button to authenticate with Subscribe.dev
2. **Enter a Topic**: Type any topic you want a quote about (e.g., "courage", "innovation", "love")
3. **Generate**: Click generate or press Enter to create an AI-powered quote
4. **View History**: All your generated quotes are saved and synced to the cloud
5. **Manage Plan**: Check your credits and upgrade your subscription as needed

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Subscribe.dev** - AI platform with authentication, billing, and storage
- **OpenAI GPT-4** - Quote generation model

## Project Structure

```
src/
├── components/
│   ├── QuoteGenerator.tsx      # Main component with auth routing
│   ├── SignInScreen.tsx         # Authentication screen
│   ├── QuoteGeneratorApp.tsx    # Main app (authenticated)
│   ├── SignInScreen.css         # Sign-in screen styles
│   └── QuoteGeneratorApp.css    # Main app styles
├── App.tsx                      # App with Subscribe.dev provider
├── main.tsx                     # Entry point
├── index.css                    # Global styles
└── App.css                      # App container styles
```

## Deployment

This project includes automated deployment via VGit workflows. Push to any branch to trigger a preview deployment.

---

*Generated with [VGit](https://vgit.app) 🤖*
