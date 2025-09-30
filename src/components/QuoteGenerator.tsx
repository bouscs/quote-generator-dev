import { useSubscribeDev } from '@subscribe.dev/react';
import SignInScreen from './SignInScreen';
import QuoteGeneratorApp from './QuoteGeneratorApp';

function QuoteGenerator() {
  const { isSignedIn } = useSubscribeDev();

  if (!isSignedIn) {
    return <SignInScreen />;
  }

  return <QuoteGeneratorApp />;
}

export default QuoteGenerator;