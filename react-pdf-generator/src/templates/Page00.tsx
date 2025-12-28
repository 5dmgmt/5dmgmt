/**
 * シート00 - 簡易鑑定表紙
 *
 * 運気爆上り宿曜鑑定書の表紙ページ
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
    marginBottom: 20,
  },
  titleSection: {
    flex: 1,
  },
  structureLabel: {
    fontSize: 10,
    color: COLORS.primary,
    marginBottom: 5,
  },
  structureTitle: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 10,
  },
  shukuyoInfo: {
    fontSize: 12,
    color: COLORS.text,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userName: {
    fontSize: 28,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.6,
    marginBottom: 8,
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bullet: {
    fontSize: 10,
    color: COLORS.primary,
    marginRight: 5,
  },
  bulletText: {
    fontSize: 10,
    color: COLORS.text,
    flex: 1,
    lineHeight: 1.4,
  },
  testimonialBox: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  testimonialText: {
    fontSize: 9,
    color: COLORS.text,
    lineHeight: 1.5,
  },
  testimonialAuthor: {
    fontSize: 8,
    color: COLORS.lightText,
    marginTop: 5,
    textAlign: 'right',
  },
  ctaBox: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  ctaTitle: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 10,
    color: COLORS.white,
    lineHeight: 1.4,
  },
  highlightBox: {
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  highlightText: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 9,
    color: COLORS.lightText,
  },
});

interface Page00Props {
  user: UserData;
}

export const Page00: React.FC<Page00Props> = ({ user }) => {
  // お客様の声データ
  const testimonials = [
    {
      text: '「これまで数字と合理性だけで判断してきましたが、セッション後は"直感の確かさ"に驚いています。翌週、大口の受注が決まり、運気の流れが変わるとはこのことかと体感しました。」',
      author: '（建設業／井宿／S.K.）',
    },
    {
      text: '「ずっと頑張っても空回りしている感覚がありましたが、セッションを受けた直後から不思議と予約が埋まりました。身体ごと軽くなり、運気が味方している安心感があります。」',
      author: '（美容サロン経営／昴宿／M.Y.）',
    },
  ];

  return (
    <A3Template>
      {/* ヘッダー */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.structureLabel}>【宿曜の構造】</Text>
          <Text style={styles.structureTitle}>{user.structureTitle}</Text>
          <Text style={styles.shukuyoInfo}>
            {user.shukuyo}{user.weekday}生まれ
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.userName}>{user.name} 様</Text>
            <Text style={styles.mainTitle}> の人生が思い通りになる運気爆上り宿曜鑑定書</Text>
          </View>
        </View>
        <LogoWithText size={70} />
      </View>

      {/* 2カラムレイアウト */}
      <TwoColumnLayout
        left={
          <View>
            {/* 空海の叡智セクション */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>◆空海が伝え、家康が封じた叡智　宿曜27宿</Text>
              <Text style={styles.paragraph}>
                「人を見抜き、時を選び、関係を操り、自らに気づく技術」
              </Text>
              <Text style={styles.paragraph}>
                　　　　　→ これは統治の側にとっては"危険な力"でもありました。
              </Text>
            </View>

            {/* 運気爆上げセクション */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>◆運気爆上げするにはすでにあなたの中にある</Text>
              <Text style={styles.sectionTitle}>　最高の設定を起動するだけです</Text>
              <Text style={styles.paragraph}>
                これは修正や改善ではなく、あなたの魂のOSを起動するだけで、ラクラク、カンタン、ごきげん♪に実現できます。
                その答えは全て宿曜に記されています。
              </Text>
            </View>

            {/* 鑑定書の見方 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>◆鑑定書の見方と役立て方</Text>
              <Text style={styles.paragraph}>
                この鑑定書は、あなたの宿曜に刻まれた「運気を爆上げする構造秘図」です。
              </Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>✔</Text>
                  <Text style={styles.bulletText}>構造の概要：意思決定や行動の土台</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>✔</Text>
                  <Text style={styles.bulletText}>葛藤パターン：運気を下げる落とし穴</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>✔</Text>
                  <Text style={styles.bulletText}>マネジメントのヒント：運を味方にする方法</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>✔</Text>
                  <Text style={styles.bulletText}>進化テーマ：運気を一段上へ引き上げる鍵</Text>
                </View>
              </View>
            </View>

            {/* この先に待っている世界 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>◆この先に待っている努力ではなく、</Text>
              <Text style={styles.sectionTitle}>　現実がラクに流れ始める世界とは？</Text>
              <Text style={styles.paragraph}>
                自分の宿曜パターンを理解し、それに沿って生きると：
              </Text>
              <Text style={styles.paragraph}>
                7日後：「なんか楽になった」という感覚→21日後：「これが自分だったんだ」という発見
              </Text>
              <Text style={styles.paragraph}>
                90日後：「人生ってこんなに楽しかったっけ？」という驚き
              </Text>
            </View>
          </View>
        }
        right={
          <View>
            {/* 受け取れるギフト */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>◆この鑑定書で受け取れるギフト</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>・</Text>
                  <Text style={styles.bulletText}>
                    あなたの波に乗るバイオリズム：2025年のエネルギーの波と最高のタイミング
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>・</Text>
                  <Text style={styles.bulletText}>
                    あなたの天才性の取扱説明書：宿曜が示す、あなただけの成功回路と喜びのツボ
                  </Text>
                </View>
              </View>
            </View>

            {/* もっと深く */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>◆もっと深く自分の可能性を探求したい方へ</Text>
              <View style={styles.ctaBox}>
                <Text style={styles.ctaTitle}>【無料】宿曜活用Zoomセッション（30分）</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.ctaText}>・あなたの宿曜の天才性とアキレス腱の詳細</Text>
                  <Text style={styles.ctaText}>・2025年の最高の波の乗り方</Text>
                  <Text style={styles.ctaText}>・重要な人との相性による相乗効果</Text>
                </View>
                <Text style={{ ...styles.ctaText, marginTop: 10 }}>
                  参加特典：宿曜本鑑定書・完全版（PDF11ページ）
                </Text>
              </View>
              <View style={styles.highlightBox}>
                <Text style={styles.highlightText}>
                  あなたはすでに完璧。あとは、その設定を起動するだけです。
                </Text>
              </View>
            </View>

            {/* お客様の声 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>◆セッションを受けた方のご感想</Text>
              {testimonials.map((t, i) => (
                <View key={i} style={styles.testimonialBox}>
                  <Text style={styles.testimonialText}>{t.text}</Text>
                  <Text style={styles.testimonialAuthor}>{t.author}</Text>
                </View>
              ))}
            </View>
          </View>
        }
      />

      {/* フッター */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 五次元経営株式会社</Text>
      </View>
    </A3Template>
  );
};

export default Page00;
