/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GetRefreshToken
// ====================================================

export interface GetRefreshToken_refreshTokenV2_user {
  __typename: "UserType";
  username: string;
}

export interface GetRefreshToken_refreshTokenV2 {
  __typename: "AuthResponseType";
  access_token: string;
  /**
   * This token is used to refresh the access_token. Note that this only works with the new RefreshTokenV2 Mutation.
   */
  refresh_token: string;
  user: GetRefreshToken_refreshTokenV2_user;
}

export interface GetRefreshToken {
  refreshTokenV2: GetRefreshToken_refreshTokenV2;
}
