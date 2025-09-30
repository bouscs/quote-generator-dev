import { useSubscribeDev } from '@subscribe.dev/react';
import './SignInScreen.css';

function SignInScreen() {
  const { signIn } = useSubscribeDev();

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h1 className="app-title">✨ Quote Generator</h1>
        <p className="app-description">
          Generate inspiring quotes using AI. Sign in to get started!
        </p>
        <button onClick={signIn} className="sign-in-button">
          Sign In
        </button>
        <p className="app-footer">
          Powered by AI • Unlimited creativity
        </p>
      </div>
    </div>
  );
}

export default SignInScreen;