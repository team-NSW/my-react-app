// MockPage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import MockPage from './page';

const meta = {
  title: 'Pages/MockPage',
  component: MockPage,
  parameters: {
    layout: 'fullscreen', // ページ全体を表示
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MockPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトのページ表示
export const Default: Story = {};