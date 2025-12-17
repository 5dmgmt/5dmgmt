'use client';

/**
 * 宿曜関係図コンポーネント
 * 複数人の宿曜を関係図で表示する
 */

import { useState, useEffect, useCallback, useRef } from 'react';

interface Person {
  id: number;
  name: string;
  year: number;
  month: number;
  day: number;
  shuku: string;
  youbi: string;
  specialDay: string | null;
  shichiyoRyohitsu: string | null;
}

interface ShukuyoApiResponse {
  success: boolean;
  data?: {
    shukuyo: string;
    weekday: string;
    special_day: string | null;
    ryouhitsu: string | null;
  };
  message?: string;
}

// 27宿の循環順序
const SHUKU_CYCLE_ORDER = ["鬼","柳","星","張","翼","軫","角","亢","氐","房","心","尾","箕","斗","女","虚","危","室","壁","奎","婁","胃","昴","畢","觜","参","井"];

// SVG内のプレースホルダと宿名の対応
const SVG_PLACEHOLDER_TO_SHUKU: Record<string, string> = {
  'a': '鬼', 'b': '柳', 'c': '星', 'd': '張', 'e': '翼', 'f': '軫',
  'g': '角', 'h': '亢', 'i': '氐', 'j': '房', 'k': '心', 'l': '尾',
  'm': '箕', 'n': '斗', 'o': '女', 'p': '虚', 'q': '危', 'r': '室',
  's': '壁', 't': '奎', 'u': '婁', 'v': '胃', 'w': '昴', 'x': '畢',
  'y': '觜', 'z': '参', 'zz': '井'
};

// SVG内の宿名ラベルの実際の順序
const SVG_SHUKU_LABEL_ORDER = [
  '鬼', '房', '壁', '危', '亢', '尾', '参', '昴', '翼', '斗',
  '角', '心', '觜', '柳', '虚', '奎', '星', '婁', '井', '室',
  '氐', '畢', '女', '軫', '胃', '張', '箕'
];

// 宿名のひらがな読み
const SHUKU_YOMI: Record<string, string> = {
  '鬼': 'きしゅく', '柳': 'りゅうしゅく', '星': 'せいしゅく', '張': 'ちょうしゅく',
  '翼': 'よくしゅく', '軫': 'しんしゅく', '角': 'かくしゅく', '亢': 'こうしゅく',
  '氐': 'ていしゅく', '房': 'ぼうしゅく', '心': 'しんしゅく', '尾': 'びしゅく',
  '箕': 'きしゅく', '斗': 'とうしゅく', '女': 'じょしゅく', '虚': 'きょしゅく',
  '危': 'きしゅく', '室': 'しつしゅく', '壁': 'へきしゅく', '奎': 'けいしゅく',
  '婁': 'ろうしゅく', '胃': 'いしゅく', '昴': 'ぼうしゅく', '畢': 'ひっしゅく',
  '觜': 'ししゅく', '参': 'さんしゅく', '井': 'せいしゅく'
};

// 各プレースホルダの最大表示人数
const PLACEHOLDER_MAX_DISPLAY: Record<string, number> = {
  'a': 7, 'b': 7, 'c': 11, 'd': 7, 'e': 11, 'f': 5, 'g': 11, 'h': 5,
  'i': 20, 'j': 7, 'k': 5, 'l': 26, 'm': 5, 'n': 26, 'o': 5, 'p': 26,
  'q': 5, 'r': 26, 's': 7, 't': 5, 'u': 22, 'v': 5, 'w': 20, 'x': 7,
  'y': 22, 'z': 7, 'zz': 11
};

// 各プレースホルダのオフセット
const PLACEHOLDER_X_OFFSET: Record<string, number> = { 'a': 42, 'zz': 14, 'c': 14 };
const PLACEHOLDER_Y_OFFSET: Record<string, number> = { 'zz': -28, 'e': -28, 'w': -28, 'i': 14, 'x': -7, 'b': -7, 'd': 2, 'z': 2, 'a': -7, 'j': -7, 's': -7 };

