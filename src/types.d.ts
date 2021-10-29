export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddNoteInput = {
  activityId: Scalars['ID'];
  content: Scalars['String'];
};

export type AuthResponseType = {
  __typename?: 'AuthResponseType';
  access_token: Scalars['String'];
  /** This token is used to refresh the access_token. Note that this only works with the new RefreshTokenV2 Mutation. */
  refresh_token: Scalars['String'];
  user: UserType;
};

export type Call = {
  __typename?: 'Call';
  call_type: Scalars['String'];
  created_at: Scalars['String'];
  direction: Scalars['String'];
  duration: Scalars['Float'];
  from: Scalars['String'];
  id: Scalars['ID'];
  is_archived: Scalars['Boolean'];
  notes: Array<Note>;
  to: Scalars['String'];
  via: Scalars['String'];
};

export type DeprecatedAuthResponseType = {
  __typename?: 'DeprecatedAuthResponseType';
  access_token: Scalars['String'];
  user: UserType;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNote: Call;
  archiveCall: Call;
  login: AuthResponseType;
  /** @deprecated This has been deprecated, please use the refreshTokenV2 mutation */
  refreshToken: DeprecatedAuthResponseType;
  refreshTokenV2: AuthResponseType;
};


export type MutationAddNoteArgs = {
  input: AddNoteInput;
};


export type MutationArchiveCallArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Note = {
  __typename?: 'Note';
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type PaginatedCalls = {
  __typename?: 'PaginatedCalls';
  hasNextPage: Scalars['Boolean'];
  nodes?: Maybe<Array<Call>>;
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  call?: Maybe<Call>;
  me: UserType;
  paginatedCalls: PaginatedCalls;
};


export type QueryCallArgs = {
  id: Scalars['ID'];
};


export type QueryPaginatedCallsArgs = {
  limit?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onUpdatedCall?: Maybe<Call>;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['String'];
  username: Scalars['String'];
};
