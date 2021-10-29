import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CallSymbol } from '.'

export default {
  title: 'Fonebook/CallSymbol',
  component: CallSymbol,
  argTypes: {
    call_type: {
      name: 'Call Type',
      type: { name: 'string', required: false },
      defaultValue: 'missed',
      control: {
        type: 'text'
      }
    },
    label: {
      name: 'Direction',
      type: { name: 'string', required: false },
      defaultValue: 'inbound',
      control: {
        type: 'text'
      }
    }
  },
} as ComponentMeta<typeof CallSymbol>

const Template: ComponentStory<typeof CallSymbol> = (args) => (
  <CallSymbol {...args} />
)

export const AnsweredInbound = Template.bind({})
AnsweredInbound.args = {
  call_type: 'answered',
  direction: 'inbound',
}

export const AnsweredOutbound = Template.bind({})
AnsweredOutbound.args = {
  call_type: 'answered',
  direction: 'outbound',
}

export const VoicemailOutbound = Template.bind({})
VoicemailOutbound.args = {
  call_type: 'voicemail',
  direction: 'inbound',
}

export const MissedInbound = Template.bind({})
MissedInbound.args = {
  call_type: 'missed',
  direction: 'inbound',
}
