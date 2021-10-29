const SESSION_KEY = 'frontend-test-session';

export function isSession(session: any): session is Session {
   return (
    typeof session.access_token === 'string' &&
    typeof session.refresh_token === 'string' && 
    typeof session.user.username === 'string'
  );
}

/**
 * Read session from the Local Storage
 * 
 * @returns {Session}
 */
export const getSession = (): Session => {
  try {
    const session = JSON.parse(
      localStorage.getItem(SESSION_KEY) || ''
    );

    // basic check of session data consistency
    if (!isSession(session)) {
      throw new Error();
    }
    return session;
  } catch (_ignored) {
    // since we may attempt to read the session before login of after logout,
    // exceptions are normal and don't need to be logged
    return {
      access_token: '',
      refresh_token: '',
      user: {
        username: '',
      },
      created_at: 0,
    }
  }
}

/**
 * Write session to the Local Storage
 * 
 * @param {Session} session
 * @returns {void}
 */
export const setSession = (session: Session) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  /**
   * Clear session from the Local Storage
   * @returns {void}
   */
export const clearSession = () =>
  localStorage.removeItem(SESSION_KEY);

(window as any)['debugJulian'] = getSession;