const STORAGE_KEY = 'shukuyo-kankei-data';

export default function ShukuyoKankei() {
  const currentYear = new Date().getFullYear();
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [basePerson, setBasePerson] = useState<Person | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');

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

  const svgContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 年の選択肢
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  // 月の日数を計算
  const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();

  // 宿曜データを取得
  const getShukuyoData = async (year: number, month: number, day: number): Promise<NonNullable<ShukuyoApiResponse['data']>> => {
    const res = await fetch(`/api/shukuyo?year=${year}&month=${month}&day=${day}`);
    const data: ShukuyoApiResponse = await res.json();

    if (!data.success || !data.data) {
      throw new Error(data.message || '宿曜データの取得に失敗しました');
    }

    return data.data;
  };

  // SVGファイルを取得
  const loadSvg = useCallback(async () => {
    try {
      const res = await fetch('/svg/kankei-06-鬼宿.svg');
      const text = await res.text();
      setSvgContent(text);
    } catch (err) {
      console.error('SVG読み込みエラー:', err);
    }
  }, []);

  // localStorageに保存
  const saveToLocalStorage = useCallback((silent = false) => {
    try {
      const saveData = {
        peopleData,
        basePerson,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
      if (!silent) {
        setSuccess('データをブラウザに保存しました');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch {
      if (!silent) {
        setError('データの保存に失敗しました');
        setTimeout(() => setError(''), 5000);
      }
    }
  }, [peopleData, basePerson]);

  // localStorageから読み込み
  useEffect(() => {
    try {
      const savedDataStr = localStorage.getItem(STORAGE_KEY);
      if (savedDataStr) {
        const savedData = JSON.parse(savedDataStr);
        if (savedData.basePerson && savedData.peopleData) {
          setPeopleData(savedData.peopleData);
          setBasePerson(savedData.basePerson);
        }
      }
    } catch (err) {
      console.error('自動復元エラー:', err);
    }
  }, []);

  // SVGを初回読み込み
  useEffect(() => {
    loadSvg();
  }, [loadSvg]);

  // データ変更時に自動保存
  useEffect(() => {
    if (basePerson) {
      saveToLocalStorage(true);
    }
  }, [peopleData, basePerson, saveToLocalStorage]);

  // SVGの宿名ラベルを更新
  const updateShukuLabels = useCallback(() => {
    if (!svgContainerRef.current || !basePerson) return;

    const svg = svgContainerRef.current.querySelector('svg');
    if (!svg) return;

    const baseShuku = basePerson.shuku;
    const baseIndex = SHUKU_CYCLE_ORDER.indexOf(baseShuku);
    if (baseIndex === -1) return;

    const allTextElements = svg.querySelectorAll('text');
    const labelElements: { element: Element; shuku: string }[] = [];

    allTextElements.forEach((textEl) => {
      const textContent = textEl.textContent?.trim() || '';
      const match = textContent.match(/^(鬼|柳|星|張|翼|軫|角|亢|氐|房|心|尾|箕|斗|女|虚|危|室|壁|奎|婁|胃|昴|畢|觜|参|井)宿[\/／]/);
      if (match) {
        labelElements.push({ element: textEl, shuku: match[1] });
      }
    });

    labelElements.forEach((labelInfo, svgLabelIndex) => {
      const svgShuku = SVG_SHUKU_LABEL_ORDER[svgLabelIndex];
      if (!svgShuku) return;

      const svgShukuIndex = SHUKU_CYCLE_ORDER.indexOf(svgShuku);
      if (svgShukuIndex !== -1) {
        const targetShuku = SHUKU_CYCLE_ORDER[(baseIndex + svgShukuIndex) % 27];
        const targetYomi = SHUKU_YOMI[targetShuku];
        if (targetYomi) {
          labelInfo.element.textContent = targetShuku + '宿/' + targetYomi;
        }
      }
    });
  }, [basePerson]);

  // SVGのプレースホルダを更新
  const updateSVGPlaceholders = useCallback(() => {
    if (!svgContainerRef.current || !basePerson) return;

    const svg = svgContainerRef.current.querySelector('svg');
    if (!svg) return;

    // 既存のforeignObjectを削除
    const existingForeignObjects = svg.querySelectorAll('foreignObject');
    existingForeignObjects.forEach(fo => fo.remove());

    // 宿ごとに人物をグループ化
    const shukuMap: Record<string, Person[]> = {};
    peopleData.forEach(person => {
      if (!shukuMap[person.shuku]) {
        shukuMap[person.shuku] = [];
      }
      shukuMap[person.shuku].push(person);
    });

    const allTextElements = svg.querySelectorAll('text');
    const baseShuku = basePerson.shuku;
    const baseIndex = SHUKU_CYCLE_ORDER.indexOf(baseShuku);
    if (baseIndex === -1) return;

    allTextElements.forEach(textEl => {
      (textEl as unknown as HTMLElement).style.display = '';

      const tspans = textEl.querySelectorAll('tspan');
      if (tspans.length === 0) return;

      const firstText = tspans[0].textContent?.trim() || '';

      if (/^[a-z]+$/.test(firstText)) {
        const svgShuku = SVG_PLACEHOLDER_TO_SHUKU[firstText];
        if (!svgShuku) return;

        const svgShukuIndex = SHUKU_CYCLE_ORDER.indexOf(svgShuku);
        if (svgShukuIndex === -1) return;

        const targetShuku = SHUKU_CYCLE_ORDER[(baseIndex + svgShukuIndex) % 27];

        if (targetShuku && shukuMap[targetShuku]) {
          const people = shukuMap[targetShuku];
          textEl.innerHTML = '';

          const maxDisplay = PLACEHOLDER_MAX_DISPLAY[firstText] || 100;
          const firstTspan = tspans[0];
          let baseX = parseFloat(firstTspan.getAttribute('x') || '0');
          let baseY = parseFloat(firstTspan.getAttribute('y') || '0');

          baseX += PLACEHOLDER_X_OFFSET[firstText] || 0;
          baseY += PLACEHOLDER_Y_OFFSET[firstText] || 0;

          const isMobile = typeof window !== 'undefined' &&
            (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768);

          if (people.length > maxDisplay && !isMobile) {
            // foreignObjectでスクロール可能にする（PC）
            const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
            foreignObject.setAttribute('x', baseX.toString());
            foreignObject.setAttribute('y', (baseY - 14).toString());
            foreignObject.setAttribute('width', '250');
            foreignObject.setAttribute('height', (maxDisplay * 17.5).toString());

            const div = document.createElement('div');
            div.style.cssText = 'width:100%;height:100%;overflow-y:scroll;overflow-x:hidden;font-size:14px;font-family:Arial,sans-serif;color:#002060;line-height:17.5px;scrollbar-width:none;';

            people.forEach((person) => {
              const shortSpecialDay = getShortSpecialDay(person);
              const displayText = `${person.name}/${person.youbi}${shortSpecialDay ? '/' + shortSpecialDay : ''}`;

              const personDiv = document.createElement('div');
              personDiv.textContent = displayText;
              personDiv.style.cssText = 'line-height:17.5px;white-space:nowrap;';

              if (person.id !== basePerson.id) {
                personDiv.style.cursor = 'pointer';
                personDiv.onmouseenter = () => { personDiv.style.color = '#ff0000'; };
                personDiv.onmouseleave = () => { personDiv.style.color = '#002060'; };
                personDiv.onclick = (e) => {
                  e.stopPropagation();
                  if (confirm(`${person.name}さんを削除しますか?`)) {
                    deletePerson(person.id);
                  }
                };
              }
              div.appendChild(personDiv);
            });

            foreignObject.appendChild(div);
            textEl.parentNode?.appendChild(foreignObject);
            (textEl as unknown as HTMLElement).style.display = 'none';
          } else {
            // tspanで表示
            textEl.setAttribute('fill', '#002060');
            textEl.setAttribute('font-weight', 'normal');

            const displayPeople = people.slice(0, maxDisplay);
            displayPeople.forEach((person, index) => {
              const shortSpecialDay = getShortSpecialDay(person);
              const displayText = `${person.name}/${person.youbi}${shortSpecialDay ? '/' + shortSpecialDay : ''}`;

              const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
              tspan.setAttribute('x', baseX.toString());
              tspan.setAttribute('y', (baseY + (index * 17.5)).toString());
              tspan.setAttribute('font-size', isMobile ? '12' : '14');
              tspan.textContent = displayText;

              if (person.id !== basePerson.id) {
                (tspan as SVGTSpanElement).style.cursor = 'pointer';
                tspan.addEventListener('click', (e) => {
                  e.stopPropagation();
                  if (confirm(`${person.name}さんを削除しますか?`)) {
                    deletePerson(person.id);
                  }
                });
                tspan.addEventListener('mouseenter', function(this: SVGTSpanElement) {
                  this.setAttribute('fill', '#ff0000');
                });
                tspan.addEventListener('mouseleave', function(this: SVGTSpanElement) {
                  this.setAttribute('fill', '#002060');
                });
              }
              textEl.appendChild(tspan);
            });
          }
        } else {
          (textEl as unknown as HTMLElement).style.display = 'none';
        }
      }
    });
  }, [basePerson, peopleData]);

  // 省略形特殊日
  const getShortSpecialDay = (person: Person): string => {
    let result = '';
    if (person.specialDay) {
      if (person.specialDay.includes('甘露')) result = '甘';
      else if (person.specialDay.includes('金剛')) result = '剛';
      else if (person.specialDay.includes('羅刹')) result = '羅';
    }
    if (person.shichiyoRyohitsu) {
      result += '七';
    }
    return result;
  };

  // 人物を削除
  const deletePerson = (id: number) => {
    if (basePerson && id === basePerson.id) {
      setError('基準となる人は削除できません');
      setTimeout(() => setError(''), 5000);
      return;
    }
    setPeopleData(prev => prev.filter(p => p.id !== id));
    setSuccess('削除しました');
    setTimeout(() => setSuccess(''), 3000);
  };

  // SVG更新
  useEffect(() => {
    if (svgContent && basePerson && svgContainerRef.current) {
      svgContainerRef.current.innerHTML = svgContent;
      updateShukuLabels();
      updateSVGPlaceholders();
    }
  }, [svgContent, basePerson, peopleData, updateShukuLabels, updateSVGPlaceholders]);

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
        <style>{styles}</style>
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
      <style>{styles}</style>
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

const styles = `
.shukuyo-kankei {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.sk-initial-screen {
  max-width: 500px;
  margin: 60px auto;
  padding: 40px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.sk-initial-screen h2 {
  color: var(--5d-text, #1a2a3a);
  margin-bottom: 12px;
}

.sk-description {
  color: var(--5d-text-secondary, #666);
  margin-bottom: 24px;
}

.sk-form-group {
  margin-bottom: 16px;
  text-align: left;
}

.sk-form-group label {
  display: block;
  font-weight: 600;
  color: var(--5d-text, #1a2a3a);
  margin-bottom: 8px;
}

.sk-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--5d-border, #e0e0e0);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.sk-input:focus {
  outline: none;
  border-color: var(--5d-teal, #00897b);
}

.sk-date-inputs {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.sk-select {
  padding: 12px 16px;
  border: 2px solid var(--5d-border, #e0e0e0);
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  min-width: 80px;
}

.sk-select-sm {
  padding: 8px 12px;
  min-width: 70px;
}

.sk-unit {
  font-weight: 600;
  color: var(--5d-text, #1a2a3a);
}

.sk-button {
  padding: 12px 24px;
  border: none;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--5d-border, #e0e0e0);
  color: var(--5d-text, #1a2a3a);
}

.sk-button:hover:not(:disabled) {
  opacity: 0.9;
}

.sk-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.sk-button-primary {
  background: var(--5d-teal, #00897b);
  color: #fff;
  width: 100%;
  margin-top: 16px;
}

.sk-button-primary:hover:not(:disabled) {
  background: var(--5d-teal-dark, #00695c);
}

.sk-error {
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  margin-top: 12px;
  text-align: center;
}

.sk-success {
  background: #e6f7f5;
  color: #00695c;
  padding: 12px;
  border-radius: 8px;
  margin-top: 12px;
  text-align: center;
}

/* メイン画面 */
.sk-main-content {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
}

@media (max-width: 900px) {
  .sk-main-content {
    grid-template-columns: 1fr;
  }
}

.sk-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sk-base-person-card {
  background: linear-gradient(135deg, var(--5d-teal, #00897b) 0%, var(--5d-teal-dark, #00695c) 100%);
  color: #fff;
  padding: 20px;
  border-radius: 12px;
}

.sk-base-person-label {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-bottom: 4px;
}

.sk-base-person-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.sk-base-person-details {
  font-size: 0.9rem;
  opacity: 0.95;
}

.sk-reset-btn {
  margin-top: 12px;
  padding: 8px 16px;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.sk-reset-btn:hover {
  background: rgba(255,255,255,0.3);
}

.sk-add-form {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.sk-add-form h3 {
  margin: 0 0 16px 0;
  font-size: 1rem;
  color: var(--5d-text, #1a2a3a);
}

.sk-csv-section {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.sk-csv-section h4 {
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  color: var(--5d-text, #1a2a3a);
}

.sk-csv-hint {
  font-size: 0.8rem;
  color: var(--5d-text-secondary, #666);
  margin-bottom: 8px;
}

.sk-sample-download {
  display: block;
  font-size: 0.85rem;
  color: var(--5d-teal, #00897b);
  text-decoration: underline;
  margin-bottom: 12px;
  cursor: pointer;
}

.sk-sample-download:hover {
  color: var(--5d-teal-dark, #00695c);
}

.sk-file-input {
  width: 100%;
  margin-bottom: 8px;
  font-size: 0.85rem;
}

.sk-person-list {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  flex: 1;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.sk-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.sk-list-header h4 {
  margin: 0;
  font-size: 0.9rem;
  color: var(--5d-text, #1a2a3a);
}

.sk-clear-btn {
  padding: 4px 12px;
  background: #fee;
  border: none;
  border-radius: 4px;
  color: #c33;
  font-size: 0.8rem;
  cursor: pointer;
}

.sk-list-items {
  flex: 1;
  overflow-y: auto;
  max-height: 300px;
}

.sk-empty {
  color: #999;
  text-align: center;
  padding: 20px;
  font-size: 0.9rem;
}

.sk-person-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid var(--5d-border, #e0e0e0);
}

.sk-person-item:last-child {
  border-bottom: none;
}

.sk-person-item-name {
  font-weight: 600;
  color: var(--5d-text, #1a2a3a);
}

.sk-person-item-details {
  font-size: 0.8rem;
  color: var(--5d-text-secondary, #666);
}

.sk-special {
  color: #d32f2f;
}

.sk-delete-btn {
  padding: 4px 8px;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #666;
  font-size: 0.75rem;
  cursor: pointer;
}

.sk-delete-btn:hover {
  background: #fee;
  border-color: #c33;
  color: #c33;
}

/* 関係図エリア */
.sk-chart-area {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  overflow: hidden;
}

.sk-chart-header {
  background: var(--5d-navy, #1a2a3a);
  color: #fff;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.sk-chart-shuku {
  background: var(--5d-teal, #00897b);
  padding: 4px 12px;
  border-radius: 9999px;
  font-weight: 600;
}

.sk-chart-name {
  font-size: 1.1rem;
}

.sk-svg-container {
  padding: 20px;
  overflow: auto;
  max-height: calc(100vh - 200px);
}

.sk-svg-container svg {
  width: 100%;
  height: auto;
  max-width: 100%;
}
`;
