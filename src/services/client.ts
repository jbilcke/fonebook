import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getSession } from './session';

const httpLink = new HttpLink({
  uri: 'https://frontend-test-api.aircall.io/graphql',
});

const wsLink = new WebSocketLink({
  // what is the correct WSS url?
  // uri: 'wss://frontend-test-api.aircall.io/subscriptions',
  uri: 'wss://frontend-test-api.aircall.io',
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: async () => {
      const session = getSession();
      console.log('going to use ', {
        headers: {
          Authorization: session.access_token ? `Bearer ${session.access_token}` : "",
        },
      })
      return {
        headers: {
          Authorization: session.access_token ? `Bearer ${session.access_token}` : "",
        },
      }
    },
  },
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client =  new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {

          // Note Julian: perhaps in a real world setting, the offsetLimitPagination()
          // function provided by Apollo can be used
          // paginatedCalls: offsetLimitPagination(),

          paginatedCalls: {
            keyArgs: false,
            // Note Julian: the following merge rule is adapted from the doc
            merge: (existing, incoming, { args }) => {
              const merged = existing ? existing.slice(0) : [];
              if (args) {
                // Assume an offset of 0 if args.offset omitted.
                const { offset = 0 } = args;
                for (let i = 0; i < incoming.nodes.length; ++i) {
                  merged[offset + i] = incoming.nodes[i];
                }
              } else {
                // It's unusual (probably a mistake) for a paginated field not
                // to receive any arguments, so you might prefer to throw an
                // exception here, instead of recovering by appending incoming
                // onto the existing array.
                merged.push.apply(merged, incoming.nodes);
              }
              return merged;
            },
          },
        },
      },
    }
  })
});

/**
 * Get some context for Apollo
 * 
 * Note Julian: I am currently using this to setup the auth header before a request,
 * but perhaps it is possible to do like the websockets and use a lazy connectionParams?
 * 
 * @param {boolean} isRefresh 
 * @returns
 */
export const getContext = (isRefresh?: boolean): {
  headers: {
    authorization: string
  }
} => {
  const { access_token, refresh_token } = getSession();
  const authToken = isRefresh ? refresh_token : access_token;
  return {
    headers: {
      authorization: authToken ? `Bearer ${authToken}` : ''
    }
  }
}