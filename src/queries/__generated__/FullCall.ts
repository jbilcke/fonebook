/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullCall
// ====================================================

export interface FullCall_notes {
  __typename: "Note";
  id: string;
  content: string;
}

export interface FullCall {
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
  notes: FullCall_notes[];
}
