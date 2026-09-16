# 05 · 分支与 HEAD：指针游戏

> 记忆锚点：**分支不是「另一份代码」，是一个写着提交号的小文件。建分支 = 写一行字，快到不需要思考。**

## 一、分支到底是什么

在 `.git/refs/heads/` 目录下，每个分支就是一个文本文件，内容只有一个提交号：

```
.git/refs/heads/main   → 内容：3f335f5...（40 位）
.git/refs/heads/dev    → 内容：93abea3...（40 位）
```

所以：

- 建分支不复制文件，只是**新写一个 41 字节的指针**——这也是「Git 建分支快到离谱」的原因；
- SVN 时代「开分支很重」的恐惧，在 Git 里可以扔掉；
- `git branch` 列出的就是这些指针。

## 二、HEAD：你在哪

- `HEAD` 是一个特殊指针，**通常指向某个分支**，跟着当前分支一起前进；
- `cat .git/HEAD` 会看到 `ref: refs/heads/main`——意思是「我在 main 上」；
- 每次提交，Git 做三件事：拍快照 → 新提交指向父提交 → **当前分支指针前移一格**。

所谓「切分支」，本质是把 HEAD 指到另一个分支指针上，工作区文件随之变魔术。

## 三、指针实验：眼见为实

```bash
git init lab && cd lab
echo v1 > f.txt && git add . && git commit -m "v1"
git branch dev                 # 只是指了指当前提交，没有任何复制
git log --oneline --all --graph
git switch dev                 # HEAD 移动
echo v2 > f.txt && git add . && git commit -m "v2 on dev"
git log --oneline --all --graph   # dev 在前，main 不动
```

`git switch dev`（老版本用 `git checkout dev`）后提交，dev 指针前进而 main 原地不动——两条历史就此分叉，全程没有复制过任何文件。

## 四、detach HEAD：直接站到提交上

```bash
git checkout a1b2c3d
```

提示 `You are in 'detached HEAD' state`：HEAD 越过分支直接指着某个提交。可以随便看（编译、调试旧版本），但在这里做的提交没有分支认领，一切换就走丢——要么先建分支再改，要么只是看看就走。

## 五、动手实验

1. 建两个分支，各提交一次，用 `git log --oneline --graph --all` 观察分叉形状；
2. `cat .git/HEAD`、`cat .git/refs/heads/*`（Windows 用 `type`），亲眼确认「分支=文件」；
3. 在 dev 上提交后切回 main，工作区文件**真的变了回来**——体会一下指针切换带来的文件魔术；
4. 制造一次 detached HEAD，看看提示语，然后 `git switch -` 回来。

## 六、本课小结

- 分支 = 41 字节的指针文件，创建零成本；
- HEAD 指分支、分支指提交，提交时指针链整体前移；
- detached HEAD 只是「站在提交上看」，提交前先落个分支。

> 下一篇：merge 与冲突处理（待写）
