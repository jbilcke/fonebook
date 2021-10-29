import { client, getContext } from './client';
import { GET_REFRESH_TOKEN } from '../queries';
import { clearSession, getSession, isSession, setSession } from './session';
import { RefreshTokenV2 } from '../queries/__generated__/RefreshTokenV2';

let nbErrors = 0;

export const getNewSession = async (): Promise<Session> => {
  const session = getSession();

  // if we are already logged in
  if (session.refresh_token && nbErrors < 2) {
 
    console.log('we can try to get a new access token using the refresh token');
    try {
      const { data } = await client.mutate<RefreshTokenV2>({
        mutation: GET_REFRESH_TOKEN,
        context: getContext(true),
        variables: {},
      })

      const refreshTokenV2 = data?.refreshTokenV2;

      console.log('getNewSession data:', refreshTokenV2);

      if (!isSession(refreshTokenV2)) {
        ++nbErrors;
        throw new Error('invalid session');
      }
    
      const newSession: Session = {
        ...refreshTokenV2,
        created_at: Date.now(),
      };

      console.log('successfully refreshed the session:', newSession);
      setSession(newSession);
    } catch (_ignored) {
      console.log('failed to refresh the session:', _ignored);
      clearSession();
    }
  }

  return getSession();
}

// at least three approaches are possible:
//
// - wait for the query to fail because of expired auth token,
//   then use the refresh token (if not expired) to get a new one 
//   then run the original query (two round trips)
// 
// - before a new query determine if the auth token has expired
//   then use the refresh token (if not expired) to get a new one
//   then run the original query (one round trip)
// 
// - just schedule it™: it is faster for the user, not too hard on the API,
//   allows the backend to know about connected users (if that was a feature),
//   it can keep things alive beyond the 1h expiration, and we can also add
//   a fallback to "retry on fail" if the token is refused by the API
//
// for this frontend test project I'm going with a simple scheduler
// with no real time tracking
const sessionRefresher = async () => {
  const session = await getNewSession();

  // how much time has elapsed since the token was generated?
  const elapsed = Date.now() - session.created_at;

  const lifeTime = 10 * 60 * 1000;
  const maxWaitTime = 5 * 60 * 1000; // we actually don't try to wait that much
  const minWaitTime = 10 * 1000;

  // how much time before the accessToken expire?
  // value between 0 and maxWaitTime (9 minutes)
  const remainingLifeTime = Math.max(0, lifeTime - elapsed);

  const waitTime = remainingLifeTime < 0 ? minWaitTime : maxWaitTime;
 
  console.log('SCHEDULER:', {
    created_at: session.created_at,
    elapsed,
    lifeTime,
    maxWaitTime,
    minWaitTime,
    remainingLifeTime,
    waitTime
  })
  setInterval(() => {
    sessionRefresher()
  }, waitTime);
}

// already begin with a bit refresh
sessionRefresher();
