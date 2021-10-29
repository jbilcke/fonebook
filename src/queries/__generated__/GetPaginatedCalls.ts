/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPaginatedCalls
// ====================================================

export interface GetPaginatedCalls_paginatedCalls_nodes_notes {
  __typename: "Note";
  id: string;
  content: string;
}

export interface GetPaginatedCalls_paginatedCalls_nodes {
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
  notes: GetPaginatedCalls_paginatedCalls_nodes_notes[];
}

export interface GetPaginatedCalls_paginatedCalls {
  __typename: "PaginatedCalls";
  nodes: GetPaginatedCalls_paginatedCalls_nodes[] | null;
  totalCount: number;
  hasNextPage: boolean;
}

export interface GetPaginatedCalls {
  paginatedCalls: GetPaginatedCalls_paginatedCalls;
}

export interface GetPaginatedCallsVariables {
  offset?: number | null;
  limit?: number | null;
}
