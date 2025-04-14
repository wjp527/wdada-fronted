/**
 * 权限定义
 */
enum ACCESS_ENUM {
  NOT_LOGIN = 'not_login',  // 未登录可访问
  USER = 'user',           // 用户可访问
  ADMIN = 'admin',        // 管理员可访问
}

export default ACCESS_ENUM