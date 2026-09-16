# 07 · rebase：改写历史的规则

> 记忆锚点：**merge 把分叉「缝合」，rebase 把分叉「掰直」——代价是换掉一串提交的编号。**

## 一、rebase 在做什么

分叉场景和上一章一样：main 与 dev 各有新提交。换成 rebase：

```bash
git switch dev
git rebase main
```

Git 把 dev 上的提交**逐个摘下来，临时存成补丁，接到 main 最新提交后面再逐个重放**。完成后历史变成一条直线——就像分叉从未发生过。

关键代价：重放后的提交是**新对象**，编号（哈希）全变了。原来的那串提交进入悬空状态，最终被回收。

## 二、黄金法则：只 rebase 自己的提交

`rebase` 改写历史。如果一个提交已经被别人 pull 过去，你再改写编号，对方的历史就和你的对不上——合并时会凭空多出一堆重复提交。

所以只有一条规则要背：

> **已推送到共享分支的提交，永不 rebase。**

自己本地的、没推送的、或只属于你个人分支的提交，随便整理。

## 三、rebase 的两个高频用法

**1. 同步主线（把 main 的新进展「搬」到自己的分支下）：**

```bash
git switch dev
git rebase main    # dev 的提交叠到 main 最新之后，历史保持线性
```

**2. 收拾本地提交（交互式）：**

```bash
git rebase -i HEAD~3   # 打开编辑器，整理最近 3 个提交
```

编辑器里每行前的动作：`pick` 保留、`reword` 改信息、`squash` 并入上一条、`drop` 丢弃。用它把「改错字→再改→又改」三连压成一条干净提交。

## 四、冲突怎么办

rebase 重放每个提交都可能冲突，处理方式和 merge 一样（改文件 → `add`），只是续场命令不同：

```bash
git rebase --continue   # 解决完，继续重放下一个
git rebase --abort      # 全部放弃，回到 rebase 前
```

## 五、merge 还是 rebase？

| | merge | rebase |
|---|---|---|
| 历史 | 保留分叉形状（真实） | 掰成直线（整洁） |
| 提交编号 | 不变 | 分叉侧全部改变 |
| 安全性 | 任何场景 | 只碰自己没共享的提交 |
| 典型场景 | 合并功能进主干 | 功能分支同步主线、整理本地提交 |

个人分支内 rebase 整理 + 合入主干时用 merge（或远程主流平台的功能分支 merge 请求），是最常见的安全组合。

## 六、动手实验

1. 造出 main / dev 分叉（各提交一次）；
2. 在 dev 上 `git rebase main`，用 `git log --oneline --graph --all` 对比 merge 课程的实验——直线 vs 分叉缝合；
3. `git rebase -i HEAD~2`，把两条提交 squash 成一条；
4. 给自己写一张便签：**哪些提交可以 rebase，哪些永远不行**。

## 七、本课小结

- rebase = 摘下提交重放，历史变直、编号全换；
- 黄金法则：已共享的提交不 rebase；
- `-i` 交互模式是提交整理器：pick / reword / squash / drop。

> 下一篇：remote / push / pull / fetch 的关系（待写）
