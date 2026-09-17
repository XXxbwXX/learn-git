import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(docsDir, '..')

const stages = {
  'git': 'Git 与版本控制'
}

function buildSidebar() {
  const sidebar = {}
  for (const [dir, label] of Object.entries(stages)) {
    const absDir = path.join(srcDir, dir)
    const items = []
    if (fs.existsSync(absDir)) {
      for (const file of fs.readdirSync(absDir)) {
        if (!file.endsWith('.md')) continue
        const link = `/${dir}/${file.replace(/\.md$/, '')}`
        if (file === 'index.md') {
          items.unshift({ text: `${label} · 课程目录`, link })
        } else {
          let text = file.replace(/\.md$/, '')
          try {
            const head = fs.readFileSync(path.join(absDir, file), 'utf-8').slice(0, 500)
            const m = head.match(/^#\s+(.+)$/m)
            if (m) text = m[1].trim()
          } catch {}
          items.push({ text, link })
        }
      }
    }
    sidebar[`/${dir}/`] = [{ text: label, items }]
  }
  return sidebar
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'Git 与版本控制',
  description: '从第一次提交到分支协作：快照模型、三区工作流、分支与合并、冲突处理、事故恢复 —— git.myxbw.cn',
  sitemap: { hostname: 'https://git.myxbw.cn' },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' }],
    ['meta', { 'http-equiv': 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }]
  ],
  themeConfig: {
    siteTitle: '🌿 Git 与版本控制站',
    nav: [
      { text: '首页', link: '/' },
      { text: '课程目录', link: '/git/' },
      { text: '姊妹站', items: [
        { text: '🌐 全站导航（门户）', link: 'https://learn.myxbw.cn/' },
        { text: '🐧 Linux 与命令行', link: 'https://linux.myxbw.cn/' },
        { text: '🧱 Web 基础学习站', link: 'https://web-basics.myxbw.cn/' },
        { text: '🗄️ 数据库原理及其应用', link: 'https://mysql.myxbw.cn/' },
        { text: '🚩 CTF 学习站', link: 'https://ctf.myxbw.cn/' },
        { text: '🧰 开发者工具箱', link: 'https://tools.myxbw.cn/' },
        { text: '📝 个人博客', link: 'https://blog.myxbw.cn/' }
      ] }
    ],
    sidebar: buildSidebar(),
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    externalLinkIcon: true,
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清空关键词',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },
    footer: {
      message: '<a href="https://learn.myxbw.cn/">全站导航</a> · <a href="https://linux.myxbw.cn/">Linux 与命令行</a> · <a href="https://web-basics.myxbw.cn/">Web 基础</a> · <a href="https://mysql.myxbw.cn/">数据库</a> · <a href="https://ctf.myxbw.cn/">CTF 学习站</a> · <a href="https://tools.myxbw.cn/">开发者工具箱</a>',
      copyright: 'Copyright © 2026 Git 与版本控制'
    }
  }
})
