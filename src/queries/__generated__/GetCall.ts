/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCall
// ====================================================

export interface GetCall_call_notes {
  __typename: "Note";
  id: string;
  content: string;
}

export interface GetCall_call {
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
  notes: GetCall_call_notes[];
}

export interface GetCall {
  call: GetCall_call | null;
}

export interface GetCallVariables {
  id: string;
}
