/**
 * components/shukuyo/hooks.ts
 *
 * 宿曜関係図のカスタムフック
 */

import { useState, useEffect, useCallback, useRef, type RefObject } from 'react';
import type { Person } from './types';
import {
  SHUKU_CYCLE_ORDER,
  SVG_PLACEHOLDER_TO_SHUKU,
  SVG_SHUKU_LABEL_ORDER,
  SHUKU_YOMI,
  PLACEHOLDER_MAX_DISPLAY,
  PLACEHOLDER_X_OFFSET,
  PLACEHOLDER_Y_OFFSET,
  STORAGE_KEY,
} from './constants';
import { getShortSpecialDay, isMobileDevice } from './utils';

/**
 * SVG読み込みフック
 */
export function useSvgLoader() {
  const [svgContent, setSvgContent] = useState<string>('');

  const loadSvg = useCallback(async () => {
    try {
      const res = await fetch('/svg/kankei-06-鬼宿.svg');
      const text = await res.text();
      setSvgContent(text);
    } catch (err) {
      console.error('SVG読み込みエラー:', err);
    }
  }, []);

  useEffect(() => {
    loadSvg();
  }, [loadSvg]);

  return svgContent;
}

/**
 * ローカルストレージ保存フック
 */
export function useLocalStorage(
  peopleData: Person[],
  basePerson: Person | null,
  setSuccess: (msg: string) => void,
  setError: (msg: string) => void
) {
  const saveToLocalStorage = useCallback((silent = false) => {
    try {
      const saveData = {
        peopleData,
        basePerson,
        savedAt: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
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
  }, [peopleData, basePerson, setSuccess, setError]);

  return saveToLocalStorage;
}

/**
 * ローカルストレージ復元フック
 */
export function useLocalStorageRestore(
  setPeopleData: (data: Person[]) => void,
  setBasePerson: (person: Person | null) => void
) {
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
  }, [setPeopleData, setBasePerson]);
}

/**
 * 自動保存フック
 */
export function useAutoSave(
  basePerson: Person | null,
  peopleData: Person[],
  saveToLocalStorage: (silent?: boolean) => void
) {
  useEffect(() => {
    if (basePerson) {
      saveToLocalStorage(true);
    }
  }, [peopleData, basePerson, saveToLocalStorage]);
}

/**
 * SVG宿名ラベル更新フック
 */
export function useShukuLabelUpdater(
  svgContainerRef: RefObject<HTMLDivElement | null>,
  basePerson: Person | null
) {
  return useCallback(() => {
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
  }, [basePerson, svgContainerRef]);
}

/**
 * SVGプレースホルダー更新フック
 */
export function useSvgPlaceholderUpdater(
  svgContainerRef: RefObject<HTMLDivElement | null>,
  basePerson: Person | null,
  peopleData: Person[],
  deletePerson: (id: number) => void
) {
  return useCallback(() => {
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

          const isMobile = isMobileDevice();

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
                tspan.addEventListener('mouseenter', () => {
                  tspan.setAttribute('fill', '#ff0000');
                });
                tspan.addEventListener('mouseleave', () => {
                  tspan.setAttribute('fill', '#002060');
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
  }, [basePerson, deletePerson, peopleData, svgContainerRef]);
}

/**
 * SVG更新統合フック
 */
export function useSvgUpdater(
  svgContent: string,
  basePerson: Person | null,
  peopleData: Person[],
  svgContainerRef: RefObject<HTMLDivElement | null>,
  updateShukuLabels: () => void,
  updateSVGPlaceholders: () => void
) {
  useEffect(() => {
    if (svgContent && basePerson && svgContainerRef.current) {
      svgContainerRef.current.innerHTML = svgContent;
      updateShukuLabels();
      updateSVGPlaceholders();
    }
  }, [svgContent, basePerson, peopleData, updateShukuLabels, updateSVGPlaceholders, svgContainerRef]);
}

/**
 * refを返すフック
 */
export function useShukuyoRefs() {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  return { svgContainerRef, fileInputRef };
}
