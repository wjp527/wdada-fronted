/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
const props = defineProps({
    title: { type: String, default: 'Title' },
    modelValue: { type: Boolean, default: false },
    form: { type: Object, default: {} },
});
const emit = defineEmits(['update:modelValue', 'ok', 'cancel']);
const handleVisibilityChange = (visible) => {
    emit('update:modelValue', visible);
};
// 确定事件
const handleOk = () => {
    // 返回给父组件，父组件进行处理
    emit('ok');
};
// 取消事件
const handleCancel = () => {
    // 返回给父组件，父组件进行处理
    emit('cancel');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.AModal;
/** @type {[typeof __VLS_components.AModal, typeof __VLS_components.aModal, typeof __VLS_components.AModal, typeof __VLS_components.aModal, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:visible': {} },
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    visible: (__VLS_ctx.modelValue),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:visible': {} },
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    visible: (__VLS_ctx.modelValue),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    'onUpdate:visible': (__VLS_ctx.handleVisibilityChange)
};
const __VLS_8 = {
    onOk: (__VLS_ctx.handleOk)
};
const __VLS_9 = {
    onCancel: (__VLS_ctx.handleCancel)
};
var __VLS_10 = {};
__VLS_3.slots.default;
{
    const { title: __VLS_thisSlot } = __VLS_3.slots;
    (__VLS_ctx.title);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_11 = {}.AForm;
/** @type {[typeof __VLS_components.AForm, typeof __VLS_components.aForm, typeof __VLS_components.AForm, typeof __VLS_components.aForm, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    model: (__VLS_ctx.form),
}));
const __VLS_13 = __VLS_12({
    model: (__VLS_ctx.form),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_14.slots.default;
if (!__VLS_ctx.form.id) {
    const __VLS_15 = {}.AFormItem;
    /** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        field: "userAccount",
        label: "用户账号",
    }));
    const __VLS_17 = __VLS_16({
        field: "userAccount",
        label: "用户账号",
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    __VLS_18.slots.default;
    const __VLS_19 = {}.AInput;
    /** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        modelValue: (__VLS_ctx.form.userAccount),
        placeholder: "请输入用户账号",
    }));
    const __VLS_21 = __VLS_20({
        modelValue: (__VLS_ctx.form.userAccount),
        placeholder: "请输入用户账号",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    var __VLS_18;
}
const __VLS_23 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    field: "userName",
    label: "用户",
}));
const __VLS_25 = __VLS_24({
    field: "userName",
    label: "用户",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
__VLS_26.slots.default;
const __VLS_27 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    modelValue: (__VLS_ctx.form.userName),
    placeholder: "请输入用户名",
}));
const __VLS_29 = __VLS_28({
    modelValue: (__VLS_ctx.form.userName),
    placeholder: "请输入用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
var __VLS_26;
const __VLS_31 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    field: "userProfile",
    label: "用户简介",
}));
const __VLS_33 = __VLS_32({
    field: "userProfile",
    label: "用户简介",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
__VLS_34.slots.default;
const __VLS_35 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    modelValue: (__VLS_ctx.form.userProfile),
    placeholder: "请输入用户简介",
}));
const __VLS_37 = __VLS_36({
    modelValue: (__VLS_ctx.form.userProfile),
    placeholder: "请输入用户简介",
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
var __VLS_34;
const __VLS_39 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    field: "userAvatar",
    label: "用户头像",
}));
const __VLS_41 = __VLS_40({
    field: "userAvatar",
    label: "用户头像",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
__VLS_42.slots.default;
const __VLS_43 = {}.PictureUploader;
/** @type {[typeof __VLS_components.PictureUploader, typeof __VLS_components.PictureUploader, ]} */ ;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    biz: "user_avatar",
    modelValue: (__VLS_ctx.form.userAvatar),
}));
const __VLS_45 = __VLS_44({
    biz: "user_avatar",
    modelValue: (__VLS_ctx.form.userAvatar),
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
var __VLS_42;
const __VLS_47 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    field: "userRole",
    label: "用户权限",
}));
const __VLS_49 = __VLS_48({
    field: "userRole",
    label: "用户权限",
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
__VLS_50.slots.default;
const __VLS_51 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.form.userRole),
    placeholder: "请选择用户权限",
    allowClear: true,
}));
const __VLS_53 = __VLS_52({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.form.userRole),
    placeholder: "请选择用户权限",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
__VLS_54.slots.default;
const __VLS_55 = {}.AOption;
/** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    value: "admin",
}));
const __VLS_57 = __VLS_56({
    value: "admin",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
__VLS_58.slots.default;
var __VLS_58;
const __VLS_59 = {}.AOption;
/** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
    value: "user",
}));
const __VLS_61 = __VLS_60({
    value: "user",
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
__VLS_62.slots.default;
var __VLS_62;
const __VLS_63 = {}.AOption;
/** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
    value: "ban",
}));
const __VLS_65 = __VLS_64({
    value: "ban",
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
__VLS_66.slots.default;
var __VLS_66;
var __VLS_54;
var __VLS_50;
var __VLS_14;
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            handleVisibilityChange: handleVisibilityChange,
            handleOk: handleOk,
            handleCancel: handleCancel,
        };
    },
    emits: {},
    props: {
        title: { type: String, default: 'Title' },
        modelValue: { type: Boolean, default: false },
        form: { type: Object, default: {} },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    props: {
        title: { type: String, default: 'Title' },
        modelValue: { type: Boolean, default: false },
        form: { type: Object, default: {} },
    },
});
; /* PartiallyEnd: #4569/main.vue */
