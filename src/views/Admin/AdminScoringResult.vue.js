/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { getUserByIdUsingGet } from '@/api/userController';
import { Message } from '@arco-design/web-vue';
import { computed, ref } from 'vue';
import { IconSearch, IconSync } from '@arco-design/web-vue/es/icon';
import UserModal from '@/components/Modal/index.vue'; // 局部导入
import dayjs from 'dayjs';
import { addScoringResultUsingPost, deleteScoringResultUsingPost, listScoringResultByPageUsingPost, updateScoringResultUsingPost } from '@/api/scoringResultController';
// 审核人/创建人弹窗
import ReviewOrUserModal from '@/components/Modal/Common/ReviewOrUserModal.vue';
// 引入图标
import { IconRecord } from '@arco-design/web-vue/es/icon';
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
    const res = await listScoringResultByPageUsingPost(searchParams.value);
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
        title: 'id',
        dataIndex: 'id',
    },
    {
        title: '结果名称',
        dataIndex: 'resultName',
    },
    {
        title: '结果描述',
        dataIndex: 'resultDesc',
    },
    {
        title: '结果图片',
        slotName: 'resultPicture',
    },
    {
        title: '结果属性',
        dataIndex: 'resultProp',
    },
    {
        title: '评分范围',
        dataIndex: 'resultScoreRange',
    },
    {
        title: '用户Id',
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
const visible = ref(false); // 改为 const 声明
const userModalType = ref('add');
let editScoringResult = ref();
// 添加用户
const handleAdd = () => {
    visible.value = true;
    userModalType.value = 'add';
    editScoringResult.value = {};
};
const handleEdit = (record) => {
    editScoringResult.value = JSON.parse(JSON.stringify(record));
    visible.value = true;
    userModalType.value = 'edit';
};
// 删除用户
const handleDelete = async (record) => {
    let res = await deleteScoringResultUsingPost({
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
        res = await addScoringResultUsingPost(editScoringResult.value);
    }
    else if (userModalType.value === 'edit') {
        res = await updateScoringResultUsingPost(editScoringResult.value);
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
// ===========
const reviewerOrUserInfo = ref();
const ReviewerOrUserModalType = ref('userId');
// 获取用户信息
const handleUserId = async (record) => {
    //
    let res = await getUserByIdUsingGet({
        id: record.userId,
    });
    if (res.data.code === 0) {
        visible.value = true;
        reviewerOrUserInfo.value = res.data.data;
        ReviewerOrUserModalType.value = 'userId';
    }
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
    ...{ class: "admin-scoring-result" },
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
    field: "resultDesc",
    label: "结果描述",
    labelColFlex: "80px",
}));
const __VLS_30 = __VLS_29({
    field: "resultDesc",
    label: "结果描述",
    labelColFlex: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
const __VLS_32 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    modelValue: (__VLS_ctx.searchParams.resultDesc),
    placeholder: "请输入结果描述",
    allowClear: true,
}));
const __VLS_34 = __VLS_33({
    modelValue: (__VLS_ctx.searchParams.resultDesc),
    placeholder: "请输入结果描述",
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
    field: "resultProp",
    label: "结果属性",
    labelColFlex: "80px",
}));
const __VLS_42 = __VLS_41({
    field: "resultProp",
    label: "结果属性",
    labelColFlex: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
const __VLS_44 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    modelValue: (__VLS_ctx.searchParams.resultProp),
    placeholder: "请输入结果属性",
    allowClear: true,
}));
const __VLS_46 = __VLS_45({
    modelValue: (__VLS_ctx.searchParams.resultProp),
    placeholder: "请输入结果属性",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
var __VLS_43;
const __VLS_48 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
const __VLS_52 = {}.ASpace;
/** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_55.slots.default;
const __VLS_56 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    htmlType: "submit",
    type: "primary",
}));
const __VLS_58 = __VLS_57({
    htmlType: "submit",
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_59.slots;
    const __VLS_60 = {}.IconSearch;
    /** @type {[typeof __VLS_components.IconSearch, typeof __VLS_components.iconSearch, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
    const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
}
var __VLS_59;
const __VLS_64 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    ...{ 'onClick': {} },
}));
const __VLS_66 = __VLS_65({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_68;
let __VLS_69;
let __VLS_70;
const __VLS_71 = {
    onClick: (...[$event]) => {
        __VLS_ctx.clearSearchParams();
    }
};
__VLS_67.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_67.slots;
    const __VLS_72 = {}.IconSync;
    /** @type {[typeof __VLS_components.IconSync, typeof __VLS_components.iconSync, ]} */ ;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({}));
    const __VLS_74 = __VLS_73({}, ...__VLS_functionalComponentArgsRest(__VLS_73));
}
var __VLS_67;
var __VLS_55;
var __VLS_51;
var __VLS_39;
var __VLS_11;
var __VLS_3;
const __VLS_76 = {}.ATable;
/** @type {[typeof __VLS_components.ATable, typeof __VLS_components.aTable, typeof __VLS_components.ATable, typeof __VLS_components.aTable, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    ...{ 'onPageChange': {} },
    ...{ 'onPageSizeChange': {} },
    columns: (__VLS_ctx.columns),
    data: (__VLS_ctx.dataList),
    pagination: (__VLS_ctx.pagination),
}));
const __VLS_78 = __VLS_77({
    ...{ 'onPageChange': {} },
    ...{ 'onPageSizeChange': {} },
    columns: (__VLS_ctx.columns),
    data: (__VLS_ctx.dataList),
    pagination: (__VLS_ctx.pagination),
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
let __VLS_80;
let __VLS_81;
let __VLS_82;
const __VLS_83 = {
    onPageChange: (__VLS_ctx.onPageChange)
};
const __VLS_84 = {
    onPageSizeChange: (__VLS_ctx.onPageSizeChange)
};
__VLS_79.slots.default;
{
    const { resultPicture: __VLS_thisSlot } = __VLS_79.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (record?.resultPicture?.startsWith('http' || 'https')) {
        const __VLS_85 = {}.AAvatar;
        /** @type {[typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, ]} */ ;
        // @ts-ignore
        const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({}));
        const __VLS_87 = __VLS_86({}, ...__VLS_functionalComponentArgsRest(__VLS_86));
        __VLS_88.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            alt: "avatar",
            src: (record?.resultPicture),
        });
        var __VLS_88;
    }
    else {
        const __VLS_89 = {}.AAvatar;
        /** @type {[typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, typeof __VLS_components.AAvatar, typeof __VLS_components.aAvatar, ]} */ ;
        // @ts-ignore
        const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({}));
        const __VLS_91 = __VLS_90({}, ...__VLS_functionalComponentArgsRest(__VLS_90));
        __VLS_92.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            alt: "avatar",
            src: "@/assets/logo.png",
        });
        var __VLS_92;
    }
}
{
    const { userId: __VLS_thisSlot } = __VLS_79.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_93 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
        ...{ 'onClick': {} },
        type: "outline",
        status: "success",
    }));
    const __VLS_95 = __VLS_94({
        ...{ 'onClick': {} },
        type: "outline",
        status: "success",
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
    let __VLS_97;
    let __VLS_98;
    let __VLS_99;
    const __VLS_100 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleUserId(record);
        }
    };
    __VLS_96.slots.default;
    {
        const { icon: __VLS_thisSlot } = __VLS_96.slots;
        const __VLS_101 = {}.IconRecord;
        /** @type {[typeof __VLS_components.IconRecord, typeof __VLS_components.iconRecord, ]} */ ;
        // @ts-ignore
        const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({}));
        const __VLS_103 = __VLS_102({}, ...__VLS_functionalComponentArgsRest(__VLS_102));
    }
    var __VLS_96;
}
{
    const { createTime: __VLS_thisSlot } = __VLS_79.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss'));
}
{
    const { updateTime: __VLS_thisSlot } = __VLS_79.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss'));
}
{
    const { userEdit: __VLS_thisSlot } = __VLS_79.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_105 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_107 = __VLS_106({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
    let __VLS_109;
    let __VLS_110;
    let __VLS_111;
    const __VLS_112 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleEdit(record);
        }
    };
    __VLS_108.slots.default;
    var __VLS_108;
    const __VLS_113 = {}.APopconfirm;
    /** @type {[typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
        ...{ 'onOk': {} },
        content: "您确定要删除吗?",
    }));
    const __VLS_115 = __VLS_114({
        ...{ 'onOk': {} },
        content: "您确定要删除吗?",
    }, ...__VLS_functionalComponentArgsRest(__VLS_114));
    let __VLS_117;
    let __VLS_118;
    let __VLS_119;
    const __VLS_120 = {
        onOk: (...[$event]) => {
            __VLS_ctx.handleDelete(record);
        }
    };
    __VLS_116.slots.default;
    const __VLS_121 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
        type: "text",
    }));
    const __VLS_123 = __VLS_122({
        type: "text",
    }, ...__VLS_functionalComponentArgsRest(__VLS_122));
    __VLS_124.slots.default;
    var __VLS_124;
    var __VLS_116;
}
var __VLS_79;
/** @type {[typeof UserModal, ]} */ ;
// @ts-ignore
const __VLS_125 = __VLS_asFunctionalComponent(UserModal, new UserModal({
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    title: (__VLS_ctx.userModalType === 'add' ? '添加用户' : '编辑用户'),
    form: (__VLS_ctx.editScoringResult),
    modelValue: (__VLS_ctx.visible),
}));
const __VLS_126 = __VLS_125({
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    title: (__VLS_ctx.userModalType === 'add' ? '添加用户' : '编辑用户'),
    form: (__VLS_ctx.editScoringResult),
    modelValue: (__VLS_ctx.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_125));
let __VLS_128;
let __VLS_129;
let __VLS_130;
const __VLS_131 = {
    onOk: (__VLS_ctx.handleOk)
};
const __VLS_132 = {
    onCancel: (__VLS_ctx.handleCancel)
};
var __VLS_127;
if (__VLS_ctx.ReviewerOrUserModalType !== null) {
    /** @type {[typeof ReviewOrUserModal, ]} */ ;
    // @ts-ignore
    const __VLS_133 = __VLS_asFunctionalComponent(ReviewOrUserModal, new ReviewOrUserModal({
        title: (__VLS_ctx.ReviewerOrUserModalType === 'reviewerId' ? '审核人信息' : '创建人信息'),
        form: (__VLS_ctx.reviewerOrUserInfo),
        modelValue: (__VLS_ctx.visible),
    }));
    const __VLS_134 = __VLS_133({
        title: (__VLS_ctx.ReviewerOrUserModalType === 'reviewerId' ? '审核人信息' : '创建人信息'),
        form: (__VLS_ctx.reviewerOrUserInfo),
        modelValue: (__VLS_ctx.visible),
    }, ...__VLS_functionalComponentArgsRest(__VLS_133));
}
/** @type {__VLS_StyleScopedClasses['admin-scoring-result']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            IconSearch: IconSearch,
            IconSync: IconSync,
            dayjs: dayjs,
            ReviewOrUserModal: ReviewOrUserModal,
            IconRecord: IconRecord,
            searchParams: searchParams,
            dataList: dataList,
            pagination: pagination,
            loadData: loadData,
            columns: columns,
            clearSearchParams: clearSearchParams,
            visible: visible,
            userModalType: userModalType,
            editScoringResult: editScoringResult,
            handleEdit: handleEdit,
            handleDelete: handleDelete,
            handleOk: handleOk,
            handleCancel: handleCancel,
            reviewerOrUserInfo: reviewerOrUserInfo,
            ReviewerOrUserModalType: ReviewerOrUserModalType,
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
