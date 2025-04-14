/**
 * 权限定义
 */
enum ACCESS_ENUM {
  NOT_LOGIN = 'NOT_LOGIN',  // 未登录可访问
  USER = 'USER',           // 用户可访问
  ADMIN = 'ADMIN',        // 管理员可访问
}

export default ACCESS_ENUM