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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
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
