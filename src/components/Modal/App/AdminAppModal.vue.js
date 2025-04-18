/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { APP_TYPE_ENUM, APP_TYPE_MAP, SCORE_STRATEGY_ENUM, SCORE_STRATEGY_MAP } from '@/constant/app';
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
const __VLS_0 = {}.AModal;
/** @type {[typeof __VLS_components.AModal, typeof __VLS_components.aModal, typeof __VLS_components.AModal, typeof __VLS_components.aModal, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:visible': {} },
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    visible: (__VLS_ctx.modelValue),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:visible': {} },
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    visible: (__VLS_ctx.modelValue),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    'onUpdate:visible': (__VLS_ctx.handleVisibilityChange)
};
const __VLS_8 = {
    onOk: (__VLS_ctx.handleOk)
};
const __VLS_9 = {
    onCancel: (__VLS_ctx.handleCancel)
};
var __VLS_10 = {};
__VLS_3.slots.default;
{
    const { title: __VLS_thisSlot } = __VLS_3.slots;
    (__VLS_ctx.title);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_11 = {}.AForm;
/** @type {[typeof __VLS_components.AForm, typeof __VLS_components.aForm, typeof __VLS_components.AForm, typeof __VLS_components.aForm, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    model: (__VLS_ctx.form),
}));
const __VLS_13 = __VLS_12({
    model: (__VLS_ctx.form),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_14.slots.default;
const __VLS_15 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    field: "appName",
    label: "应用名称",
}));
const __VLS_17 = __VLS_16({
    field: "appName",
    label: "应用名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
__VLS_18.slots.default;
const __VLS_19 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    modelValue: (__VLS_ctx.form.appName),
    placeholder: "请输入应用名称",
}));
const __VLS_21 = __VLS_20({
    modelValue: (__VLS_ctx.form.appName),
    placeholder: "请输入应用名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
var __VLS_18;
const __VLS_23 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    field: "appDesc",
    label: "应用描述",
}));
const __VLS_25 = __VLS_24({
    field: "appDesc",
    label: "应用描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
__VLS_26.slots.default;
const __VLS_27 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    modelValue: (__VLS_ctx.form.appDesc),
    placeholder: "请输入应用简介",
}));
const __VLS_29 = __VLS_28({
    modelValue: (__VLS_ctx.form.appDesc),
    placeholder: "请输入应用简介",
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
var __VLS_26;
const __VLS_31 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    field: "appIcon",
    label: "应用图标",
}));
const __VLS_33 = __VLS_32({
    field: "appIcon",
    label: "应用图标",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
__VLS_34.slots.default;
if (__VLS_ctx.form.appIcon) {
    const __VLS_35 = {}.PictureUploader;
    /** @type {[typeof __VLS_components.PictureUploader, typeof __VLS_components.PictureUploader, ]} */ ;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        biz: "app_icon",
        modelValue: (__VLS_ctx.form.appIcon),
        value: (__VLS_ctx.form.appIcon),
    }));
    const __VLS_37 = __VLS_36({
        biz: "app_icon",
        modelValue: (__VLS_ctx.form.appIcon),
        value: (__VLS_ctx.form.appIcon),
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
}
var __VLS_34;
const __VLS_39 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    field: "appType",
    label: "应用类型",
}));
const __VLS_41 = __VLS_40({
    field: "appType",
    label: "应用类型",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
__VLS_42.slots.default;
const __VLS_43 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.form.appType),
    placeholder: "请选择应用类型",
    allowClear: true,
}));
const __VLS_45 = __VLS_44({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.form.appType),
    placeholder: "请选择应用类型",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
__VLS_46.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.APP_TYPE_ENUM))) {
    const __VLS_47 = {}.AOption;
    /** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
        value: (item),
        key: (item),
    }));
    const __VLS_49 = __VLS_48({
        value: (item),
        key: (item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    __VLS_50.slots.default;
    (__VLS_ctx.APP_TYPE_MAP[item]);
    var __VLS_50;
}
var __VLS_46;
var __VLS_42;
const __VLS_51 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    field: "scoringStrategy",
    label: "评分策略",
}));
const __VLS_53 = __VLS_52({
    field: "scoringStrategy",
    label: "评分策略",
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
__VLS_54.slots.default;
const __VLS_55 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.form.scoringStrategy),
    placeholder: "请选择评分策略",
    allowClear: true,
}));
const __VLS_57 = __VLS_56({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.form.scoringStrategy),
    placeholder: "请选择评分策略",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
__VLS_58.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.SCORE_STRATEGY_ENUM))) {
    const __VLS_59 = {}.AOption;
    /** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
        value: (item),
        key: (item),
    }));
    const __VLS_61 = __VLS_60({
        value: (item),
        key: (item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_60));
    __VLS_62.slots.default;
    (__VLS_ctx.SCORE_STRATEGY_MAP[item]);
    var __VLS_62;
}
var __VLS_58;
var __VLS_54;
const __VLS_63 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
    field: "reviewStatus",
    label: "审核状态",
}));
const __VLS_65 = __VLS_64({
    field: "reviewStatus",
    label: "审核状态",
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
__VLS_66.slots.default;
const __VLS_67 = {}.ASwitch;
/** @type {[typeof __VLS_components.ASwitch, typeof __VLS_components.aSwitch, ]} */ ;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
    type: "round",
    modelValue: (__VLS_ctx.form.reviewStatus),
}));
const __VLS_69 = __VLS_68({
    type: "round",
    modelValue: (__VLS_ctx.form.reviewStatus),
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
var __VLS_66;
const __VLS_71 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
    field: "reviewMessage",
    label: "审核意见",
}));
const __VLS_73 = __VLS_72({
    field: "reviewMessage",
    label: "审核意见",
}, ...__VLS_functionalComponentArgsRest(__VLS_72));
__VLS_74.slots.default;
const __VLS_75 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    modelValue: (__VLS_ctx.form.reviewMessage),
    placeholder: "请输入审核意见",
}));
const __VLS_77 = __VLS_76({
    modelValue: (__VLS_ctx.form.reviewMessage),
    placeholder: "请输入审核意见",
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
var __VLS_74;
var __VLS_14;
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            APP_TYPE_ENUM: APP_TYPE_ENUM,
            APP_TYPE_MAP: APP_TYPE_MAP,
            SCORE_STRATEGY_ENUM: SCORE_STRATEGY_ENUM,
            SCORE_STRATEGY_MAP: SCORE_STRATEGY_MAP,
            handleVisibilityChange: handleVisibilityChange,
            handleOk: handleOk,
            handleCancel: handleCancel,
        };
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
