# 09 · reset、revert、reflog：三大后悔药

> 记忆锚点：**改自己没共享的 → reset（假装没发生）；改已共享的 → revert（反着再来一次）；全都忘了怎么走到这步的 → reflog（时光机档案）。**

## 一、reset：三档力度

`git reset` 把分支指针往回挪，三档区别在于**工作区和暂存区跟不跟着动**：

```bash
git reset --soft HEAD~1    # 只退指针：改动原样躺在暂存区，随时重新提交
git reset --mixed HEAD~1   # 默认档：改动回到工作区，暂存清空（unstage 重来）
git reset --hard HEAD~1    # 核弹档：工作区、暂存区、指针全部抹回上个提交
```

记忆法：**soft 留着候选，mixed 退回草稿，hard 什么都不留**。

`--hard` 前确认没有未提交的心血；它动的是本地历史，所以只对**还没 push 的提交**用（黄金法则再次生效）。

## 二、revert：对已共享历史的唯一礼貌

已经 push 的提交出问题了，不能抹历史（别人已经基于它工作），正确姿势是**反向提交**：

```bash
git revert a1b2c3d     # 生成一个「恰好抵消 a1b2c3d」的新提交
```

历史不做假账：错的留在那，对的把它对冲掉。团队协作里这是唯一无争议的反悔方式。

## 三、reflog：Git 的黑匣子

`git log` 记录的是分支可达的历史；`git reflog` 记录的是 **HEAD 每一次移动**——包括被 reset 掉的、rebase 掉的、merge 放弃的那些「消失的提交」：

```bash
git reflog
# a1b2c3d HEAD@{0}: reset: moving to HEAD~1
# e4f5g6h HEAD@{1}: commit: 那条被你 hard 掉的提交
```

`--hard` 手滑了？在 reflog 里找到出错前的位置，`git reset --hard e4f5g6h` 整个回来。**只要提交过的东西，90 天内基本都找得回来**（gc 默认至少保留 30~90 天）。

## 四、选择指南

| 情况 | 用药 |
|---|---|
| 提交信息写错 / 漏文件，未推送 | `commit --amend`（第三章） |
| 想拆开重来，未推送 | `reset --soft/mixed` |
| 整段不要了，未推送 | `reset --hard` |
| 已推送的提交有问题 | `revert` |
| 怀疑自己毁了人生 | `reflog` 找回 |

## 五、动手实验

1. 连做 3 次提交，`reset --soft HEAD~1` 后看 `status`（改动在暂存区）；
2. `reset --mixed HEAD~1` 后再看（改动回工作区）；
3. `reset --hard` 抹掉一个提交，然后 `git reflog` 找到它，再 reset 回来——**亲手体验一次时光倒流**；
4. revert 自己的一条历史提交，`log` 里确认对冲提交出现。

## 六、本课小结

- reset 三档：soft 留候选 / mixed 退草稿 / hard 全抹平，只碰未共享历史；
- revert 是反向提交，共享历史的唯一礼貌；
- reflog 是 HEAD 移动档案，提交过就找得回来。

> 下一篇：[.gitignore 与「已经提交了敏感文件怎么办」](/git/10-gitignore)
