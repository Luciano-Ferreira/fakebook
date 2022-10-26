import { ApolloProvider } from "@apollo/client";
import { Meta, StoryObj } from "@storybook/react";
import { client } from "../../lib/apollo";
import { Post } from "./";

export default {
  title: "Components/Post",
  component: Post,
  decorators: [
    (Story) => {
      return <ApolloProvider client={client}>{Story()}</ApolloProvider>;
    },
  ],
} as Meta;

export const Default: StoryObj = {};
