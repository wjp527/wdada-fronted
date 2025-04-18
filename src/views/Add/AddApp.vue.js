/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineProps, ref, watchEffect, withDefaults } from 'vue';
import message from '@arco-design/web-vue/es/message';
import { useRouter } from 'vue-router';
import { addAppUsingPost, editAppUsingPost, getAppVoByIdUsingGet } from '@/api/appController';
import { SCORE_STRATEGY_MAP, APP_TYPE_MAP } from '@/constant/app';
const props = withDefaults(defineProps(), {
    id: () => {
        return '';
    },
});
const router = useRouter();
const form = ref({
    appDesc: '',
    appIcon: '',
    appName: '',
    appType: 0,
    scoringStrategy: 0,
});
const oldApp = ref();
/**
 * 加载数据
 */
const loadData = async () => {
    if (!props.id) {
        return;
    }
    const res = await getAppVoByIdUsingGet({
        id: props.id,
    });
    if (res.data.code === 0 && res.data.data) {
        oldApp.value = res.data.data;
        form.value = res.data.data;
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
    let res;
    // 如果是修改
    if (props.id) {
        res = await editAppUsingPost({
            id: props.id,
            ...form.value,
        });
    }
    else {
        // 创建
        res = await addAppUsingPost(form.value);
    }
    if (res.data.code === 0) {
        message.success('操作成功，即将跳转到应用详情页');
        setTimeout(() => {
            router.push(`/app/detail/${props.id || res.data.data}`);
        }, 3000);
    }
    else {
        message.error('操作失败，' + res.data.message);
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    id: () => {
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ style: {} },
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
    label: "应用名称",
}));
const __VLS_10 = __VLS_9({
    field: "appName",
    label: "应用名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.form.appName),
    placeholder: "请输入应用名称",
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_ctx.form.appName),
    placeholder: "请输入应用名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
var __VLS_11;
const __VLS_16 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    field: "appDesc",
    label: "应用描述",
}));
const __VLS_18 = __VLS_17({
    field: "appDesc",
    label: "应用描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.form.appDesc),
    placeholder: "请输入应用描述",
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.form.appDesc),
    placeholder: "请输入应用描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
var __VLS_19;
const __VLS_24 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    field: "appIcon",
    label: "应用图标",
}));
const __VLS_26 = __VLS_25({
    field: "appIcon",
    label: "应用图标",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.PictureUploader;
/** @type {[typeof __VLS_components.PictureUploader, typeof __VLS_components.PictureUploader, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    biz: "app_icon",
    modelValue: (__VLS_ctx.form.appIcon),
    value: (__VLS_ctx.form.appIcon),
}));
const __VLS_30 = __VLS_29({
    biz: "app_icon",
    modelValue: (__VLS_ctx.form.appIcon),
    value: (__VLS_ctx.form.appIcon),
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
var __VLS_27;
const __VLS_32 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    field: "appType",
    label: "应用类型",
}));
const __VLS_34 = __VLS_33({
    field: "appType",
    label: "应用类型",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    modelValue: (__VLS_ctx.form.appType),
    ...{ style: ({ width: '320px' }) },
    placeholder: "请选择应用类型",
}));
const __VLS_38 = __VLS_37({
    modelValue: (__VLS_ctx.form.appType),
    ...{ style: ({ width: '320px' }) },
    placeholder: "请选择应用类型",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
for (const [value, key] of __VLS_getVForSourceType((__VLS_ctx.APP_TYPE_MAP))) {
    const __VLS_40 = {}.AOption;
    /** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        value: (Number(key)),
        label: (value),
    }));
    const __VLS_42 = __VLS_41({
        value: (Number(key)),
        label: (value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
}
var __VLS_39;
var __VLS_35;
const __VLS_44 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    field: "scoringStrategy",
    label: "评分策略",
}));
const __VLS_46 = __VLS_45({
    field: "scoringStrategy",
    label: "评分策略",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
const __VLS_48 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    modelValue: (__VLS_ctx.form.scoringStrategy),
    ...{ style: ({ width: '320px' }) },
    placeholder: "请选择评分策略",
}));
const __VLS_50 = __VLS_49({
    modelValue: (__VLS_ctx.form.scoringStrategy),
    ...{ style: ({ width: '320px' }) },
    placeholder: "请选择评分策略",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
for (const [value, key] of __VLS_getVForSourceType((__VLS_ctx.SCORE_STRATEGY_MAP))) {
    const __VLS_52 = {}.AOption;
    /** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        value: (Number(key)),
        label: (value),
    }));
    const __VLS_54 = __VLS_53({
        value: (Number(key)),
        label: (value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
}
var __VLS_51;
var __VLS_47;
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
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SCORE_STRATEGY_MAP: SCORE_STRATEGY_MAP,
            APP_TYPE_MAP: APP_TYPE_MAP,
            form: form,
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
