/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref, withDefaults, defineProps } from 'vue';
import QRCode from 'qrcode';
import { Message } from '@arco-design/web-vue';
const props = withDefaults(defineProps(), {
    link: () => 'https://github.com/wjp527',
    title: () => '分享',
});
const visible = ref(false);
const link = ref(props.link);
const codeImg = ref('');
// With promises
QRCode.toDataURL(link.value)
    .then(url => {
    codeImg.value = url;
})
    .catch(err => {
    console.error(err);
    Message.error('生成二维码失败: ' + err.message);
});
const onOpen = () => {
    visible.value = true;
};
// 暴露方法
const __VLS_exposed = {
    onOpen,
};
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    link: () => 'https://github.com/wjp527',
    title: () => '分享',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.visible) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_0 = {}.AModal;
    /** @type {[typeof __VLS_components.AModal, typeof __VLS_components.aModal, typeof __VLS_components.AModal, typeof __VLS_components.aModal, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onCancel': {} },
        visible: (__VLS_ctx.visible),
        footer: (false),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onCancel': {} },
        visible: (__VLS_ctx.visible),
        footer: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = {
        onCancel: (...[$event]) => {
            if (!(__VLS_ctx.visible))
                return;
            __VLS_ctx.visible = false;
        }
    };
    __VLS_3.slots.default;
    {
        const { title: __VLS_thisSlot } = __VLS_3.slots;
        (__VLS_ctx.title);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    const __VLS_8 = {}.ATypographyParagraph;
    /** @type {[typeof __VLS_components.ATypographyParagraph, typeof __VLS_components.aTypographyParagraph, typeof __VLS_components.ATypographyParagraph, typeof __VLS_components.aTypographyParagraph, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        copyable: true,
    }));
    const __VLS_10 = __VLS_9({
        copyable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    (__VLS_ctx.link);
    var __VLS_11;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.codeImg),
        alt: "",
    });
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            visible: visible,
            link: link,
            codeImg: codeImg,
        };
    },
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
