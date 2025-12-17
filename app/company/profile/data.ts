/**
 * app/company/profile/data.ts
 *
 * 会社概要ページのデータ定義
 */

// AboutPage JSON-LD
export const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: '会社概要 | 五次元経営株式会社',
  description: '五次元経営株式会社は、「イマココの心地よさから始める経営」を広め、みんな、ごきげんな会社をふつうにすることを使命としています。',
  mainEntity: {
    '@type': 'Organization',
    name: '五次元経営株式会社',
    legalName: '五次元経営株式会社',
    url: 'https://www.5dmgmt.com',
    logo: 'https://www.5dmgmt.com/logo.png',
    foundingDate: '1965-03-02',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '片瀬海岸1-12-16-1003',
      addressLocality: '藤沢市',
      addressRegion: '神奈川県',
      postalCode: '251-0035',
      addressCountry: 'JP',
    },
    telephone: '0466-52-7722',
  },
};

// Person JSON-LD（代表者：望月貴生）
export const personTakaoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '望月 貴生',
  jobTitle: '代表取締役',
  worksFor: {
    '@type': 'Organization',
    name: '五次元経営株式会社',
  },
  description: 'みずほ銀行、ジャフコ等でM&A実務を経験後、五次元経営株式会社代表取締役。JAPAN MENSA会員。',
  image: 'https://www.5dmgmt.com/images/takao.png',
  memberOf: {
    '@type': 'Organization',
    name: 'JAPAN MENSA',
  },
};

// Person JSON-LD（代表者：望月美香）
export const personMikaJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '望月 美香',
  jobTitle: '代表取締役',
  worksFor: {
    '@type': 'Organization',
    name: '五次元経営株式会社',
  },
  description: '資生堂を経て、30年以上美容家として活動。五次元経営株式会社代表取締役。JAPAN MENSA会員。',
  image: 'https://www.5dmgmt.com/images/mika.png',
  memberOf: {
    '@type': 'Organization',
    name: 'JAPAN MENSA',
  },
};

export const companyInfo = [
  { label: '会社名', value: '五次元経営株式会社' },
  { label: '法人番号', value: '3021001001494' },
  { label: '本社住所', value: '神奈川県藤沢市片瀬海岸1-12-16-1003' },
  { label: '代表者', value: '代表取締役　望月 貴生　代表取締役　望月 美香' },
  { label: '電話番号', value: '0466-52-7722' },
  { label: '資本金', value: '1000万円' },
  { label: '設立年月日', value: '1965年3月2日' },
  { label: '事業内容', value: 'M&Aアドバイザリー業務、五次元経営コンサルティング業務、企業価値向上研修' },
  { label: '取引銀行', value: 'みずほ銀行' },
];

export const history = [
  { year: '1965年4月', content: '東京エリート株式会社設立' },
  { year: '1993年3月', content: '望月（当時吉川）美香がM&Aで株式を取得。代表取締役に就任。' },
  { year: '2020年7月', content: 'Airis.M株式会社に社名変更' },
  { year: '2025年6月', content: '五次元経営株式会社に社名変更、望月貴生が共同代表として代表取締役に就任' },
];

