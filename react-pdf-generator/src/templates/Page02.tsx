/**
 * シート02 - ゆるゆるマンダラ命式
 *
 * 27宿円形図、九星情報、年運推移を含むページ
 */
import React from 'react';
import { View, Text, StyleSheet, Svg, Circle, Line, G } from '@react-pdf/renderer';
import { A3Template } from './A3Template';
import { LogoWithText } from '../components/Logo';
import { UserData, ShukuyoType, CompatibilityType, COLORS } from '../types';
import { defaultFontFamily } from '../fonts';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  headerLeft: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    width: '45%',
    paddingRight: 15,
  },
  rightColumn: {
    width: '55%',
    paddingLeft: 15,
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  circleLabel: {
    fontSize: 10,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 5,
  },
  infoSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  infoLabel: {
    width: '40%',
    fontSize: 9,
    color: COLORS.lightText,
  },
  infoValue: {
    flex: 1,
    fontSize: 10,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  kyuseiBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 10,
  },
  kyuseiItem: {
    width: '48%',
    padding: 8,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.lightText,
    marginBottom: 5,
  },
  kyuseiLabel: {
    fontSize: 8,
    color: COLORS.lightText,
    marginBottom: 3,
  },
  kyuseiValue: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  forecastSection: {
    marginBottom: 10,
  },
  forecastTitle: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
  forecastItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  forecastYear: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  forecastText: {
    fontSize: 8,
    color: COLORS.text,
    lineHeight: 1.5,
  },
  themeSection: {
    marginTop: 10,
  },
  themeBox: {
    flexDirection: 'row',
    gap: 5,
  },
  themeItem: {
    flex: 1,
    padding: 8,
    backgroundColor: COLORS.accent,
    borderRadius: 5,
    alignItems: 'center',
  },
  themeLabel: {
    fontSize: 8,
    color: COLORS.lightText,
    marginBottom: 3,
  },
  themeValue: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  themeHint: {
    fontSize: 7,
    color: COLORS.text,
    marginTop: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 30,
    right: 30,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 8,
    color: COLORS.lightText,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 15,
    right: 30,
    fontSize: 10,
    color: COLORS.primary,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 7,
    color: COLORS.text,
  },
});

// 27宿の順序（時計回り）
const SHUKUYO_ORDER: ShukuyoType[] = [
  '虚宿', '女宿', '斗宿', '箕宿', '尾宿', '心宿', '房宿', '氐宿', '亢宿',
  '角宿', '軫宿', '翼宿', '張宿', '星宿', '柳宿', '鬼宿', '井宿', '参宿',
  '觜宿', '畢宿', '昴宿', '胃宿', '婁宿', '奎宿', '壁宿', '室宿', '危宿'
];

// 相性タイプごとの色マップ
const COMPATIBILITY_COLORS: Record<CompatibilityType, string> = {
  '命': '#FF6B6B',
  '栄': '#4ECDC4',
  '親': '#45B7D1',
  '友': '#96CEB4',
  '衰': '#C9C9C9',
  '安': '#FFEAA7',
  '危': '#DDA0DD',
  '成': '#98D8C8',
  '壊': '#F5A623',
};

// 相性計算（本命宿からの距離で決定）
function calculateCompatibility(honmei: ShukuyoType, target: ShukuyoType): CompatibilityType {
  const honmeiIndex = SHUKUYO_ORDER.indexOf(honmei);
  const targetIndex = SHUKUYO_ORDER.indexOf(target);
  const distance = (targetIndex - honmeiIndex + 27) % 27;

  // 簡易的な相性計算（実際はもっと複雑）
  if (distance === 0) return '命';
  if (distance === 1 || distance === 26) return '栄';
  if (distance === 2 || distance === 25) return '親';
  if (distance === 3 || distance === 24) return '友';
  if (distance === 4 || distance === 23) return '衰';
  if (distance === 5 || distance === 22) return '安';
  if (distance === 6 || distance === 21) return '危';
  if (distance === 7 || distance === 20) return '成';
  if (distance === 8 || distance === 19) return '壊';
  return '安'; // デフォルト
}

