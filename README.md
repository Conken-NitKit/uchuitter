# [うちゅいったー | 宇宙時代のSNS](uchuitter.netlify.app/)

## Description
WebGLの技術を使い宇宙空間を模した３D空間上に各ユーザーが投稿できる掲示板風SNSである．

> 『ハックツハッカソン/プレシオ杯』に提出する作品として開発．テーマは『技術の無駄遣い』

## Built With
- React
- TypeScript(一部)
- Styled-components
- Three.js
- Firebase Authentication
- Firebase Cloud Function
- Netlify

## Features
#### 新規登録・ログイン
FirebaseAuthenticationを用いユーザー認証を行っている．
対応する Sign-in method は 『メール/パスワード』 であり，以下の画面からログインが可能である．
![screen shot / login](https://user-images.githubusercontent.com/41711771/105449975-cabe2c80-5cbc-11eb-8794-7251868ce6ea.png)

#### タイムライン
各ユーザーの投稿は以下のな形で確認できる．
描画に関してはThree.jsを用いて3D空間を表現し，データの管理は Cloud Firestore を利用しておこなっている．
![screen shot / time-line](https://user-images.githubusercontent.com/41711771/105449873-95194380-5cbc-11eb-8888-a0c67c7cf8e7.png)

#### 投稿
右下の + のアイコンから投稿が可能．
不適切な投稿に関するバリデーション機能も実装している．
![screen shot / submit](https://user-images.githubusercontent.com/41711771/105449898-9d717e80-5cbc-11eb-8524-a8f1320ed4a9.png)
![screen shot / validation](https://user-images.githubusercontent.com/41711771/105450052-00fbac00-5cbd-11eb-9284-33676d1ebfda.png)

#### プロフィールの修正
左上のハンバーガーメニューから遷移可能．
プロフィール画面ではユーザー名の変更及び過去の投稿の削除を行うことが可能．
![screen shot / profile](https://user-images.githubusercontent.com/41711771/105449886-9c405180-5cbc-11eb-9ae6-439ee3489e4d.png)


## Links
- [**うちゅいったー**](uchuitter.netlify.app/)
- [**うちゅいったー | Topa'z (メディア)**](https://topaz.dev/projects/c00svaq23akg008oger0)
- [**ハックツCONTENTS : ハックツハッカソン開催!!! (メディア)**](https://note.com/hackz_inc/n/nb0de2fb2f638)
