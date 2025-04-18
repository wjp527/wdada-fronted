/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref, watch } from 'vue';
const props = defineProps({
    visible: Boolean,
    record: Object,
});
const emit = defineEmits(['update:visible']);
// 使用本地变量中转
const localVisible = ref(props.visible);
// 监听父组件传来的 visible 变化
watch(() => props.visible, newVal => {
    localVisible.value = newVal;
});
// 监听本地 visible 变化并通知父组件
watch(localVisible, newVal => {
    emit('update:visible', newVal);
});
const handleOk = () => {
    localVisible.value = false;
};
const handleCancel = () => {
    localVisible.value = false;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.AModal;
/** @type {[typeof __VLS_components.AModal, typeof __VLS_components.aModal, typeof __VLS_components.AModal, typeof __VLS_components.aModal, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    visible: (__VLS_ctx.localVisible),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    visible: (__VLS_ctx.localVisible),
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
if (__VLS_ctx.record?.questionContent) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "question-list" },
    });
    for (const [question, index] of __VLS_getVForSourceType((JSON.parse(__VLS_ctx.record?.questionContent)))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (index),
            ...{ class: "question-item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "question-title" },
        });
        (question.title);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "options-container" },
        });
        for (const [option] of __VLS_getVForSourceType((question.options))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (option.key),
                ...{ class: "option-item" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "option-key" },
            });
            (option.key);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "option-value" },
            });
            (option.value);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "option-result" },
            });
            (option.result);
        }
    }
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['question-list']} */ ;
/** @type {__VLS_StyleScopedClasses['question-item']} */ ;
/** @type {__VLS_StyleScopedClasses['question-title']} */ ;
/** @type {__VLS_StyleScopedClasses['options-container']} */ ;
/** @type {__VLS_StyleScopedClasses['option-item']} */ ;
/** @type {__VLS_StyleScopedClasses['option-key']} */ ;
/** @type {__VLS_StyleScopedClasses['option-value']} */ ;
/** @type {__VLS_StyleScopedClasses['option-result']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
            localVisible: localVisible,
            handleOk: handleOk,
            handleCancel: handleCancel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
