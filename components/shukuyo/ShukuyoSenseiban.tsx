'use client';

/**
 * 宿曜占星盤コンポーネント
 * Canvas APIを使用して二重円を描画し、ドラッグ/タッチで回転させる
 * レスポンシブ対応：正方形を維持しながら画面幅に応じてサイズ調整
 */

import { useEffect, useRef, useCallback, useState, useLayoutEffect } from 'react';

// 27宿データ（昴を12時の位置に配置・反時計回り）
const STARS = [
  { id: 1, name: '昴', yomi: 'ぼう' },
  { id: 2, name: '胃', yomi: 'い' },
  { id: 3, name: '婁', yomi: 'ろう' },
  { id: 4, name: '奎', yomi: 'けい' },
  { id: 5, name: '壁', yomi: 'へき' },
  { id: 6, name: '室', yomi: 'しつ' },
  { id: 7, name: '危', yomi: 'き' },
  { id: 8, name: '虚', yomi: 'きょ' },
  { id: 9, name: '女', yomi: 'じょ' },
  { id: 10, name: '斗', yomi: 'と' },
  { id: 11, name: '箕', yomi: 'き' },
  { id: 12, name: '尾', yomi: 'び' },
  { id: 13, name: '心', yomi: 'しん' },
  { id: 14, name: '房', yomi: 'ぼう' },
  { id: 15, name: '氐', yomi: 'てい' },
  { id: 16, name: '亢', yomi: 'こう' },
  { id: 17, name: '角', yomi: 'かく' },
  { id: 18, name: '軫', yomi: 'しん' },
  { id: 19, name: '翼', yomi: 'よく' },
  { id: 20, name: '張', yomi: 'ちょう' },
  { id: 21, name: '星', yomi: 'せい' },
  { id: 22, name: '柳', yomi: 'りゅう' },
  { id: 23, name: '鬼', yomi: 'き' },
  { id: 24, name: '井', yomi: 'せい' },
  { id: 25, name: '参', yomi: 'しん' },
  { id: 26, name: '觜', yomi: 'し' },
  { id: 27, name: '畢', yomi: 'ひつ' },
];

// 関係性データ（27種類・逆順）
const RELATIONS = [
  '命', '親', '友', '壊', '成', '危', '安',
  '衰', '栄', '胎', '親', '友', '壊', '成',
  '危', '安', '衰', '栄', '業', '親', '友',
  '壊', '成', '危', '安', '衰', '栄'
];

// 関係性による色の取得
const getRelationColor = (relation: string): string => {
  const colorMap: Record<string, string> = {
    '命': '#FFD699',
    '業': '#FFC166',
    '胎': '#FFEBCC',
    '栄': '#FF9999',
    '親': '#FFCCCC',
    '友': '#84FF84',
    '衰': '#C1FFC1',
    '安': '#9999FF',
    '壊': '#CCCCFF',
    '成': '#FFFF99',
    '危': '#FFFFCC',
  };
  return colorMap[relation] || '#ffffff';
};

interface ShukuyoSenseibanProps {
  /** 固定サイズを指定する場合に使用（指定しない場合は親要素に合わせてレスポンシブ） */
  size?: number;
  /** @deprecated width は size に置き換えられました */
  width?: number;
  /** @deprecated height は size に置き換えられました */
  height?: number;
  /** ユーザーの宿（例: '虚' または '虚宿'）。指定すると、この宿が12時の位置に来るように初期表示 */
  userShukuyo?: string;
  /** 最大サイズの制限（デフォルト: 500px） */
  maxSize?: number;
}

/**
 * 宿名から初期回転角度を計算
 * @param shukuyoName 宿名（例: '虚' または '虚宿'）
 * @returns 回転角度（ラジアン）
 */
function calculateInitialRotation(shukuyoName?: string): number {
  if (!shukuyoName) return 0;

  // '虚宿' -> '虚' に正規化
  const normalizedName = shukuyoName.replace('宿', '');

  // STARSリストから該当する宿のインデックスを探す
  const starIndex = STARS.findIndex(s => s.name === normalizedName);
  if (starIndex === -1) return 0;

  // 27宿の角度ステップ
  const angleStep = (Math.PI * 2) / 27;

  // その宿が12時の位置（上）に来るように回転角度を計算
  // STARSリストは昴(0)が12時から始まるので、その宿を上に持ってくるには逆回転が必要
  return -starIndex * angleStep;
}

