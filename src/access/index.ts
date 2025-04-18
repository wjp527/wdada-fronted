import router from '@/router'
import { useLoginUserStore } from '@/store/User'
import checkAccess from './checkAccess'
import ACCESS_ENUM from './accessEnum'
// 进入页面前，进行权限校验
router.beforeEach(async (to, from, next) => {
  // 获取当前登录用户信息
  const loginUserStore = useLoginUserStore()
  let loginUser = loginUserStore.loginUser

  // 如果之前没有尝试获取过登录信息，才自动获取
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等待用户登录成功并获取到值时，在执行后续操作
    await loginUserStore.fetchLoginUserAsync()
    loginUser = loginUserStore.loginUser
  }

  // 当前页面需要的权限
  const needAccess = (to.meta.access as string) ?? ACCESS_ENUM.NOT_LOGIN
  // 跳转的页面必须登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }

    console.log(!checkAccess(loginUser, needAccess), '-=--');
    // 如果已经登陆了，判断权限是否足够，如果不是，跳转到无权限的页面
    if (!checkAccess(loginUser, needAccess)) {
      next('/noAuth')
      return;
    }

  }
  next()
})
