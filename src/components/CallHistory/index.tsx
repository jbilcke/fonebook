import React, { useState } from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { omit } from 'lodash-es';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Box, Button, CallOutlined, Checkbox, Flex, Spacer, Typography } from '@aircall/tractor';
import { format, parseISO } from 'date-fns';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { GetPaginatedCalls } from '../../queries/__generated__/GetPaginatedCalls';
import { GET_PAGINATED_CALLS } from '../../queries';
import { getContext } from '../../services/client';
import { Call } from '../../types';
import { CallSymbol } from '../CallSymbol';
import { getNewSession } from '../../services/refresher';
import { formatCallCount } from '../../services/format';
import { CallArchiver } from '../CallArchiver';

export const CallHistory = ({
  onOpenCallId,
  openCallId,
}: {
  onOpenCallId: (callId: string) => void
  openCallId?: string
 }) => {
   const [selection, setSelection] = useState<Record<string, Call>>({});
   const nbSelected = Object.keys(selection).length;

   // TODO fix bug with pagination, until then use large limit
  const limit = 20;

  const { loading, error, data, fetchMore, refetch } =
    useQuery<GetPaginatedCalls>(GET_PAGINATED_CALLS, {
    context: getContext(),
    variables: {
      offset: 0,
      limit,
    },
    // notifyOnNetworkStatusChange: true, // this will clear data during status change it seems, might be an issue
    onError: async (error: ApolloError) => {
      // automatic session regeneration in case of error
      if (error.message === 'Unauthorized') {
        await getNewSession();
        window.location.reload();
      }
    },
  });

  const hasNextPage = data?.paginatedCalls?.hasNextPage || false;
  const nodes = data?.paginatedCalls?.nodes || [];
  const totalCount = data?.paginatedCalls?.totalCount || 0;

  console.log('debug:', {
    hasNextPage, nodes, totalCount, loading,  offset: nodes.length,
  })
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      if (loading || error) {
        return;
      }
      fetchMore({
        variables: {
          offset: nodes.length,
        },
      })
    },
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    // rootMargin: '0px 0px 400px 0px',
  });

  // note: we suppose items are already sorted by insertion date


  const callHistory = nodes.reduce<Record<string, Call[]>>((acc, call) => {
    const date = format(parseISO(call.created_at), 'MMMM do yyyy');
    return {
      ...acc,
      [date]: (acc[date] || []).concat(call),
    }
  }, {});

  const onSelectCall = (call: Call, checked: boolean) =>
    checked
      ? setSelection({ ...selection, [call.id]: call })
      : setSelection({ ...omit(selection, [call.id]) });

  const onUnselect = () => setSelection({});

  const onArchived = () => {
    onUnselect();
    refetch();
  }

  return (
    <Box width="500px" borderRadius={16} ref={rootRef} color="primary.dark">
      <Flex width="100%" justifyContent="space-between" mb={3} bg="white">
        <Spacer direction="horizontal" space="xxxs">
          <CallOutlined width="35" height="35" />
          <Typography variant="displayM2">{totalCount} {formatCallCount(totalCount)}</Typography>
        </Spacer>
        <CallArchiver selection={selection} nbSelected={nbSelected} onUnselect={onUnselect} onArchived={onArchived} />
      </Flex>

      <SimpleBar style={{ maxHeight: 'calc(100vh - 170px)' }}>
        <Flex flexDirection="column" pr="3">
          {Object.entries(callHistory).map(([ date, calls ]) => (
            <Flex key={date} my="1" flexDirection="column">
              <Spacer direction="horizontal" space="m" justifyContent="space-between" alignItems="center" mt={3} mb={2}>
                <Typography variant="displayS2">{date}</Typography>
              </Spacer>
              {calls.map(call => (
                <Flex key={call.id} width="100%" flexDirection="column">
                  <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    my={2}
                    p={2}
                    bg={
                      openCallId === call.id
                      ? (call.is_archived ? 'grey.darker' : (
                        call.call_type === 'missed' ? 'yellow.dark' : 'primary.dark'
                      ))
                      : (call.is_archived ? 'grey.light' : (
                        call.call_type === 'missed' ? 'yellow.lighter' : 'primary.lighter'
                      ))
                    }
                    color={
                      openCallId === call.id 
                      ? 'white'
                      : (call.is_archived ? 'grey.dark' : (
                        call.call_type === 'missed'? 'yellow.darker' : 'primary.dark'
                      ))
                    }
                    borderRadius={16}
                    cursor="pointer"
                    onClick={() => onOpenCallId(call.id)}
                  >
                     <Spacer direction="horizontal" space="s" justifyContent="space-between" alignItems="center" width="100%">
                     <Spacer direction="horizontal" space="xs">
                        <CallSymbol {...call} />
                        <Typography variant={call.is_archived ? 'subheading2' : 'subheading'}>{
                        call.direction
                        } {
                        call.call_type
                        } {
                        call.call_type === 'voicemail' ? '' : 'call'
                        }</Typography>
                      </Spacer>
                      <Spacer direction="horizontal" space="xs" mr={4} justifyContent="space-between">
                        <Typography variant={call.is_archived ? 'subheading2' : 'subheading'}>FROM</Typography>
                        <Typography variant={call.is_archived ? 'subheading2' : 'subheading'}>{call.from}</Typography>
                      </Spacer>
                    </Spacer>
                    <Flex p="1" borderRadius={16} onClick={event => {
                      event?.stopPropagation();
                    }}>
                      <Checkbox
                        checked={!!selection[call.id]}
                        onChange={checked => onSelectCall(call, checked)}
                      ></Checkbox>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          ))}

         <Button
            onClick={() => fetchMore({
              variables: {
                offset: nodes.length,
              },
            })}
            ref={sentryRef}
          >Load more</Button>
         {/*(loading || hasNextPage) && (
            <Box ref={sentryRef}>
              Loading more..
            </Box>
         )*/}
        </Flex>
      </SimpleBar>
    </Box>
  );
}