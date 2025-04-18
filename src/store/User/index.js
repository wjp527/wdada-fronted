import ACCESS_ENUM from '@/access/accessEnum';
import { getLoginUserUsingGet, userLoginUsingPost, userLogoutUsingPost } from '@/api/userController';
import { defineStore } from 'pinia';
import { ref } from 'vue';
// 用户仓库
export const useLoginUserStore = defineStore('loginUserStore', () => {
    // 默认昵称
    const defineName = ref('佚名');
    // 用户登录信息
    const loginUser = ref({
        userName: '未登录'
    });
    // 设置用户登录信息
    const setLoginUser = (user) => {
        loginUser.value = user;
    };
    // 获取登录用户信息
    const fetchLoginUserAsync = async () => {
        const { data } = await getLoginUserUsingGet();
        if (data.code === 0 && data.data != null) {
            loginUser.value = data.data;
        }
        else {
            // 测试
            // setTimeout(() => {
            //   loginUser.value = {
            //     id: 1,
            //     userName: '已登录',
            //     userRole: ACCESS_ENUM.ADMIN
            //   }
            // }, 3000)
            loginUser.value = { userRole: ACCESS_ENUM.NOT_LOGIN };
        }
    };
    // 用户登录
    const loginUserAsync = async (payload) => {
        const { userAccount, userPassword } = payload;
        const { data } = await userLoginUsingPost({
            userAccount,
            userPassword
        });
        if (data.code == 200) {
            setLoginUser(data.data);
            return data.data;
        }
        else {
            return data.message;
        }
    };
    // 退出登录
    const logoutLoginUserAsync = async () => {
        loginUser.value = { userName: '未登录' };
        let { data } = await userLogoutUsingPost();
        console.log(data.data);
    };
    return {
        defineName,
        loginUser,
        setLoginUser,
        fetchLoginUserAsync,
        loginUserAsync,
        logoutLoginUserAsync
    };
}, {
    // 持久化插件
    persist: true,
});