export default function ShukuyoSenseiban({
  size,
  width,
  height,
  userShukuyo,
  maxSize = 500
}: ShukuyoSenseibanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(() => calculateInitialRotation(userShukuyo));
  const [isDragging, setIsDragging] = useState(false);
  const [canvasSize, setCanvasSize] = useState(size || width || 300);
  const lastAngleRef = useRef(0);
  const dimensionsRef = useRef({
    centerX: 0,
    centerY: 0,
    outerRadius: 0,
    middleRadius: 0,
    innerRadius: 0,
    innerMostRadius: 0,
    centerRadius: 0,
  });

  // コンテナサイズに基づいてCanvasサイズを計算（正方形を維持）
  useEffect(() => {
    const updateSize = () => {
      if (size) {
        // 固定サイズが指定されている場合
        setCanvasSize(Math.min(size, maxSize));
        return;
      }

      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // 正方形を維持しつつ、最大サイズを制限
        const newSize = Math.min(containerWidth, maxSize);
        setCanvasSize(newSize);
      }
    };

    updateSize();

    // リサイズ時に再計算
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [size, maxSize]);

  // userShukuyoが変更されたら回転をリセット
  useEffect(() => {
    const newRotation = calculateInitialRotation(userShukuyo);
    setRotation(newRotation);
  }, [userShukuyo]);

  // 12時の位置にある宿名を取得
  const getTopStarName = useCallback((rot: number) => {
    const angleStep = (Math.PI * 2) / 27;
    let normalizedRotation = rot % (Math.PI * 2);
    if (normalizedRotation < 0) {
      normalizedRotation += Math.PI * 2;
    }

    let closestIndex = 0;
    let minDiff = Infinity;

    for (let i = 0; i < STARS.length; i++) {
      const starCenterAngle = (angleStep * i + normalizedRotation + angleStep / 2) % (Math.PI * 2);
      let diff = Math.abs(starCenterAngle);
      diff = Math.min(diff, Math.abs(starCenterAngle - Math.PI * 2));

      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }

    return STARS[closestIndex].name;
  }, []);

  // 外側の円の色を取得
  const getOuterCircleColor = useCallback((starIndex: number, rot: number) => {
    const angleStep = (Math.PI * 2) / 27;
    let normalizedRotation = rot % (Math.PI * 2);
    if (normalizedRotation < 0) {
      normalizedRotation += Math.PI * 2;
    }

    const rotationSteps = Math.round(normalizedRotation / angleStep);
    const topStarIndex = (27 - rotationSteps) % 27;

    const meiIndex = topStarIndex;
    const taiIndex = (topStarIndex + 9) % 27;
    const gouIndex = (topStarIndex + 18) % 27;

    if (starIndex === meiIndex) return getRelationColor('命');
    if (starIndex === gouIndex) return getRelationColor('業');
    if (starIndex === taiIndex) return getRelationColor('胎');

    return '#ffffff';
  }, []);

  // 描画処理
  const draw = useCallback((ctx: CanvasRenderingContext2D, rot: number, currentSize: number) => {
    const { centerX, centerY, outerRadius, middleRadius, innerRadius, innerMostRadius, centerRadius } = dimensionsRef.current;
    const angleStep = (Math.PI * 2) / 27;
    const offsetAngle = (-6.8 * Math.PI) / 180;

    // キャンバスをクリア
    ctx.clearRect(0, 0, currentSize, currentSize);

    // 背景
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, currentSize, currentSize);

    // 外側の円（27宿）- 回転する
    STARS.forEach((star, i) => {
      const angle = angleStep * i + rot - Math.PI / 2 + offsetAngle;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.arc(0, 0, outerRadius, 0, angleStep);
      ctx.arc(0, 0, middleRadius, angleStep, 0, true);
      ctx.closePath();

      ctx.fillStyle = getOuterCircleColor(i, rot);
      ctx.fill();

      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // テキストの描画
      const textRadius = (outerRadius + middleRadius) / 2;
      const textAngle = angle + angleStep / 2;
      const textX = centerX + Math.cos(textAngle) * textRadius;
      const textY = centerY + Math.sin(textAngle) * textRadius;

      // フォントサイズをサイズに応じて調整
      const outerFontSize = Math.max(10, Math.round(currentSize / 30));

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `bold ${outerFontSize}px sans-serif`;
      ctx.fillStyle = '#333';
      ctx.fillText(star.name, 0, 0);
      ctx.restore();
    });

    // 内側の円（関係性）- 固定
    RELATIONS.forEach((relation, i) => {
      const angle = angleStep * i - Math.PI / 2 + offsetAngle;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.arc(0, 0, innerRadius, 0, angleStep);
      ctx.arc(0, 0, innerMostRadius, angleStep, 0, true);
      ctx.closePath();

      ctx.fillStyle = getRelationColor(relation);
      ctx.fill();

      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // テキストの描画
      const textRadius = (innerRadius + innerMostRadius) / 2;
      const textAngle = angle + angleStep / 2;
      const textX = centerX + Math.cos(textAngle) * textRadius;
      const textY = centerY + Math.sin(textAngle) * textRadius;

      // フォントサイズをサイズに応じて調整
      const innerFontSize = Math.max(8, Math.round(currentSize / 35));

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `bold ${innerFontSize}px sans-serif`;
      ctx.fillStyle = '#333';
      ctx.fillText(relation, 0, 0);
      ctx.restore();
    });

    // もう一つ内側の円描画
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerMostRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 中心の円
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // 中心のテキスト
    const topStarName = getTopStarName(rot);
    // 中心フォントサイズをサイズに応じて調整
    const centerFontSize = Math.max(18, Math.round(currentSize / 14));
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${centerFontSize}px sans-serif`;
    ctx.fillStyle = '#333';
    ctx.fillText(topStarName + '宿', centerX, centerY);
  }, [getOuterCircleColor, getTopStarName]);

  // Canvas初期化
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvasSize <= 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 高解像度ディスプレイ対応
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    ctx.scale(dpr, dpr);

    // 描画サイズ（正方形なのでcanvasSizeを使用）
    const padding = Math.max(10, canvasSize * 0.04); // パディングもサイズに応じて調整
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const maxRadius = canvasSize / 2 - padding;
    const outerRadius = maxRadius;
    const middleRadius = maxRadius * 0.75;
    const innerRadius = middleRadius;
    const innerMostRadius = middleRadius - (maxRadius * 0.2);
    const centerRadius = innerMostRadius * 0.5;

    dimensionsRef.current = {
      centerX,
      centerY,
      outerRadius,
      middleRadius,
      innerRadius,
      innerMostRadius,
      centerRadius,
    };

    draw(ctx, rotation, canvasSize);
  }, [canvasSize, rotation, draw]);

  // イベントハンドラ
  const getAngle = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const { centerX, centerY } = dimensionsRef.current;

    return Math.atan2(y - centerY, x - centerX);
  };

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    lastAngleRef.current = getAngle(clientX, clientY);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const currentAngle = getAngle(clientX, clientY);
    const delta = currentAngle - lastAngleRef.current;
    lastAngleRef.current = currentAngle;

    setRotation(prev => prev + delta);
  };

  const handleEnd = () => {
    setIsDragging(false);
    // スナップ処理
    const angleStep = (Math.PI * 2) / 27;
    setRotation(prev => Math.round(prev / angleStep) * angleStep);
  };

  // マウスイベント
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => handleEnd();
  const handleMouseLeave = () => handleEnd();

  // タッチイベント
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => handleEnd();

  return (
    <div
      ref={containerRef}
      className="shukuyo-senseiban-container"
      style={{
        width: '100%',
        maxWidth: maxSize,
        margin: '0 auto',
        aspectRatio: '1 / 1',
      }}
    >
      <canvas
        ref={canvasRef}
        className="shukuyo-canvas"
        style={{
          width: canvasSize,
          height: canvasSize,
          maxWidth: '100%',
          display: 'block',
          margin: '0 auto',
          touchAction: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          border: '2px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fafafa',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="img"
        aria-label="宿曜占星盤 - ドラッグまたはタッチで回転できます"
      />
    </div>
  );
}
