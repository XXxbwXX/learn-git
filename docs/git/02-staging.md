# 02 · 暂存区的意义：为什么是 add + commit 两步

> 记忆锚点：**commit 拍的是「候选名单」，不是整个目录——名单由你手动挑选。**

## 一、为什么要有暂存区

没有暂存区的版本控制（很多老工具）只有两种选择：全部提交，或者不提交。暂存区插入在两者之间，带来一个关键能力：

> **把一次改动拆成几个干净的提交。**

典型场景：你同时改了两个不相关的东西——修了一个 bug、顺手格式化了另一个文件。有了暂存区，可以：

```bash
git add bugfix.js
git commit -m "fix: 修复解析空行的崩溃"

git add format.js
git commit -m "style: 统一缩进"
```

两个提交各说各的事，回退、审查、revert 都方便。混在一个提交里，以后想单独撤销格式化就得靠手术。

## 二、add 的几种姿势

| 命令 | 范围 |
|---|---|
| `git add 文件名` | 只候选指定文件 |
| `git add .` | 当前目录下的所有改动（含新文件） |
| `git add -A` | 整个仓库的所有改动（含删除） |
| `git add -p` | **逐块挑选**：同一个文件里只候选部分改动 |

`git add -p` 是拆提交的神器：它会把你在一个文件里的多处改动按块（hunk）展示，逐块问你 `y/n`。

## 三、看清楚两步之间的差别

```bash
git diff            # 工作区 vs 暂存区：还没 add 的改动
git diff --staged   # 暂存区 vs 最近提交：即将被 commit 的内容
```

提交前跑 `git diff --staged` 过一遍候选名单，是防手滑的第一道闸。

## 四、把文件移出候选名单

```bash
git restore --staged note.txt   # 撤销候选（文件内容不动；老版本 Git 用 git reset HEAD note.txt）
```

注意：这只是把文件从「名单」里拿掉，你写的东西一个字都不会丢。

## 五、动手实验

1. 在 git-lab 里同时改两个文件 `a.txt`、`b.txt`；
2. 只 `git add a.txt`，跑 `git status`——确认 b 在红区、a 在绿区；
3. `git diff --staged` 只能看到 a 的改动；
4. commit 后再看 status，b 仍在等你；
5. 试试 `git add -p` 制造一个文件内多处改动，逐块挑选。

## 六、本课小结

- 暂存区 = 提交候选名单，价值在于**拆分提交**；
- `diff` 与 `diff --staged` 分别看守两道边界；
- `restore --staged` 撤销候选，内容无损。

> 下一篇：[提交信息与提交粒度](/git/03-commit-message)
