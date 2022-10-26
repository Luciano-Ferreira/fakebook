import { ApolloProvider } from '@apollo/client';
import { Meta, StoryObj } from '@storybook/react';
import { client } from '../../../lib/apollo';
import { Comment } from './';

export default {
  title: 'Components/Comment',
  component: Comment,
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