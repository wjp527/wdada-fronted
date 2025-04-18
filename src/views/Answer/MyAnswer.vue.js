/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { getUserVoByIdUsingGet } from '@/api/userController';
import { Message } from '@arco-design/web-vue';
import { computed, ref } from 'vue';
import { IconSearch, IconSync } from '@arco-design/web-vue/es/icon';
import UserModal from '@/components/Modal/index.vue'; // 局部导入
import dayjs from 'dayjs';
import { addUserAnswerUsingPost, deleteUserAnswerUsingPost, listMyUserAnswerVoByPageUsingPost, updateUserAnswerUsingPost } from '@/api/userAnswerController';
import { APP_TYPE_ENUM, APP_TYPE_MAP, SCORE_STRATEGY_MAP } from '@/constant/app';
// 搜索条件
const searchParams = ref({
    userName: '',
    userRole: '',
    userProfile: '',
    current: 1,
    pageSize: 10,
});
// 展示数据
const dataList = ref();
// 总条数
const total = ref(0);
const pagination = computed(() => ({
    total: total.value,
    current: searchParams.value.current,
    pageSize: searchParams.value.pageSize,
    showTotal: true,
    showJumper: true,
}));
// 加载数据
const loadData = async () => {
    const res = await listMyUserAnswerVoByPageUsingPost(searchParams.value);
    if (res.data.code === 0) {
        dataList.value = res.data.data.records;
        total.value = res.data.data.total;
    }
    else {
        Message.error(res.data.message + '111');
    }
};
loadData();
const columns = [
    {
        title: '答题记录Id',
        dataIndex: 'id',
    },
    // {
    //   title: '选项',
    //   dataIndex: 'choices',
    // },
    {
        title: '结果Id',
        dataIndex: 'resultId',
    },
    {
        title: '结果名称',
        dataIndex: 'resultName',
    },
    {
        title: '应用类型',
        slotName: 'appType',
    },
    {
        title: '用户Id',
        slotName: 'userId',
    },
    {
        title: '评分策略',
        slotName: 'scoringStrategy',
    },
    {
        title: '创建时间',
        slotName: 'createTime',
    },
    {
        title: '更新时间',
        slotName: 'updateTime',
    },
    {
        title: '操作',
        slotName: 'userEdit',
    },
];
// 清空搜索条件
const clearSearchParams = () => {
    searchParams.value = {
        userName: '',
        userRole: '',
        userProfile: '',
        current: 1,
        pageSize: 10,
    };
    loadData();
};
const visible = ref(false); // 改为 const 声明
const userModalType = ref('add');
let editUserAnswer = ref();
// 添加用户
const handleAdd = () => {
    visible.value = true;
    userModalType.value = 'add';
    editUserAnswer.value = {};
};
const handleEdit = (record) => {
    editUserAnswer.value = JSON.parse(JSON.stringify(record));
    visible.value = true;
    userModalType.value = 'edit';
};
// 删除用户
const handleDelete = async (record) => {
    let res = await deleteUserAnswerUsingPost({
        id: record.id,
    });
    if (res.data.code === 0) {
        Message.success('删除成功');
        loadData();
    }
    else {
        Message.error(res.data.message);
    }
};
const handleOk = async () => {
    visible.value = false;
    // 处理确认逻辑
    let res = null;
    if (userModalType.value === 'add') {
        res = await addUserAnswerUsingPost(editUserAnswer.value);
    }
    else if (userModalType.value === 'edit') {
        res = await updateUserAnswerUsingPost(editUserAnswer.value);
    }
    if (res.data.code === 0) {
        Message.success('操作成功');
        loadData();
    }
    else {
        Message.error(res.data.message);
    }
};
const handleCancel = () => {
    visible.value = false;
    // 处理取消逻辑
};
// ======================
const userInfo = ref();
const handleUserId = async (record) => {
    let res = await getUserVoByIdUsingGet({
        id: record.userId,
    });
    if (res.data.code === 0) {
        userInfo.value = res.data.data;
    }
    else {
        Message.error(res.data.message);
    }
};
// 页码改变
const onPageChange = (page) => {
    searchParams.value.current = page;
    loadData();
};
// 每页条数改变
const onPageSizeChange = (size) => {
    searchParams.value.pageSize = size;
    searchParams.value.current = 1; // 切换每页条数时重置为第一页
    loadData();
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "admin-user-answer" },
});
const __VLS_0 = {}.AForm;
/** @type {[typeof __VLS_components.AForm, typeof __VLS_components.aForm, typeof __VLS_components.AForm, typeof __VLS_components.aForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.searchParams),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSubmit': {} },
    model: (__VLS_ctx.searchParams),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onSubmit: (__VLS_ctx.loadData)
};
__VLS_3.slots.default;
const __VLS_8 = {}.ARow;
/** @type {[typeof __VLS_components.ARow, typeof __VLS_components.aRow, typeof __VLS_components.ARow, typeof __VLS_components.aRow, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    gutter: (16),
}));
const __VLS_10 = __VLS_9({
    gutter: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    span: (8),
}));
const __VLS_14 = __VLS_13({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    field: "resultName",
    label: "结果名称",
    labelColFlex: "100px",
}));
const __VLS_18 = __VLS_17({
    field: "resultName",
    label: "结果名称",
    labelColFlex: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.searchParams.resultName),
    placeholder: "请输入结果名称",
    allowClear: true,
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.searchParams.resultName),
    placeholder: "请输入结果名称",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
var __VLS_19;
var __VLS_15;
const __VLS_24 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    span: (8),
}));
const __VLS_26 = __VLS_25({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    field: "appType",
    label: "应用类型",
    labelColFlex: "80px",
}));
const __VLS_30 = __VLS_29({
    field: "appType",
    label: "应用类型",
    labelColFlex: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
const __VLS_32 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.searchParams.appType),
    placeholder: "请选择应用类型",
    allowClear: true,
}));
const __VLS_34 = __VLS_33({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.searchParams.appType),
    placeholder: "请选择应用类型",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.APP_TYPE_ENUM))) {
    const __VLS_36 = {}.AOption;
    /** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        value: (item),
    }));
    const __VLS_38 = __VLS_37({
        value: (item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    (__VLS_ctx.APP_TYPE_MAP[item]);
    var __VLS_39;
}
var __VLS_35;
var __VLS_31;
var __VLS_27;
const __VLS_40 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    span: (8),
}));
const __VLS_42 = __VLS_41({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
const __VLS_44 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
const __VLS_48 = {}.ASpace;
/** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
const __VLS_52 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    htmlType: "submit",
    type: "primary",
}));
const __VLS_54 = __VLS_53({
    htmlType: "submit",
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_55.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_55.slots;
    const __VLS_56 = {}.IconSearch;
    /** @type {[typeof __VLS_components.IconSearch, typeof __VLS_components.iconSearch, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({}));
    const __VLS_58 = __VLS_57({}, ...__VLS_functionalComponentArgsRest(__VLS_57));
}
var __VLS_55;
const __VLS_60 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    ...{ 'onClick': {} },
}));
const __VLS_62 = __VLS_61({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
let __VLS_64;
let __VLS_65;
let __VLS_66;
const __VLS_67 = {
    onClick: (...[$event]) => {
        __VLS_ctx.clearSearchParams();
    }
};
__VLS_63.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_63.slots;
    const __VLS_68 = {}.IconSync;
    /** @type {[typeof __VLS_components.IconSync, typeof __VLS_components.iconSync, ]} */ ;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({}));
    const __VLS_70 = __VLS_69({}, ...__VLS_functionalComponentArgsRest(__VLS_69));
}
var __VLS_63;
var __VLS_51;
var __VLS_47;
var __VLS_43;
var __VLS_11;
var __VLS_3;
const __VLS_72 = {}.ATable;
/** @type {[typeof __VLS_components.ATable, typeof __VLS_components.aTable, typeof __VLS_components.ATable, typeof __VLS_components.aTable, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    ...{ 'onPageChange': {} },
    ...{ 'onPageSizeChange': {} },
    columns: (__VLS_ctx.columns),
    data: (__VLS_ctx.dataList),
    pagination: (__VLS_ctx.pagination),
}));
const __VLS_74 = __VLS_73({
    ...{ 'onPageChange': {} },
    ...{ 'onPageSizeChange': {} },
    columns: (__VLS_ctx.columns),
    data: (__VLS_ctx.dataList),
    pagination: (__VLS_ctx.pagination),
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_76;
let __VLS_77;
let __VLS_78;
const __VLS_79 = {
    onPageChange: (__VLS_ctx.onPageChange)
};
const __VLS_80 = {
    onPageSizeChange: (__VLS_ctx.onPageSizeChange)
};
__VLS_75.slots.default;
{
    const { appType: __VLS_thisSlot } = __VLS_75.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.APP_TYPE_MAP[record.appType]);
}
{
    const { userId: __VLS_thisSlot } = __VLS_75.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_81 = {}.APopover;
    /** @type {[typeof __VLS_components.APopover, typeof __VLS_components.aPopover, typeof __VLS_components.APopover, typeof __VLS_components.aPopover, ]} */ ;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
        ...{ 'onPopupVisibleChange': {} },
        title: "用户信息",
        trigger: "click",
    }));
    const __VLS_83 = __VLS_82({
        ...{ 'onPopupVisibleChange': {} },
        title: "用户信息",
        trigger: "click",
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    let __VLS_85;
    let __VLS_86;
    let __VLS_87;
    const __VLS_88 = {
        onPopupVisibleChange: (...[$event]) => {
            __VLS_ctx.handleUserId(record);
        }
    };
    __VLS_84.slots.default;
    const __VLS_89 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({}));
    const __VLS_91 = __VLS_90({}, ...__VLS_functionalComponentArgsRest(__VLS_90));
    __VLS_92.slots.default;
    (record.userId);
    var __VLS_92;
    {
        const { content: __VLS_thisSlot } = __VLS_84.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.userInfo?.userName);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.userInfo?.userProfile);
    }
    var __VLS_84;
}
{
    const { scoringStrategy: __VLS_thisSlot } = __VLS_75.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.SCORE_STRATEGY_MAP[record.scoringStrategy]);
}
{
    const { createTime: __VLS_thisSlot } = __VLS_75.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss'));
}
{
    const { updateTime: __VLS_thisSlot } = __VLS_75.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss'));
}
{
    const { userEdit: __VLS_thisSlot } = __VLS_75.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_93 = {}.APopconfirm;
    /** @type {[typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
        ...{ 'onOk': {} },
        content: "您确定要删除吗?",
    }));
    const __VLS_95 = __VLS_94({
        ...{ 'onOk': {} },
        content: "您确定要删除吗?",
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
    let __VLS_97;
    let __VLS_98;
    let __VLS_99;
    const __VLS_100 = {
        onOk: (...[$event]) => {
            __VLS_ctx.handleDelete(record);
        }
    };
    __VLS_96.slots.default;
    const __VLS_101 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
        type: "text",
    }));
    const __VLS_103 = __VLS_102({
        type: "text",
    }, ...__VLS_functionalComponentArgsRest(__VLS_102));
    __VLS_104.slots.default;
    var __VLS_104;
    var __VLS_96;
}
var __VLS_75;
/** @type {[typeof UserModal, ]} */ ;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent(UserModal, new UserModal({
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    title: (__VLS_ctx.userModalType === 'add' ? '添加用户' : '编辑用户'),
    form: (__VLS_ctx.editUserAnswer),
    modelValue: (__VLS_ctx.visible),
}));
const __VLS_106 = __VLS_105({
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    title: (__VLS_ctx.userModalType === 'add' ? '添加用户' : '编辑用户'),
    form: (__VLS_ctx.editUserAnswer),
    modelValue: (__VLS_ctx.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
let __VLS_108;
let __VLS_109;
let __VLS_110;
const __VLS_111 = {
    onOk: (__VLS_ctx.handleOk)
};
const __VLS_112 = {
    onCancel: (__VLS_ctx.handleCancel)
};
var __VLS_107;
/** @type {__VLS_StyleScopedClasses['admin-user-answer']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            IconSearch: IconSearch,
            IconSync: IconSync,
            dayjs: dayjs,
            APP_TYPE_ENUM: APP_TYPE_ENUM,
            APP_TYPE_MAP: APP_TYPE_MAP,
            SCORE_STRATEGY_MAP: SCORE_STRATEGY_MAP,
            searchParams: searchParams,
            dataList: dataList,
            pagination: pagination,
            loadData: loadData,
            columns: columns,
            clearSearchParams: clearSearchParams,
            visible: visible,
            userModalType: userModalType,
            editUserAnswer: editUserAnswer,
            handleDelete: handleDelete,
            handleOk: handleOk,
            handleCancel: handleCancel,
            userInfo: userInfo,
            handleUserId: handleUserId,
            onPageChange: onPageChange,
            onPageSizeChange: onPageSizeChange,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
