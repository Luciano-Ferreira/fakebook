import { ApolloProvider } from '@apollo/client';
import { Meta, StoryObj } from '@storybook/react';
import { client } from '../../lib/apollo';
import { Feed } from './';

export default {
  title: 'Pages/Feed',
  component: Feed,
  decorators: [
    (Story) => {
      return (
        <ApolloProvider client={client}>
          {Story()}
        </ApolloProvider>
      )
    }
  ]
} as Meta

export const Default: StoryObj = {}