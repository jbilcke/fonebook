/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: OnUpdatedCall
// ====================================================

export interface OnUpdatedCall_onUpdatedCall_notes {
  __typename: "Note";
  id: string;
  content: string;
}

export interface OnUpdatedCall_onUpdatedCall {
  __typename: "Call";
  id: string;
  direction: string;
  from: string;
  to: string;
  duration: number;
  is_archived: boolean;
  call_type: string;
  via: string;
  created_at: string;
  notes: OnUpdatedCall_onUpdatedCall_notes[];
}

export interface OnUpdatedCall {
  onUpdatedCall: OnUpdatedCall_onUpdatedCall | null;
}
