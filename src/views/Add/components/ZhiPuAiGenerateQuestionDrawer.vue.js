/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref, withDefaults, defineProps } from 'vue';
const props = withDefaults(defineProps(), {
    appId: () => {
        return 0;
    },
    modelValue: () => {
        return false;
    },
    AIloading: () => {
        return false;
    },
});
const emit = defineEmits(['submit', 'ZhiPuAiSSEGenerateQuestion', 'update:AIloading', 'update:modelValue']);
const AIloading = ref(false);
const form = ref({
    // 应用id
    appId: props.appId,
    // 题目数量
    questionNumber: 1,
    // 选项数量
    optionNumber: 2,
});
// AI生成题目
const handleSubmit = async () => {
    // 关闭弹窗
    emit('update:modelValue', false);
    // 开启加载状态
    emit('update:AIloading', true);
    // 提交表单数据
    emit('submit', form.value);
};
// SSE异步生成题目
const addAiSSEQuestion = async () => {
    // 关闭弹窗
    emit('update:modelValue', false);
    // 提交表单数据
    emit('ZhiPuAiSSEGenerateQuestion', form.value);
};
const handleOk = () => {
    emit('update:modelValue', false);
};
const handleCancel = () => {
    emit('update:modelValue', false);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    appId: () => {
        return 0;
    },
    modelValue: () => {
        return false;
    },
    AIloading: () => {
        return false;
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ADrawer;
/** @type {[typeof __VLS_components.ADrawer, typeof __VLS_components.aDrawer, typeof __VLS_components.ADrawer, typeof __VLS_components.aDrawer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    width: (640),
    visible: (__VLS_ctx.modelValue),
    unmountOnClose: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    width: (640),
    visible: (__VLS_ctx.modelValue),
    unmountOnClose: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onOk: (__VLS_ctx.handleOk)
};
const __VLS_8 = {
    onCancel: (__VLS_ctx.handleCancel)
};
var __VLS_9 = {};
__VLS_3.slots.default;
{
    const { title: __VLS_thisSlot } = __VLS_3.slots;
}
const __VLS_10 = {}.AForm;
/** @type {[typeof __VLS_components.AForm, typeof __VLS_components.aForm, typeof __VLS_components.AForm, typeof __VLS_components.aForm, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.form),
    ...{ style: ({ width: '600px' }) },
}));
const __VLS_12 = __VLS_11({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.form),
    ...{ style: ({ width: '600px' }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_14;
let __VLS_15;
let __VLS_16;
const __VLS_17 = {
    onSubmit: (__VLS_ctx.handleSubmit)
};
__VLS_13.slots.default;
const __VLS_18 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    field: "appId",
    label: "应用id",
}));
const __VLS_20 = __VLS_19({
    field: "appId",
    label: "应用id",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    disabled: true,
    modelValue: (__VLS_ctx.form.appId),
    placeholder: "请输入应用id",
}));
const __VLS_24 = __VLS_23({
    disabled: true,
    modelValue: (__VLS_ctx.form.appId),
    placeholder: "请输入应用id",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
var __VLS_21;
const __VLS_26 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    field: "questionNumber",
    label: "题目数量",
}));
const __VLS_28 = __VLS_27({
    field: "questionNumber",
    label: "题目数量",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
const __VLS_30 = {}.AInputNumber;
/** @type {[typeof __VLS_components.AInputNumber, typeof __VLS_components.aInputNumber, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    min: "1",
    max: "10",
    modelValue: (__VLS_ctx.form.questionNumber),
    placeholder: "请输入题目数量",
}));
const __VLS_32 = __VLS_31({
    min: "1",
    max: "10",
    modelValue: (__VLS_ctx.form.questionNumber),
    placeholder: "请输入题目数量",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
var __VLS_29;
const __VLS_34 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    field: "optionNumber",
    label: "选项数量",
}));
const __VLS_36 = __VLS_35({
    field: "optionNumber",
    label: "选项数量",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.AInputNumber;
/** @type {[typeof __VLS_components.AInputNumber, typeof __VLS_components.aInputNumber, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    min: "1",
    max: "10",
    modelValue: (__VLS_ctx.form.optionNumber),
    placeholder: "请输入选项数量",
}));
const __VLS_40 = __VLS_39({
    min: "1",
    max: "10",
    modelValue: (__VLS_ctx.form.optionNumber),
    placeholder: "请输入选项数量",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
var __VLS_37;
const __VLS_42 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({}));
const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_45.slots.default;
const __VLS_46 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    htmlType: "submit",
    type: "primary",
    loading: (props.AIloading),
    ...{ class: "w-[100px]" },
}));
const __VLS_48 = __VLS_47({
    htmlType: "submit",
    type: "primary",
    loading: (props.AIloading),
    ...{ class: "w-[100px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
__VLS_49.slots.default;
var __VLS_49;
const __VLS_50 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    ...{ 'onClick': {} },
    type: "primary",
    status: "success",
    ...{ class: "!ml-4" },
}));
const __VLS_52 = __VLS_51({
    ...{ 'onClick': {} },
    type: "primary",
    status: "success",
    ...{ class: "!ml-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
let __VLS_54;
let __VLS_55;
let __VLS_56;
const __VLS_57 = {
    onClick: (...[$event]) => {
        __VLS_ctx.addAiSSEQuestion();
    }
};
__VLS_53.slots.default;
var __VLS_53;
var __VLS_45;
var __VLS_13;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['w-[100px]']} */ ;
/** @type {__VLS_StyleScopedClasses['!ml-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            form: form,
            handleSubmit: handleSubmit,
            addAiSSEQuestion: addAiSSEQuestion,
            handleOk: handleOk,
            handleCancel: handleCancel,
        };
    },
    emits: {},
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
