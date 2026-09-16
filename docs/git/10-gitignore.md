# 10 · .gitignore 与「已经提交了敏感文件怎么办」

> 记忆锚点：**.gitignore 只拦「未跟踪」的文件——已经入库的，它管不着；入库即泄露，撤库要连历史一起撤。**

## 一、.gitignore 的正确打开方式

```
# 注释：按行生效
node_modules/       # 斜杠结尾 = 只匹配目录
*.log               # 通配所有 .log 文件
.env*               # .env、.env.local 全家
!important.log      # 感叹号 = 例外， Track 它
/dist               # 只忽略根目录的 dist，不动子目录里的
```

三个高频疑问：

- **已经提交的文件再写进 .gitignore 没用**——它只拦未跟踪文件。已跟踪的要先 `git rm --cached 文件`（从仓库移除但留在磁盘），提交后 ignore 才生效；
- `git check-ignore -v 文件名` 可以查「这个文件被哪条规则拦了」；
- 全局忽略：`git config --global core.excludesFile ~/.gitignore_global`，放编辑器配置、`.DS_Store` 这类与项目无关的。

## 二、手滑提交了密钥：止血四步

假设 `config.js` 里有一把 API key 已经 push 到公开仓库：

**1. 让密钥立刻失效（最重要，永远排第一）**
去服务商后台**吊销 / 轮换**这把 key。历史改得再干净，爬虫可能已经缓存——只有作废才是真安全。

**2. 从当前版本移除**
`git rm --cached config.js`，写进 .gitignore，提交。

**3. 从历史中抹除**
`git filter-repo --path config.js --invert-paths`（需要装 `git-filter-repo`；老教程里的 `filter-branch` 已不推荐）。这会改写全部历史、换掉所有涉及提交的编号，之后强制推送覆盖远程（团队仓库需所有人重新 clone）。

**4. 亡羊补牢检查**
在服务商后台搜索仓库历史确认无残留；有条件的话给仓库开 secret scanning。

## 三、预防清单（提交前 10 秒过一遍）

- `.env*`、token、密钥文件进 .gitignore 了吗？
- 日志、构建产物、`node_modules` 排除了吗？
- 截图 / 文档里有没有顺手截进去的密码？
- 第一次 push 前用 `git log -p` 扫一遍全部新增内容。

## 四、动手实验

1. 建一个 `secret.txt` 并提交，然后补写 .gitignore——观察 `git status` 里它**照样有改动提示**（证明 ignore 不追溯）；
2. `git rm --cached secret.txt` + 提交，再看它消失且磁盘仍在；
3. `git check-ignore -v secret.txt` 找到生效规则；
4. 全程用 `git log --oneline --stat` 观察每一步仓库里发生了什么。

## 五、本课小结

- ignore 不追溯已跟踪文件，`rm --cached` + 提交才生效；
- 密钥入库：轮换 > 移除 > 滤历史 > 复查，顺序不能反；
- 提交前 10 秒扫一遍，胜过事后四步补救。

## 全书完

十个课时走完：快照模型 → 三区工作流 → 提交规范 → 历史查案 → 分支指针 → merge/rebase → 远程协作 → 三大后悔药 → 敏感文件自救。回到 [课程目录](/git/) 复习，或在动手实验里见真章。
