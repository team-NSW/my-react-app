import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberBox } from './NumberBox';
import { useState } from 'react';

const meta: Meta<typeof NumberBox> = {
    title: 'Example/NumberBox',
    component: NumberBox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NumberBox>;

// 基本的な使い方
export const Default: Story = {
    render: () => {
        const [value, setValue] = useState('');
        return (
            <NumberBox
                id="default-number-box"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="金額"
                placeholder="金額を入力してください"
            />
        );
    },
};

// 必須項目
export const Required: Story = {
    render: () => {
        const [value, setValue] = useState('');
        return (
            <NumberBox
                id="required-number-box"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="金額"
                placeholder="金額を入力してください"
                required={true}
            />
        );
    },
};

// エラー状態
export const WithError: Story = {
    render: () => {
        const [value, setValue] = useState('');
        return (
            <NumberBox
                id="error-number-box"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="金額"
                placeholder="金額を入力してください"
                error="この項目は必須です"
                required={true}
            />
        );
    },
};

// アイコン付き
export const WithIcon: Story = {
    render: () => {
        const [value, setValue] = useState('1000');
        return (
            <NumberBox
                id="icon-number-box"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="金額"
                placeholder="金額を入力してください"
                icon={<span>💰</span>}
            />
        );
    },
};

// ローディング状態
export const Loading: Story = {
    render: () => {
        const [value, setValue] = useState('1000');
        return (
            <NumberBox
                id="loading-number-box"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="金額"
                placeholder="金額を入力してください"
                loading={true}
                icon={<span>⟳</span>}
            />
        );
    },
};

// 無効状態
export const Disabled: Story = {
    render: () => {
        const [value, setValue] = useState('1000');
        return (
            <NumberBox
                id="disabled-number-box"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="金額"
                placeholder="金額を入力してください"
                disabled={true}
            />
        );
    },
};

// ラベルなし
export const WithoutLabel: Story = {
    render: () => {
        const [value, setValue] = useState('');
        return (
            <NumberBox
                id="no-label-number-box"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="金額を入力してください"
            />
        );
    },
};

// 全ての機能を含む
export const Complete: Story = {
    render: () => {
        const [value, setValue] = useState('5000');
        return (
            <NumberBox
                id="complete-number-box"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="支払金額"
                placeholder="金額を入力してください"
                required={true}
                icon={<span>¥</span>}
            />
        );
    },
};

// インタラクティブな例（バリデーション付き）
export const Interactive: Story = {
    render: () => {
        const [value, setValue] = useState('');
        const [error, setError] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setValue(newValue);
            
            if (newValue === '') {
                setError('この項目は必須です');
            } else if (Number(newValue) < 0) {
                setError('0以上の値を入力してください');
            } else {
                setError('');
            }
        };

        return (
            <NumberBox
                id="interactive-number-box"
                value={value}
                onChange={handleChange}
                label="金額"
                placeholder="金額を入力してください"
                required={true}
                error={error}
                icon={<span>¥</span>}
            />
        );
    },
};