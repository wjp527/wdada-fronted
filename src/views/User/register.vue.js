/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { reactive } from 'vue';
import message from '@arco-design/web-vue/es/message';
import { useRouter } from 'vue-router';
import { useLoginUserStore } from '@/store/user';
import { userRegisterUsingPost } from '@/api/userController';
/**
 * 表单信息
 */
const form = reactive({
    userAccount: '',
    userPassword: '',
    checkPassword: '',
});
const router = useRouter();
const loginUserStore = useLoginUserStore();
/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
    const res = await userRegisterUsingPost(form);
    // 登录成功，跳转到主页
    if (res.data.code === 0) {
        message.success('注册成功');
        router.push({
            path: '/user/login',
            replace: true,
        });
    }
    else {
        message.error('注册失败，' + res.data.message);
    }
};
/**
 * 跳转到登录页面
 */
const handleTo = (path) => {
    router.push(path);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "user-register",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ style: {} },
});
const __VLS_0 = {}.AForm;
/** @type {[typeof __VLS_components.AForm, typeof __VLS_components.aForm, typeof __VLS_components.AForm, typeof __VLS_components.aForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSubmit': {} },
    ...{ style: {} },
    labelAlign: "left",
    autoLabelWidth: true,
    model: (__VLS_ctx.form),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSubmit': {} },
    ...{ style: {} },
    labelAlign: "left",
    autoLabelWidth: true,
    model: (__VLS_ctx.form),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onSubmit: (__VLS_ctx.handleSubmit)
};
__VLS_3.slots.default;
const __VLS_8 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    field: "userAccount",
    label: "账号",
}));
const __VLS_10 = __VLS_9({
    field: "userAccount",
    label: "账号",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.form.userAccount),
    placeholder: "请输入账号",
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_ctx.form.userAccount),
    placeholder: "请输入账号",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
var __VLS_11;
const __VLS_16 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    field: "userPassword",
    tooltip: "密码不少于 8 位",
    label: "密码",
}));
const __VLS_18 = __VLS_17({
    field: "userPassword",
    tooltip: "密码不少于 8 位",
    label: "密码",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.AInputPassword;
/** @type {[typeof __VLS_components.AInputPassword, typeof __VLS_components.aInputPassword, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.form.userPassword),
    placeholder: "请输入密码",
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.form.userPassword),
    placeholder: "请输入密码",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
var __VLS_19;
const __VLS_24 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    field: "checkPassword",
    tooltip: "密码不少于 8 位",
    label: "密码",
}));
const __VLS_26 = __VLS_25({
    field: "checkPassword",
    tooltip: "密码不少于 8 位",
    label: "密码",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.AInputPassword;
/** @type {[typeof __VLS_components.AInputPassword, typeof __VLS_components.aInputPassword, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    modelValue: (__VLS_ctx.form.checkPassword),
    placeholder: "请再次输入密码",
}));
const __VLS_30 = __VLS_29({
    modelValue: (__VLS_ctx.form.checkPassword),
    placeholder: "请再次输入密码",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
var __VLS_27;
const __VLS_32 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    type: "text",
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    type: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_40;
let __VLS_41;
let __VLS_42;
const __VLS_43 = {
    onClick: (...[$event]) => {
        __VLS_ctx.handleTo('/user/login');
    }
};
__VLS_39.slots.default;
var __VLS_39;
var __VLS_35;
const __VLS_44 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
const __VLS_48 = {}.WButton;
/** @type {[typeof __VLS_components.WButton, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    ...{ 'onClick': {} },
    text: "注册",
}));
const __VLS_50 = __VLS_49({
    ...{ 'onClick': {} },
    text: "注册",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_52;
let __VLS_53;
let __VLS_54;
const __VLS_55 = {
    onClick: (__VLS_ctx.handleSubmit)
};
var __VLS_51;
var __VLS_47;
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
