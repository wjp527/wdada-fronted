/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { getUserAnswerVoByIdUsingGet } from '@/api/userAnswerController';
import { APP_TYPE_MAP, SCORE_STRATEGY_MAP } from '@/constant/app';
import { ref } from 'vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = withDefaults(defineProps(), {
    id: '',
});
const userAnswerDetailInfo = ref(null);
const loadData = async () => {
    const res = await getUserAnswerVoByIdUsingGet({ id: props.id });
    if (res.data.code == 0) {
        userAnswerDetailInfo.value = res.data.data;
        console.log(userAnswerDetailInfo.value, 'userAnswerDetailInfo');
    }
};
loadData();
// 去答题
const handleStartAnswer = () => {
    router.push(`/answer/do/${userAnswerDetailInfo.value.appId}`);
};
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
(__VLS_ctx.userAnswerDetailInfo?.resultName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.userAnswerDetailInfo?.resultDesc);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.userAnswerDetailInfo?.resultId);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.userAnswerDetailInfo?.resultScore);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.userAnswerDetailInfo?.choices);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.userAnswerDetailInfo?.appId);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.APP_TYPE_MAP[__VLS_ctx.userAnswerDetailInfo?.appType]);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.SCORE_STRATEGY_MAP[__VLS_ctx.userAnswerDetailInfo?.scoringStrategy]);
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
    src: (__VLS_ctx.userAnswerDetailInfo?.user?.userAvatar),
    alt: "",
});
var __VLS_15;
(__VLS_ctx.userAnswerDetailInfo?.user?.userName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500 mt-4" },
});
(__VLS_ctx.dayjs(__VLS_ctx.userAnswerDetailInfo?.createTime).format('YYYY-MM-DD HH:mm:ss'));
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
var __VLS_11;
const __VLS_24 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    flex: "300px",
}));
const __VLS_26 = __VLS_25({
    flex: "300px",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.userAnswerDetailInfo?.resultPicture?.startsWith('https://') && __VLS_ctx.userAnswerDetailInfo?.resultPicture != null) {
    const __VLS_28 = {}.AImage;
    /** @type {[typeof __VLS_components.AImage, typeof __VLS_components.aImage, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        src: (__VLS_ctx.userAnswerDetailInfo?.resultPicture),
    }));
    const __VLS_30 = __VLS_29({
        src: (__VLS_ctx.userAnswerDetailInfo?.resultPicture),
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        ...{ class: "!w-[300px] !h-[300px]" },
        src: "@/assets/logo.png",
        alt: "",
    });
}
var __VLS_27;
var __VLS_7;
var __VLS_3;
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
/** @type {__VLS_StyleScopedClasses['!w-[300px]']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-[300px]']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            APP_TYPE_MAP: APP_TYPE_MAP,
            SCORE_STRATEGY_MAP: SCORE_STRATEGY_MAP,
            dayjs: dayjs,
            userAnswerDetailInfo: userAnswerDetailInfo,
            handleStartAnswer: handleStartAnswer,
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
