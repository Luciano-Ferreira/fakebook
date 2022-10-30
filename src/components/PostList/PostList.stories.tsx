
import { Story, Meta } from '@storybook/react';

import { PostList } from './';
import { Post } from '../Post';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/PostList',
  component: PostList,
  subcomponents: { Post }, //👈 Adds the ListItem component as a subcomponent
} as Meta<typeof PostList>;

export const Empty: Story<typeof PostList> = (args) => <PostList {...args} />

export const OneItem: Story<typeof PostList> = (args) => (
  <PostList {...args}>
    <Post  
      id='cl58s2cv29lt60bmz6f216eet'
      customer={
        {
          id: 'cl58rsmw49vv00blrkbyt9s66',
          avatar: 'https://user-images.githubusercontent.com/46464433/177430210-5de97812-84dc-4a37-8d2d-f0d9481bf3b0.jpeg',
          name: 'Eliot Alderson',
          role: 'Destruidor de conglomerados'
        }
      }
      createdAt={'2022-07-05T23:03:46.328499+00:00' as unknown as Date}
      content='<p>Salve rapaziada, quem ta afim de destruir um conglomerado hoje??? 😏😏😏😏</p><p></p><p><a title=\"github.com/luciano-ferreira\" href=\"github.com/luciano-ferreira\">#mrrobot</a> <a title=\"github.com/luciano-ferreira\" href=\"github.com/luciano-ferreira\">#foryou</a></p>'
        
    />
  </PostList>
);