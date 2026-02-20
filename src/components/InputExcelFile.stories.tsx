import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputExcelFile } from './InputExcelFile';
import { useState } from 'react';

const meta = {
  title: 'Components/InputExcelFile',
  component: InputExcelFile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Excelファイル(.xlsx, .xls)をアップロードするための入力コンポーネント',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'ラベルテキスト',
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
    maxSizeMB: {
      control: 'number',
      description: '最大ファイルサイズ（MB）',
    },
    onChange: {
      action: 'onChange',
    },
    onError: {
      action: 'onError',
    },
  },
} satisfies Meta<typeof InputExcelFile>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な使用例
export const Default: Story = {
  args: {
    id: 'excel-file-default',
    label: 'Excelファイルを選択',
  },
};

// 必須フィールド
export const Required: Story = {
  args: {
    id: 'excel-file-required',
    label: 'Excelファイルを選択',
    required: true,
  },
};

// エラー状態
export const WithError: Story = {
  args: {
    id: 'excel-file-error',
    label: 'Excelファイルを選択',
    error: 'ファイルサイズは10MB以下にしてください',
  },
};

// ローディング状態
export const Loading: Story = {
  args: {
    id: 'excel-file-loading',
    label: 'Excelファイルを選択',
    loading: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
  },
};

// 無効化状態
export const Disabled: Story = {
  args: {
    id: 'excel-file-disabled',
    label: 'Excelファイルを選択',
    disabled: true,
  },
};

// アイコン付き
export const WithIcon: Story = {
  args: {
    id: 'excel-file-icon',
    label: 'Excelファイルを選択',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    ),
  },
};

// カスタムファイルサイズ制限
export const CustomMaxSize: Story = {
  args: {
    id: 'excel-file-custom-size',
    label: 'Excelファイルを選択（最大5MB）',
    maxSizeMB: 5,
  },
};

// インタラクティブな例（ファイル選択時の動作）
export const Interactive: Story = {
  render: (args) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');

    return (
      <div className="w-96 space-y-4">
        <InputExcelFile
          {...args}
          id="excel-file-interactive"
          label="Excelファイルを選択"
          required
          onChange={(file) => {
            setSelectedFile(file);
            setError('');
            console.log('File selected:', file);
          }}
          onError={(err) => {
            setError(err);
            setSelectedFile(null);
            console.error('Error:', err);
          }}
          error={error}
          maxSizeMB={10}
        />
        
        {selectedFile && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">選択されたファイル:</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li><strong>ファイル名:</strong> {selectedFile.name}</li>
              <li><strong>サイズ:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</li>
              <li><strong>タイプ:</strong> {selectedFile.type || '不明'}</li>
            </ul>
          </div>
        )}
      </div>
    );
  },
};

// 複数のバリエーションを並べて表示
export const AllVariations: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">通常</h3>
        <InputExcelFile
          id="excel-1"
          label="Excelファイルを選択"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">必須</h3>
        <InputExcelFile
          id="excel-2"
          label="Excelファイルを選択"
          required
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">エラー</h3>
        <InputExcelFile
          id="excel-3"
          label="Excelファイルを選択"
          error="ファイル形式が正しくありません"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">ローディング</h3>
        <InputExcelFile
          id="excel-4"
          label="Excelファイルを選択"
          loading
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          }
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">無効化</h3>
        <InputExcelFile
          id="excel-5"
          label="Excelファイルを選択"
          disabled
        />
      </div>
    </div>
  ),
};

// フォーム内での使用例
export const InForm: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!file) {
        setError('ファイルを選択してください');
        return;
      }

      setIsSubmitting(true);
      
      // 模擬的なアップロード処理
      setTimeout(() => {
        alert(`ファイル "${file.name}" をアップロードしました`);
        setIsSubmitting(false);
        setFile(null);
        setError('');
        // フォームをリセット
        const form = document.querySelector('form');
        if (form) form.reset();
      }, 2000);
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-4">
        <InputExcelFile
          id="excel-form"
          label="売上データ（Excel）"
          required
          onChange={(newFile) => {
            setFile(newFile);
            setError('');
          }}
          onError={setError}
          error={error}
          loading={isSubmitting}
          disabled={isSubmitting}
          maxSizeMB={10}
          icon={isSubmitting ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : undefined}
        />
        
        {file && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
            選択中: {file.name}
          </div>
        )}
        
        <button
          type="submit"
          disabled={!file || isSubmitting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'アップロード中...' : 'アップロード'}
        </button>
      </form>
    );
  },
};