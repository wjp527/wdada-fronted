/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { ref } from 'vue';
const plugins = [
    gfm(),
    highlight(),
    // Add more plugins here
];
const value = ref('');
const handleChange = (v) => {
    value.value = v;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.Editor;
/** @type {[typeof __VLS_components.Editor, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onChange': {} },
    value: (__VLS_ctx.value),
    plugins: (__VLS_ctx.plugins),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onChange': {} },
    value: (__VLS_ctx.value),
    plugins: (__VLS_ctx.plugins),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onChange: (__VLS_ctx.handleChange)
};
var __VLS_8 = {};
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Editor: Editor,
            plugins: plugins,
            value: value,
            handleChange: handleChange,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
