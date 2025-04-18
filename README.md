# π 智链

> 作者：[wjp](https://github.com/wjp527)
> [代码](https://github.com/wjp527/wdada-fronted)

# 介绍

这是一个基于Vue3+SpringBoot + COS + ChatGLM AI + RxJava + SSE 的AI应用答题平台。

前台用户可以基于AI快速生成应用题目并发布各种答题应用，支持检索和分享应用、在线答题并基于多种评分算法或AI得到的回答总结。

后台管理员可以进行审核应用、集中管理数据，并进行数据分析。



# 技术栈

## 前端

- Vue3
- Vite 脚手架
- Axios 请求库
- Arco Design 组件库
- 前端工程化: ESLint + Prettier + TypeScript
- QRCode.js 二维码生成
- Pinia 全局状态管理器
- OpenAPI 前端代码生成



## 后端

- Java
- SpringBoot2 框架
- 存储存: MySql + Redis + Caffeine + 腾讯云COS对象存储
- MyBatis-Plus 及 MyBatis X自动生成
- Redisson 分布式锁
- 基于 ChatGLM 大模型的通用AI能力
- RxJava响应式框架 + 线程池隔离实战
- SSE服务端推送
- 幂等设计 + 分布式ID雪花算法
- 多种设计模式
