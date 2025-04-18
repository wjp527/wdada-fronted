/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineProps, ref, watchEffect, withDefaults } from 'vue';
import message from '@arco-design/web-vue/es/message';
import { useRouter } from 'vue-router';
import { addQuestionUsingPost, aiGenerateQuestionUsingPost, editQuestionUsingPost, listQuestionVoByPageUsingPost } from '@/api/questionController';
import ZhiPuAiGenerateQuestionDrawer from './components/ZhiPuAiGenerateQuestionDrawer.vue';
import { onlineUrl } from '@/request';
const props = withDefaults(defineProps(), {
    appId: () => {
        return '';
    },
});
const router = useRouter();
// ============================
// 理解为题目列表
const questionContent = ref([]);
const addQuestion = (e, index) => {
    // 阻止冒泡
    e.stopPropagation();
    questionContent.value.splice(index, 0, {
        title: '',
        options: [],
    });
};
// 删除题目
const deleteQuestion = (e, index) => {
    // 阻止冒泡
    e.stopPropagation();
    questionContent.value.splice(index, 1);
};
/**
 * 添加题目选项
 */
const addQuestionOption = (e, question, index) => {
    // 阻止冒泡
    e.stopPropagation();
    if (!question.options) {
        question.options = [];
    }
    question.options.splice(index, 0, {
        key: '',
        value: '',
        result: '',
        score: 0,
    });
};
/**
 * 删除题目选项
 */
const deleteQuestionOption = (e, question, index) => {
    // 阻止冒泡
    e.stopPropagation();
    if (!question.options) {
        question.options = [];
    }
    question.options.splice(index, 1);
};
// AI生成题目
const visible = ref(false);
const addAiQuestion = () => {
    visible.value = true;
};
const loading = ref(false);
// 智谱AI生成题目成功后后执行
const AIloading = ref(false);
const ZhiPuAiGenerateQuestion = async (payload) => {
    loading.value = true;
    let res = await aiGenerateQuestionUsingPost(payload);
    if (res.data.code === 0) {
        questionContent.value = [...questionContent.value, ...res.data.data];
        visible.value = false;
    }
    else {
        message.error('生成题目失败，' + res.data.message);
    }
    AIloading.value = false;
    loading.value = false;
};
// 智谱AI生成题目【SSE提交，流式生成】
const ZhiPuAiSSEGenerateQuestion = async (form) => {
    loading.value = true;
    visible.value = false;
    // 创建 SSE 请求
    const eventSource = new EventSource(`${onlineUrl}/api/question/ai_generate/sse?appId=${props.appId}&optionNumber=${form.optionNumber}&questionNumber=${form.questionNumber}`, {
        // 一定要带上cookie，不然智谱AI无法识别用户身份
        withCredentials: true,
    });
    // 接收消息
    eventSource.onmessage = function (event) {
        console.log(event.data);
        questionContent.value = [...questionContent.value, JSON.parse(event.data)];
    };
    // 报错后者连接关闭时触发
    eventSource.onerror = function (event) {
        if (event.eventPhase === EventSource.CLOSED) {
            console.error('关闭连接');
            eventSource.close();
        }
        else {
            eventSource.close();
        }
    };
    // 连接建立时触发
    eventSource.onopen = function () {
        console.log('建立连接');
    };
    loading.value = false;
};
// ============================
const form = ref({
    appDesc: '',
    appIcon: '',
    appName: '',
    appType: 0,
    scoringStrategy: 0,
});
const oldQuestion = ref();
/**
 * 加载数据
 */
const loadData = async () => {
    if (!props.appId) {
        return;
    }
    const res = await listQuestionVoByPageUsingPost({
        appId: props.appId,
        current: 1,
        pageSize: 1,
        sortField: 'createTime',
        sortOrder: 'desc',
    });
    if (res.data.code === 0 && res.data.data.records.length > 0) {
        oldQuestion.value = res.data.data.records[0];
        if (oldQuestion.value) {
            questionContent.value = oldQuestion.value.questionContent ?? [];
        }
    }
    else if (res.data.data.records.length == 0) {
        message.warning('请添加题目');
        questionContent.value.splice(0, 0, {
            title: '',
            options: [],
        });
    }
    else {
        message.error('获取数据失败，' + res.data.message);
    }
};
// 获取旧数据
watchEffect(() => {
    loadData();
});
/**
 * 提交
 */
