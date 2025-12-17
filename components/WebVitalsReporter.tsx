'use client';

/**
 * Web Vitals Reporter
 * Core Web Vitals を計測し、Google Analytics に送信
 */

import { useEffect } from 'react';

type MetricName = 'CLS' | 'INP' | 'LCP' | 'FCP' | 'TTFB';

interface Metric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Google Analytics に送信
function sendToGoogleAnalytics(metric: Metric) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true,
    metric_rating: metric.rating,
    metric_delta: metric.delta,
  });
}

export default function WebVitalsReporter() {
  useEffect(() => {
    // web-vitals ライブラリを動的にインポート
    import('web-vitals').then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
      onCLS(sendToGoogleAnalytics);
      onINP(sendToGoogleAnalytics);
      onLCP(sendToGoogleAnalytics);
      onFCP(sendToGoogleAnalytics);
      onTTFB(sendToGoogleAnalytics);
    });
  }, []);

  return null;
}

// グローバル型定義
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      action: string,
      params: Record<string, unknown>
    ) => void;
  }
}
