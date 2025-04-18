/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { computed, defineProps, ref, watchEffect, withDefaults } from 'vue';
import message from '@arco-design/web-vue/es/message';
import { useRouter } from 'vue-router';
import { getAppVoByIdUsingGet } from '@/api/appController';
import { APP_TYPE_ENUM, SCORE_STRATEGY_ENUM } from '@/constant/app';
import { listQuestionVoByPageUsingPost } from '@/api/questionController';
import { addUserAnswerUsingPost, generateUserAnswerIdUsingGet } from '@/api/userAnswerController';
const props = withDefaults(defineProps(), {
    appId: () => {
        return '';
    },
});
//
const router = useRouter();
const app = ref({});
// 题目内容结构（理解为题目列表）
const questionContent = ref([]);
// 当前题目的序号（从1开始）
const current = ref(1);
// 当前题目
const currentQuestion = ref({});
// 当前题目选项
const questionOptions = computed(() => {
    return currentQuestion.value?.options
        ? currentQuestion.value.options.map(item => {
            return {
                label: `${item.key}. ${item.value}`,
                value: item.key,
            };
        })
        : [];
});
// 当前答案
const currentAnswer = ref('');
// 回答列表【A、B、C】
const answerList = ref([]);
// 用户选中选项的值列表【xxx、xxxx】
const answerValueList = ref([]);
/**
 * 加载数据
 */
const loadData = async () => {
    if (!props.appId) {
        return;
    }
    // 获取App
    let res = null;
    res = await getAppVoByIdUsingGet({ id: props.appId });
    if (res.data.code == 0) {
        app.value = res.data.data;
    }
    else {
        message.error('获取应用详情失败，' + res.data.message);
    }
    // 获取题目
    res = await listQuestionVoByPageUsingPost({
        appId: props.appId,
        current: 1,
        pageSize: 1,
        sortField: 'createTime',
        sortOrder: 'desc',
    });
    if (res.data.code === 0 && res.data.data.records) {
        questionContent.value = res.data.data.records[0]?.questionContent;
    }
    else {
        message.error('获取数据失败，' + res.data.message);
    }
};
// 获取旧数据
watchEffect(() => {
    loadData();
});
// 监听当前题目序号
watchEffect(() => {
    // 获取当前题目
    currentQuestion.value = questionContent.value[current.value - 1];
    // 获取当前答案
    currentAnswer.value = answerList.value[current.value - 1];
});
// 选中选项后，进行保存
const doRadioChange = (value) => {
    currentAnswer.value = value;
    // 保存答案列表
    answerList.value[current.value - 1] = value;
    // 保存答案值列表
    answerValueList.value[current.value - 1] = questionOptions.value.find(item => item.value === value)?.label || '';
};
/**
 * 提交
 */
const loading = ref(false);
const handleSubmit = async () => {
    loading.value = true;
    if (!props.appId || !answerList.value) {
        return;
    }
    let res = null;
    // app.appType === 0: 与答案做比较
    // app.appType === 1: 将选项值与AI对评测
    // 提交答案
    let resultAnswerList = ref([]);
    // 是 测试类 并且是 交给AI 来检测的场景
    if (app.value.appType === APP_TYPE_ENUM.TEST && app.value.scoringStrategy === SCORE_STRATEGY_ENUM.AI) {
        resultAnswerList.value = answerValueList.value;
    }
    else {
        resultAnswerList.value = answerList.value;
    }
    res = await addUserAnswerUsingPost({
        id: id.value,
        appId: props.appId,
        choices: resultAnswerList.value,
    });
    if (res.data.code === 0 && res.data.data) {
        router.push(`/answer/result/${res.data.data}`);
    }
    else {
        message.error('提交答案失败，' + res.data.message);
    }
    loading.value = false;
};
// 唯一id
const id = ref();
/**
 * 生成唯一Id
 */