const handleSubmit = async () => {
    if (!props.appId || !questionContent.value) {
        return;
    }
    let res = null;
    // 如果是修改
    if (oldQuestion.value?.id) {
        res = await editQuestionUsingPost({
            id: oldQuestion.value.id,
            questionContent: questionContent.value,
        });
    }
    else {
        // 创建
        res = await addQuestionUsingPost({
            appId: props.appId,
            questionContent: questionContent.value,
        });
    }
    if (res.data.code === 0) {
        message.success('操作成功，即将跳转到应用详情页');
        setTimeout(() => {
            router.push(`/app/detail/${props.appId}`);
        }, 3000);
    }
    else {
        message.error('操作失败，' + res.data.message);
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    appId: () => {
        return '';
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "addAppPage",
    ...{ class: "flex flex-col items-center justify-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-2xl font-bold mb-8" },
});
const __VLS_0 = {}.AForm;
/** @type {[typeof __VLS_components.AForm, typeof __VLS_components.aForm, typeof __VLS_components.AForm, typeof __VLS_components.aForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.questionContent),
    ...{ style: ({ width: '920px' }) },
    labelAlign: "left",
    autoLabelWidth: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.questionContent),
    ...{ style: ({ width: '920px' }) },
    labelAlign: "left",
    autoLabelWidth: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onSubmit: (__VLS_ctx.handleSubmit)
};
__VLS_3.slots.default;
const __VLS_8 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    label: "应用 id",
    ...{ class: "!flex !items-center justify-between" },
}));
const __VLS_10 = __VLS_9({
    label: "应用 id",
    ...{ class: "!flex !items-center justify-between" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-1 flex items-center" },
});
const __VLS_12 = {}.ATag;
/** @type {[typeof __VLS_components.ATag, typeof __VLS_components.aTag, typeof __VLS_components.ATag, typeof __VLS_components.aTag, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
var __VLS_15;
const __VLS_16 = {}.ASpace;
/** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    ...{ 'onClick': {} },
    type: "outline",
    size: "small",
    ...{ class: "ml-4" },
}));
const __VLS_22 = __VLS_21({
    ...{ 'onClick': {} },
    type: "outline",
    size: "small",
    ...{ class: "ml-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_24;
let __VLS_25;
let __VLS_26;
const __VLS_27 = {
    onClick: (...[$event]) => {
        __VLS_ctx.addQuestion($event, __VLS_ctx.questionContent.length);
    }
};
__VLS_23.slots.default;
var __VLS_23;
const __VLS_28 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ 'onClick': {} },
    type: "primary",
    size: "small",
    ...{ class: "ml-4" },
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClick': {} },
    type: "primary",
    size: "small",
    ...{ class: "ml-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClick: (...[$event]) => {
        __VLS_ctx.addAiQuestion();
    }
};
__VLS_31.slots.default;
var __VLS_31;
var __VLS_19;
var __VLS_11;
const __VLS_36 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    label: "题目列表",
    contentFlex: (false),
    mergeProps: (false),
}));
const __VLS_38 = __VLS_37({
    label: "题目列表",
    contentFlex: (false),
    mergeProps: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "w-full h-[400px] flex justify-center items-center" },
    });
    const __VLS_40 = {}.ASpin;
    /** @type {[typeof __VLS_components.ASpin, typeof __VLS_components.aSpin, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        dot: true,
    }));
    const __VLS_42 = __VLS_41({
        dot: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
}
else {
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.questionContent))) {
        const __VLS_44 = {}.ASpace;
        /** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
            direction: "vertical",
            fill: true,
            key: (index),
        }));
        const __VLS_46 = __VLS_45({
            direction: "vertical",
            fill: true,
            key: (index),
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        __VLS_47.slots.default;
        const __VLS_48 = {}.ACollapse;
        /** @type {[typeof __VLS_components.ACollapse, typeof __VLS_components.aCollapse, typeof __VLS_components.ACollapse, typeof __VLS_components.aCollapse, ]} */ ;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
            destroyOnHide: true,
            ...{ class: "w-[860px]" },
        }));
        const __VLS_50 = __VLS_49({
            destroyOnHide: true,
            ...{ class: "w-[860px]" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        __VLS_51.slots.default;
        const __VLS_52 = {}.ACollapseItem;
        /** @type {[typeof __VLS_components.ACollapseItem, typeof __VLS_components.aCollapseItem, typeof __VLS_components.ACollapseItem, typeof __VLS_components.aCollapseItem, ]} */ ;
        // @ts-ignore
        const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
            header: (item.title),
            key: "1",
        }));
        const __VLS_54 = __VLS_53({
            header: (item.title),
            key: "1",
        }, ...__VLS_functionalComponentArgsRest(__VLS_53));
        __VLS_55.slots.default;
        {
            const { header: __VLS_thisSlot } = __VLS_55.slots;
            const __VLS_56 = {}.AInput;
            /** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
            // @ts-ignore
            const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
                modelValue: (item.title),
                placeholder: "请输入题目",
            }));
            const __VLS_58 = __VLS_57({
                modelValue: (item.title),
                placeholder: "请输入题目",
            }, ...__VLS_functionalComponentArgsRest(__VLS_57));
        }
        {
            const { extra: __VLS_thisSlot } = __VLS_55.slots;
            const __VLS_60 = {}.AButton;
            /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
            // @ts-ignore
            const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
                ...{ 'onClick': {} },
                size: "small",
                type: "outline",
                status: "success",
                ...{ class: "!mr-2" },
            }));
            const __VLS_62 = __VLS_61({
                ...{ 'onClick': {} },
                size: "small",
                type: "outline",
                status: "success",
                ...{ class: "!mr-2" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_61));
            let __VLS_64;
            let __VLS_65;
            let __VLS_66;
            const __VLS_67 = {
                onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    __VLS_ctx.addQuestionOption($event, item, item.options.length);
                }
            };
            __VLS_63.slots.default;
            var __VLS_63;
            const __VLS_68 = {}.AButton;
            /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
            // @ts-ignore
            const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
                ...{ 'onClick': {} },
                size: "small",
                ...{ class: "!mr-2" },
            }));
            const __VLS_70 = __VLS_69({
                ...{ 'onClick': {} },
                size: "small",
                ...{ class: "!mr-2" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_69));
            let __VLS_72;
            let __VLS_73;
            let __VLS_74;
            const __VLS_75 = {
                onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    __VLS_ctx.addQuestion($event, index + 1);
                }
            };
            __VLS_71.slots.default;
            var __VLS_71;
            const __VLS_76 = {}.AButton;
            /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
            // @ts-ignore
            const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
                ...{ 'onClick': {} },
                size: "small",
                status: "danger",
            }));
            const __VLS_78 = __VLS_77({
                ...{ 'onClick': {} },
                size: "small",
                status: "danger",
            }, ...__VLS_functionalComponentArgsRest(__VLS_77));
            let __VLS_80;
            let __VLS_81;
            let __VLS_82;
            const __VLS_83 = {
                onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    __VLS_ctx.deleteQuestion($event, index);
                }
            };
            __VLS_79.slots.default;
            var __VLS_79;
        }
        for (const [option, optionIndex] of __VLS_getVForSourceType((item.options))) {
            const __VLS_84 = {}.ACollapse;
            /** @type {[typeof __VLS_components.ACollapse, typeof __VLS_components.aCollapse, typeof __VLS_components.ACollapse, typeof __VLS_components.aCollapse, ]} */ ;
            // @ts-ignore
            const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
                destroyOnHide: true,
                key: (optionIndex),
            }));
            const __VLS_86 = __VLS_85({
                destroyOnHide: true,
                key: (optionIndex),
            }, ...__VLS_functionalComponentArgsRest(__VLS_85));
            __VLS_87.slots.default;
            const __VLS_88 = {}.ACollapseItem;
            /** @type {[typeof __VLS_components.ACollapseItem, typeof __VLS_components.aCollapseItem, typeof __VLS_components.ACollapseItem, typeof __VLS_components.aCollapseItem, ]} */ ;
            // @ts-ignore
            const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
                header: (`选项${optionIndex + 1}`),
                key: "1.1",
            }));
            const __VLS_90 = __VLS_89({
                header: (`选项${optionIndex + 1}`),
                key: "1.1",
            }, ...__VLS_functionalComponentArgsRest(__VLS_89));
            __VLS_91.slots.default;
            {
                const { extra: __VLS_thisSlot } = __VLS_91.slots;
                const __VLS_92 = {}.AButton;
                /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
                // @ts-ignore
                const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
                    ...{ 'onClick': {} },
                    size: "mini",
                    ...{ class: "!mr-2" },
                }));
                const __VLS_94 = __VLS_93({
                    ...{ 'onClick': {} },
                    size: "mini",
                    ...{ class: "!mr-2" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_93));
                let __VLS_96;
                let __VLS_97;
                let __VLS_98;
                const __VLS_99 = {
                    onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        __VLS_ctx.addQuestionOption($event, item, optionIndex + 1);
                    }
                };
                __VLS_95.slots.default;
                var __VLS_95;
                const __VLS_100 = {}.AButton;
                /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
                // @ts-ignore
                const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
                    ...{ 'onClick': {} },
                    status: "danger",
                    size: "mini",
                }));
                const __VLS_102 = __VLS_101({
                    ...{ 'onClick': {} },
                    status: "danger",
                    size: "mini",
                }, ...__VLS_functionalComponentArgsRest(__VLS_101));
                let __VLS_104;
                let __VLS_105;
                let __VLS_106;
                const __VLS_107 = {
                    onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        __VLS_ctx.deleteQuestionOption($event, item, optionIndex);
                    }
                };
                __VLS_103.slots.default;
                var __VLS_103;
            }
            const __VLS_108 = {}.AFormItem;
            /** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
                label: "选项key",
            }));
            const __VLS_110 = __VLS_109({
                label: "选项key",
            }, ...__VLS_functionalComponentArgsRest(__VLS_109));
            __VLS_111.slots.default;
            const __VLS_112 = {}.AInput;
            /** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
            // @ts-ignore
            const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({
                modelValue: (option.key),
                placeholder: "请输入选项key",
                ...{ class: "!mb-1" },
            }));
            const __VLS_114 = __VLS_113({
                modelValue: (option.key),
                placeholder: "请输入选项key",
                ...{ class: "!mb-1" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_113));
            var __VLS_111;
            const __VLS_116 = {}.AFormItem;
            /** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
                label: "选项value",
            }));
            const __VLS_118 = __VLS_117({
                label: "选项value",
            }, ...__VLS_functionalComponentArgsRest(__VLS_117));
            __VLS_119.slots.default;
            const __VLS_120 = {}.AInput;
            /** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
            // @ts-ignore
            const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
                modelValue: (option.value),
                placeholder: "请输入选项值",
                ...{ class: "!mb-1" },
            }));
            const __VLS_122 = __VLS_121({
                modelValue: (option.value),
                placeholder: "请输入选项值",
                ...{ class: "!mb-1" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_121));
            var __VLS_119;
            const __VLS_124 = {}.AFormItem;
            /** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({
                label: "选项结果",
            }));
            const __VLS_126 = __VLS_125({
                label: "选项结果",
            }, ...__VLS_functionalComponentArgsRest(__VLS_125));
            __VLS_127.slots.default;
            const __VLS_128 = {}.AInput;
            /** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
            // @ts-ignore
            const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
                modelValue: (option.result),
                placeholder: "请输入选项",
                ...{ class: "!mb-1" },
            }));
            const __VLS_130 = __VLS_129({
                modelValue: (option.result),
                placeholder: "请输入选项",
                ...{ class: "!mb-1" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_129));
            var __VLS_127;
            const __VLS_132 = {}.AFormItem;
            /** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
            // @ts-ignore
            const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({
                label: "选项分数",
            }));
            const __VLS_134 = __VLS_133({
                label: "选项分数",
            }, ...__VLS_functionalComponentArgsRest(__VLS_133));
            __VLS_135.slots.default;
            const __VLS_136 = {}.AInputNumber;
            /** @type {[typeof __VLS_components.AInputNumber, typeof __VLS_components.aInputNumber, ]} */ ;
            // @ts-ignore
            const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
                modelValue: (option.score),
                placeholder: "请输入选项",
                ...{ class: "!mb-1" },
                min: "0",
                max: "100",
            }));
            const __VLS_138 = __VLS_137({
                modelValue: (option.score),
                placeholder: "请输入选项",
                ...{ class: "!mb-1" },
                min: "0",
                max: "100",
            }, ...__VLS_functionalComponentArgsRest(__VLS_137));
            var __VLS_135;
            var __VLS_91;
            var __VLS_87;
        }
        var __VLS_55;
        var __VLS_51;
        var __VLS_47;
    }
}
var __VLS_39;
const __VLS_140 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_141 = __VLS_asFunctionalComponent(__VLS_140, new __VLS_140({}));
const __VLS_142 = __VLS_141({}, ...__VLS_functionalComponentArgsRest(__VLS_141));
__VLS_143.slots.default;
const __VLS_144 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({
    type: "primary",
    htmlType: "submit",
    ...{ style: {} },
}));
const __VLS_146 = __VLS_145({
    type: "primary",
    htmlType: "submit",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_145));
