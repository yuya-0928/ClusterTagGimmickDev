
## Cluster Script の型定義の更新

`types/cluster-script.d.ts` の内容は Cluster Kit 公式の型定義ファイルに以下の改良を加えたものになっています。

- `ClusterScript.state`, `ClusterScript.groupState`, `UnityComponent.unityProp` の型をカスタム可能にする
- `ClusterScript.getSignalCompat()` の返り値の型を引数の `parameterType` から推定する
- `any` と `{}` の型を使用しないようにする

Cluster Script がアップデートされた場合は最新の型定義に合わせて `types/cluster-script.d.ts` を修正します。

### 最新の Cluster Script の型定義を取得

最新の Cluster Kit 公式の型定義を `types/cluster-script.d.ts.txt` に反映します。

```bash
bun types/fetch-types.ts <lang>
```

### 型定義ファイルの修正

`types/cluster-script.d.ts.txt` の変更箇所で `declare` を使用している場合、 `types/cluster-script.d.ts` では `declare global` に変更する必要があります。

例:

```diff
+ declare global {
   /**
   * `$`オブジェクトは、Scriptで動作する個々のアイテムを操作するハンドルのインスタンスです。
   * @item
   */
-   declare const $: ClusterScript;
+   const $: ClusterScript;
+ }
```