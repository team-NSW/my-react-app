// Select.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import type {  SelectOption } from './Select';
import { useState } from 'react';

const sampleOptions: SelectOption[] = [
    { value: 'tokyo', label: '東京都' },
    { value: 'osaka', label: '大阪府' },
    { value: 'kyoto', label: '京都府' },
    { value: 'hokkaido', label: '北海道' },
    { value: 'fukuoka', label: '福岡県' },
    { value: 'okinawa', label: '沖縄県' },
    { value: 'disabled', label: '選択不可', disabled: true },
];

const largeOptions: SelectOption[] = Array.from({ length: 50 }, (_, i) => ({
    value: `option-${i}`,
    label: `オプション ${i + 1}`,
}));

const meta = {
    title: 'Components/Select',
    component: Select,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'モダンなカスタムセレクトコンポーネント。検索、クリア、キーボード操作に対応。',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'ラベルテキスト',
        },
        placeholder: {
            control: 'text',
            description: 'プレースホルダー',
        },
        required: {
            control: 'boolean',
            description: '必須フィールドかどうか',
        },
        disabled: {
            control: 'boolean',
            description: '無効化状態',
        },
        loading: {
            control: 'boolean',
            description: 'ローディング状態',
        },
        error: {
            control: 'text',
            description: 'エラーメッセージ',
        },
        searchable: {
            control: 'boolean',
            description: '検索可能かどうか',
        },
        clearable: {
            control: 'boolean',
            description: 'クリアボタンを表示するか',
        },
        onChange: {
            action: 'onChange',
        },
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な使用例
export const Default: Story = {
    args: {
        id: 'select-default',
        label: '都道府県',
        value: '',
        options: sampleOptions,
    },
};

// 選択済み
export const WithValue: Story = {
    args: {
        id: 'select-value',
        label: '都道府県',
        value: 'tokyo',
        options: sampleOptions,
    },
};

// 必須フィールド
export const Required: Story = {
    args: {
        id: 'select-required',
        label: '都道府県',
        value: '',
        options: sampleOptions,
        required: true,
    },
};

// エラー状態
export const WithError: Story = {
    args: {
        id: 'select-error',
        label: '都道府県',
        value: '',
        options: sampleOptions,
        error: '都道府県を選択してください',
    },
};

// ローディング状態
export const Loading: Story = {
    args: {
        id: 'select-loading',
        label: '都道府県',
        value: '',
        options: sampleOptions,
        loading: true,
    },
};

// 無効化状態
export const Disabled: Story = {
    args: {
        id: 'select-disabled',
        label: '都道府県',
        value: 'tokyo',
        options: sampleOptions,
        disabled: true,
    },
};

// 検索可能
export const Searchable: Story = {
    args: {
        id: 'select-searchable',
        label: '都道府県',
        value: '',
        options: sampleOptions,
        searchable: true,
    },
};

// クリア可能
export const Clearable: Story = {
    args: {
        id: 'select-clearable',
        label: '都道府県',
        value: 'tokyo',
        options: sampleOptions,
        clearable: true,
    },
};

// 検索 + クリア
export const SearchableAndClearable: Story = {
    args: {
        id: 'select-search-clear',
        label: '都道府県',
        value: 'osaka',
        options: sampleOptions,
        searchable: true,
        clearable: true,
    },
};

// 大量のオプション
export const ManyOptions: Story = {
    args: {
        id: 'select-many',
        label: 'オプション選択',
        value: '',
        options: largeOptions,
        searchable: true,
        clearable: true,
    },
};

// インタラクティブな例
export const Interactive: Story = {
    args: {
        value: '',
        options: sampleOptions,
    },
    render: (args) => {
        const [value, setValue] = useState('');

        return (
            <div className="w-96 space-y-4">
                <Select
                    {...args}
                    id="select-interactive"
                    label="都道府県を選択"
                    value={value}
                    onChange={setValue}
                    searchable
                    clearable
                    required
                />
                
                {value && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-700">
                            <strong>選択された値:</strong> {value}
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                            <strong>表示名:</strong> {sampleOptions.find(opt => opt.value === value)?.label}
                        </p>
                    </div>
                )}
            </div>
        );
    },
};

// 全バリエーション
export const AllVariations: Story = {
    args: {
        value: '',
        options: sampleOptions,
    },
    render: () => (
        <div className="w-96 space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">通常</h3>
                <Select
                    id="select-1"
                    label="都道府県"
                    value=""
                    options={sampleOptions}
                />
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2">選択済み</h3>
                <Select
                    id="select-2"
                    label="都道府県"
                    value="tokyo"
                    options={sampleOptions}
                />
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2">必須</h3>
                <Select
                    id="select-3"
                    label="都道府県"
                    value=""
                    options={sampleOptions}
                    required
                />
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2">エラー</h3>
                <Select
                    id="select-4"
                    label="都道府県"
                    value=""
                    options={sampleOptions}
                    error="都道府県を選択してください"
                />
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2">検索可能</h3>
                <Select
                    id="select-5"
                    label="都道府県"
                    value=""
                    options={sampleOptions}
                    searchable
                />
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2">クリア可能</h3>
                <Select
                    id="select-6"
                    label="都道府県"
                    value="osaka"
                    options={sampleOptions}
                    clearable
                />
            </div>
            
            <div>
                <h3 className="text-lg font-semibold mb-2">無効化</h3>
                <Select
                    id="select-7"
                    label="都道府県"
                    value="kyoto"
                    options={sampleOptions}
                    disabled
                />
            </div>
        </div>
    ),
};

// フォーム内での使用例
export const InForm: Story = {
    args: {
        value: '',
        options: sampleOptions,
    },
    render: () => {
        const [prefecture, setPrefecture] = useState('');
        const [city, setCity] = useState('');
        const [error, setError] = useState('');

        const cityOptions: SelectOption[] = prefecture === 'tokyo' 
            ? [
                { value: 'shibuya', label: '渋谷区' },
                { value: 'shinjuku', label: '新宿区' },
                { value: 'minato', label: '港区' },
              ]
            : prefecture === 'osaka'
            ? [
                { value: 'kita', label: '北区' },
                { value: 'chuo', label: '中央区' },
                { value: 'naniwa', label: '浪速区' },
              ]
            : [];

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            
            if (!prefecture) {
                setError('都道府県を選択してください');
                return;
            }

            alert(`都道府県: ${prefecture}\n市区町村: ${city || '未選択'}`);
        };

        return (
            <form onSubmit={handleSubmit} className="w-96 space-y-4">
                <Select
                    id="prefecture"
                    label="都道府県"
                    value={prefecture}
                    onChange={(val) => {
                        setPrefecture(val);
                        setCity('');
                        setError('');
                    }}
                    options={sampleOptions}
                    required
                    searchable
                    clearable
                    error={error}
                />
                
                <Select
                    id="city"
                    label="市区町村"
                    value={city}
                    onChange={setCity}
                    options={cityOptions}
                    disabled={!prefecture || cityOptions.length === 0}
                    placeholder={prefecture ? '選択してください' : '先に都道府県を選択してください'}
                    searchable
                    clearable
                />
                
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    送信
                </button>
            </form>
        );
    },
};