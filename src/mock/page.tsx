// MockPage.tsx
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { InputExcelFile } from "../components/InputExcelFile";
import { Input } from '../components/Input';
import { HALF, getMonthsByHalf } from "../enums/months";
import { ExcelAnalyzer } from '../utils/excelAnalyzer';
import type { ExtractedData } from '../utils/excelAnalyzer';

export default function MockPage() {
  const [period, setPeriod] = useState('');
  const [half, setHalf] = useState('');
  const [month, setMonth] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const monthOptions = useMemo(() => {
    return getMonthsByHalf(half);
  }, [half]);

  const handleHalfChange = (value: string) => {
    setHalf(value);
    setMonth('');
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    const loadingToast = toast.loading('Excel解析中...');

    try {
      const result = await ExcelAnalyzer.analyze({
        file,
        period,
        half,
        month,
        name,
      });

      setExtractedData(result);

      // 複数名マッチの警告
      if (result.uniqueNames.length > 1) {
        toast(`⚠️ 複数の名前がマッチしました: ${result.uniqueNames.join(', ')}`, {
          id: loadingToast,
          duration: 5000,
        });
      } else {
        toast.success(
          `✅ ${result.items.length}件の案件が見つかりました（合計: ${result.totalHours}h）`,
          { id: loadingToast }
        );
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
      toast.error(errorMessage, { id: loadingToast });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">📊 原価見込みExcel読み込み</h1>
        
        <Input 
          type='number' 
          id="period" 
          label="期別" 
          value={period} 
          onChange={(e) => setPeriod(e.target.value)} 
          required 
        />
        
        <Select
          id="half-select"
          label="半期"
          value={half}
          onChange={handleHalfChange}
          options={HALF}
          placeholder="半期を選択"
          required
        />
        
        <Select
          id="month-select"
          label="月"
          value={month}
          onChange={setMonth}
          options={monthOptions}
          placeholder={half ? "月を選択" : "先に半期を選択してください"}
          disabled={!half}
          required
        />
        
        <Input 
          id="name" 
          label="名前を入力(部分一致)" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        
        <InputExcelFile
          id="file-input"
          label="Excelファイル"
          onChange={setFile}
          onError={(error) => toast.error(error)}
          required
        />
        
        <Button
          onClick={handleSubmit}
          fullWidth
          disabled={!period || !half || !month || !name || !file || loading}
        >
          {loading ? '解析中...' : 'Submit'}
        </Button>

        {/* 結果表示 */}
        {extractedData && (
          <div className="mt-6 space-y-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="text-green-800">
                ✅ {extractedData.items.length}件の案件が見つかりました（合計: {extractedData.totalHours}h）
              </p>
            </div>

            {extractedData.uniqueNames.length > 1 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-yellow-800">
                  ⚠️ 複数の名前がマッチしました: {extractedData.uniqueNames.join(', ')}
                </p>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      案件コード
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      案件名
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {extractedData.targetMonth}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {extractedData.items.map((item) => (
                    <tr key={item.rowNum}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.orderCode}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.orderName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {item.hours}h
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button onClick={() => setExtractedData(null)} fullWidth>
              戻る
            </Button>
          </div>
        )}

        {/* デバッグ表示 */}
        {import.meta.env.DEV && (period || half || month || name || file) && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
              選択内容を確認
            </summary>
            <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-700 space-y-1">
                {period && <p><strong>期別:</strong> {period}</p>}
                {half && <p><strong>半期:</strong> {HALF.find(h => h.value === half)?.label}</p>}
                {month && <p><strong>月:</strong> {monthOptions.find(m => m.value === month)?.label}</p>}
                {name && <p><strong>名前:</strong> {name}</p>}
                {file && <p><strong>ファイル:</strong> {file.name}</p>}
              </div>
            </div>
          </details>
        )}
      </div>
    </div>
  );
}