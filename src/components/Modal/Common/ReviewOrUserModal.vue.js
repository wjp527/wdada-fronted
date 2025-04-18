/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
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
    visible: (__VLS_ctx.modelValue),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:visible': {} },
    visible: (__VLS_ctx.modelValue),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    'onUpdate:visible': (__VLS_ctx.handleVisibilityChange)
};
var __VLS_8 = {};
__VLS_3.slots.default;
{
    const { title: __VLS_thisSlot } = __VLS_3.slots;
    (__VLS_ctx.title);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_9 = {}.AForm;
/** @type {[typeof __VLS_components.AForm, typeof __VLS_components.aForm, typeof __VLS_components.AForm, typeof __VLS_components.aForm, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    model: (__VLS_ctx.form),
}));
const __VLS_11 = __VLS_10({
    model: (__VLS_ctx.form),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
if (!__VLS_ctx.form.id) {
    const __VLS_13 = {}.AFormItem;
    /** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        field: "userAccount",
        label: "用户账号",
    }));
    const __VLS_15 = __VLS_14({
        field: "userAccount",
        label: "用户账号",
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    __VLS_16.slots.default;
    const __VLS_17 = {}.AInput;
    /** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        disabled: true,
        modelValue: (__VLS_ctx.form.userAccount),
        placeholder: "请输入用户账号",
    }));
    const __VLS_19 = __VLS_18({
        disabled: true,
        modelValue: (__VLS_ctx.form.userAccount),
        placeholder: "请输入用户账号",
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    var __VLS_16;
}
const __VLS_21 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    field: "userName",
    label: "用户",
}));
const __VLS_23 = __VLS_22({
    field: "userName",
    label: "用户",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
const __VLS_25 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    disabled: true,
    modelValue: (__VLS_ctx.form.userName),
    placeholder: "请输入用户名",
}));
const __VLS_27 = __VLS_26({
    disabled: true,
    modelValue: (__VLS_ctx.form.userName),
    placeholder: "请输入用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
var __VLS_24;
const __VLS_29 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    field: "userProfile",
    label: "用户简介",
}));
const __VLS_31 = __VLS_30({
    field: "userProfile",
    label: "用户简介",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_32.slots.default;
const __VLS_33 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    disabled: true,
    modelValue: (__VLS_ctx.form.userProfile),
    placeholder: "请输入用户简介",
}));
const __VLS_35 = __VLS_34({
    disabled: true,
    modelValue: (__VLS_ctx.form.userProfile),
    placeholder: "请输入用户简介",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
var __VLS_32;
const __VLS_37 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    field: "userAvatar",
    label: "用户头像",
}));
const __VLS_39 = __VLS_38({
    field: "userAvatar",
    label: "用户头像",
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
__VLS_40.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.form.userAvatar),
    alt: "",
});
var __VLS_40;
const __VLS_41 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    field: "userRole",
    label: "用户权限",
}));
const __VLS_43 = __VLS_42({
    field: "userRole",
    label: "用户权限",
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
__VLS_44.slots.default;
const __VLS_45 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    disabled: true,
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.form.userRole),
    placeholder: "请选择用户权限",
    allowClear: true,
}));
const __VLS_47 = __VLS_46({
    disabled: true,
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.form.userRole),
    placeholder: "请选择用户权限",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
__VLS_48.slots.default;
const __VLS_49 = {}.AOption;
/** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    value: "admin",
}));
const __VLS_51 = __VLS_50({
    value: "admin",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_52.slots.default;
var __VLS_52;
const __VLS_53 = {}.AOption;
/** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    value: "user",
}));
const __VLS_55 = __VLS_54({
    value: "user",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
__VLS_56.slots.default;
var __VLS_56;
const __VLS_57 = {}.AOption;
/** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    value: "ban",
}));
const __VLS_59 = __VLS_58({
    value: "ban",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
__VLS_60.slots.default;
var __VLS_60;
var __VLS_48;
var __VLS_44;
var __VLS_12;
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            handleVisibilityChange: handleVisibilityChange,
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
