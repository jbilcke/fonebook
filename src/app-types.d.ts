interface Session {
  access_token: string;
  refresh_token: string;

  user: {
    username: string;
  }

  created_at: number;
}
