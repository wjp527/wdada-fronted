/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { routes } from '../../router/routes';
import { ref, computed } from 'vue';
import checkAccess from '@/access/checkAccess';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useLoginUserStore } from '@/store/User';
import { storeToRefs } from 'pinia';
const loginUserStore = useLoginUserStore();
// 登录用户信息
const { defineName, loginUser } = storeToRefs(loginUserStore);
// 可见的菜单
const visibleRoutes = computed(() => {
    return routes.filter(item => {
        if (item.meta?.hideInMenu) {
            return false;
        }
        // 根据权限过滤菜单
        if (!checkAccess(loginUserStore.loginUser, item?.meta?.access)) {
            return false;
        }
        return true;
    });
});
// 初始化登录用户信息
const initLoginUser = () => {
    loginUserStore.fetchLoginUserAsync();
};
initLoginUser();
// 当前选中的菜单项的 key 数组
const selectedKey = ref(['/']);
router.afterEach(to => {
    selectedKey.value = [to.path];
});
// 跳转首页
const handleHome = () => {
    router.push('/');
};
// 导航栏之间的跳转
const handleTo = (item) => {
    console.log(123);
    router.push(item.path);
};
// 登录
const handleLogin = () => {
    router.replace('/user/login');
};
// 退出登录
const handleLogout = () => {
    // 退出登录操作
    loginUserStore.logoutLoginUserAsync();
    // 重新获取登录用户信息
    initLoginUser();
    router.replace('/user/login');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "GlobalHeader" },
});
const __VLS_0 = {}.ARow;
/** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "grid-demo" },
    align: "center",
    wrap: (false),
}));
const __VLS_2 = __VLS_1({
    ...{ class: "grid-demo" },
    align: "center",
    wrap: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    flex: "auto",
}));
const __VLS_6 = __VLS_5({
    flex: "auto",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.AMenu;
/** @type {[typeof __VLS_components.AMenu, typeof __VLS_components.aMenu, typeof __VLS_components.AMenu, typeof __VLS_components.aMenu, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    mode: "horizontal",
    selectedKeys: (__VLS_ctx.selectedKey),
    defaultSelectedKeys: (['1']),
}));
const __VLS_10 = __VLS_9({
    mode: "horizontal",
    selectedKeys: (__VLS_ctx.selectedKey),
    defaultSelectedKeys: (['1']),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.AMenuItem;
/** @type {[typeof __VLS_components.AMenuItem, typeof __VLS_components.aMenuItem, typeof __VLS_components.AMenuItem, typeof __VLS_components.aMenuItem, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onClick': {} },
    key: "0",
    ...{ style: ({ padding: 0, marginRight: '38px' }) },
}));
const __VLS_14 = __VLS_13({
    ...{ 'onClick': {} },
    key: "0",
    ...{ style: ({ padding: 0, marginRight: '38px' }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onClick: (__VLS_ctx.handleHome)
};
__VLS_15.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "titlebar flex items-center justify-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "@/assets/logo.png",
    alt: "",
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-sm text-black-300 dark:text-black-400" },
});
var __VLS_15;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.visibleRoutes))) {
    const __VLS_20 = {}.AMenuItem;
    /** @type {[typeof __VLS_components.AMenuItem, typeof __VLS_components.aMenuItem, typeof __VLS_components.AMenuItem, typeof __VLS_components.aMenuItem, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ 'onClick': {} },
        key: (item.path),
    }));
    const __VLS_22 = __VLS_21({
        ...{ 'onClick': {} },
        key: (item.path),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_24;
    let __VLS_25;
    let __VLS_26;
    const __VLS_27 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleTo(item);
        }
    };
    __VLS_23.slots.default;
    (item.name);
    var __VLS_23;
}
var __VLS_11;
var __VLS_7;
const __VLS_28 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    flex: "100px",
}));
const __VLS_30 = __VLS_29({
    flex: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (!__VLS_ctx.loginUser.id) {
    const __VLS_32 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_34 = __VLS_33({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onClick: (__VLS_ctx.handleLogin)
    };
    __VLS_35.slots.default;
    var __VLS_35;
}
else {
    const __VLS_40 = {}.ADropdown;
    /** @type {[typeof __VLS_components.ADropdown, typeof __VLS_components.aDropdown, typeof __VLS_components.ADropdown, typeof __VLS_components.aDropdown, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        popupMaxHeight: (false),
    }));
    const __VLS_42 = __VLS_41({
        popupMaxHeight: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_43.slots.default;
    const __VLS_44 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
    const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_47.slots.default;
    (__VLS_ctx.loginUser.userName || __VLS_ctx.defineName);
    const __VLS_48 = {}.IconDown;
    /** @type {[typeof __VLS_components.IconDown, typeof __VLS_components.iconDown, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
    const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
    var __VLS_47;
    {
        const { content: __VLS_thisSlot } = __VLS_43.slots;
        const __VLS_52 = {}.ADoption;
        /** @type {[typeof __VLS_components.ADoption, typeof __VLS_components.aDoption, typeof __VLS_components.ADoption, typeof __VLS_components.aDoption, ]} */ ;
        // @ts-ignore
        const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
        const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
        __VLS_55.slots.default;
        var __VLS_55;
        const __VLS_56 = {}.ADoption;
        /** @type {[typeof __VLS_components.ADoption, typeof __VLS_components.aDoption, typeof __VLS_components.ADoption, typeof __VLS_components.aDoption, ]} */ ;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
            ...{ 'onClick': {} },
        }));
        const __VLS_58 = __VLS_57({
            ...{ 'onClick': {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        let __VLS_60;
        let __VLS_61;
        let __VLS_62;
        const __VLS_63 = {
            onClick: (__VLS_ctx.handleLogout)
        };
        __VLS_59.slots.default;
        var __VLS_59;
    }
    var __VLS_43;
}
var __VLS_31;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['GlobalHeader']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['titlebar']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-black-300']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-black-400']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            defineName: defineName,
            loginUser: loginUser,
            visibleRoutes: visibleRoutes,
            selectedKey: selectedKey,
            handleHome: handleHome,
            handleTo: handleTo,
            handleLogin: handleLogin,
            handleLogout: handleLogout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
