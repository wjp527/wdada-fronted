/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref } from 'vue';
import message from '@arco-design/web-vue/es/message';
import { addScoringResultUsingPost, updateScoringResultUsingPost } from '@/api/scoringResultController';
import { defineProps, withDefaults } from 'vue/dist/vue';
import ScoringResultTable from './components/ScoringResultTable.vue';
import { useRouter } from 'vue-router';
const props = withDefaults(defineProps(), {
    appId: () => '',
});
const router = useRouter();
const scoringResultTableRef = ref();
const form = ref({
    resultDesc: '',
    resultName: '',
    resultPicture: '',
});
const updateId = ref();
const doUpdate = (scoringResult) => {
    updateId.value = scoringResult?.id;
    form.value = JSON.parse(JSON.stringify(scoringResult));
};
/**
 * 提交
 */
const handleSubmit = async () => {
    if (!props.appId) {
        return;
    }
    let res;
    // 如果是修改
    if (updateId.value) {
        res = await updateScoringResultUsingPost({
            id: updateId.value,
            ...form.value,
        });
    }
    else {
        res = await addScoringResultUsingPost({
            appId: props.appId,
            ...form.value,
        });
    }
    if (res.data.code === 0) {
        message.success('操作成功');
    }
    else {
        message.error('操作失败，' + res.data.message);
    }
    // 使用子组件的 loadData方法 【刷新表格】
    if (scoringResultTableRef.value) {
        scoringResultTableRef.value.loadData();
        updateId.value = undefined;
        form.value = {
            resultDesc: '',
            resultName: '',
            resultPicture: '',
        };
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    appId: () => '',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "addScoringResultPage",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-2xl mb-8" },
});
const __VLS_0 = {}.AForm;
/** @type {[typeof __VLS_components.AForm, typeof __VLS_components.aForm, typeof __VLS_components.AForm, typeof __VLS_components.aForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.form),
    ...{ style: ({ width: '480px' }) },
    labelAlign: "left",
    autoLabelWidth: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.form),
    ...{ style: ({ width: '480px' }) },
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
    field: "appName",
    label: "应用id",
    disabled: true,
}));
const __VLS_10 = __VLS_9({
    field: "appName",
    label: "应用id",
    disabled: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
(__VLS_ctx.appId);
var __VLS_11;
if (__VLS_ctx.updateId) {
    const __VLS_12 = {}.AFormItem;
    /** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        label: "修改评分id",
    }));
    const __VLS_14 = __VLS_13({
        label: "修改评分id",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    (__VLS_ctx.updateId);
    var __VLS_15;
}
const __VLS_16 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    field: "resultName",
    label: "结果名称",
}));
const __VLS_18 = __VLS_17({
    field: "resultName",
    label: "结果名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.form.resultName),
    placeholder: "请输入结果名称",
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.form.resultName),
    placeholder: "请输入结果名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
var __VLS_19;
const __VLS_24 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    field: "resultDesc",
    label: "结果描述",
}));
const __VLS_26 = __VLS_25({
    field: "resultDesc",
    label: "结果描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    modelValue: (__VLS_ctx.form.resultDesc),
    placeholder: "请输入结果描述",
}));
const __VLS_30 = __VLS_29({
    modelValue: (__VLS_ctx.form.resultDesc),
    placeholder: "请输入结果描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
var __VLS_27;
const __VLS_32 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    field: "resultPicture",
    label: "结果图标",
}));
const __VLS_34 = __VLS_33({
    field: "resultPicture",
    label: "结果图标",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.PictureUploader;
/** @type {[typeof __VLS_components.PictureUploader, typeof __VLS_components.PictureUploader, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    biz: "app_icon",
    modelValue: (__VLS_ctx.form.resultPicture),
    value: (__VLS_ctx.form.resultPicture),
}));
const __VLS_38 = __VLS_37({
    biz: "app_icon",
    modelValue: (__VLS_ctx.form.resultPicture),
    value: (__VLS_ctx.form.resultPicture),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
var __VLS_35;
const __VLS_40 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    field: "resultProp",
    label: "结果集",
}));
const __VLS_42 = __VLS_41({
    field: "resultProp",
    label: "结果集",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
const __VLS_44 = {}.AInputTag;
/** @type {[typeof __VLS_components.AInputTag, typeof __VLS_components.aInputTag, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    modelValue: (__VLS_ctx.form.resultProp),
    ...{ style: ({ width: '320px' }) },
    placeholder: "输入结果集",
    allowClear: true,
}));
const __VLS_46 = __VLS_45({
    modelValue: (__VLS_ctx.form.resultProp),
    ...{ style: ({ width: '320px' }) },
    placeholder: "输入结果集",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
var __VLS_43;
const __VLS_48 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    field: "resultScoreRange",
    label: "结果得分范围",
}));
const __VLS_50 = __VLS_49({
    field: "resultScoreRange",
    label: "结果得分范围",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
const __VLS_52 = {}.AInputNumber;
/** @type {[typeof __VLS_components.AInputNumber, typeof __VLS_components.aInputNumber, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    modelValue: (__VLS_ctx.form.resultScoreRange),
    placeholder: "请输入结果得分范围",
}));
const __VLS_54 = __VLS_53({
    modelValue: (__VLS_ctx.form.resultScoreRange),
    placeholder: "请输入结果得分范围",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
var __VLS_51;
const __VLS_56 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({}));
const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
const __VLS_60 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    type: "primary",
    htmlType: "submit",
    ...{ style: {} },
}));
const __VLS_62 = __VLS_61({
    type: "primary",
    htmlType: "submit",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_63.slots.default;
var __VLS_63;
var __VLS_59;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-2xl mb-8" },
});
/** @type {[typeof ScoringResultTable, ]} */ ;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent(ScoringResultTable, new ScoringResultTable({
    ref: "scoringResultTableRef",
    appId: (__VLS_ctx.appId),
    doUpdate: (__VLS_ctx.doUpdate),
}));
const __VLS_65 = __VLS_64({
    ref: "scoringResultTableRef",
    appId: (__VLS_ctx.appId),
    doUpdate: (__VLS_ctx.doUpdate),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
/** @type {typeof __VLS_ctx.scoringResultTableRef} */ ;
var __VLS_67 = {};
var __VLS_66;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
// @ts-ignore
var __VLS_68 = __VLS_67;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ScoringResultTable: ScoringResultTable,
            scoringResultTableRef: scoringResultTableRef,
            form: form,
            updateId: updateId,
            doUpdate: doUpdate,
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
