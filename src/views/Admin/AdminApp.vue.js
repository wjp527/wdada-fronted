import { getUserByIdUsingGet } from '@/api/userController';
import { Message } from '@arco-design/web-vue';
import { computed, ref } from 'vue';
import { IconFolderAdd, IconSearch, IconSync } from '@arco-design/web-vue/es/icon';
// 日期格式校验
import dayjs from 'dayjs';
// 添加/修改弹窗
import AdminAppModal from '@/components/Modal/App/AdminAppModal.vue';
// 审核人/创建人弹窗
import ReviewOrUserModal from '@/components/Modal/Common/ReviewOrUserModal.vue';
import { addAppUsingPost, deleteAppUsingPost, listAppByPageUsingPost, updateAppUsingPost } from '@/api/appController';
import { APP_TYPE_ENUM, APP_TYPE_MAP, REVIEW_STATUS_MAP, SCORE_STRATEGY_ENUM, SCORE_STRATEGY_MAP } from '@/constant/app';
// 引入图标
import { IconEye, IconRecord } from '@arco-design/web-vue/es/icon';
import { useLoginUserStore } from '@/store/user';
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
    const res = await listAppByPageUsingPost(searchParams.value);
    if (res.data.code === 0) {
        dataList.value = res.data.data.records;
        total.value = res.data.data.total;
    }
    else {
        Message.error(res.data.message);
    }
};
loadData();
const columns = [
    {
        title: '应用Id',
        dataIndex: 'id',
    },
    {
        title: '应用名称',
        dataIndex: 'appName',
    },
    {
        title: '应用描述',
        dataIndex: 'appDesc',
    },
    {
        title: '应用图标',
        slotName: 'appIcon',
    },
    {
        title: '用户头像',
        slotName: 'userAvatar',
    },
    {
        title: '应用类型',
        slotName: 'appType',
    },
    {
        title: '评分策略',
        slotName: 'scoringStrategy',
    },
    {
        title: '审核状态',
        slotName: 'reviewStatus',
    },
    {
        title: '审核信息',
        dataIndex: 'reviewMessage',
    },
    {
        title: '审核人Id',
        slotName: 'reviewerId',
    },
    {
        title: '创建人Id',
        slotName: 'userId',
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
// 弹窗是否显示
const visible = ref(false); // 改为 const 声明
// 弹窗类型
const ModalType = ref('add');
let editAppInfo = ref();
// 添加用户
const handleAdd = () => {
    visible.value = true;
    ModalType.value = 'add';
    editAppInfo.value = {};
    ReviewerOrUserModalType.value = null;
};
// 编辑用户
const useLoginUser = useLoginUserStore();
const handleEdit = (record) => {
    editAppInfo.value = JSON.parse(JSON.stringify(record));
    editAppInfo.value.reviewStatus = editAppInfo.value.reviewStatus == 1 ? true : false;
    visible.value = true;
    ModalType.value = 'edit';
    ReviewerOrUserModalType.value = null;
};
// 删除用户
const handleDelete = async (record) => {
    let res = await deleteAppUsingPost({
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
    editAppInfo.value.reviewStatus = editAppInfo.value.reviewStatus ? 1 : 0;
    if (ModalType.value === 'add') {
        res = await addAppUsingPost(editAppInfo.value);
    }
    else if (ModalType.value === 'edit') {
        editAppInfo.value.reviewerId = useLoginUser.loginUser.id;
        editAppInfo.value.reviewTime = new Date().getTime().toString();
        editAppInfo.value.reviewMessage = editAppInfo.value.reviewMessage ?? '';
        res = await updateAppUsingPost(editAppInfo.value);
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
// 审核人信息
const ReviewerOrUserModalType = ref('reviewerId');
const reviewerOrUserInfo = ref();
const handleReviewerId = async (record) => {
    console.log(record.reviewerId, 'record.reviewerId');
    let res = await getUserByIdUsingGet({
        id: record.reviewerId,
    });
    if (res.data.code === 0) {
        visible.value = true;
        reviewerOrUserInfo.value = res.data.data;
        ReviewerOrUserModalType.value = 'reviewerId';
        ModalType.value = null;
    }
};
// 获取用户信息
const handleUserId = async (record) => {
    console.log(record);
    //
    let res = await getUserByIdUsingGet({
        id: record.userId,
    });
    if (res.data.code === 0) {
        visible.value = true;
        reviewerOrUserInfo.value = res.data.data;
        ReviewerOrUserModalType.value = 'userId';
        ModalType.value = null;
    }
};
// 审核APP
const reviewVisible = ref(false);
const handleReview = (record) => {
    reviewVisible.value = true;
};
// 页码改变
const onPageChange = (page) => {
    searchParams.value.current = page;
    loadData();
};
// 每页条数改变
const onPageSizeChange = (size) => {
    // 更新搜索参数中的每页条数
    searchParams.value.pageSize = size;
    // 切换每页条数时重置为第一页
    searchParams.value.current = 1; // 切换每页条数时重置为第一页
    // 重新加载数据
    loadData();
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "admin-app" },
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
    field: "appName",
    label: "应用名",
    labelColFlex: "100px",
}));
const __VLS_18 = __VLS_17({
    field: "appName",
    label: "应用名",
    labelColFlex: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.searchParams.appName),
    placeholder: "请输入应用名",
    allowClear: true,
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.searchParams.appName),
    placeholder: "请输入应用名",
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
    field: "appDesc",
    label: "应用描述",
    labelColFlex: "80px",
}));
const __VLS_30 = __VLS_29({
    field: "appDesc",
    label: "应用描述",
    labelColFlex: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
const __VLS_32 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    modelValue: (__VLS_ctx.searchParams.appDesc),
    placeholder: "请输入应用描述",
    allowClear: true,
}));
const __VLS_34 = __VLS_33({
    modelValue: (__VLS_ctx.searchParams.appDesc),
    placeholder: "请输入应用描述",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
var __VLS_31;
var __VLS_27;
const __VLS_36 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    span: (8),
}));
const __VLS_38 = __VLS_37({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
const __VLS_40 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    field: "appType",
    label: "应用类型",
    labelColFlex: "80px",
}));
const __VLS_42 = __VLS_41({
    field: "appType",
    label: "应用类型",
    labelColFlex: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
const __VLS_44 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.searchParams.appType),
    placeholder: "请选择应用类型",
    allowClear: true,
}));
const __VLS_46 = __VLS_45({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.searchParams.appType),
    placeholder: "请选择应用类型",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.APP_TYPE_ENUM))) {
    const __VLS_48 = {}.AOption;
    /** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        value: (item),
        key: (item),
    }));
    const __VLS_50 = __VLS_49({
        value: (item),
        key: (item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_51.slots.default;
    (__VLS_ctx.APP_TYPE_MAP[item]);
    var __VLS_51;
}
var __VLS_47;
var __VLS_43;
const __VLS_52 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    field: "scoringStrategy",
    label: "评分策略",
    labelColFlex: "80px",
}));
const __VLS_54 = __VLS_53({
    field: "scoringStrategy",
    label: "评分策略",
    labelColFlex: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_55.slots.default;
const __VLS_56 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.searchParams.scoringStrategy),
    placeholder: "请选择评分策略",
    allowClear: true,
}));
const __VLS_58 = __VLS_57({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.searchParams.scoringStrategy),
    placeholder: "请选择评分策略",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.SCORE_STRATEGY_ENUM))) {
    const __VLS_60 = {}.AOption;
    /** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        value: (item),
        key: (item),
    }));
    const __VLS_62 = __VLS_61({
        value: (item),
        key: (item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    __VLS_63.slots.default;
    (__VLS_ctx.SCORE_STRATEGY_MAP[item]);
    var __VLS_63;
}
var __VLS_59;
var __VLS_55;
const __VLS_64 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({}));
const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
__VLS_67.slots.default;
const __VLS_68 = {}.ASpace;
/** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({}));
const __VLS_70 = __VLS_69({}, ...__VLS_functionalComponentArgsRest(__VLS_69));
__VLS_71.slots.default;
const __VLS_72 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_74 = __VLS_73({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_76;
let __VLS_77;
let __VLS_78;
const __VLS_79 = {
    onClick: (__VLS_ctx.handleAdd)
};
__VLS_75.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_75.slots;
    const __VLS_80 = {}.IconFolderAdd;
    /** @type {[typeof __VLS_components.IconFolderAdd, typeof __VLS_components.iconFolderAdd, ]} */ ;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({}));
    const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
}
var __VLS_75;
const __VLS_84 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    htmlType: "submit",
    type: "primary",
}));
const __VLS_86 = __VLS_85({
    htmlType: "submit",
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
__VLS_87.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_87.slots;
    const __VLS_88 = {}.IconSearch;
    /** @type {[typeof __VLS_components.IconSearch, typeof __VLS_components.iconSearch, ]} */ ;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({}));
    const __VLS_90 = __VLS_89({}, ...__VLS_functionalComponentArgsRest(__VLS_89));
}
var __VLS_87;
const __VLS_92 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    ...{ 'onClick': {} },
}));
const __VLS_94 = __VLS_93({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
let __VLS_96;
let __VLS_97;
let __VLS_98;
const __VLS_99 = {
    onClick: (...[$event]) => {
        __VLS_ctx.clearSearchParams();
    }
};
__VLS_95.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_95.slots;
    const __VLS_100 = {}.IconSync;
    /** @type {[typeof __VLS_components.IconSync, typeof __VLS_components.iconSync, ]} */ ;
    // @ts-ignore
    const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({}));
    const __VLS_102 = __VLS_101({}, ...__VLS_functionalComponentArgsRest(__VLS_101));
}
var __VLS_95;
var __VLS_71;
var __VLS_67;
var __VLS_39;
var __VLS_11;
var __VLS_3;
const __VLS_104 = {}.ATable;
/** @type {[typeof __VLS_components.ATable, typeof __VLS_components.aTable, typeof __VLS_components.ATable, typeof __VLS_components.aTable, ]} */ ;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
    ...{ 'onPageChange': {} },
    ...{ 'onPageSizeChange': {} },
    columns: (__VLS_ctx.columns),
    data: (__VLS_ctx.dataList),
    pagination: (__VLS_ctx.pagination),
}));
const __VLS_106 = __VLS_105({
    ...{ 'onPageChange': {} },
    ...{ 'onPageSizeChange': {} },
    columns: (__VLS_ctx.columns),
    data: (__VLS_ctx.dataList),
    pagination: (__VLS_ctx.pagination),
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
let __VLS_108;
let __VLS_109;
let __VLS_110;
const __VLS_111 = {
    onPageChange: (__VLS_ctx.onPageChange)
};
const __VLS_112 = {
    onPageSizeChange: (__VLS_ctx.onPageSizeChange)
};
__VLS_107.slots.default;
{
    const { appType: __VLS_thisSlot } = __VLS_107.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_113 = {}.ATag;
    /** @type {[typeof __VLS_components.ATag, typeof __VLS_components.aTag, typeof __VLS_components.ATag, typeof __VLS_components.aTag, ]} */ ;
    // @ts-ignore
    const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({}));
    const __VLS_115 = __VLS_114({}, ...__VLS_functionalComponentArgsRest(__VLS_114));
    __VLS_116.slots.default;
    (__VLS_ctx.APP_TYPE_MAP[record.appType]);
    var __VLS_116;
}
{
    const { scoringStrategy: __VLS_thisSlot } = __VLS_107.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_117 = {}.ATag;
    /** @type {[typeof __VLS_components.ATag, typeof __VLS_components.aTag, typeof __VLS_components.ATag, typeof __VLS_components.aTag, ]} */ ;
    // @ts-ignore
    const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({}));
    const __VLS_119 = __VLS_118({}, ...__VLS_functionalComponentArgsRest(__VLS_118));
    __VLS_120.slots.default;
    (__VLS_ctx.SCORE_STRATEGY_MAP[record.scoringStrategy]);
    var __VLS_120;
}
{
    const { reviewStatus: __VLS_thisSlot } = __VLS_107.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_121 = {}.ATag;
    /** @type {[typeof __VLS_components.ATag, typeof __VLS_components.aTag, typeof __VLS_components.ATag, typeof __VLS_components.aTag, ]} */ ;
    // @ts-ignore
    const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({}));
    const __VLS_123 = __VLS_122({}, ...__VLS_functionalComponentArgsRest(__VLS_122));
    __VLS_124.slots.default;
    (__VLS_ctx.REVIEW_STATUS_MAP[record.reviewStatus]);
    var __VLS_124;
}
{
    const { appIcon: __VLS_thisSlot } = __VLS_107.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (record?.appIcon?.startsWith('https://')) {
        const __VLS_125 = {}.AAvatar;
        /** @type {[typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, ]} */ ;
        // @ts-ignore
        const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({}));
        const __VLS_127 = __VLS_126({}, ...__VLS_functionalComponentArgsRest(__VLS_126));
        __VLS_128.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            alt: "avatar",
            src: (record.appIcon),
        });
        var __VLS_128;
    }
    else {
        const __VLS_129 = {}.AAvatar;
        /** @type {[typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, ]} */ ;
        // @ts-ignore
        const __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({}));
        const __VLS_131 = __VLS_130({}, ...__VLS_functionalComponentArgsRest(__VLS_130));
        __VLS_132.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            alt: "avatar",
            src: "@/assets/logo.png",
        });
        var __VLS_132;
    }
}
{
    const { userAvatar: __VLS_thisSlot } = __VLS_107.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (record?.userAvatar?.startsWith('https://')) {
        const __VLS_133 = {}.AAvatar;
        /** @type {[typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, ]} */ ;
        // @ts-ignore
        const __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133({}));
        const __VLS_135 = __VLS_134({}, ...__VLS_functionalComponentArgsRest(__VLS_134));
        __VLS_136.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            alt: "avatar",
            src: (record.userAvatar),
        });
        var __VLS_136;
    }
    else {
        const __VLS_137 = {}.AAvatar;
        /** @type {[typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, ]} */ ;
        // @ts-ignore
        const __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({}));
        const __VLS_139 = __VLS_138({}, ...__VLS_functionalComponentArgsRest(__VLS_138));
        __VLS_140.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            alt: "avatar",
            src: "@/assets/logo.png",
        });
        var __VLS_140;
    }
}
{
    const { reviewerId: __VLS_thisSlot } = __VLS_107.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (record.reviewerId != null) {
        const __VLS_141 = {}.AButton;
        /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
        // @ts-ignore
        const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({
            ...{ 'onClick': {} },
            type: "outline",
            status: "warning",
        }));
        const __VLS_143 = __VLS_142({
            ...{ 'onClick': {} },
            type: "outline",
            status: "warning",
        }, ...__VLS_functionalComponentArgsRest(__VLS_142));
        let __VLS_145;
        let __VLS_146;
        let __VLS_147;
        const __VLS_148 = {
            onClick: (...[$event]) => {
                if (!(record.reviewerId != null))
                    return;
                __VLS_ctx.handleReviewerId(record);
            }
        };
        __VLS_144.slots.default;
        {
            const { icon: __VLS_thisSlot } = __VLS_144.slots;
            const __VLS_149 = {}.IconEye;
            /** @type {[typeof __VLS_components.IconEye, typeof __VLS_components.iconEye, ]} */ ;
            // @ts-ignore
            const __VLS_150 = __VLS_asFunctionalComponent(__VLS_149, new __VLS_149({}));
            const __VLS_151 = __VLS_150({}, ...__VLS_functionalComponentArgsRest(__VLS_150));
        }
        var __VLS_144;
    }
    else {
        const __VLS_153 = {}.AButton;
        /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
        // @ts-ignore
        const __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({
            type: "outline",
            status: "warning",
        }));
        const __VLS_155 = __VLS_154({
            type: "outline",
            status: "warning",
        }, ...__VLS_functionalComponentArgsRest(__VLS_154));
        __VLS_156.slots.default;
        var __VLS_156;
    }
}
{
    const { userId: __VLS_thisSlot } = __VLS_107.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_157 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({
        ...{ 'onClick': {} },
        type: "outline",
        status: "success",
    }));
    const __VLS_159 = __VLS_158({
        ...{ 'onClick': {} },
        type: "outline",
        status: "success",
    }, ...__VLS_functionalComponentArgsRest(__VLS_158));
    let __VLS_161;
    let __VLS_162;
    let __VLS_163;
    const __VLS_164 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleUserId(record);
        }
    };
    __VLS_160.slots.default;
    {
        const { icon: __VLS_thisSlot } = __VLS_160.slots;
        const __VLS_165 = {}.IconRecord;
        /** @type {[typeof __VLS_components.IconRecord, typeof __VLS_components.iconRecord, ]} */ ;
        // @ts-ignore
        const __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165({}));
        const __VLS_167 = __VLS_166({}, ...__VLS_functionalComponentArgsRest(__VLS_166));
    }
    var __VLS_160;
}
{
    const { createTime: __VLS_thisSlot } = __VLS_107.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss'));
}
{
    const { updateTime: __VLS_thisSlot } = __VLS_107.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss'));
}
{
    const { userEdit: __VLS_thisSlot } = __VLS_107.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_169 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_171 = __VLS_170({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_170));
    let __VLS_173;
    let __VLS_174;
    let __VLS_175;
    const __VLS_176 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleEdit(record);
        }
    };
    __VLS_172.slots.default;
    var __VLS_172;
    const __VLS_177 = {}.APopconfirm;
    /** @type {[typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_178 = __VLS_asFunctionalComponent(__VLS_177, new __VLS_177({
        ...{ 'onOk': {} },
        content: "您确定要删除吗?",
    }));
    const __VLS_179 = __VLS_178({
        ...{ 'onOk': {} },
        content: "您确定要删除吗?",
    }, ...__VLS_functionalComponentArgsRest(__VLS_178));
    let __VLS_181;
    let __VLS_182;
    let __VLS_183;
    const __VLS_184 = {
        onOk: (...[$event]) => {
            __VLS_ctx.handleDelete(record);
        }
    };
    __VLS_180.slots.default;
    const __VLS_185 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_186 = __VLS_asFunctionalComponent(__VLS_185, new __VLS_185({
        type: "text",
    }));
    const __VLS_187 = __VLS_186({
        type: "text",
    }, ...__VLS_functionalComponentArgsRest(__VLS_186));
    __VLS_188.slots.default;
    var __VLS_188;
    var __VLS_180;
}
var __VLS_107;
if (__VLS_ctx.ModalType !== null) {
    /** @type {[typeof AdminAppModal, ]} */ ;
    // @ts-ignore
    const __VLS_189 = __VLS_asFunctionalComponent(AdminAppModal, new AdminAppModal({
        ...{ 'onOk': {} },
        ...{ 'onCancel': {} },
        title: (__VLS_ctx.ModalType === 'add' ? '添加应用' : '编辑应用'),
        form: (__VLS_ctx.editAppInfo),
        modelValue: (__VLS_ctx.visible),
    }));
    const __VLS_190 = __VLS_189({
        ...{ 'onOk': {} },
        ...{ 'onCancel': {} },
        title: (__VLS_ctx.ModalType === 'add' ? '添加应用' : '编辑应用'),
        form: (__VLS_ctx.editAppInfo),
        modelValue: (__VLS_ctx.visible),
    }, ...__VLS_functionalComponentArgsRest(__VLS_189));
    let __VLS_192;
    let __VLS_193;
    let __VLS_194;
    const __VLS_195 = {
        onOk: (__VLS_ctx.handleOk)
    };
    const __VLS_196 = {
        onCancel: (__VLS_ctx.handleCancel)
    };
    var __VLS_191;
}
if (__VLS_ctx.ReviewerOrUserModalType !== null) {
    /** @type {[typeof ReviewOrUserModal, ]} */ ;
    // @ts-ignore
    const __VLS_197 = __VLS_asFunctionalComponent(ReviewOrUserModal, new ReviewOrUserModal({
        title: (__VLS_ctx.ReviewerOrUserModalType === 'reviewerId' ? '审核人信息' : '创建人信息'),
        form: (__VLS_ctx.reviewerOrUserInfo),
        modelValue: (__VLS_ctx.visible),
    }));
    const __VLS_198 = __VLS_197({
        title: (__VLS_ctx.ReviewerOrUserModalType === 'reviewerId' ? '审核人信息' : '创建人信息'),
        form: (__VLS_ctx.reviewerOrUserInfo),
        modelValue: (__VLS_ctx.visible),
    }, ...__VLS_functionalComponentArgsRest(__VLS_197));
}
/** @type {__VLS_StyleScopedClasses['admin-app']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            IconFolderAdd: IconFolderAdd,
            IconSearch: IconSearch,
            IconSync: IconSync,
            dayjs: dayjs,
            AdminAppModal: AdminAppModal,
            ReviewOrUserModal: ReviewOrUserModal,
            APP_TYPE_ENUM: APP_TYPE_ENUM,
            APP_TYPE_MAP: APP_TYPE_MAP,
            REVIEW_STATUS_MAP: REVIEW_STATUS_MAP,
            SCORE_STRATEGY_ENUM: SCORE_STRATEGY_ENUM,
            SCORE_STRATEGY_MAP: SCORE_STRATEGY_MAP,
            IconEye: IconEye,
            IconRecord: IconRecord,
            searchParams: searchParams,
            dataList: dataList,
            pagination: pagination,
            loadData: loadData,
            columns: columns,
            clearSearchParams: clearSearchParams,
            visible: visible,
            ModalType: ModalType,
            editAppInfo: editAppInfo,
            handleAdd: handleAdd,
            handleEdit: handleEdit,
            handleDelete: handleDelete,
            handleOk: handleOk,
            handleCancel: handleCancel,
            ReviewerOrUserModalType: ReviewerOrUserModalType,
            reviewerOrUserInfo: reviewerOrUserInfo,
            handleReviewerId: handleReviewerId,
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
