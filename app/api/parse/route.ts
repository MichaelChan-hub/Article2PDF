import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // 验证URL格式
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // 获取网页内容
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.statusText}` },
        { status: response.status }
      )
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // 移除脚本和样式标签
    $('script, style, nav, header, footer, aside, .advertisement, .ads').remove()

    // 尝试提取文章标题
    let title = ''
    const titleSelectors = [
      'h1',
      'article h1',
      '.post-title',
      '.article-title',
      'title',
      '[property="og:title"]',
    ]

    for (const selector of titleSelectors) {
      const element = $(selector).first()
      if (element.length) {
        if (selector === '[property="og:title"]') {
          title = element.attr('content') || ''
        } else {
          title = element.text().trim()
        }
        if (title) break
      }
    }

    // 如果没有找到标题，使用页面title
    if (!title) {
      title = $('title').text().trim() || '未命名文章'
    }

    // 尝试提取文章内容
    let content = ''
    const contentSelectors = [
      'article',
      '.post-content',
      '.article-content',
      '.entry-content',
      'main',
      '.content',
      '#content',
      '[role="article"]',
    ]

    for (const selector of contentSelectors) {
      const element = $(selector).first()
      if (element.length) {
        // 克隆元素以避免修改原始DOM
        const clonedElement = element.clone()
        
        // 移除不需要的元素
        clonedElement.find('script, style, nav, .comments, .share-buttons, .sidebar, .related-posts').remove()
        
        // 获取HTML内容并清理
        content = clonedElement.html() || ''
        if (content.length > 100) break // 如果内容足够长，就使用它
      }
    }

    // 如果找不到特定的内容区域，使用body
    if (!content || content.length < 100) {
      const body = $('body').clone()
      body.find('script, style, nav, header, footer, aside, .advertisement, .ads, .comments').remove()
      content = body.html() || ''
    }

    // 清理HTML内容
    content = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .trim()

    if (!content) {
      return NextResponse.json(
        { error: 'Unable to extract content from the webpage' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      title,
      content,
      url: parsedUrl.toString(),
    })
  } catch (error) {
    console.error('Error parsing URL:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    )
  }
}


