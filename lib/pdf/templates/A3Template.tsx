/**
 * A3テンプレート - 横向き基本レイアウト
 */
import React from 'react';
import { Page, View, StyleSheet } from '@react-pdf/renderer';
import { A3_LANDSCAPE, COLORS } from '../types';
import { defaultFontFamily } from '../fonts';

const styles = StyleSheet.create({
  page: {
    width: A3_LANDSCAPE.width,
    height: A3_LANDSCAPE.height,
    backgroundColor: COLORS.background,
    padding: 30,
    fontFamily: defaultFontFamily,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1,
    paddingRight: 15,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 15,
  },
});

interface A3TemplateProps {
  children: React.ReactNode;
  showFooter?: boolean;
  footerText?: string;
}

export const A3Template: React.FC<A3TemplateProps> = ({
  children,
  showFooter = true,
  footerText = '© 2025 五次元経営株式会社',
}) => {
  return (
    <Page size={[A3_LANDSCAPE.width, A3_LANDSCAPE.height]} style={styles.page}>
      {children}
    </Page>
  );
};

export const TwoColumnLayout: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
}> = ({ left, right }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>{left}</View>
      <View style={styles.rightColumn}>{right}</View>
    </View>
  );
};

export default A3Template;