// 27宿円形図コンポーネント（テキストなしSVG版）
const ShukuyoCircleSVG: React.FC<{ honmei: ShukuyoType; size?: number }> = ({ honmei, size = 280 }) => {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 15;
  const innerR = outerR - 35;

  const getPosition = (index: number, radius: number) => {
    const angle = (index * (360 / 27) - 90) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 外側の円 */}
      <Circle
        cx={cx}
        cy={cy}
        r={outerR}
        stroke={COLORS.primary}
        strokeWidth={2}
        fill="none"
      />

      {/* 内側の円 */}
      <Circle
        cx={cx}
        cy={cy}
        r={innerR}
        stroke={COLORS.secondary}
        strokeWidth={1}
        fill="none"
      />

      {/* 27宿を配置 */}
      {SHUKUYO_ORDER.map((shuku, index) => {
        const pos = getPosition(index, innerR);
        const isHonmei = shuku === honmei;
        const compatibility = calculateCompatibility(honmei, shuku);
        const color = isHonmei ? COLORS.primary : COMPATIBILITY_COLORS[compatibility];

        return (
          <G key={shuku}>
            {/* 放射線 */}
            <Line
              x1={cx}
              y1={cy}
              x2={getPosition(index, outerR).x}
              y2={getPosition(index, outerR).y}
              stroke={COLORS.lightText}
              strokeWidth={0.5}
              opacity={0.3}
            />

            {/* 宿の円 */}
            <Circle
              cx={pos.x}
              cy={pos.y}
              r={isHonmei ? 16 : 11}
              fill={color}
              stroke={isHonmei ? COLORS.accent : 'none'}
              strokeWidth={isHonmei ? 2 : 0}
            />
          </G>
        );
      })}

      {/* 中央の円 */}
      <Circle
        cx={cx}
        cy={cy}
        r={30}
        fill={COLORS.white}
        stroke={COLORS.primary}
        strokeWidth={2}
      />
    </Svg>
  );
};

// 年運データ型
interface YearForecast {
  year: string;
  title: string;
  description: string;
}

// デフォルト年運データ
const defaultForecasts: YearForecast[] = [
  {
    year: '2025年',
    title: '兌-藍の年',
    description: '交流が活発で楽しみの多い時期。後半の運気下降に合わせて、波動が合う人との繋がりを大切に。新しい出会いがビジネスチャンスに。',
  },
  {
    year: '2026年',
    title: '冬1-意図を溶かす年',
    description: '冬の時期到来。自分のエゴに従って行動すると全てが裏目に。この時期は内省し、次のサイクルへの準備期間として活用。',
  },
];

interface Page02Props {
  user: UserData;
  forecasts?: YearForecast[];
  soulThemes?: {
    intention: number;
    essence: number;
    action: number;
  };
}

