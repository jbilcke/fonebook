import React, { useState } from 'react';
import { Flex, Grid, HeadsetFilled, Typography } from '@aircall/tractor';

import { CallHistory } from '../components/CallHistory';
import { CallDetails } from '../components/CallDetails';

export const HomePage = () => {
  const [openCallId, setOpenCallId] = useState<string>('');

  return (
    <Grid gridTemplateRows="max-content 300px" gridGap={3} p={3}>
      <Flex
        bg="primary.base"
        color="base.white"
        alignItems="center"
        justifyContent="center"
        p={3}
        borderRadius={16}
        >
        <Flex mr="1"><HeadsetFilled width="40" height="40" /></Flex>
        <Typography variant="displayXL" fontFamily="Klavika">fonebook</Typography> 
      </Flex>
      <Grid gridTemplateColumns="max-content auto" gridGap={3}>
        <CallHistory
          onOpenCallId={setOpenCallId}
          openCallId={openCallId}
        />

          {openCallId
            ? <CallDetails id={openCallId} />
            : <Flex
              alignItems="center"
              justifyContent="center"
            >
              <Typography  variant="displayM2" color="primary.dark">
                Please select a call on the left
              </Typography>
            </Flex>}
      </Grid>
    </Grid>
  );
};
