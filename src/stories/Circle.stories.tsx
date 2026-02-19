import Circle from './Circle';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Circle> = {
    title: 'Example/Circle',
    component: Circle,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component : 'ただの丸です。'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'color',
            // options: ['blue', 'red', 'green', 'yellow'],
        },
        size: { control: {
            type: 'range',
            min: 10,
            max: 100,
            step: 1

        }},
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