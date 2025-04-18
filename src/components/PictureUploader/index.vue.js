/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';
import { ref, withDefaults, defineProps, watchEffect } from 'vue';
import { uploadFileUsingPost } from '@/api/fileController.ts';
import { Message } from '@arco-design/web-vue';
// 定义自定义事件
const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps(), {
    value: () => '',
});
const file = ref();
console.log(props.value, '123');
watchEffect(() => {
    if (props.value) {
        file.value = {
            url: props.value,
            percent: 100,
            status: 'done',
        };
    }
});
// 自定义请求
const customRequest = async (option) => {
    const { onError, onSuccess, fileItem } = option;
    const res = await uploadFileUsingPost({ biz: props.biz }, {}, fileItem.file);
    if (res.data.code === 0 && res.data.data) {
        const url = res.data.data;
        file.value = {
            name: fileItem.name,
            file: fileItem.file,
            url,
        };
        props.onChange?.(url);
        onSuccess();
        // 给父组件传值
        emit('update:modelValue', url);
        console.log(file.value);
    }
    else {
        Message.error('上传失败，' + res.data.message || '');
        onError(new Error(res.data.message));
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    value: () => '',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ASpace;
/** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    direction: "vertical",
    ...{ style: ({ width: '100%' }) },
}));
const __VLS_2 = __VLS_1({
    direction: "vertical",
    ...{ style: ({ width: '100%' }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.AUpload;
/** @type {[typeof __VLS_components.AUpload, typeof __VLS_components.aUpload, typeof __VLS_components.AUpload, typeof __VLS_components.aUpload, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    fileList: (__VLS_ctx.file ? [__VLS_ctx.file] : []),
    showFileList: (false),
    customRequest: (__VLS_ctx.customRequest),
}));
const __VLS_7 = __VLS_6({
    fileList: (__VLS_ctx.file ? [__VLS_ctx.file] : []),
    showFileList: (false),
    customRequest: (__VLS_ctx.customRequest),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
{
    const { 'upload-button': __VLS_thisSlot } = __VLS_8.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (`arco-upload-list-item${__VLS_ctx.file && __VLS_ctx.file.status === 'error' ? ' arco-upload-list-item-error' : ''}`) },
    });
    if (__VLS_ctx.file && __VLS_ctx.file.url) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "arco-upload-list-picture custom-upload-avatar" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (__VLS_ctx.file.url),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "arco-upload-list-picture-mask" },
        });
        const __VLS_9 = {}.IconEdit;
        /** @type {[typeof __VLS_components.IconEdit, ]} */ ;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({}));
        const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
        if (__VLS_ctx.file.status === 'uploading' && __VLS_ctx.file.percent < 100) {
            const __VLS_13 = {}.AProgress;
            /** @type {[typeof __VLS_components.AProgress, typeof __VLS_components.aProgress, ]} */ ;
            // @ts-ignore
            const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
                percent: (__VLS_ctx.file.percent),
                type: "circle",
                size: "mini",
                ...{ style: ({
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                    }) },
            }));
            const __VLS_15 = __VLS_14({
                percent: (__VLS_ctx.file.percent),
                type: "circle",
                size: "mini",
                ...{ style: ({
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                    }) },
            }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "arco-upload-picture-card" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "arco-upload-picture-card-text" },
        });
        const __VLS_17 = {}.IconPlus;
        /** @type {[typeof __VLS_components.IconPlus, ]} */ ;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
        const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ style: {} },
        });
    }
}
var __VLS_8;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['arco-upload-list-picture']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-upload-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['arco-upload-list-picture-mask']} */ ;
/** @type {__VLS_StyleScopedClasses['arco-upload-picture-card']} */ ;
/** @type {__VLS_StyleScopedClasses['arco-upload-picture-card-text']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            IconEdit: IconEdit,
            IconPlus: IconPlus,
            file: file,
            customRequest: customRequest,
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
