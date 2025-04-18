/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { reactive } from 'vue';
import message from '@arco-design/web-vue/es/message';
import { useRouter } from 'vue-router';
import { useLoginUserStore } from '@/store/user';
import { userLoginUsingPost } from '@/api/userController';
/**
 * 表单信息
 */
const form = reactive({
    userAccount: '',
    userPassword: '',
});
const router = useRouter();
const loginUserStore = useLoginUserStore();
/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
    const res = await userLoginUsingPost(form);
    // 登录成功，跳转到主页
    if (res.data.code === 0) {
        await loginUserStore.fetchLoginUserAsync();
        message.success('登录成功');
        setTimeout(() => {
            router.push({
                path: '/',
                replace: true,
            });
        }, 300);
    }
    else {
        message.error('登录失败，' + res.data.message);
    }
};
/**
 * 跳转到注册页面
 */
const handleTo = (path) => {
    router.push(path);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "user-login",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ style: {} },
});
const __VLS_0 = {}.AForm;
/** @type {[typeof __VLS_components.AForm, typeof __VLS_components.aForm, typeof __VLS_components.AForm, typeof __VLS_components.aForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ style: {} },
    labelAlign: "left",
    autoLabelWidth: true,
    model: (__VLS_ctx.form),
}));
const __VLS_2 = __VLS_1({
    ...{ style: {} },
    labelAlign: "left",
    autoLabelWidth: true,
    model: (__VLS_ctx.form),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    field: "userAccount",
    label: "账号",
}));
const __VLS_6 = __VLS_5({
    field: "userAccount",
    label: "账号",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    modelValue: (__VLS_ctx.form.userAccount),
    placeholder: "请输入账号",
}));
const __VLS_10 = __VLS_9({
    modelValue: (__VLS_ctx.form.userAccount),
    placeholder: "请输入账号",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
var __VLS_7;
const __VLS_12 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    field: "userPassword",
    tooltip: "密码不少于 8 位",
    label: "密码",
}));
const __VLS_14 = __VLS_13({
    field: "userPassword",
    tooltip: "密码不少于 8 位",
    label: "密码",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.AInputPassword;
/** @type {[typeof __VLS_components.AInputPassword, typeof __VLS_components.aInputPassword, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    modelValue: (__VLS_ctx.form.userPassword),
    placeholder: "请输入密码",
}));
const __VLS_18 = __VLS_17({
    modelValue: (__VLS_ctx.form.userPassword),
    placeholder: "请输入密码",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
var __VLS_15;
const __VLS_20 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
const __VLS_24 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    ...{ 'onClick': {} },
    type: "text",
}));
const __VLS_26 = __VLS_25({
    ...{ 'onClick': {} },
    type: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_28;
let __VLS_29;
let __VLS_30;
const __VLS_31 = {
    onClick: (...[$event]) => {
        __VLS_ctx.handleTo('/user/register');
    }
};
__VLS_27.slots.default;
var __VLS_27;
var __VLS_23;
const __VLS_32 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.WButton;
/** @type {[typeof __VLS_components.WButton, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    text: "登录",
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    text: "登录",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_40;
let __VLS_41;
let __VLS_42;
const __VLS_43 = {
    onClick: (__VLS_ctx.handleSubmit)
};
var __VLS_39;
var __VLS_35;
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            form: form,
            handleSubmit: handleSubmit,
            handleTo: handleTo,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
