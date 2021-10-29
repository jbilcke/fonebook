import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CallArchiver } from '.'

export default {
  title: 'Fonebook/CallArchiver',
  component: CallArchiver,
  argTypes: {
  },
} as ComponentMeta<typeof CallArchiver>

const Template: ComponentStory<typeof CallArchiver> = (args) => (
  <CallArchiver {...args} />
)

export const Selected = Template.bind({})
Selected.args = {
  nbSelected: 42,
  onUnselect: () => {},
}

export const Unselected = Template.bind({})
Unselected.args = {
  nbSelected: 0,
  onUnselect: () => {},
}
