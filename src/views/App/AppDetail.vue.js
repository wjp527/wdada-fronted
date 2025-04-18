import { getAppVoByIdUsingGet } from '@/api/appController';
import { APP_TYPE_MAP, SCORE_STRATEGY_MAP } from '@/constant/app';
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { useLoginUserStore } from '@/store/user';
import ShareModal from '@/components/Modal/ShareModal.vue';
const router = useRouter();
const props = withDefaults(defineProps(), {
    id: '',
});
const appDetailInfo = ref(null);
// 获取App详情
const loadData = async () => {
    const res = await getAppVoByIdUsingGet({ id: props.id });
    if (res.data.code == 0) {
        appDetailInfo.value = res.data.data;
    }
    else {
        message.error('获取应用详情失败，' + res.data.message);
    }
};
loadData();
// 开始答题
const handleStartAnswer = () => {
    // /answer/do/:appId
    router.push(`/answer/do/${props.id}`);
};
// 分享应用
const shareModalRef = ref('');
const link = ref('');
const title = ref('');
link.value = `${window.location.protocol}://${window.location.host}/app/detail/${props.id}`;
title.value = '应用分享';
const handleShareApp = (e) => {
    if (shareModalRef.value) {
        // 阻止冒泡
        e.stopPropagation();
        shareModalRef.value.onOpen();
    }
};
// 设置题目
const handleSetQuestion = () => {
    router.push(`/add/question/${props.id}`);
};
// 设置评分
/**
 * 设置评分结果
 *
 * 该函数会将页面路由跳转到添加评分结果的页面，并传递当前组件的props中的id作为参数。
 */
const handleSetScoring = () => {
    router.push(`/add/scoring_result/${props.id}`);
};
// 修改应用
const handleEditApp = () => {
    router.push(`/add/app/${props.id}`);
};
// 控制权限
const userLoginUser = useLoginUserStore();
const isMe = computed(() => {
    return appDetailInfo.value?.userId == userLoginUser.loginUser.id;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    id: '',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_0 = {}.ACard;
/** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ARow;
/** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ class: "grid-demo" },
    ...{ style: {} },
}));
const __VLS_6 = __VLS_5({
    ...{ class: "grid-demo" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    flex: "auto",
}));
const __VLS_10 = __VLS_9({
    flex: "auto",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-2xl font-bold" },
});
(__VLS_ctx.appDetailInfo?.appName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.appDetailInfo?.appDesc);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.APP_TYPE_MAP[__VLS_ctx.appDetailInfo?.appType]);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.SCORE_STRATEGY_MAP[__VLS_ctx.appDetailInfo?.scoringStrategy]);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-gray-500 mt-4" },
});
const __VLS_12 = {}.AAvatar;
/** @type {[typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ class: "!w-[36px] !h-[36px]" },
}));
const __VLS_14 = __VLS_13({
    ...{ class: "!w-[36px] !h-[36px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.appDetailInfo?.user?.userAvatar),
    alt: "",
});
var __VLS_15;
(__VLS_ctx.appDetailInfo?.user?.userName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.dayjs(__VLS_ctx.appDetailInfo?.createTime).format('YYYY-MM-DD HH:mm:ss'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-10 mb-10" },
});
const __VLS_16 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "!mr-4" },
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "!mr-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.handleStartAnswer)
};
__VLS_19.slots.default;
var __VLS_19;
const __VLS_24 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    ...{ 'onClick': {} },
    ...{ class: "!mr-4" },
}));
const __VLS_26 = __VLS_25({
    ...{ 'onClick': {} },
    ...{ class: "!mr-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_28;
let __VLS_29;
let __VLS_30;
const __VLS_31 = {
    onClick: (__VLS_ctx.handleShareApp)
};
__VLS_27.slots.default;
var __VLS_27;
if (__VLS_ctx.isMe) {
    const __VLS_32 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        ...{ 'onClick': {} },
        ...{ class: "!mr-4" },
    }));
    const __VLS_34 = __VLS_33({
        ...{ 'onClick': {} },
        ...{ class: "!mr-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onClick: (__VLS_ctx.handleSetQuestion)
    };
    __VLS_35.slots.default;
    var __VLS_35;
}
if (__VLS_ctx.isMe) {
    const __VLS_40 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ 'onClick': {} },
        ...{ class: "!mr-4" },
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onClick': {} },
        ...{ class: "!mr-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        onClick: (__VLS_ctx.handleSetScoring)
    };
    __VLS_43.slots.default;
    var __VLS_43;
}
if (__VLS_ctx.isMe) {
    const __VLS_48 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        ...{ 'onClick': {} },
        ...{ class: "!mr-4" },
    }));
    const __VLS_50 = __VLS_49({
        ...{ 'onClick': {} },
        ...{ class: "!mr-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_52;
    let __VLS_53;
    let __VLS_54;
    const __VLS_55 = {
        onClick: (__VLS_ctx.handleEditApp)
    };
    __VLS_51.slots.default;
    var __VLS_51;
}
var __VLS_11;
const __VLS_56 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    flex: "300px",
}));
const __VLS_58 = __VLS_57({
    flex: "300px",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.appDetailInfo?.appIcon?.startsWith('https://') && __VLS_ctx.appDetailInfo?.appIcon != null) {
    const __VLS_60 = {}.AImage;
    /** @type {[typeof __VLS_components.AImage, typeof __VLS_components.aImage, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        src: (__VLS_ctx.appDetailInfo?.appIcon),
    }));
    const __VLS_62 = __VLS_61({
        src: (__VLS_ctx.appDetailInfo?.appIcon),
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        ...{ class: "!w-[300px] !h-[300px]" },
        src: "@/assets/logo.png",
        alt: "",
    });
}
var __VLS_59;
var __VLS_7;
var __VLS_3;
/** @type {[typeof ShareModal, ]} */ ;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent(ShareModal, new ShareModal({
    ref: "shareModalRef",
    link: (__VLS_ctx.link),
    title: (__VLS_ctx.title),
}));
const __VLS_65 = __VLS_64({
    ref: "shareModalRef",
    link: (__VLS_ctx.link),
    title: (__VLS_ctx.title),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
/** @type {typeof __VLS_ctx.shareModalRef} */ ;
var __VLS_67 = {};
var __VLS_66;
/** @type {__VLS_StyleScopedClasses['grid-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!w-[36px]']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-[36px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
/** @type {__VLS_StyleScopedClasses['!mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!mr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!w-[300px]']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-[300px]']} */ ;
// @ts-ignore
var __VLS_68 = __VLS_67;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            APP_TYPE_MAP: APP_TYPE_MAP,
            SCORE_STRATEGY_MAP: SCORE_STRATEGY_MAP,
            dayjs: dayjs,
            ShareModal: ShareModal,
            appDetailInfo: appDetailInfo,
            handleStartAnswer: handleStartAnswer,
            shareModalRef: shareModalRef,
            link: link,
            title: title,
            handleShareApp: handleShareApp,
            handleSetQuestion: handleSetQuestion,
            handleSetScoring: handleSetScoring,
            handleEditApp: handleEditApp,
            isMe: isMe,
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
