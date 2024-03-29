# 知覚実験の概要
<!--文責: 黄-->

知覚実験は「刺激で人間の知覚を生じさせて、その反応を測定する手法」と一般的に定義されています（詳細は[心理学事典](https://kotobank.jp/word/%E7%9F%A5%E8%A6%9A-95870)をご参照ください）。ただ、人間の感覚器官は複数あるので、知覚の経路もたくさんあります。言語に関する研究では、主に聴覚(音声言語の刺激を使用する実験)と視覚(手話または書き言葉の刺激を使用する実験)が主流といえます。

これらのモダリティを利用した知覚実験は言語の世界では広く使われています。例として、話者が言語の刺激に対してどのようにカテゴライズするのか(AX実験、ABX実験、語彙判断課題など)、また刺激に対して被験者が感じる自然度の測定などがあります。これらの反応に影響を与える要因を探し、モデルや仮説を提案・検証するのが知覚実験の目的になります。

言語研究の知覚実験は、大まかに分類すると「同一判断課題」と「弁別判断課題」にわけられます(Strange and Shafer, 2008:161)。前者は、一つの刺激に対して、どちらの分類になるかを答えるもので、語彙判断課題などがあります。後者は二つ(またはそれ以上)の刺激に対して、その刺激の関係(同一か相違か、または何番目の刺激は何番目のものと同じかなど)を判断してもらう実験です。

どの実験手法も向いている部分と向いていない部分があります。例えば、同一判断課題では、ある刺激を実験参加者に呈示し、どちらかに聞こえるか画面にある選択肢を選んでもらうデザインがよく使われていますが、選択肢は参加者の第一言語にないと作れません。反対に、話者の第一言語にある音の知覚を調べたいときは、同一判断課題のほうが音声刺激の時間が半分で済み効率的です。実験の問に沿って、最適な実験手法を考えましょう。

ここからは、弁別課題の[AX実験]()と、[ABX・AXB実験]()、そして[自然度判断課題]()を中心に紹介して、その後どのようにjsPsychで作成できるかを一緒に見ていきます。

<!--TODO: 上にリンクを入れる-->

## AX実験

### 実験デザインと応答変数

言語実験で典型的なAX実験は、二つの音声刺激を実験参加者に呈示し、同じか違うかを答えてもらう実験です。Aは定数のようなもので、調べたい条件はXで調整します。

例えば、母音の長短の区別が知覚できるかを調べたいときに、まず短母音をXとして用意して、長母音をAとしましょう。実験参加者に「長音(A)・短音(X)」を聴かせて、長音・短音のペアが弁別できるかどうかを見ます。

得られる応答変数として、一般的には実験参加者の回答(正解・不正解)を分析します。加えて、反応時間(話者が刺激を見て回答するまでの時間)も分析に入れることがあります。

### 長所と使い所

AX実験の長所は以下の2点です。

- 一つの質問で聞く音声が二つしかないので、実験参加者にとって最も負担を感じず完成できる
- 実験者側にとっても、二つの音声を結合すれば良いので負担が少ない(ただPraatのスクリプトなどを使って音声を結合するときは、後述のABXとの差がほぼなくなる)

したがって、以下のような場合に使えます。

- 対象となる参加者が、検証したい言語特徴の正書法の知識がなく、文字呈示ができず同一判断課題が有効でないとき
- 言語特徴Xと言語特徴Yを弁別できるかを知りたいとき
- 言語特徴Zは言語特徴Xと言語特徴Yのどちらかに分類されるか知りたいとき

### 注意点

AXのペアしかないデザインで実験すると、当てずっぽうで最初から最後まで「二つの音声は違う」と答えた人の正答率も100%になってしまいます。そのため、AAとXXといったような、「同じが正解」というものも用意する必要があります。

先行研究によると、出てくる順番(つまりAが先に出るかXが先に出るか)も影響する場合があるので、AXとXAをバランス良く用意したほうがよさそうです。

ずっと同じ区別を聞くと、呈示順序が作用してしまったり、実験の意図がばれて実験者効果が現れてしまうことがあります。それを防ぐために実験の目的と関係ないもの(フィラー)も入れて、ランダムに呈示しておきましょう。

実験参加者が「同じ」と「違う」を判断する基準は、必ずしも同一とは限りません。個々の基準にゆれが大きく結果に影響しそうな場合は、結果集計時に個人差を注意して分析するか、後述のABX・AXB実験を使うことをおすすめします。

<!--TODO:
理解度確認課題、のようなものがあると良いかも。
あと、段階的に刺激を変えて
カテゴリカルなしきい値を探りたい場合にも使える。
(意義があるかはさておき)
-->
<!--TODO: リンクを追加-->

## ABX・AXB実験

### 実験デザインと応答変数

前述のAX実験は操作しやすいですが、実験参加者が求められる回答は「同一」か「相違」かで、判断基準も人それぞれなので、課題や説明によって甚だしい個 人差が出る可能性があります。そういったときは、刺激のペアを三つまで増やし、 Xを聞いたときにAとBとどちらと同じか、というようなABX・AXB実験を使うことが できます。

ABXとAXBの違いは、X(ターゲットの刺激)の位置です。AとBは、違うカテゴリー のものを使います。

通常のAXB・ABXよりもやや複雑なパラダイムで、三つの音声を一通り聴き終 わってどれとどれが同じかというやり方もあります。その場合はすべての順番(XAB、XBA、AXB、BXA、ABX、BAX)を用意しなければなりませんが、ここでは最もシンプルなABX・AXB実験に焦点を当てます。

カテゴリカルなしきい値がどこにあるか、というときに利用しやすいです。

応答変数は<u>応答者の回答(正解・不正解)</u>と<u>反応時間</u>がメインです。

### 長所と使い所

ABXの長所として、「どちらかの刺激と同じか」という質問が使われるので、AとBの違いに集中して回答してもらえます。
以下の場合で使えます。

- 対象となる参加者が、検証したい言語特徴の正書法の知識がなく、文字呈示ができず同一判断課題が有効でないとき
- 言語特徴Xと言語特徴Yを弁別できるかを知りたいとき
- 言語特徴Zは言語特徴Xと言語特徴Yのどちらかに分類されるか知りたいとき
- AX実験のデザインでは適切に観測できないような課題

### 注意点

AX実験と同様に、AとBの呈示順が結果に影響する可能性があると報告されているため、Xの順番を決めたらAとBをランダムに調整することが重要です。

AX実験と違って、一般的にAXAとBXBのようにすべての刺激が同じパターンを用意する必要は、特段の目的がないかぎりありません。

ABX・AXB実験は実験参加者にとって三つの音声を短期記憶にためて回答しなければならないので、課題の難易度がAX実験よりも高いとされています。本実験に入る前に、練習セッションを設けて課題に慣れてもらう工夫もしたら良いでしょう。

また、音声知覚の場合は音響的な違いに着目したい場合は同じ話者の録音でもよいかもしれませんが、より抽象的な言語知識を問いたい場合は話者をあえて変える場合があります。

<!--TODO: リンクを追加-->

## 自然度判断課題

### 実験デザインと応答変数

自然度判断課題（または許容度・文法度・wordlikenessなど、分野や目的によって名前が複数あり）では、実験参加者が呈示された刺激に対して、どのぐらい自然（または実験者が指定するほかの評価基準）なのかを回答する実験手法です。

実験者が求める回答の形式は、実験の目的によって異なります。「自然」か「不自然」かという二択の課題もあれば、よくアンケートで出てくる「１〜５で回答しなさい」という課題もあります。前者は、前述のAX実験とほぼ同じスクリプトで作成できるので、省略します。ここでは、後者のように順序尺度を用いた自然度判断課題を紹介します。

順序尺度を用いた自然度課題では整数しか答えに出てきません（つまり、個々の問題では 1.25 みたいな小数を回答できないようになっています。連続値で答えられる自然度判断課題もありますが、また今後紹介させてもらいます。

応答変数は<u>自然度評価（通常は整数）</u>と<u>反応時間</u>が得られ、一緒に分析することもあります。

### 長所と使い所

以下のような場合に使えます。

- 自然度（許容度・文法度・wordlikeness）が主な観測指標の課題を遂行するとき
- 二択の問題では観測しにくいような、微妙な差を観測したいとき（順序尺度の自然度判断課題）。例えば、複数の「不自然」な刺激の間に差があるかどうかを検証したいとき
- 実施する予定の課題の刺激の自然さなどを知りたいとき（他の課題と組み合わせすることも可能）

### 注意点

順序尺度を設計する際に、数字の大きさと対応する意味は一貫する必要がある（「この質問では５がもっとも好きだが、次の質問では１がもっとも好き」みたいなデザインはほかの目的がない場合は避けた方が良い）。

「自然かどうか」といった質問は、個人のゆれも見られると思います。また、個人差が大きい可能性もあります。ゆれに関しては、練習問題を設けて話者の本実験でのパフォーマンスを安定させるといいでしょう。個人差などは、統計モデルである程度処理できると思います。

それでは、次に[02_perception_minimal](../02_perception_minimal/)で実際に作ってみましょう。
<!--TODO: リンクを追加-->
<!--TODO: コードはGistを利用する-->
