
declare module '*/queries.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const FullCall: DocumentNode;
export const FullAuth: DocumentNode;
export const SignIn: DocumentNode;
export const RefreshTokenV2: DocumentNode;
export const GetPaginatedCalls: DocumentNode;
export const ArchiveCall: DocumentNode;
export const AddNote: DocumentNode;
export const GetCall: DocumentNode;
export const OnUpdatedCall: DocumentNode;

  export default defaultDocument;
}
    