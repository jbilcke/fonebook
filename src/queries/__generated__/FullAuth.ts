/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullAuth
// ====================================================

export interface FullAuth_user {
  __typename: "UserType";
  username: string;
}

export interface FullAuth {
  __typename: "AuthResponseType";
  access_token: string;
  /**
   * This token is used to refresh the access_token. Note that this only works with the new RefreshTokenV2 Mutation.
   */
  refresh_token: string;
  user: FullAuth_user;
}