export const Page02: React.FC<Page02Props> = ({
  user,
  forecasts = defaultForecasts,
  soulThemes = { intention: 32, essence: 76, action: 81 },
}) => {
  // 相性の凡例
  const compatibilityLegend: { type: CompatibilityType; label: string }[] = [
    { type: '命', label: '命（本命宿）' },
    { type: '栄', label: '栄（繁栄）' },
    { type: '親', label: '親（親密）' },
    { type: '友', label: '友（友好）' },
    { type: '安', label: '安（安定）' },
    { type: '危', label: '危（注意）' },
    { type: '成', label: '成（成功）' },
    { type: '壊', label: '壊（破壊）' },
    { type: '衰', label: '衰（衰退）' },
  ];

  return (
    <A3Template showFooter={false}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.mainTitle}>ゆるゆるマンダラ 暦術 命式</Text>
          <Text style={styles.subTitle}>
            {user.name} 様 | {user.shukuyo} | {user.shichiyoRyohi}
          </Text>
        </View>
        <LogoWithText size={50} />
      </View>

      {/* メインコンテンツ */}
      <View style={styles.container}>
        {/* 左カラム：27宿円形図と基本情報 */}
        <View style={styles.leftColumn}>
          {/* 27宿円形図 */}
          <View style={styles.circleContainer}>
            <ShukuyoCircleSVG honmei={user.shukuyo} size={260} />
            <Text style={styles.circleLabel}>
              あなたの宿曜27宿：{user.shukuyo}
            </Text>
          </View>

          {/* 相性凡例 */}
          <View style={styles.legendContainer}>
            {compatibilityLegend.map((item) => (
              <View key={item.type} style={styles.legendItem}>
                <View
                  style={[
                    styles.legendColor,
                    { backgroundColor: COMPATIBILITY_COLORS[item.type] },
                  ]}
                />
                <Text style={styles.legendText}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* 九星情報 */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>九星情報</Text>
            <View style={styles.kyuseiBox}>
              <View style={styles.kyuseiItem}>
                <Text style={styles.kyuseiLabel}>年星（本命星）</Text>
                <Text style={styles.kyuseiValue}>{user.yearKyusei}</Text>
              </View>
              <View style={styles.kyuseiItem}>
                <Text style={styles.kyuseiLabel}>月星（月命星）</Text>
                <Text style={styles.kyuseiValue}>{user.monthKyusei}</Text>
              </View>
              <View style={styles.kyuseiItem}>
                <Text style={styles.kyuseiLabel}>日星（日命星）</Text>
                <Text style={styles.kyuseiValue}>{user.dayKyusei}</Text>
              </View>
              <View style={styles.kyuseiItem}>
                <Text style={styles.kyuseiLabel}>宿曜</Text>
                <Text style={styles.kyuseiValue}>{user.shukuyo}</Text>
              </View>
            </View>
          </View>

          {/* 魂のテーマ */}
          <View style={styles.themeSection}>
            <Text style={styles.sectionTitle}>魂のテーマ</Text>
            <View style={styles.themeBox}>
              <View style={styles.themeItem}>
                <Text style={styles.themeLabel}>意図のヒント</Text>
                <Text style={styles.themeValue}>{soulThemes.intention}</Text>
              </View>
              <View style={styles.themeItem}>
                <Text style={styles.themeLabel}>本質面</Text>
                <Text style={styles.themeValue}>{soulThemes.essence}</Text>
              </View>
              <View style={styles.themeItem}>
                <Text style={styles.themeLabel}>行動面</Text>
                <Text style={styles.themeValue}>{soulThemes.action}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 右カラム：年運推移 */}
        <View style={styles.rightColumn}>
          <View style={styles.forecastSection}>
            <Text style={styles.forecastTitle}>年運推移（2025-2026）</Text>
            {forecasts.map((forecast, index) => (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastYear}>
                  {forecast.year} - {forecast.title}
                </Text>
                <Text style={styles.forecastText}>{forecast.description}</Text>
              </View>
            ))}
          </View>

          {/* 追加の説明セクション */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>相性の見方</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>命・栄・親・友</Text>
              <Text style={styles.infoValue}>良好な相性。協力関係に適している</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>安・危・成・壊・衰</Text>
              <Text style={styles.infoValue}>注意が必要。関係性を意識して対応</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>生年月日情報</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>生年月日</Text>
              <Text style={styles.infoValue}>
                {user.birthDate.getFullYear()}年
                {user.birthDate.getMonth() + 1}月
                {user.birthDate.getDate()}日
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>曜日</Text>
              <Text style={styles.infoValue}>{user.weekday}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>七曜陵逼</Text>
              <Text style={styles.infoValue}>{user.shichiyoRyohi}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* フッター */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 五次元経営株式会社</Text>
      </View>
      <Text style={styles.pageNumber}>3 / 3</Text>
    </A3Template>
  );
};

export default Page02;
