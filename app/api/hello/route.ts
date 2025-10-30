/**
 * API 路由示例
 * 
 * 文件路径: app/api/hello/route.ts
 * 访问路径: /api/hello
 * 
 * 这个文件演示了 Next.js 的 API 路由功能
 * 可以处理 GET、POST、PUT、DELETE 等 HTTP 方法
 */
import { NextResponse } from 'next/server'

// 处理 GET 请求
export async function GET() {
  // 模拟获取数据
  const data = {
    message: 'Hello from Next.js API!',
    timestamp: new Date().toISOString(),
    status: 'success'
  }

  // 返回 JSON 响应
  return NextResponse.json(data)
}

// 处理 POST 请求
export async function POST(request: Request) {
  // 从请求中获取数据
  const body = await request.json()

  // 处理数据...
  const response = {
    message: 'Data received successfully',
    receivedData: body,
    timestamp: new Date().toISOString()
  }

  return NextResponse.json(response, { status: 201 })
}

// 可选：其他 HTTP 方法
// export async function PUT(request: Request) { ... }
// export async function DELETE(request: Request) { ... }

