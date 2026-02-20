// components/Toaster.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import toast from 'react-hot-toast';
import { Toaster } from './Toaster';
import { Button } from './Button';

const meta = {
  title: 'Components/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

// 各種toastを試せるコンポーネント
function ToastDemo() {
  return (
    <div className="space-y-4 p-8">
      <Toaster />
      
      <div className="space-y-2">
        <h2 className="text-xl font-bold mb-4">Toast Examples</h2>
        
        <Button 
          onClick={() => toast.success('成功しました！')}
          className="w-full"
        >
          ✅ Success Toast
        </Button>
        
        <Button 
          onClick={() => toast.error('エラーが発生しました')}
          className="w-full"
        >
          ❌ Error Toast
        </Button>
        
        <Button 
          onClick={() => toast('情報メッセージです', { icon: 'ℹ️' })}
          className="w-full"
        >
          ℹ️ Info Toast
        </Button>
        
        <Button 
          onClick={() => toast('注意してください', { icon: '⚠️' })}
          className="w-full"
        >
          ⚠️ Warning Toast
        </Button>
        
        <Button 
          onClick={() => {
            const loadingId = toast.loading('処理中...');
            setTimeout(() => {
              toast.success('完了しました！', { id: loadingId });
            }, 2000);
          }}
          className="w-full"
        >
          ⏳ Loading → Success
        </Button>
        
        <Button 
          onClick={() => {
            const loadingId = toast.loading('処理中...');
            setTimeout(() => {
              toast.error('失敗しました', { id: loadingId });
            }, 2000);
          }}
          className="w-full"
        >
          ⏳ Loading → Error
        </Button>
        
        <Button 
          onClick={() => {
            toast.success('カスタムスタイル', {
              duration: 6000,
              style: {
                background: '#10b981',
                color: '#fff',
                padding: '16px',
              },
            });
          }}
          className="w-full"
        >
          🎨 Custom Style
        </Button>
        
        <Button 
          onClick={() => {
            toast('長いメッセージのテストです。複数行にわたる場合の表示を確認します。エラーメッセージなどで使用されることを想定しています。', {
              duration: 6000,
            });
          }}
          className="w-full"
        >
          📝 Long Message
        </Button>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const SuccessOnly: Story = {
  render: () => (
    <div className="p-8">
      <Toaster />
      <Button onClick={() => toast.success('成功しました！')}>
        Show Success
      </Button>
    </div>
  ),
};

export const ErrorOnly: Story = {
  render: () => (
    <div className="p-8">
      <Toaster />
      <Button onClick={() => toast.error('エラーが発生しました')}>
        Show Error
      </Button>
    </div>
  ),
};

export const MultipleToasts: Story = {
  render: () => (
    <div className="p-8">
      <Toaster />
      <Button 
        onClick={() => {
          toast.success('1つ目');
          setTimeout(() => toast.success('2つ目'), 500);
          setTimeout(() => toast.success('3つ目'), 1000);
        }}
      >
        Show Multiple Toasts
      </Button>
    </div>
  ),
};