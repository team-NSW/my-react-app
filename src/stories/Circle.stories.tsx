import Circle from './Circle';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Circle> = {
    title: 'Example/Circle',
    component: Circle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['blue', 'red', 'green', 'yellow'],
        },
        size: { control: 'number'},
    },
};

export default meta;
type Story = StoryObj<typeof Circle>;

export const red: Story = {
    args: { size: 80, color: 'red' },
};

export const green: Story = {
    args: { size: 80, color: 'green'},
};

export const yellow: Story = {
    args: { size: 80, color: 'yellow'}
};

export const blue: Story = {
    args: { size: 80, color: 'blue'}
};