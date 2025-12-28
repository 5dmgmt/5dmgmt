/**
 * シート01 - 構造秘図
 */
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { A3Template, TwoColumnLayout } from './A3Template';
import { LogoWithText } from '../components/Logo';
import { UserData, COLORS } from '../types';

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
  titleSection: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 5,
  },
  section: {
    marginBottom: 15,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.lightText,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
  sectionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
    flex: 1,
  },
  sectionContent: {
    fontSize: 9,
    color: COLORS.text,
    lineHeight: 1.6,
  },
  highlightSection: {
    marginBottom: 15,
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    padding: 12,
  },
  bulletList: {
    marginTop: 5,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 9,
    color: COLORS.primary,
    marginRight: 5,
    width: 10,
  },
  bulletText: {
    fontSize: 9,
    color: COLORS.text,
    flex: 1,
    lineHeight: 1.5,
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
});

export interface Page01ContentData {
  structureOverview: string;
  managementHints: string;
  conflictPatterns: string;
  lifeApplications: string;
  potentials: string;
  evolutionTheme: string;
}

const defaultContent: Page01ContentData = {
  structureOverview: `虚宿は「形のない宝を探し求める」精神性の高い宿で、夢と理想を追い求める傾向があります。木曜日生まれは拡大・発展のエネルギーを持ち、大きなビジョンを描く力に優れています。

この組み合わせは、常識にとらわれない発想力と、不可能を可能にする信念を持っています。一方で、理想が高すぎて現実との乖離が生じやすい側面もあります。`,
  managementHints: `◆経営者本人がこの構造の場合：
・ビッグビジョンと段階的実行計画を組み合わせる
・信頼できる実務型の右腕を置く
・定期的に現実確認のフィードバックを受ける

◆この構造を持つ部下がいる場合：
・夢を語らせ、大きなプロジェクトを任せる
・細かい進捗管理よりも成果で評価
・創造性を発揮できる環境を用意`,
  conflictPatterns: `・理想の過度な拡大により、実現可能性を完全に見失う
・成長への焦りから、基盤を固める前に拡大してしまう
・現実的な制約を無視した計画を立ててしまう
・周囲の忠告を「小さい考え」と退けてしまう
・成功体験が少ないうちに、大きなリスクを取りすぎる`,
  lifeApplications: `・壮大なビジョンを段階的に実現する長期プロジェクト
・リスクを取りながらも、セーフティネットを用意
・クリエイティブな事業や革新的なサービス開発
・チームを巻き込んで大きな目標を達成する
・社会貢献性の高い事業展開`,
  potentials: `・常識を超えた「ビッグビジョン創造力」
・不可能を可能にする信念と行動力
・人を巻き込むカリスマ性
・精神性と実利を両立させる知恵
・逆境をチャンスに変える楽観性`,
  evolutionTheme: `虚宿×木曜（七曜陵逼）構造の進化の鍵は、「無限の理想」に「現実的な一歩」を組み合わせること。

壮大なビジョンを描きながらも、今日できる小さな行動を積み重ねることで、夢は着実に形になっていきます。

「大きく考え、小さく始める」これが運気を爆上げする秘訣です。`,
};

interface Page01Props {
  user: UserData;
  content?: Partial<Page01ContentData>;
}

export const Page01: React.FC<Page01Props> = ({ user, content = {} }) => {
  const data = { ...defaultContent, ...content };

  const parseList = (text: string): string[] => {
    return text
      .split('\n')
      .filter((line) => line.trim().startsWith('・') || line.trim().startsWith('◆'))
      .map((line) => line.trim());
  };

  const renderParagraphs = (text: string) => {
    return text.split('\n\n').map((para, i) => (
      <Text key={i} style={styles.sectionContent}>
        {para}
      </Text>
    ));
  };

  const renderBulletList = (text: string) => {
    const items = parseList(text);
    if (items.length === 0) {
      return <Text style={styles.sectionContent}>{text}</Text>;
    }
    return (
      <View style={styles.bulletList}>
        {items.map((item, i) => (
          <View key={i} style={styles.bulletItem}>
            <Text style={styles.bullet}>{item.startsWith('◆') ? '◆' : '・'}</Text>
            <Text style={styles.bulletText}>
              {item.replace(/^[・◆]\s*/, '')}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <A3Template showFooter={false}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            {user.shukuyo}{user.weekday}生まれの経営者の構造秘図
          </Text>
          <Text style={styles.subTitle}>
            {user.name} 様 | {user.structureTitle}
          </Text>
        </View>
        <LogoWithText size={50} />
      </View>

      <TwoColumnLayout
        left={
          <View>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>✔</Text>
                <Text style={styles.sectionTitle}>構造の概要（意思決定のスタイル）</Text>
              </View>
              {renderParagraphs(data.structureOverview)}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🌀</Text>
                <Text style={styles.sectionTitle}>起こりやすい葛藤・自動反応パターン</Text>
              </View>
              {renderBulletList(data.conflictPatterns)}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>💡</Text>
                <Text style={styles.sectionTitle}>ポテンシャル（構造的強み／中核資質）</Text>
              </View>
              {renderBulletList(data.potentials)}
            </View>
          </View>
        }
        right={
          <View>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🔎</Text>
                <Text style={styles.sectionTitle}>構造活用のマネジメントのヒント</Text>
              </View>
              {renderBulletList(data.managementHints)}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📖</Text>
                <Text style={styles.sectionTitle}>人生における使い方（仕事・ライフスタイル）</Text>
              </View>
              {renderBulletList(data.lifeApplications)}
            </View>

            <View style={styles.highlightSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>✨</Text>
                <Text style={styles.sectionTitle}>五次元経営的進化テーマ</Text>
              </View>
              {renderParagraphs(data.evolutionTheme)}
            </View>
          </View>
        }
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 五次元経営株式会社</Text>
      </View>
      <Text style={styles.pageNumber}>2 / 3</Text>
    </A3Template>
  );
};

export default Page01;
