/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { getUserByIdUsingGet } from '@/api/userController';
import { Message } from '@arco-design/web-vue';
import { computed, ref } from 'vue';
import { IconUserAdd, IconSearch, IconSync } from '@arco-design/web-vue/es/icon';
import QuestionModal from '@/components/Modal/Question/index.vue'; // 局部导入
import dayjs from 'dayjs';
import { addQuestionUsingPost, deleteQuestionUsingPost, listQuestionByPageUsingPost, updateQuestionUsingPost } from '@/api/questionController';
import { getAppVoByIdUsingGet } from '@/api/appController';
import ShowQuestion from '@/components/Modal/Question/ShowQuestion.vue';
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
    const res = await listQuestionByPageUsingPost(searchParams.value);
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
        title: '题目Id',
        dataIndex: 'id',
    },
    {
        title: '题目内容',
        slotName: 'questionContent',
    },
    {
        title: '用户Id',
        slotName: 'userId',
    },
    {
        title: '应用Id',
        slotName: 'appId',
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
let editQuestionInfo = ref({
    appId: 0,
    questionContent: [
        {
            options: [
                {
                    key: '',
                    result: '',
                    score: 0,
                    value: '',
                },
            ],
            title: '',
        },
    ],
});
// 添加用户
const handleAdd = () => {
    visible.value = true;
    userModalType.value = 'add';
    editQuestionInfo.value = {
        appId: 0,
        questionContent: [
            {
                options: [
                    {
                        key: '',
                        result: '',
                        score: 0,
                        value: '',
                    },
                ],
                title: '',
            },
        ],
    };
};
const handleEdit = (record) => {
    editQuestionInfo.value = JSON.parse(JSON.stringify(record));
    visible.value = true;
    userModalType.value = 'edit';
};
// 删除用户
const handleDelete = async (record) => {
    let res = await deleteQuestionUsingPost({
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
// 确认按钮【添加/修改 - 子组件传来】
const handleOk = async () => {
    visible.value = false;
    // 处理确认逻辑
    let res = null;
    if (userModalType.value === 'add') {
        res = await addQuestionUsingPost(editQuestionInfo.value);
    }
    else if (userModalType.value === 'edit') {
        res = await updateQuestionUsingPost(editQuestionInfo.value);
    }
    if (res.data.code === 0) {
        Message.success('操作成功');
        loadData();
    }
    else {
        Message.error(res.data.message);
    }
};
// 取消按钮【添加/修改 - 子组件传来】
const handleCancel = () => {
    visible.value = false;
    // 处理取消逻辑
};
// =------------------------------
// 获取用户信息
const userInfo = ref();
const handleUserId = async (record) => {
    const res = await getUserByIdUsingGet({
        id: record.userId,
    });
    if (res.data.code === 0) {
        userInfo.value = res.data.data;
    }
};
// 获取应用信息
const appInfo = ref();
const handleAppId = async (record) => {
    const res = await getAppVoByIdUsingGet({
        id: record.appId,
    });
    if (res.data.code === 0) {
        appInfo.value = res.data.data;
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
const currentQuestion = ref();
const modalVisible = ref(false); // 父组件状态
// 监听子组件的 visible 变化
const handleVisibleChange = newVisible => {
    modalVisible.value = newVisible;
};
const showQuestionDetail = (record) => {
    modalVisible.value = true;
    console.log(modalVisible.value, ' modalVisible.value ');
    currentQuestion.value = record;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "admin-question" },
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
    field: "userName",
    label: "用户名",
    labelColFlex: "100px",
}));
const __VLS_18 = __VLS_17({
    field: "userName",
    label: "用户名",
    labelColFlex: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.searchParams.userName),
    placeholder: "请输入用户名",
    allowClear: true,
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.searchParams.userName),
    placeholder: "请输入用户名",
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
    field: "userRole",
    label: "用户角色",
    labelColFlex: "80px",
}));
const __VLS_30 = __VLS_29({
    field: "userRole",
    label: "用户角色",
    labelColFlex: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
const __VLS_32 = {}.ASelect;
/** @type {[typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, typeof __VLS_components.ASelect, typeof __VLS_components.aSelect, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.searchParams.userRole),
    placeholder: "请选择用户角色",
    allowClear: true,
}));
const __VLS_34 = __VLS_33({
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.searchParams.userRole),
    placeholder: "请选择用户角色",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.AOption;
/** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    value: "admin",
}));
const __VLS_38 = __VLS_37({
    value: "admin",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
var __VLS_39;
const __VLS_40 = {}.AOption;
/** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    value: "user",
}));
const __VLS_42 = __VLS_41({
    value: "user",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
var __VLS_43;
const __VLS_44 = {}.AOption;
/** @type {[typeof __VLS_components.AOption, typeof __VLS_components.aOption, typeof __VLS_components.AOption, typeof __VLS_components.aOption, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    value: "ban",
}));
const __VLS_46 = __VLS_45({
    value: "ban",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
var __VLS_47;
var __VLS_35;
var __VLS_31;
var __VLS_27;
const __VLS_48 = {}.ACol;
/** @type {[typeof __VLS_components.ACol, typeof __VLS_components.aCol, typeof __VLS_components.ACol, typeof __VLS_components.aCol, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    span: (8),
}));
const __VLS_50 = __VLS_49({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
const __VLS_52 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    field: "userProfile",
    label: "用户介绍",
    labelColFlex: "80px",
}));
const __VLS_54 = __VLS_53({
    field: "userProfile",
    label: "用户介绍",
    labelColFlex: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_55.slots.default;
const __VLS_56 = {}.AInput;
/** @type {[typeof __VLS_components.AInput, typeof __VLS_components.aInput, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    modelValue: (__VLS_ctx.searchParams.userProfile),
    placeholder: "请输入用户介绍",
    allowClear: true,
}));
const __VLS_58 = __VLS_57({
    modelValue: (__VLS_ctx.searchParams.userProfile),
    placeholder: "请输入用户介绍",
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
var __VLS_55;
const __VLS_60 = {}.AFormItem;
/** @type {[typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, typeof __VLS_components.AFormItem, typeof __VLS_components.aFormItem, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
__VLS_63.slots.default;
const __VLS_64 = {}.ASpace;
/** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({}));
const __VLS_66 = __VLS_65({}, ...__VLS_functionalComponentArgsRest(__VLS_65));
__VLS_67.slots.default;
const __VLS_68 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_70 = __VLS_69({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
let __VLS_72;
let __VLS_73;
let __VLS_74;
const __VLS_75 = {
    onClick: (__VLS_ctx.handleAdd)
};
__VLS_71.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_71.slots;
    const __VLS_76 = {}.IconUserAdd;
    /** @type {[typeof __VLS_components.IconUserAdd, typeof __VLS_components.iconUserAdd, ]} */ ;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({}));
    const __VLS_78 = __VLS_77({}, ...__VLS_functionalComponentArgsRest(__VLS_77));
}
var __VLS_71;
const __VLS_80 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    htmlType: "submit",
    type: "primary",
}));
const __VLS_82 = __VLS_81({
    htmlType: "submit",
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
__VLS_83.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_83.slots;
    const __VLS_84 = {}.IconSearch;
    /** @type {[typeof __VLS_components.IconSearch, typeof __VLS_components.iconSearch, ]} */ ;
    // @ts-ignore
    const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({}));
    const __VLS_86 = __VLS_85({}, ...__VLS_functionalComponentArgsRest(__VLS_85));
}
var __VLS_83;
const __VLS_88 = {}.AButton;
/** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    ...{ 'onClick': {} },
}));
const __VLS_90 = __VLS_89({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
let __VLS_92;
let __VLS_93;
let __VLS_94;
const __VLS_95 = {
    onClick: (...[$event]) => {
        __VLS_ctx.clearSearchParams();
    }
};
__VLS_91.slots.default;
{
    const { icon: __VLS_thisSlot } = __VLS_91.slots;
    const __VLS_96 = {}.IconSync;
    /** @type {[typeof __VLS_components.IconSync, typeof __VLS_components.iconSync, ]} */ ;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({}));
    const __VLS_98 = __VLS_97({}, ...__VLS_functionalComponentArgsRest(__VLS_97));
}
var __VLS_91;
var __VLS_67;
var __VLS_63;
var __VLS_51;
var __VLS_11;
var __VLS_3;
const __VLS_100 = {}.ATable;
/** @type {[typeof __VLS_components.ATable, typeof __VLS_components.aTable, typeof __VLS_components.ATable, typeof __VLS_components.aTable, ]} */ ;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
    ...{ 'onPageChange': {} },
    ...{ 'onPageSizeChange': {} },
    columns: (__VLS_ctx.columns),
    data: (__VLS_ctx.dataList),
    pagination: (__VLS_ctx.pagination),
}));
const __VLS_102 = __VLS_101({
    ...{ 'onPageChange': {} },
    ...{ 'onPageSizeChange': {} },
    columns: (__VLS_ctx.columns),
    data: (__VLS_ctx.dataList),
    pagination: (__VLS_ctx.pagination),
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
let __VLS_104;
let __VLS_105;
let __VLS_106;
const __VLS_107 = {
    onPageChange: (__VLS_ctx.onPageChange)
};
const __VLS_108 = {
    onPageSizeChange: (__VLS_ctx.onPageSizeChange)
};
__VLS_103.slots.default;
{
    const { questionContent: __VLS_thisSlot } = __VLS_103.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_109 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }));
    const __VLS_111 = __VLS_110({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_110));
    let __VLS_113;
    let __VLS_114;
    let __VLS_115;
    const __VLS_116 = {
        onClick: (...[$event]) => {
            __VLS_ctx.showQuestionDetail(record);
        }
    };
    __VLS_112.slots.default;
    var __VLS_112;
    /** @type {[typeof ShowQuestion, ]} */ ;
    // @ts-ignore
    const __VLS_117 = __VLS_asFunctionalComponent(ShowQuestion, new ShowQuestion({
        ...{ 'onUpdate:visible': {} },
        record: (__VLS_ctx.currentQuestion),
        visible: (__VLS_ctx.modalVisible),
    }));
    const __VLS_118 = __VLS_117({
        ...{ 'onUpdate:visible': {} },
        record: (__VLS_ctx.currentQuestion),
        visible: (__VLS_ctx.modalVisible),
    }, ...__VLS_functionalComponentArgsRest(__VLS_117));
    let __VLS_120;
    let __VLS_121;
    let __VLS_122;
    const __VLS_123 = {
        'onUpdate:visible': (__VLS_ctx.handleVisibleChange)
    };
    var __VLS_119;
}
{
    const { userId: __VLS_thisSlot } = __VLS_103.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_124 = {}.APopover;
    /** @type {[typeof __VLS_components.APopover, typeof __VLS_components.aPopover, typeof __VLS_components.APopover, typeof __VLS_components.aPopover, ]} */ ;
    // @ts-ignore
    const __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({
        ...{ 'onPopupVisibleChange': {} },
        title: "用户信息",
        trigger: "click",
    }));
    const __VLS_126 = __VLS_125({
        ...{ 'onPopupVisibleChange': {} },
        title: "用户信息",
        trigger: "click",
    }, ...__VLS_functionalComponentArgsRest(__VLS_125));
    let __VLS_128;
    let __VLS_129;
    let __VLS_130;
    const __VLS_131 = {
        onPopupVisibleChange: (...[$event]) => {
            __VLS_ctx.handleUserId(record);
        }
    };
    __VLS_127.slots.default;
    const __VLS_132 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({}));
    const __VLS_134 = __VLS_133({}, ...__VLS_functionalComponentArgsRest(__VLS_133));
    __VLS_135.slots.default;
    (record.userId);
    var __VLS_135;
    {
        const { content: __VLS_thisSlot } = __VLS_127.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.userInfo?.userName);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.userInfo?.userProfile);
    }
    var __VLS_127;
}
{
    const { appId: __VLS_thisSlot } = __VLS_103.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_136 = {}.APopover;
    /** @type {[typeof __VLS_components.APopover, typeof __VLS_components.aPopover, typeof __VLS_components.APopover, typeof __VLS_components.aPopover, ]} */ ;
    // @ts-ignore
    const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
        ...{ 'onPopupVisibleChange': {} },
        title: "应用信息",
        trigger: "click",
    }));
    const __VLS_138 = __VLS_137({
        ...{ 'onPopupVisibleChange': {} },
        title: "应用信息",
        trigger: "click",
    }, ...__VLS_functionalComponentArgsRest(__VLS_137));
    let __VLS_140;
    let __VLS_141;
    let __VLS_142;
    const __VLS_143 = {
        onPopupVisibleChange: (...[$event]) => {
            __VLS_ctx.handleAppId(record);
        }
    };
    __VLS_139.slots.default;
    const __VLS_144 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({}));
    const __VLS_146 = __VLS_145({}, ...__VLS_functionalComponentArgsRest(__VLS_145));
    __VLS_147.slots.default;
    (record.appId);
    var __VLS_147;
    {
        const { content: __VLS_thisSlot } = __VLS_139.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.appInfo?.appName);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.appInfo?.appDesc);
    }
    var __VLS_139;
}
{
    const { createTime: __VLS_thisSlot } = __VLS_103.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss'));
}
{
    const { updateTime: __VLS_thisSlot } = __VLS_103.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss'));
}
{
    const { userEdit: __VLS_thisSlot } = __VLS_103.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_148 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_150 = __VLS_149({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_149));
    let __VLS_152;
    let __VLS_153;
    let __VLS_154;
    const __VLS_155 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleEdit(record);
        }
    };
    __VLS_151.slots.default;
    var __VLS_151;
    const __VLS_156 = {}.APopconfirm;
    /** @type {[typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, typeof __VLS_components.APopconfirm, typeof __VLS_components.aPopconfirm, ]} */ ;
    // @ts-ignore
    const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({
        ...{ 'onOk': {} },
        content: "您确定要删除吗?",
    }));
    const __VLS_158 = __VLS_157({
        ...{ 'onOk': {} },
        content: "您确定要删除吗?",
    }, ...__VLS_functionalComponentArgsRest(__VLS_157));
    let __VLS_160;
    let __VLS_161;
    let __VLS_162;
    const __VLS_163 = {
        onOk: (...[$event]) => {
            __VLS_ctx.handleDelete(record);
        }
    };
    __VLS_159.slots.default;
    const __VLS_164 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({
        type: "text",
    }));
    const __VLS_166 = __VLS_165({
        type: "text",
    }, ...__VLS_functionalComponentArgsRest(__VLS_165));
    __VLS_167.slots.default;
    var __VLS_167;
    var __VLS_159;
}
var __VLS_103;
/** @type {[typeof QuestionModal, ]} */ ;
// @ts-ignore
const __VLS_168 = __VLS_asFunctionalComponent(QuestionModal, new QuestionModal({
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    title: (__VLS_ctx.userModalType === 'add' ? '添加题目' : '编辑题目'),
    form: (__VLS_ctx.editQuestionInfo),
    modelValue: (__VLS_ctx.visible),
}));
const __VLS_169 = __VLS_168({
    ...{ 'onOk': {} },
    ...{ 'onCancel': {} },
    title: (__VLS_ctx.userModalType === 'add' ? '添加题目' : '编辑题目'),
    form: (__VLS_ctx.editQuestionInfo),
    modelValue: (__VLS_ctx.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_168));
let __VLS_171;
let __VLS_172;
let __VLS_173;
const __VLS_174 = {
    onOk: (__VLS_ctx.handleOk)
};
const __VLS_175 = {
    onCancel: (__VLS_ctx.handleCancel)
};
var __VLS_170;
/** @type {__VLS_StyleScopedClasses['admin-question']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            IconUserAdd: IconUserAdd,
            IconSearch: IconSearch,
            IconSync: IconSync,
            QuestionModal: QuestionModal,
            dayjs: dayjs,
            ShowQuestion: ShowQuestion,
            searchParams: searchParams,
            dataList: dataList,
            pagination: pagination,
            loadData: loadData,
            columns: columns,
            clearSearchParams: clearSearchParams,
            visible: visible,
            userModalType: userModalType,
            editQuestionInfo: editQuestionInfo,
            handleAdd: handleAdd,
            handleEdit: handleEdit,
            handleDelete: handleDelete,
            handleOk: handleOk,
            handleCancel: handleCancel,
            userInfo: userInfo,
            handleUserId: handleUserId,
            appInfo: appInfo,
            handleAppId: handleAppId,
            onPageChange: onPageChange,
            onPageSizeChange: onPageSizeChange,
            currentQuestion: currentQuestion,
            modalVisible: modalVisible,
            handleVisibleChange: handleVisibleChange,
            showQuestionDetail: showQuestionDetail,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
