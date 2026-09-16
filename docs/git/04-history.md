# 04 · log / diff / show：看清历史

> 记忆锚点：**历史不是用来背的，是用来查案的——查案三件套：log 找线索，diff 看改动，show 看全貌。**

## 一、log：从粗到细的四档分辨率

```bash
git log --oneline                 # 一行一提交：最快扫全局
git log --oneline -5              # 只看最近 5 条
git log --oneline --graph --all   # 带分支图（分叉/合并一目了然）
git log -p 文件名                  # 追踪一个文件的完整改动史
```

大仓库日常只用前两档；排查合并问题看 `--graph`；「这行代码为什么这么写」用 `-p` 对着文件翻。

再冷门一点的过滤：

```bash
git log --oneline --grep="fix"    # 按提交信息搜
git log --oneline --author="名字"  # 按作者筛
```

## 二、diff：三个方向的比较

上一课见过两个，这里补全成「三连」，对应三区模型里任意两边：

```bash
git diff              # 工作区 → 暂存区（还没 add 的）
git diff --staged     # 暂存区 → 最近提交（即将 commit 的）
git diff HEAD~1 HEAD  # 上一提交 → 当前提交（这次 commit 改了什么）
```

`HEAD` 指当前提交，`HEAD~1` 是它的上一步，`HEAD~2` 上两步——这套坐标在下一章分支里会大量出现。

## 三、show：给单个提交拍特写

```bash
git show a1b2c3d        # 这个提交的完整信息 + 全部改动
git show a1b2c3d:文件名  # 只看那个提交时刻的某个文件
```

`log` 找到嫌疑提交，`show` 把它摊开——两步走完查案闭环。

## 四、blame：逐行追责

```bash
git blame 文件名
```

每一行末尾标着「最后一次改动它的提交号 + 作者 + 时间」。别被名字吓到，它的正确用法不是追责，而是**找到改动的上下文**：看到可疑行，抄下提交号，接一个 `git show` 看当时为什么改。

## 五、动手实验

1. 在 git-lab 里连续做 3 次不同改动、分别提交；
2. `git log --oneline` 确认三条记录；`git show HEAD` 看最新一次的完整 diff；
3. `git diff HEAD~2 HEAD` 一次性对比三个提交的总变化；
4. `git blame note.txt` 找到每行对应的提交号。

## 六、本课小结

- log 四档分辨率：oneline / 限条数 / --graph / -p 文件史；
- diff 三连对应三区模型任意两边，外加 `HEAD~n` 坐标；
- show 看单提交，blame 查单行出处——查案闭环。

> 下一篇：分支与 HEAD：指针游戏（待写）
