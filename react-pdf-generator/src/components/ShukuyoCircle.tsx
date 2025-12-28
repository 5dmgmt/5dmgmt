/**
 * 27宿円形図 - SVGコンポーネント
 *
 * 27個の宿を円形に配置し、本命宿と各宿との相性を表示する
 */
import React from 'react';
import { Svg, Circle, G, Line, Path, Tspan } from '@react-pdf/renderer';
import { ShukuyoType, CompatibilityType, COLORS } from '../types';

// 27宿の順序（時計回り）
const SHUKUYO_ORDER: ShukuyoType[] = [
  '虚宿', '女宿', '斗宿', '箕宿', '尾宿', '心宿', '房宿', '氐宿', '亢宿',
  '角宿', '軫宿', '翼宿', '張宿', '星宿', '柳宿', '鬼宿', '井宿', '参宿',
  '觜宿', '畢宿', '昴宿', '胃宿', '婁宿', '奎宿', '壁宿', '室宿', '危宿'
];

// 宿の略称
const SHUKUYO_SHORT: Record<ShukuyoType, string> = {
  '角宿': '角', '亢宿': '亢', '氐宿': '氐', '房宿': '房', '心宿': '心', '尾宿': '尾', '箕宿': '箕',
  '斗宿': '斗', '女宿': '女', '虚宿': '虚', '危宿': '危', '室宿': '室', '壁宿': '壁',
  '奎宿': '奎', '婁宿': '婁', '胃宿': '胃', '昴宿': '昴', '畢宿': '畢', '觜宿': '觜', '参宿': '参',
  '井宿': '井', '鬼宿': '鬼', '柳宿': '柳', '星宿': '星', '張宿': '張', '翼宿': '翼', '軫宿': '軫'
};

// 相性の略称
const COMPATIBILITY_SHORT: Record<CompatibilityType, string> = {
  '命': '命', '栄': '栄', '親': '親', '友': '友',
  '衰': '衰', '安': '安', '危': '危', '成': '成', '壊': '壊'
};

interface ShukuyoCircleProps {
  honmeiShuku: ShukuyoType;
  compatibilities: Record<ShukuyoType, CompatibilityType>;
  size?: number;
  centerX?: number;
  centerY?: number;
}

export const ShukuyoCircle: React.FC<ShukuyoCircleProps> = ({
  honmeiShuku,
  compatibilities,
  size = 300,
  centerX = 150,
  centerY = 150,
}) => {
  const outerRadius = size / 2 - 20;
  const innerRadius = outerRadius - 40;

  // 角度計算（27分割、上が0度）
  const getPosition = (index: number, radius: number) => {
    const angle = (index * (360 / 27) - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 外側の円 */}
      <Circle
        cx={centerX}
        cy={centerY}
        r={outerRadius}
        stroke={COLORS.primary}
        strokeWidth={2}
        fill="none"
      />

      {/* 内側の円 */}
      <Circle
        cx={centerX}
        cy={centerY}
        r={innerRadius}
        stroke={COLORS.secondary}
        strokeWidth={1}
        fill="none"
      />

      {/* 27宿を配置 */}
      {SHUKUYO_ORDER.map((shuku, index) => {
        const outerPos = getPosition(index, outerRadius);
        const innerPos = getPosition(index, innerRadius);

        const isHonmei = shuku === honmeiShuku;
        const compatibility = compatibilities[shuku];
        const compatColor = compatibility ? COLORS.compatibility[compatibility] : COLORS.lightText;

        return (
          <G key={shuku}>
            {/* 放射線 */}
            <Line
              x1={centerX}
              y1={centerY}
              x2={outerPos.x}
              y2={outerPos.y}
              stroke={COLORS.lightText}
              strokeWidth={0.5}
              opacity={0.3}
            />

            {/* 宿の円（本命宿は大きく） */}
            <Circle
              cx={innerPos.x}
              cy={innerPos.y}
              r={isHonmei ? 18 : 12}
              fill={isHonmei ? COLORS.primary : compatColor}
              stroke={isHonmei ? COLORS.accent : 'none'}
              strokeWidth={isHonmei ? 2 : 0}
            />
          </G>
        );
      })}

      {/* 中央の円 */}
      <Circle
        cx={centerX}
        cy={centerY}
        r={35}
        fill={COLORS.white}
        stroke={COLORS.primary}
        strokeWidth={3}
      />
    </Svg>
  );
};

export default ShukuyoCircle;