__VLS_147.slots.default;
var __VLS_147;
var __VLS_143;
var __VLS_3;
/** @type {[typeof ZhiPuAiGenerateQuestionDrawer, ]} */ ;
// @ts-ignore
const __VLS_148 = __VLS_asFunctionalComponent(ZhiPuAiGenerateQuestionDrawer, new ZhiPuAiGenerateQuestionDrawer({
    ...{ 'onSubmit': {} },
    ...{ 'onZhiPuAiSSEGenerateQuestion': {} },
    appId: (props.appId),
    AIloading: (__VLS_ctx.AIloading),
    visible: (__VLS_ctx.visible),
}));
const __VLS_149 = __VLS_148({
    ...{ 'onSubmit': {} },
    ...{ 'onZhiPuAiSSEGenerateQuestion': {} },
    appId: (props.appId),
    AIloading: (__VLS_ctx.AIloading),
    visible: (__VLS_ctx.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_148));
let __VLS_151;
let __VLS_152;
let __VLS_153;
const __VLS_154 = {
    onSubmit: (__VLS_ctx.ZhiPuAiGenerateQuestion)
};
const __VLS_155 = {
    onZhiPuAiSSEGenerateQuestion: (__VLS_ctx.ZhiPuAiSSEGenerateQuestion)
};
var __VLS_150;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['!flex']} */ ;
/** @type {__VLS_StyleScopedClasses['!items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[400px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[860px]']} */ ;
/** @type {__VLS_StyleScopedClasses['!mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['!mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['!mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['!mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['!mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['!mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['!mb-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ZhiPuAiGenerateQuestionDrawer: ZhiPuAiGenerateQuestionDrawer,
            questionContent: questionContent,
            addQuestion: addQuestion,
            deleteQuestion: deleteQuestion,
            addQuestionOption: addQuestionOption,
            deleteQuestionOption: deleteQuestionOption,
            visible: visible,
            addAiQuestion: addAiQuestion,
            loading: loading,
            AIloading: AIloading,
            ZhiPuAiGenerateQuestion: ZhiPuAiGenerateQuestion,
            ZhiPuAiSSEGenerateQuestion: ZhiPuAiSSEGenerateQuestion,
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