export const achievements = [
  {
    title: '売上2.2億円、収益330万円／3か月目',
    subtitle: '不動産仲介会社社長T氏',
    content: 'コロナの影響で従業員を全員実質解雇。一人社長として2022年に再出発。人生の棚卸し、自宅の片づけ、人間関係の清算を徹底的に行い、生活をシンプルにして、行動量を増やす。３か月後に大型案件締結。'
  },
  {
    title: '売上1400万円／３か月目',
    subtitle: '元センサー商社トップセールスマン 現営業サポート会社社長S氏',
    content: '起業半年後、独立後売上獲得に悩んでいたが、自社の強みを言語化し、１枚の紙にまとめ、自社の営業の仕組みを再構築したことで成約に至る。'
  },
  {
    title: '売上30億円増／3か月目',
    subtitle: '化粧品受託製造会社社長H氏',
    content: 'メインの売上先であった企業が不調で、売上が50億円が10億円以下に急減。人生の棚卸し、自宅の片づけ、人間関係の清算を徹底的に行い、行動量を増やし、新規に上場企業との取引を締結。売上30億円増となった。'
  },
  {
    title: '過去最高売上／3か月目',
    subtitle: 'エステサロンオーナーS氏',
    content: '人生の棚卸し、自宅の片づけ、人間関係の清算を徹底的（離婚）に行い、仕事の優先順位を明確にし、業務フロー改善に取り組んだところ、労働時間は2割減少、売上は過去最高の年商2600万円となった。'
  },
  {
    title: '売上800万円／3か月目',
    subtitle: '法人向けサービス業社長O氏',
    content: '従来の個人向けサービス業から、当該サービスのアップセルである法人向けのサービスに拡充した結果、コンサル導入から3カ月で800万円を売上。前年度の総売り上げをあっという間に超えてしまった。'
  },
  {
    title: '独立を果たす／3か月目',
    subtitle: '社会保険労務士K氏',
    content: '共同で社会保険労務士事務所を運営していたK氏の独立のサポートを行う。新規の事務所の選定、既存のパートナーとの交渉をサポート。結果、スムーズに独立し、新規の顧問先も得て再出発が叶った。'
  },
];

export const takaoCareer = [
  { year: '96年 3月', content: '中央大学法学部政治学科卒業' },
  { year: '96年 4月', content: 'みずほ銀行（旧第一勧銀）市ヶ谷支店入行' },
  { year: '00年 7月', content: 'みずほ銀行堂島支店転勤（2002年頭取表彰受賞）' },
  { year: '03年11月', content: 'みずほ銀行本店ALC（M&A）アドバイザリー部転勤' },
  { year: '06年 7月', content: 'みずほ銀行退職' },
  { year: '06年 8月', content: '株式会社フィデック入社（東証一部上場：M&A買収担当部長）' },
  { year: '07年 5月', content: '株式会社フィデック退職' },
  { year: '07年 6月', content: '株式会社ジャフコ入社（バイアウト部門シニアマネージャー）\n社外取締役就任 ケイテック株式会社（業種：EMS）\n社外取締役就任 イーレックス株式会社（業種：PPS）\n社外取締役就任 株式会社フォーナインズ（業種：眼鏡SPA）' },
  { year: '09年11月', content: '株式会社ジャフコ退職（社外取締役もすべて辞任）' },
  { year: '10年 4月', content: 'アンプラグド株式会社設立\n（アンプラグドアウェーク 2013年社名変更）\n（アウェーク五次元経営 2022年社名変更）\n（五次元経営アンプラグド 2025年社名変更）' },
  { year: '22年10月', content: 'JAPAN MENSA入会' },
  { year: '25年 6月', content: 'Airis.M株式会社の株式の50％取得。五次元経営株式会社に社名変更。代表取締役に就任。' },
];

export const mikaCareer = [
  { year: '93年 3月', content: '資生堂株式会社を退職後、東京エリート株式会社を買収し、代表取締役に就任。オーナー美容家として、藤沢市で31年路面店を経営。' },
  { year: '20年 7月', content: '東京エリート株式会社をAiris.M株式会社に名称変更。' },
  { year: '21年 5月', content: '望月貴生と結婚。旧姓吉川から氏変更。' },
  { year: '22年11月', content: 'JAPAN MENSA入会' },
  { year: '25年 6月', content: 'Airis.M株式会社の株式の50％を望月貴生に譲渡。社名を五次元経営株式会社に名称変更。' },
];

export const values = [
  '心と場が、しぜんに整っていくこと',
  '本心に響くことを、丁寧に選ぶこと',
  'ひらめいたら、軽やかに動くこと',
  '結果を握らず、流れとともにあること',
  '自分と世界を、やさしいまなざしで見ること',
];
