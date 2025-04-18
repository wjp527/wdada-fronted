/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { IconShareInternal } from '@arco-design/web-vue/es/icon';
import { ref, defineProps, withDefaults } from 'vue';
import { useRouter } from 'vue-router';
import ShareModal from '@/components/Modal/ShareModal.vue';
const props = withDefaults(defineProps(), {
    app: () => {
        return {};
    },
});
const router = useRouter();
const doCardClick = () => {
    router.push(`/app/detail/${props.app.id}`);
};
// 分享
const shareModalRef = ref('');
const link = ref('');
const title = ref('');
link.value = `${window.location.protocol}//:${window.location.host}/app/detail/${props.app.id}`;
title.value = '应用分享';
const handleShare = (e) => {
    if (shareModalRef.value) {
        // 阻止冒泡
        e.stopPropagation();
        shareModalRef.value.onOpen();
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    app: () => {
        return {};
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['icon-hover']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ACard;
/** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ class: "appCard" },
    hoverable: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ class: "appCard" },
    hoverable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.doCardClick)
};
__VLS_3.slots.default;
{
    const { actions: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onClick: (__VLS_ctx.handleShare) },
        ...{ class: "icon-hover" },
    });
    const __VLS_8 = {}.IconShareInternal;
    /** @type {[typeof __VLS_components.IconShareInternal, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
    const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
{
    const { cover: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: ({
                height: '204px',
                overflow: 'hidden',
            }) },
    });
    if (__VLS_ctx.app.appIcon?.startsWith('https://') && __VLS_ctx.app.appIcon != null) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            ...{ style: ({ width: '100%', transform: 'translateY(-20px)' }) },
            alt: "dessert",
            src: (__VLS_ctx.app.appIcon),
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            ...{ class: "!w-[300px] !h-[300px]" },
            src: "@/assets/logo.png",
            alt: "",
        });
    }
}
const __VLS_12 = {}.ACardMeta;
/** @type {[typeof __VLS_components.ACardMeta, typeof __VLS_components.aCardMeta, typeof __VLS_components.ACardMeta, typeof __VLS_components.aCardMeta, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    title: (__VLS_ctx.app?.appName),
    description: (__VLS_ctx.app?.appDesc),
}));
const __VLS_14 = __VLS_13({
    title: (__VLS_ctx.app?.appName),
    description: (__VLS_ctx.app?.appDesc),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
{
    const { avatar: __VLS_thisSlot } = __VLS_15.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: ({ display: 'flex', alignItems: 'center', color: '#1D2129' }) },
    });
    const __VLS_16 = {}.AAvatar;
    /** @type {[typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        size: (24),
        ...{ style: ({ marginRight: '8px' }) },
    }));
    const __VLS_18 = __VLS_17({
        size: (24),
        ...{ style: ({ marginRight: '8px' }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.app.user.userAvatar),
        alt: "avatar",
    });
    var __VLS_19;
    const __VLS_20 = {}.ATypographyText;
    /** @type {[typeof __VLS_components.ATypographyText, typeof __VLS_components.aTypographyText, typeof __VLS_components.ATypographyText, typeof __VLS_components.aTypographyText, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
    const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    (__VLS_ctx.app.appName ?? '佚名');
    var __VLS_23;
}
var __VLS_15;
var __VLS_3;
/** @type {[typeof ShareModal, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(ShareModal, new ShareModal({
    ref: "shareModalRef",
    link: (__VLS_ctx.link),
    title: (__VLS_ctx.title),
}));
const __VLS_25 = __VLS_24({
    ref: "shareModalRef",
    link: (__VLS_ctx.link),
    title: (__VLS_ctx.title),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
/** @type {typeof __VLS_ctx.shareModalRef} */ ;
var __VLS_27 = {};
var __VLS_26;
/** @type {__VLS_StyleScopedClasses['appCard']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-hover']} */ ;
/** @type {__VLS_StyleScopedClasses['!w-[300px]']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-[300px]']} */ ;
// @ts-ignore
var __VLS_28 = __VLS_27;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            IconShareInternal: IconShareInternal,
            ShareModal: ShareModal,
            doCardClick: doCardClick,
            shareModalRef: shareModalRef,
            link: link,
            title: title,
            handleShare: handleShare,
        };
    },
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
