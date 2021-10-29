/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export interface SignIn_login_user {
  __typename: "UserType";
  username: string;
}

export interface SignIn_login {
  __typename: "AuthResponseType";
  access_token: string;
  /**
   * This token is used to refresh the access_token. Note that this only works with the new RefreshTokenV2 Mutation.
   */
  refresh_token: string;
  user: SignIn_login_user;
}

export interface SignIn {
  login: SignIn_login;
}

export interface SignInVariables {
  input: LoginInput;
}
