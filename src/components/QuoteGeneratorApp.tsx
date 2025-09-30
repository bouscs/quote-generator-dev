import { useState } from 'react';
import { useSubscribeDev } from '@subscribe.dev/react';
import './QuoteGeneratorApp.css';

interface Quote {
  text: string;
  author: string;
}

interface QuoteHistory {
  quotes: Quote[];
  lastGeneratedAt?: number;
}

function QuoteGeneratorApp() {
  const { client, usage, subscribe, subscriptionStatus, signOut, useStorage, user } = useSubscribeDev();

  const [history, setHistory, syncStatus] = useStorage!<QuoteHistory>('quote-history', { quotes: [] });
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(
    history.quotes.length > 0 ? history.quotes[history.quotes.length - 1] : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState('');

  const generateQuote = async () => {
    if (!client || !topic.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const { output } = await client.run('openai/gpt-4o', {
        input: {
          messages: [
            {
              role: 'system',
              content: 'You are a wise philosopher who creates inspiring, thought-provoking quotes. Return responses as JSON with "text" and "author" fields. The author should be a creative, fitting name (not a real person).'
            },
            {
              role: 'user',
              content: `Generate an inspiring quote about: ${topic}`
            }
          ]
        },
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'Quote',
            strict: true,
            schema: {
              type: 'object',
              properties: {
                text: { type: 'string' },
                author: { type: 'string' }
              },
              required: ['text', 'author'],
              additionalProperties: false
            }
          }
        }
      });

      const quote = output[0] as Quote;
      setCurrentQuote(quote);

      // Update history
      const newHistory = {
        quotes: [...history.quotes, quote],
        lastGeneratedAt: Date.now()
      };
      setHistory(newHistory);
    } catch (err: any) {
      if (err.type === 'insufficient_credits') {
        setError('Insufficient credits. Please upgrade your plan to continue.');
      } else if (err.type === 'rate_limit_exceeded') {
        const retryAfter = Math.ceil((err.retryAfter || 0) / 1000);
        setError(`Rate limit exceeded. Please try again in ${retryAfter} seconds.`);
      } else {
        setError('Failed to generate quote. Please try again.');
      }
      console.error('Generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading && topic.trim()) {
      generateQuote();
    }
  };

  const lastGeneratedDate = history.lastGeneratedAt
    ? new Date(history.lastGeneratedAt).toLocaleString()
    : null;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-title">✨ Quote Generator</h1>
          {user && <span className="user-email">{user.email}</span>}
        </div>
        <div className="header-right">
          <div className="usage-info">
            <span className="credits">
              {usage?.remainingCredits ?? 0} credits
            </span>
            <span className="plan">
              {subscriptionStatus?.plan?.name ?? 'Free'}
            </span>
          </div>
          <button onClick={subscribe!} className="manage-button">
            Manage Plan
          </button>
          <button onClick={signOut} className="sign-out-button">
            Sign Out
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="generator-card">
          <div className="input-section">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a topic (e.g., courage, love, innovation)..."
              className="topic-input"
              disabled={loading}
            />
            <button
              onClick={generateQuote}
              disabled={loading || !topic.trim()}
              className="generate-button"
            >
              {loading ? 'Generating...' : 'Generate Quote'}
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
              {error.includes('Insufficient credits') && (
                <button onClick={subscribe!} className="upgrade-link">
                  Upgrade Now
                </button>
              )}
            </div>
          )}

          {currentQuote && !loading && (
            <div className="quote-display">
              <div className="quote-content">
                <p className="quote-text">"{currentQuote.text}"</p>
                <p className="quote-author">— {currentQuote.author}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="loading-skeleton">
              <div className="skeleton-line long"></div>
              <div className="skeleton-line medium"></div>
              <div className="skeleton-line short"></div>
            </div>
          )}
        </div>

        {history.quotes.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h2>Your Quotes</h2>
              <span className="sync-status">
                {syncStatus === 'syncing' && '⏳ Syncing...'}
                {syncStatus === 'synced' && '✓ Synced'}
                {syncStatus === 'error' && '⚠ Sync error'}
                {syncStatus === 'local' && '💾 Local'}
              </span>
            </div>
            <div className="history-list">
              {history.quotes.slice().reverse().map((quote, index) => (
                <div key={index} className="history-item">
                  <p className="history-quote-text">"{quote.text}"</p>
                  <p className="history-quote-author">— {quote.author}</p>
                </div>
              ))}
            </div>
            {lastGeneratedDate && (
              <p className="last-generated">Last generated: {lastGeneratedDate}</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default QuoteGeneratorApp;