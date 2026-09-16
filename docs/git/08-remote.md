# 08 · remote / push / pull / fetch 的关系

> 记忆锚点：**远程仓库只是「别人电脑上的同一个仓库」——push 是上载提交，fetch 是下载提交，pull = fetch + merge。**

## 一、远程不是另一套系统

GitHub 上的仓库和你本地的仓库**结构完全相同**，只是各自独立演化。Git 用一个别名记录远程地址：

```bash
git remote add origin git@github.com:you/repo.git   # 添加并命名
git remote -v                                        # 查看已登记的远程
```

`origin` 没有魔法含义，只是约定俗成的默认名——就像变量名。

## 二、克隆之后发生了什么

```bash
git clone git@github.com:you/repo.git
```

clone 做了三件事：完整复制仓库（含全部历史）→ 自动登记 `origin` → 把本地 main 指向 origin/main 的位置。

注意一个容易忽略的事实：**你的本地 main 和远程的 origin/main 是两个不同的指针**，它们的差距就是「你领先/落后了多少」。

## 三、四个命令一张图

```
        fetch (取回)          merge / rebase (整合)
远程 ──────────────→ origin/main ─────────────→ 本地 main
本地 main ─────────────────────────────────────→ 远程
                      push (上载提交)
```

| 命令 | 动作 | 动不动工作区 |
|---|---|---|
| `git fetch origin` | 下载远程新提交，更新 origin/* | **不动**（安全，只更新档案） |
| `git pull` | fetch + 把 origin/main 整合进当前分支 | 动 |
| `git push origin main` | 上载本地 main 的新提交 | 不动本地 |

`pull` 之前先 `fetch` + `git log HEAD..origin/main --oneline` 看一眼要进来什么，是老手习惯。

## 四、push 被拒绝：非快进

远程有了你本地没有的提交时，push 会被拒（`non-fast-forward`）——Git 防你覆盖别人的提交：

```bash
git fetch
git log HEAD..origin/main --oneline   # 看远程多了什么
git pull --rebase                     # 把自己的提交叠到远程新提交之上（推荐）
git push
```

这和第七章的黄金法则呼应：`pull --rebase` 整理的是**自己未共享的提交**，安全。

## 五、动手实验

没有第二台电脑也能练：**在本地磁盘再 clone 一次自己的仓库**（`git clone /path/to/lab lab2`），两个目录互为「远程」——push/pull/fetch 全流程随便玩，冲突随便造。

## 六、本课小结

- 远程 = 别处的同构仓库，origin 只是默认别名；
- fetch 只下载不动工作区，pull = fetch + 整合；
- push 被拒是保护机制：fetch 看差异 → pull --rebase → 再 push。

> 下一篇：[reset、revert、reflog：三大后悔药](/git/09-undo)
