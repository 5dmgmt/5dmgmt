'use client';

/**
 * components/shukuyo/ShukuyoKankei.tsx
 *
 * 宿曜関係図コンポーネント
 * 複数人の宿曜を関係図で表示する
 */

import { useState, useCallback } from 'react';
import type { Person } from './types';
import { STORAGE_KEY } from './constants';
import { shukuyoKankeiStyles } from './styles';
import { getShortSpecialDay, getDaysInMonth, getShukuyoData, generateYearOptions } from './utils';
import {
  useSvgLoader,
  useLocalStorage,
  useLocalStorageRestore,
  useAutoSave,
  useShukuLabelUpdater,
  useSvgPlaceholderUpdater,
  useSvgUpdater,
  useShukuyoRefs,
} from './hooks';

export default function ShukuyoKankei() {
  const years = generateYearOptions();
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [basePerson, setBasePerson] = useState<Person | null>(null);

  // 初期画面用
  const [initialName, setInitialName] = useState('');
  const [initialYear, setInitialYear] = useState<number | ''>('');
  const [initialMonth, setInitialMonth] = useState<number | ''>(1);
  const [initialDay, setInitialDay] = useState<number | ''>(1);
  const [initialLoading, setInitialLoading] = useState(false);
  const [initialError, setInitialError] = useState('');

  // メイン画面用
  const [personName, setPersonName] = useState('');
  const [birthYear, setBirthYear] = useState<number | ''>('');
  const [birthMonth, setBirthMonth] = useState<number | ''>(1);
  const [birthDay, setBirthDay] = useState<number | ''>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { svgContainerRef, fileInputRef } = useShukuyoRefs();
  const svgContent = useSvgLoader();

  // ローカルストレージ関連
  const saveToLocalStorage = useLocalStorage(peopleData, basePerson, setSuccess, setError);
  useLocalStorageRestore(setPeopleData, setBasePerson);
  useAutoSave(basePerson, peopleData, saveToLocalStorage);

  // 人物削除
  const deletePerson = useCallback((id: number) => {
    if (basePerson && id === basePerson.id) {
      setError('基準となる人は削除できません');
      setTimeout(() => setError(''), 5000);
      return;
    }
    setPeopleData((prev) => prev.filter((p) => p.id !== id));
    setSuccess('削除しました');
    setTimeout(() => setSuccess(''), 3000);
  }, [basePerson]);

  // SVG更新フック
  const updateShukuLabels = useShukuLabelUpdater(svgContainerRef, basePerson);
  const updateSVGPlaceholders = useSvgPlaceholderUpdater(svgContainerRef, basePerson, peopleData, deletePerson);
  useSvgUpdater(svgContent, basePerson, peopleData, svgContainerRef, updateShukuLabels, updateSVGPlaceholders);

  // 基準となる人を設定
  const handleSetBasePerson = async () => {
    if (!initialName.trim()) {
      setInitialError('お名前を入力してください');
      setTimeout(() => setInitialError(''), 5000);
      return;
    }
    if (!initialYear || !initialMonth || !initialDay) {
      setInitialError('生年月日を正しく入力してください');
      setTimeout(() => setInitialError(''), 5000);
      return;
    }

    setInitialLoading(true);
    setInitialError('');

    try {
      const data = await getShukuyoData(initialYear, initialMonth, initialDay);
      const newPerson: Person = {
        id: Date.now(),
        name: initialName.trim(),
        year: initialYear,
        month: initialMonth,
        day: initialDay,
        shuku: data.shukuyo,
        youbi: data.weekday,
        specialDay: data.special_day,
        shichiyoRyohitsu: data.ryouhitsu
      };
      setBasePerson(newPerson);
      setPeopleData([newPerson]);
    } catch (err) {
      setInitialError(err instanceof Error ? err.message : '宿曜の取得に失敗しました');
      setTimeout(() => setInitialError(''), 5000);
    } finally {
      setInitialLoading(false);
    }
  };

  // 人物を追加
  const handleAddPerson = async () => {
    if (!personName.trim()) {
      setError('名前を入力してください');
      setTimeout(() => setError(''), 5000);
      return;
    }
    if (!birthYear || !birthMonth || !birthDay) {
      setError('生年月日を正しく入力してください');
      setTimeout(() => setError(''), 5000);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await getShukuyoData(birthYear, birthMonth, birthDay);
      const newPerson: Person = {
        id: Date.now(),
        name: personName.trim(),
        year: birthYear,
        month: birthMonth,
        day: birthDay,
        shuku: data.shukuyo,
        youbi: data.weekday,
        specialDay: data.special_day,
        shichiyoRyohitsu: data.ryouhitsu
      };
      setPeopleData(prev => [...prev, newPerson]);
      setPersonName('');
      setBirthYear('');
      setBirthMonth(1);
      setBirthDay(1);
      setSuccess(`${newPerson.name}さんを追加しました（${data.shukuyo}宿）`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '宿曜の取得に失敗しました');
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  // CSV一括登録
  const handleImportCSV = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError('CSVファイルを選択してください');
      setTimeout(() => setError(''), 5000);
      return;
    }

    setLoading(true);
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());

      let successCount = 0;
      let errorCount = 0;
      const newPeople: Person[] = [];

      for (const line of lines) {
        const parts = line.split(',').map(p => p.trim());
        if (parts.length < 2) continue;

        const name = parts[0];
        const birthDate = parts[1];
        const dateMatch = birthDate.match(/(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);

        if (!dateMatch) {
          errorCount++;
          continue;
        }

        const year = parseInt(dateMatch[1]);
        const month = parseInt(dateMatch[2]);
        const day = parseInt(dateMatch[3]);

        try {
          const data = await getShukuyoData(year, month, day);
          newPeople.push({
            id: Date.now() + Math.random(),
            name,
            year,
            month,
            day,
            shuku: data.shukuyo,
            youbi: data.weekday,
            specialDay: data.special_day,
            shichiyoRyohitsu: data.ryouhitsu
          });
          successCount++;
        } catch {
          errorCount++;
        }
      }

      setPeopleData(prev => [...prev, ...newPeople]);
      setSuccess(`${successCount}件を登録しました${errorCount > 0 ? `（${errorCount}件エラー）` : ''}`);
      setTimeout(() => setSuccess(''), 3000);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('CSV読み込みエラー: ' + (err instanceof Error ? err.message : '不明なエラー'));
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  // アプリをリセット
  const handleReset = () => {
    if (confirm('最初からやり直しますか？すべてのデータが削除されます。')) {
      localStorage.removeItem(STORAGE_KEY);
      setBasePerson(null);
      setPeopleData([]);
      setInitialName('');
      setInitialYear('');
      setInitialMonth(1);
      setInitialDay(1);
    }
  };

  // 追加した人を全消去
  const handleClearAll = () => {
    const otherPeople = peopleData.filter(p => basePerson && p.id !== basePerson.id);
    if (otherPeople.length === 0) {
      setError('削除するデータがありません');
      setTimeout(() => setError(''), 5000);
      return;
    }
    if (confirm('追加した人をすべて削除しますか？')) {
      setPeopleData(prev => prev.filter(p => basePerson && p.id === basePerson.id));
      setSuccess('すべてのデータを削除しました');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  // 初期画面
  if (!basePerson) {
    return (
      <div className="shukuyo-kankei">
        <style>{shukuyoKankeiStyles}</style>
        <div className="sk-initial-screen">
          <h2>宿曜関係図</h2>
          <p className="sk-description">まず、あなた（基準となる人）の情報を入力してください</p>

          <div className="sk-form-group">
            <label>お名前</label>
            <input
              type="text"
              value={initialName}
              onChange={(e) => setInitialName(e.target.value)}
              placeholder="お名前を入力"
              className="sk-input"
            />
          </div>

          <div className="sk-form-group">
            <label>生年月日</label>
            <div className="sk-date-inputs">
              <select
                value={initialYear}
                onChange={(e) => setInitialYear(e.target.value ? parseInt(e.target.value) : '')}
                className="sk-select"
              >
                <option value="">年</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <span className="sk-unit">年</span>

              <select
                value={initialMonth}
                onChange={(e) => setInitialMonth(parseInt(e.target.value))}
                className="sk-select"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <span className="sk-unit">月</span>

              <select
                value={initialDay}
                onChange={(e) => setInitialDay(parseInt(e.target.value))}
                className="sk-select"
              >
                {Array.from({ length: getDaysInMonth(initialYear || 2000, initialMonth || 1) }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <span className="sk-unit">日</span>
            </div>
          </div>

          {initialError && <div className="sk-error">{initialError}</div>}

          <button
            onClick={handleSetBasePerson}
            disabled={initialLoading}
            className="sk-button sk-button-primary"
          >
            {initialLoading ? '処理中...' : '開始する'}
          </button>
        </div>
      </div>
    );
  }

  // メイン画面
  const otherPeople = peopleData.filter(p => p.id !== basePerson.id);

  return (
    <div className="shukuyo-kankei">
      <style>{shukuyoKankeiStyles}</style>
      <div className="sk-main-content">
        {/* 左サイドバー */}
        <div className="sk-sidebar">
          {/* 基準となる人 */}
          <div className="sk-base-person-card">
            <div className="sk-base-person-label">基準となる人</div>
            <div className="sk-base-person-name">{basePerson.name}</div>
            <div className="sk-base-person-details">
              {basePerson.shuku}宿 / {basePerson.youbi}曜
              {basePerson.specialDay && ` / ${basePerson.specialDay}`}
              {basePerson.shichiyoRyohitsu && ` / ${basePerson.shichiyoRyohitsu}`}
            </div>
            <button onClick={handleReset} className="sk-reset-btn">
              最初からやり直す
            </button>
          </div>

          {/* 人物追加フォーム */}
          <div className="sk-add-form">
            <h3>人物を追加</h3>
            <div className="sk-form-group">
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="お名前"
                className="sk-input"
              />
            </div>
            <div className="sk-date-inputs">
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value ? parseInt(e.target.value) : '')}
                className="sk-select sk-select-sm"
              >
                <option value="">年</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(parseInt(e.target.value))}
                className="sk-select sk-select-sm"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(parseInt(e.target.value))}
                className="sk-select sk-select-sm"
              >
                {Array.from({ length: getDaysInMonth(birthYear || 2000, birthMonth || 1) }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddPerson}
              disabled={loading}
              className="sk-button sk-button-primary"
            >
              {loading ? '追加中...' : '追加'}
            </button>
          </div>

          {/* CSV一括登録 */}
          <div className="sk-csv-section">
            <h4>CSV一括登録</h4>
            <p className="sk-csv-hint">形式: 名前,YYYY/MM/DD</p>
            <a
              href="/sample-takaichi-cabinet.csv"
              download="sample-takaichi-cabinet.csv"
              className="sk-sample-download"
            >
              サンプルCSVをダウンロード（高市内閣一覧）
            </a>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              className="sk-file-input"
            />
            <button onClick={handleImportCSV} disabled={loading} className="sk-button">
              CSVを読み込む
            </button>
          </div>

          {/* 登録済み人物リスト */}
          <div className="sk-person-list">
            <div className="sk-list-header">
              <h4>登録済み（{otherPeople.length}人）</h4>
              {otherPeople.length > 0 && (
                <button onClick={handleClearAll} className="sk-clear-btn">全消去</button>
              )}
            </div>
            <div className="sk-list-items">
              {otherPeople.length === 0 ? (
                <p className="sk-empty">まだ登録されていません</p>
              ) : (
                otherPeople.map(person => (
                  <div key={person.id} className="sk-person-item">
                    <div className="sk-person-info">
                      <div className="sk-person-item-name">{person.name}</div>
                      <div className="sk-person-item-details">
                        {person.shuku}宿 / {person.youbi}曜
                        {getShortSpecialDay(person) && (
                          <span className="sk-special"> / {getShortSpecialDay(person)}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deletePerson(person.id)}
                      className="sk-delete-btn"
                    >
                      削除
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* メッセージ表示 */}
          {error && <div className="sk-error">{error}</div>}
          {success && <div className="sk-success">{success}</div>}
        </div>

        {/* 関係図表示エリア */}
        <div className="sk-chart-area">
          <div className="sk-chart-header">
            <span className="sk-chart-shuku">{basePerson.shuku}宿</span>
            <span className="sk-chart-name">{basePerson.name}さんの関係図</span>
          </div>
          <div className="sk-svg-container" ref={svgContainerRef} />
        </div>
      </div>
    </div>
  );
}
