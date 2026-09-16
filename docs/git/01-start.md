# 01 · Git 是什么：快照，不是差异

> 记忆锚点：**Git 给目录拍快照，差异是算出来的，不是存出来的。**

## 一、最常见的误解

很多教程说「Git 记录文件的改动（差异）」——这是 CVS/Subversion 时代的直觉。Git 实际做的是：

- 每次提交，给**整个项目当前的样子**拍一张全景快照；
- 没变的文件用**指针**引用上一次的版本，不变就不重复存；
- 你看到的「差异」（`git diff`）是两个快照**现场计算**出来的。

理解「快照 + 指针」，后面分支、合并、回退的行为就都不神秘了。

## 二、三区模型：命令背后的舞台

| 区域 | 是什么 | 涉及命令 |
|---|---|---|
| 工作区 | 你正在编辑的目录 | 编辑器直接改 |
| 暂存区 | 下次快照的「候选名单」 | `git add` |
| 仓库 | 已经拍下的快照历史 | `git commit` |

- `git status` 看的就是这三区之间的差距；
- `add` 不是「上传」，只是把文件放进候选名单；
- `commit` 是把候选名单拍成一张快照，永久入库。

```bash
git status   # 三区状态一览：改了什么、候选了什么、提交了什么
```

## 三、上手五连

```bash
# 0. 首次安装先自报家门（--global 对本机所有仓库生效）
git config --global user.name  "你的名字"
git config --global user.email "你的邮箱"

# 1. 把当前目录变成 Git 仓库（生成 .git 隐藏目录）
git init

# 2. 新建一个文件，随便写点什么
echo "hello git" > note.txt

# 3. 放进候选名单
git add note.txt

# 4. 拍快照
git commit -m "第一次提交：加入 note.txt"

# 5. 看历史
git log --oneline
```

`git log --oneline` 输出里每个提交前面有一串短码（如 `a1b2c3d`），它是快照的「编号」，也是后续一切回退、分支操作的坐标。

## 四、动手实验

1. 建一个试验目录 `mkdir git-lab && cd git-lab && git init`；
2. 修改 `note.txt` 后先跑 `git status`，读一遍输出里的三段话（工作区改动 / 暂存区候选 / 未跟踪文件）；
3. `git add` 之后再跑一次 `git status`，注意同一文件从红变绿；
4. `git commit` 后第三次 `git status`，应该干净（working tree clean）；
5. 把三次 `git status` 的输出并排对比——这就是三区模型的直观理解。

## 五、本课小结

- Git = 快照 + 指针，不是差异；
- 三区模型：工作区（改）→ 暂存区（add）→ 仓库（commit）；
- `status` 是最常用的命令：动手前先看一眼，永远不吃亏。

> 下一篇：[暂存区的意义——为什么是 add + commit 两步](/git/)（待写）
