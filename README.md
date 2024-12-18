# 株式会社ゆめみ様 2024年度フロントエンド課題

[![React](https://img.shields.io/badge/React-19.0.0-58c4dc.svg?logo=react&style=plastic)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.4.2-3178c6.svg?logo=typescript&style=plastic)](https://www.typescriptlang.org/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15.0-1488C6.svg?style=plastic)](https://recharts.org/en-US/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.2-1488C6.svg?style=plastic)](https://zustand-demo.pmnd.rs/)
[![Axios](https://img.shields.io/badge/Axios-1.7.9-5A29E4.svg?logo=axios&style=plastic)](https://axios-http.com/)
[![CI](https://github.com/crab85193/yumemi_coding_test_2024/actions/workflows/ci.yml/badge.svg)](https://github.com/crab85193/yumemi_coding_test_2024/actions/workflows/ci.yml)
[![deploy-ph-pages](https://github.com/crab85193/yumemi_coding_test_2024/actions/workflows/deploy-ph-pages.yml/badge.svg)](https://github.com/crab85193/yumemi_coding_test_2024/actions/workflows/deploy-ph-pages.yml)

<p align="center">
  <img src="./public/logo192.png" alt="logo" />
</p>

これは、株式会社ゆめみ様の2024年度フロントエンド課題提出用のリポジトリです。

ReactとTypeScriptを使用して構築されたレスポンシブなフロントエンドアプリケーションで、日本の複数の都道府県および様々な人口カテゴリにわたる人口データを視覚化します。ユーザーは複数の都道府県を選択し、「総人口」「年少人口」「生産年齢人口」「老年人口」などのカテゴリごとの人口推移を確認できます。

## 特徴

- **マルチカテゴリ・マルチ都道府県対応**: 「総人口」「年少人口」「生産年齢人口」「老年人口」などのカテゴリに対して、複数の都道府県の人口データを同時に表示。
- **レスポンシブデザイン**: モバイルからデスクトップまで、幅広いデバイスで最適な表示を実現。
- **動的なグラフ描画**: Rechartsを使用したインタラクティブな折れ線グラフで、各都道府県をユニークな色で表示。
- **Zustandによる状態管理**: 選択された都道府県やカテゴリの状態を効率的に管理。
- **堅牢なエラーハンドリング**: APIエラーやデータ取得失敗時に、ユーザーに適切なメッセージを表示。
- **継続的インテグレーションとデプロイ**: GitHub Actionsを用いた自動テストおよびデプロイワークフロー。

## 使用技術

- **React**: ユーザーインターフェースの構築。
- **TypeScrip**: 型付けされたJavaScriptでコードの品質向上。
- **Recharts**: 動的でインタラクティブなグラフ描画ライブラリ。
- **Zustand**: 軽量な状態管理ライブラリ。
- **Axios**: APIリクエストを行うためのHTTPクライアント。
- **GitHub Action**: 自動テストおよびデプロイ用のCI/CDパイプライン。

## インストール

### 前提条件

- Node.js: Node.jsがインストールされていること（バージョン14以上推奨）。
- Yarn: JavaScriptのパッケージマネージャー。

### 手順

1. リポジトリをクローン

```bash
git clone https://github.com/yourusername/yumemi-population-graph.git
cd yumemi-population-graph
```

2. 依存関係をインストール

```bash
yarn install
```

3. 環境変数の設定

プロジェクトのルートに .env ファイルを作成し、以下の内容を追加します。

```env
REACT_APP_YUMEMI_API_KEY=your_api_key_here
```

your_api_key_here を実際のAPIキーに置き換えてください。

## 使用方法

### ローカルでの実行

開発サーバーを起動するには以下のコマンドを実行します。

```bash
yarn start
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが表示されます。コードを編集すると、ページが自動的にリロードされます。

### 本番用ビルド

本番環境用にアプリケーションをビルドするには、以下のコマンドを実行します。

```bash
yarn build
```

最適化されたビルドが build ディレクトリに生成されます。

## テスト

プロジェクトには、JestとReact Testing Libraryを使用した包括的なテストが含まれています。

### テストの実行

全てのテストを実行するには、以下のコマンドを使用します。

```bash
yarn test
```

### テストカバレッジの取得

テストカバレッジレポートを生成するには、以下のコマンドを実行します。

```bash
yarn test --coverage
```

カバレッジレポートは coverage ディレクトリに生成されます。

## デプロイ

アプリケーションはGitHub PagesとGitHub Actionsを使用してデプロイされます。

### 継続的インテグレーションとデプロイ

- CIワークフロー: [.github/workflows/ci.yml](./.github/workflows/ci.yml) 内の自動ワークフローが、main ブランチへのプッシュごとにリンティングとテストを実行。
- CDワークフロー: [.github/workflows/deploy-ph-pages.yml](./.github/workflows/deploy-ph-pages.yml) 内のデプロイワークフローが、ビルド成功後に自動的にGitHub Pagesへデプロイ。

ワークフローが適切に動作するために、リポジトリの設定画面で必要なシークレット（YUMEMI_API_KEY）を設定してください。

## プロジェクト構成

```
src/
  api/
    population.ts
    prefectures.ts
  assets/
    images/
      logo.svg
    styles/
      PopulationChart.css
      PopulationGraphPage.css
      PrefectureCheckbox.css
  components/
    PopulationChart.tsx
    PrefectureCheckbox.tsx
  pages/
    PopulationGraphPage.tsx
  store/
    usePrefecturesStore.ts
  tests/
    PopulationChart.test.tsx
    PrefectureCheckbox.test.tsx
    population.test.ts
    prefectures.test.ts
    prefecturesStore.test.ts
  index.tsx
```

## ライセンス

This software is released under the MIT License, see [LICENSE](./LICENSE).

## お問い合わせ

ご質問やフィードバックがありましたら、[crab85193@gmail.com](mailto:crab85193@gmail.com) までご連絡ください。
