import { generateService } from '@umijs/openapi'

generateService({
  // 自己定义的请求方法
  requestLibPath: "import request from '@/request'",
  // 接口文档地址
  schemaPath: "http://localhost:8101/api/v2/api-docs",
  serversPath: "./src",
});
