// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'モダンなボタンコンポーネント。複数のバリエーション、サイズ、アイコン対応。',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'ghost', 'link'],
            description: 'ボタンのバリエーション',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'ボタンのサイズ',
        },
        loading: {
            control: 'boolean',
            description: 'ローディング状態',
        },
        disabled: {
            control: 'boolean',
            description: '無効化状態',
        },
        fullWidth: {
            control: 'boolean',
            description: '幅いっぱいに表示',
        },
        children: {
            control: 'text',
            description: 'ボタンのテキスト',
        },
        onClick: {
            action: 'clicked',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// アイコン用のSVGコンポーネント
const PlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const TrashIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const DownloadIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);

// 基本的な使用例
export const Default: Story = {
    args: {
        children: 'ボタン',
    },
};

// バリエーション
export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Success',
    },
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        children: 'Danger',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        children: 'Warning',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Ghost',
    },
};

export const Link: Story = {
    args: {
        variant: 'link',
        children: 'Link',
    },
};

// サイズ
export const ExtraSmall: Story = {
    args: {
        size: 'xs',
        children: 'Extra Small',
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Small',
    },
};

export const Medium: Story = {
    args: {
        size: 'md',
        children: 'Medium',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Large',
    },
};

export const ExtraLarge: Story = {
    args: {
        size: 'xl',
        children: 'Extra Large',
    },
};

// 状態
export const Loading: Story = {
    args: {
        loading: true,
        children: 'Loading',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled',
    },
};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
        children: 'Full Width Button',
    },
    parameters: {
        layout: 'padded',
    },
};

// アイコン付き
export const WithLeftIcon: Story = {
    args: {
        leftIcon: <PlusIcon />,
        children: '新規作成',
    },
};

export const WithRightIcon: Story = {
    args: {
        rightIcon: <ArrowRightIcon />,
        children: '次へ',
    },
};

export const WithBothIcons: Story = {
    args: {
        leftIcon: <DownloadIcon />,
        rightIcon: <ArrowRightIcon />,
        children: 'ダウンロード',
    },
};

export const IconOnly: Story = {
    args: {
        children: <TrashIcon />,
        'aria-label': '削除',
    },
};

// 全バリエーション
export const AllVariants: Story = {
    args: {
        children: 'Button',
        variant: 'primary',
    },
    render: () => (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
            </div>
        </div>
    ),
};

// 全サイズ
export const AllSizes: Story = {
    args: {
        children: 'Button',
        size: 'md',
    },
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
        </div>
    ),
};

// 状態一覧
export const AllStates: Story = {
    args: {
        children: 'Button',
    },
    render: () => (
        <div className="space-y-4">
            <div>
                <h3 className="text-sm font-semibold mb-2">通常</h3>
                <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="danger">Danger</Button>
                </div>
            </div>
            
            <div>
                <h3 className="text-sm font-semibold mb-2">ローディング</h3>
                <div className="flex flex-wrap gap-3">
                    <Button variant="primary" loading>Primary</Button>
                    <Button variant="secondary" loading>Secondary</Button>
                    <Button variant="success" loading>Success</Button>
                    <Button variant="danger" loading>Danger</Button>
                </div>
            </div>
            
            <div>
                <h3 className="text-sm font-semibold mb-2">無効化</h3>
                <div className="flex flex-wrap gap-3">
                    <Button variant="primary" disabled>Primary</Button>
                    <Button variant="secondary" disabled>Secondary</Button>
                    <Button variant="success" disabled>Success</Button>
                    <Button variant="danger" disabled>Danger</Button>
                </div>
            </div>
        </div>
    ),
};

// アイコンバリエーション
export const IconVariations: Story = {
    args: {
        children: 'Button',
    },
    render: () => (
        <div className="space-y-4">
            <div>
                <h3 className="text-sm font-semibold mb-2">左アイコン</h3>
                <div className="flex flex-wrap gap-3">
                    <Button variant="primary" leftIcon={<PlusIcon />}>新規作成</Button>
                    <Button variant="success" leftIcon={<DownloadIcon />}>ダウンロード</Button>
                    <Button variant="danger" leftIcon={<TrashIcon />}>削除</Button>
                </div>
            </div>
            
            <div>
                <h3 className="text-sm font-semibold mb-2">右アイコン</h3>
                <div className="flex flex-wrap gap-3">
                    <Button variant="primary" rightIcon={<ArrowRightIcon />}>次へ</Button>
                    <Button variant="secondary" rightIcon={<ArrowRightIcon />}>続ける</Button>
                </div>
            </div>
            
            <div>
                <h3 className="text-sm font-semibold mb-2">アイコンのみ</h3>
                <div className="flex flex-wrap gap-3">
                    <Button variant="primary" aria-label="追加"><PlusIcon /></Button>
                    <Button variant="success" aria-label="ダウンロード"><DownloadIcon /></Button>
                    <Button variant="danger" aria-label="削除"><TrashIcon /></Button>
                    <Button variant="ghost" aria-label="次へ"><ArrowRightIcon /></Button>
                </div>
            </div>
        </div>
    ),
};

// 実用例
export const RealWorldExamples: Story = {
    args: {
        children: 'Button',
    },
    render: () => (
        <div className="w-96 space-y-6">
            <div>
                <h3 className="text-sm font-semibold mb-3">フォームボタン</h3>
                <div className="flex gap-2">
                    <Button variant="ghost" fullWidth>キャンセル</Button>
                    <Button variant="primary" fullWidth>保存</Button>
                </div>
            </div>
            
            <div>
                <h3 className="text-sm font-semibold mb-3">削除確認</h3>
                <div className="flex gap-2">
                    <Button variant="ghost">キャンセル</Button>
                    <Button variant="danger" leftIcon={<TrashIcon />}>削除する</Button>
                </div>
            </div>
            
            <div>
                <h3 className="text-sm font-semibold mb-3">アクションボタン</h3>
                <div className="flex flex-col gap-2">
                    <Button variant="primary" leftIcon={<PlusIcon />} fullWidth>
                        新規作成
                    </Button>
                    <Button variant="success" leftIcon={<DownloadIcon />} fullWidth>
                        エクスポート
                    </Button>
                </div>
            </div>
            
            <div>
                <h3 className="text-sm font-semibold mb-3">ステップナビゲーション</h3>
                <div className="flex justify-between gap-2">
                    <Button variant="ghost">戻る</Button>
                    <Button variant="primary" rightIcon={<ArrowRightIcon />}>次へ</Button>
                </div>
            </div>
        </div>
    ),
};

// インタラクティブな例
export const Interactive: Story = {
    args: {
        children: 'Button',
        variant: 'primary',
    },
    render: () => {
        const handleClick = () => {
            alert('ボタンがクリックされました！');
        };

        return (
            <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                    <Button variant="primary" onClick={handleClick}>
                        クリックしてみる
                    </Button>
                    <Button variant="success" leftIcon={<PlusIcon />} onClick={handleClick}>
                        アイコン付き
                    </Button>
                    <Button variant="danger" loading>
                        ローディング中
                    </Button>
                    <Button variant="ghost" disabled>
                        無効化
                    </Button>
                </div>
            </div>
        );
    },
};