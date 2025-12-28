/**
 * 五次元経営ロゴ - SVGコンポーネント
 *
 * 星型のロゴ
 */
import React from 'react';
import { Svg, Circle, Path, G } from '@react-pdf/renderer';
import { COLORS } from '../types';

interface LogoProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 80 }) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 5;

  // 5角形の星のパスを生成
  const createStarPath = (cx: number, cy: number, outerR: number, innerR: number, points: number = 5) => {
    let path = '';
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerR : innerR;
      const angle = (i * Math.PI / points) - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      path += (i === 0 ? 'M' : 'L') + x + ',' + y;
    }
    return path + 'Z';
  };

  const starPath = createStarPath(cx, cy, r * 0.6, r * 0.25, 5);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 外側の円 */}
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        fill={COLORS.primary}
        stroke={COLORS.secondary}
        strokeWidth={2}
      />

      {/* 星 */}
      <Path
        d={starPath}
        fill={COLORS.accent}
        stroke={COLORS.white}
        strokeWidth={1}
      />

      {/* 中央の円 */}
      <Circle
        cx={cx}
        cy={cy}
        r={r * 0.15}
        fill={COLORS.white}
      />
    </Svg>
  );
};

// テキスト付きロゴ（View + Text を使用）
export const LogoWithText: React.FC<{ size?: number }> = ({ size = 80 }) => {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* ロゴ本体 */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 5}
        fill={COLORS.primary}
        stroke={COLORS.secondary}
        strokeWidth={2}
      />

      {/* 星 */}
      <Path
        d={`M${size/2},${size*0.15} L${size*0.58},${size*0.38} L${size*0.82},${size*0.38} L${size*0.64},${size*0.55} L${size*0.72},${size*0.8} L${size/2},${size*0.65} L${size*0.28},${size*0.8} L${size*0.36},${size*0.55} L${size*0.18},${size*0.38} L${size*0.42},${size*0.38} Z`}
        fill={COLORS.accent}
      />
    </Svg>
  );
};

export default Logo;
