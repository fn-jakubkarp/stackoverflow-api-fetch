import { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react';
import StickyHeadTable from '../components/StickyHeadTable';

export default {
  title: 'Components/StickyHeadTable',
  component: StickyHeadTable,
} as Meta;

const Template: StoryFn = (args) => <StickyHeadTable {...args} />;

export const Default = Template.bind({});
Default.args = {};
