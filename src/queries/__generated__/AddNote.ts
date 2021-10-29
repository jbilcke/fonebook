/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddNoteInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddNote
// ====================================================

export interface AddNote_addNote_notes {
  __typename: "Note";
  id: string;
  content: string;
}

export interface AddNote_addNote {
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
  notes: AddNote_addNote_notes[];
}

export interface AddNote {
  addNote: AddNote_addNote;
}

export interface AddNoteVariables {
  input: AddNoteInput;
}
