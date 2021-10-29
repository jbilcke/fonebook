/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ArchiveCall
// ====================================================

export interface ArchiveCall_archiveCall_notes {
  __typename: "Note";
  id: string;
  content: string;
}

export interface ArchiveCall_archiveCall {
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
  notes: ArchiveCall_archiveCall_notes[];
}

export interface ArchiveCall {
  archiveCall: ArchiveCall_archiveCall;
}

export interface ArchiveCallVariables {
  id: string;
}
