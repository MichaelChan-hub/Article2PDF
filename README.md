# 网页转 PDF 工具站（Next.js 14）

一个将网络文章/博客一键转换为可编辑并可下载的 PDF 的网站工具。基于 Next.js 14 构建，内置解析、编辑与导出全流程。

## 功能特性

- **链接解析**：输入网页链接，后端抓取并提取标题与正文
- **富文本编辑**：在预览页用 React Quill 所见即所得编辑
- **PDF 导出**：jsPDF + html2canvas 客户端生成多页 PDF
- **良好体验**：加载状态、错误提示、深色模式、响应式布局

## 快速开始

1) 安装依赖
```bash
npm install
```

2) 启动开发环境
```bash
npm run dev
```

打开 `http://localhost:3000`。

3) 构建与运行生产环境
```bash
npm run build
npm run start
```

## 使用流程

1. 在首页粘贴文章链接，点击“生成 PDF”
2. 跳转到预览页，标题与正文已自动填充
3. 在富文本编辑器中进行微调（加粗、标题、列表、图片等）
4. 点击“生成 PDF”下载到本地

## 核心页面与文件

- `app/page.tsx`：首页，输入链接并调用解析 API，成功后跳转预览
- `app/api/parse/route.ts`：解析 API，抓取并提取网页主体内容
- `app/preview/page.tsx`：预览/编辑/导出页面（React Quill + jsPDF + html2canvas）
- `app/layout.tsx`：根布局与 SEO 元信息
- `app/globals.css`：全局样式与 Tailwind 导入

项目结构（核心部分）：
```
app/
├── api/
│   └── parse/route.ts        # 解析网页内容 API
├── preview/page.tsx          # 预览/编辑/导出 PDF 页面
├── page.tsx                  # 首页（输入链接）
├── layout.tsx                # 根布局与元信息
└── globals.css               # 全局样式
```

## 技术栈

- Next.js 14（App Router）
- React 18
- TypeScript 5
- Tailwind CSS 3
- cheerio（解析 HTML）
- react-quill（富文本编辑器）
- jsPDF + html2canvas（客户端生成 PDF）

## 解析与导出原理

- **解析**（Server）
  - 使用 `fetch(url)` 获取 HTML
  - 用 `cheerio` 解析 DOM，优先选择常见正文选择器：`article/.post-content/.entry-content/main/...`
  - 清理脚本、样式、广告、评论等噪声节点
  - 选取标题：`h1/title/og:title` 等
  - 返回 `{ title, content, url }`

- **编辑**（Client）
  - 通过 URLSearchParams 接收 `title` 与 `content`
  - `ReactQuill` 进行所见即所得编辑

- **导出**（Client）
  - 在隐藏容器中按 A4 宽度渲染 HTML
  - `html2canvas` 截取为高分辨率 canvas
  - `jsPDF` 进行分页、插入图片并保存为 PDF 文件

## API 说明

`POST /api/parse`

Request body
```json
{ "url": "https://example.com/article" }
```

Response body
```json
{
  "title": "文章标题",
  "content": "<p>解析后的 HTML 正文...</p>",
  "url": "https://example.com/article"
}
```

可能的错误
- 400：URL 缺失或格式不正确
- 4xx/5xx：目标站点不可访问或拒绝访问
- 500：解析异常

## 开发与定制

- 想提升正文提取准确性，可扩展 `contentSelectors` 与噪声过滤规则（`app/api/parse/route.ts`）。
- 想改导出样式，可调整预览页中隐藏容器的样式（`app/preview/page.tsx` 中 `handleGeneratePDF`）。
- 想支持 Markdown：可在解析后将 HTML 转为 Markdown，或在编辑器替换为 Markdown 编辑器（如 `react-markdown` + `remark` 生态）。
- 想服务端生成高质量 PDF：可新增 API 使用 `puppeteer`/`playwright` 渲染为 PDF（需服务器环境，体积较大）。

## 常见问题（FAQ）

- **某些站点解析不到正文？**
  - 不同站点 DOM 结构差异大，可按站点扩展选择器或使用 Readability 等通用算法。

- **图片跨域不显示或分辨率低？**
  - `html2canvas` 受 CORS 限制，建议确保图片支持跨域或下载转为 Data URL；同时提高 `scale` 参数。

- **生成的 PDF 排版不完美？**
  - 通过在隐藏容器内使用更精细的 CSS 控制排版（如段前后距、分页控制）。

- **目标站点反爬虫阻拦？**
  - 简单的 UA 伪装已配置，但极端情况下可能失败；可考虑服务端代理或队列重试策略。

## 法律与合规

请确保仅对有权限保存与传播的内容生成 PDF，遵守目标站点的使用条款与版权法规。本工具不对不当使用承担责任。

## 路线图（Roadmap）

- 支持批量导入链接与合并导出
- 目录/页码/页眉页脚模板化
- 服务端（无头浏览器）高保真 PDF 导出
- 文章去重与历史记录
- 国际化完善与主题定制

## 开源协议

MIT License

---

补充学习资料仍可参考：`QUICKSTART.md` 与 `NEXTJS学习指南.md`。