const generateId = async () => {
    let res = await generateUserAnswerIdUsingGet();
    if (res.data.code === 0) {
        id.value = res.data.data;
    }
    else {
        message.error('获取唯一ID失败，' + res.data.message);
    }
};
// 进入页面，生成唯一Id
watchEffect(() => {
    generateId();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    appId: () => {
        return '';
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "addAppPage",
    ...{ class: "flex flex-col items-center justify-center" },
});
const __VLS_0 = {}.ACard;
/** @type {[typeof __VLS_components.ACard, typeof __VLS_components.aCard, typeof __VLS_components.ACard, typeof __VLS_components.aCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ style: ({ width: '860px' }) },
}));
const __VLS_2 = __VLS_1({
    ...{ style: ({ width: '860px' }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-2xl font-bold" },
});
(__VLS_ctx.app.appName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-lg" },
});
(__VLS_ctx.app.appDesc);
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "font-bold mt-2 mb-2" },
});
(__VLS_ctx.currentQuestion?.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "my-4" },
});
const __VLS_4 = {}.ARadioGroup;
/** @type {[typeof __VLS_components.ARadioGroup, typeof __VLS_components.aRadioGroup, typeof __VLS_components.ARadioGroup, typeof __VLS_components.aRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ 'onChange': {} },
    direction: "vertical",
    modelValue: (__VLS_ctx.currentAnswer),
    options: (__VLS_ctx.questionOptions),
}));
const __VLS_6 = __VLS_5({
    ...{ 'onChange': {} },
    direction: "vertical",
    modelValue: (__VLS_ctx.currentAnswer),
    options: (__VLS_ctx.questionOptions),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onChange: (__VLS_ctx.doRadioChange)
};
var __VLS_7;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-2" },
});
const __VLS_12 = {}.ASpace;
/** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
if (__VLS_ctx.current < __VLS_ctx.questionContent.length) {
    const __VLS_16 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ 'onClick': {} },
        disabled: (!__VLS_ctx.currentAnswer),
        type: "primary",
        ...{ class: "!mx-2" },
    }));
    const __VLS_18 = __VLS_17({
        ...{ 'onClick': {} },
        disabled: (!__VLS_ctx.currentAnswer),
        type: "primary",
        ...{ class: "!mx-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    let __VLS_20;
    let __VLS_21;
    let __VLS_22;
    const __VLS_23 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.current < __VLS_ctx.questionContent.length))
                return;
            __VLS_ctx.current++;
        }
    };
    __VLS_19.slots.default;
    var __VLS_19;
}
if (__VLS_ctx.current > 1) {
    const __VLS_24 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ 'onClick': {} },
        disabled: (__VLS_ctx.loading),
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onClick': {} },
        disabled: (__VLS_ctx.loading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_28;
    let __VLS_29;
    let __VLS_30;
    const __VLS_31 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.current > 1))
                return;
            __VLS_ctx.current--;
        }
    };
    __VLS_27.slots.default;
    var __VLS_27;
}
if (__VLS_ctx.current == __VLS_ctx.questionContent.length) {
    const __VLS_32 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        ...{ 'onClick': {} },
        disabled: (!__VLS_ctx.currentAnswer),
        loading: (__VLS_ctx.loading),
        type: "primary",
        status: "success",
    }));
    const __VLS_34 = __VLS_33({
        ...{ 'onClick': {} },
        disabled: (!__VLS_ctx.currentAnswer),
        loading: (__VLS_ctx.loading),
        type: "primary",
        status: "success",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onClick: (__VLS_ctx.handleSubmit)
    };
    __VLS_35.slots.default;
    var __VLS_35;
}
var __VLS_15;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['my-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['!mx-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            app: app,
            questionContent: questionContent,
            current: current,
            currentQuestion: currentQuestion,
            questionOptions: questionOptions,
            currentAnswer: currentAnswer,
            doRadioChange: doRadioChange,
            loading: loading,
            handleSubmit: handleSubmit,
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
