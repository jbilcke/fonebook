import React, { useEffect } from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { addMilliseconds, format, formatRelative, parseISO } from 'date-fns';
import {  Flex, Spacer, Typography } from '@aircall/tractor';
import { Call } from '../../types';
import { CallSymbol } from '../CallSymbol';
import { GetCall, GetCallVariables } from '../../queries/__generated__/GetCall';
import { getContext } from '../../services/client';
import { GET_CALL, /*ON_UPDATED_CALL */ } from '../../queries';

export const CallDetails = ({ id }: { id: string }) => {

  const { error, data, /* subscribeToMore */ } =
    useQuery<GetCall, GetCallVariables>(GET_CALL, {
    context: getContext(),
    variables: { id },
    onError: async (error: ApolloError) => {
      console.log('error:', error);
    },
  });

  useEffect(() => {
    console.log('starting subscription..');
    // note Julian: This is disabled because there is an issue with the websocket URL
    /*
    subscribeToMore({
      document: ON_UPDATED_CALL,
      variables: { id },
      updateQuery: (prev, { subscriptionData }) => {
         if (!subscriptionData.data) return prev;
         return subscriptionData.data; // simple overwrite
       }
     })
     */
  }, []);

  if (!data?.call || error) {
    return null;
  }

  const call: Call = data.call;

  const createdAt = parseISO(call.created_at);
  const duration = addMilliseconds(new Date(0), call.duration);

  console.log('notes:', call.notes);
  
  return (
    <Flex size="100%">
      <Spacer direction="vertical" space="xs">
      <Flex
        borderRadius={16}
        p={5}
        bg={
        (call.is_archived ? 'grey.darker' : (
          call.call_type === 'missed' ? 'yellow.dark' : 'primary.dark'
        ))}
        color="base.white"
        height="260px"
        width="100%"
        >
      <Spacer direction="vertical" space="xs">
        <Spacer direction="horizontal">
          <CallSymbol {...call} />
          <Typography variant="displayS">{
            call.direction
          } {
            call.call_type
          } {
            call.call_type === 'voicemail' ? '' : 'call'
          }</Typography>
            <Typography variant="displayS2">{
            formatRelative(createdAt, new Date())
          }</Typography>
        </Spacer>

        <Spacer direction="horizontal" space="xs" alignItems="center">
          <Typography variant="subheading" width="90px" textAlign="right">FROM</Typography>
          <Typography variant="heading2">{call.from}</Typography>
        </Spacer>

        {!!call.via && <Spacer direction="horizontal" space="xs" alignItems="center">
          <Typography variant="subheading" width="90px" textAlign="right">VIA</Typography>
          <Typography variant="heading2">{call.via}</Typography>
        </Spacer>}

        <Spacer direction="horizontal" space="xs" alignItems="center">
          <Typography variant="subheading" width="90px" textAlign="right">TO</Typography>
          <Typography variant="heading2">{call.to}</Typography>
        </Spacer>

        <Spacer direction="horizontal" space="xs" alignItems="center">
          <Typography variant="subheading" width="90px" textAlign="right">DURATION</Typography>
          <Typography variant="heading2">{format(duration, 'mm:ss')} sec</Typography>
        </Spacer>

      </Spacer>
      </Flex>

      <Flex flexDirection="column" width="100%">
        <Spacer direction="vertical" space="xs">
          {call.notes.map(note => 
            <Flex
              borderRadius={16}
              p={5}
              bg="blue.lighter"
              color="blue.dark"
              key={note.id}
            >
              <Typography variant="subheading2">{
                note.content || 'A note has been attached but with no content.'
              }</Typography>
            </Flex>
          )}
          </Spacer>
        </Flex>
      </Spacer>
    </Flex>
  )
}

