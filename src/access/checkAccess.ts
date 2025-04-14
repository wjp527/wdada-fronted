import ACCESS_ENUM from '@/access/accessEnum'

/**
 * 检查当前用户是否有权限访问某个页面
 * @param loginUser 当前登录用户信息
 * @param needAccess 当前页面需要的权限
 */
const checkAccess = (loginUser: API.LoginUserVO, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前登录用户具有的权限(如果没有loginUser，则表示未登录)
  const loginUserAccess = loginUser.userRole ?? ACCESS_ENUM.NOT_LOGIN
  // 无需登录即可访问的页面，直接返回true
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true
  }

  // 如果用户要登录才能访问
  if (needAccess == ACCESS_ENUM.USER) {
    // 如果用户没有登陆，那么表示无权限
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false
    }
  }

  // 如果管理员才能访问
  if (needAccess == ACCESS_ENUM.ADMIN) {
    // 不是管理员权限，禁止访问
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
}

export default checkAccess