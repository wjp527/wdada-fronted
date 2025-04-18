/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref, watchEffect, withDefaults, defineProps } from 'vue';
import { deleteScoringResultUsingPost, listScoringResultVoByPageUsingPost } from '@/api/scoringResultController';
import message from '@arco-design/web-vue/es/message';
import { dayjs } from '@arco-design/web-vue/es/_utils/date';
import { useLoginUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
const userLoginUser = useLoginUserStore();
const { loginUser } = storeToRefs(userLoginUser);
const props = withDefaults(defineProps(), {
    appId: () => '',
});
// 初始化搜索条件（不应该被修改）
const initSearchParams = {
    current: 1,
    pageSize: 10,
    sortField: 'createTime',
    sortOrder: 'descend',
};
const searchParams = ref({
    ...initSearchParams,
});
const dataList = ref([]);
const total = ref(0);
/**
 * 加载数据
 */
const loadData = async () => {
    if (!props.appId) {
        return;
    }
    const params = {
        ...searchParams.value,
        appId: props.appId,
    };
    const res = await listScoringResultVoByPageUsingPost(params);
    if (res.data.code === 0) {
        dataList.value = res.data.data?.records || [];
        total.value = res.data.data?.total || 0;
    }
    else {
        message.error('获取数据失败，' + res.data.message);
    }
};
/**
 * 当分页变化时，改变搜索条件，触发数据加载
 * @param page
 */
const onPageChange = (page) => {
    searchParams.value = {
        ...searchParams.value,
        current: page,
    };
};
/**
 * 删除
 * @param record
 */
const doDelete = async (record) => {
    if (!record.id) {
        return;
    }
    const res = await deleteScoringResultUsingPost({
        id: record.id,
    });
    if (res.data.code === 0) {
        loadData();
    }
    else {
        message.error('删除失败，' + res.data.message);
    }
};
/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
    loadData();
});
// 表格列配置
const columns = [
    {
        title: 'id',
        dataIndex: 'id',
    },
    {
        title: '名称',
        dataIndex: 'resultName',
    },
    {
        title: '描述',
        dataIndex: 'resultDesc',
    },
    {
        title: '图片',
        dataIndex: 'resultPicture',
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
        title: '应用 id',
        dataIndex: 'appId',
    },
    {
        title: '用户 id',
        dataIndex: 'userId',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        slotName: 'createTime',
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        slotName: 'updateTime',
    },
    {
        title: '操作',
        slotName: 'optional',
    },
];
//将loadData暴露出去
const __VLS_exposed = {
    loadData,
};
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    appId: () => '',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ATable;
/** @type {[typeof __VLS_components.ATable, typeof __VLS_components.aTable, typeof __VLS_components.ATable, typeof __VLS_components.aTable, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onPageChange': {} },
    columns: (__VLS_ctx.columns),
    data: (__VLS_ctx.dataList),
    pagination: ({
        showTotal: true,
        pageSize: __VLS_ctx.searchParams.pageSize,
        current: __VLS_ctx.searchParams.current,
        total: __VLS_ctx.total,
    }),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onPageChange': {} },
    columns: (__VLS_ctx.columns),
    data: (__VLS_ctx.dataList),
    pagination: ({
        showTotal: true,
        pageSize: __VLS_ctx.searchParams.pageSize,
        current: __VLS_ctx.searchParams.current,
        total: __VLS_ctx.total,
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onPageChange: (__VLS_ctx.onPageChange)
};
var __VLS_8 = {};
__VLS_3.slots.default;
{
    const { resultPicture: __VLS_thisSlot } = __VLS_3.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_9 = {}.AImage;
    /** @type {[typeof __VLS_components.AImage, typeof __VLS_components.aImage, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        width: "64",
        src: (record.resultPicture),
    }));
    const __VLS_11 = __VLS_10({
        width: "64",
        src: (record.resultPicture),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
}
{
    const { createTime: __VLS_thisSlot } = __VLS_3.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss'));
}
{
    const { updateTime: __VLS_thisSlot } = __VLS_3.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    (__VLS_ctx.dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss'));
}
{
    const { optional: __VLS_thisSlot } = __VLS_3.slots;
    const [{ record }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_13 = {}.ASpace;
    /** @type {[typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, typeof __VLS_components.ASpace, typeof __VLS_components.aSpace, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    __VLS_16.slots.default;
    if (__VLS_ctx.loginUser.userRole == 'admin') {
        const __VLS_17 = {}.AButton;
        /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
            ...{ 'onClick': {} },
        }));
        const __VLS_19 = __VLS_18({
            ...{ 'onClick': {} },
        }, ...__VLS_functionalComponentArgsRest(__VLS_18));
        let __VLS_21;
        let __VLS_22;
        let __VLS_23;
        const __VLS_24 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.loginUser.userRole == 'admin'))
                    return;
                __VLS_ctx.doUpdate?.(record);
            }
        };
        __VLS_20.slots.default;
        var __VLS_20;
    }
    const __VLS_25 = {}.AButton;
    /** @type {[typeof __VLS_components.AButton, typeof __VLS_components.aButton, typeof __VLS_components.AButton, typeof __VLS_components.aButton, ]} */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        ...{ 'onClick': {} },
        status: "danger",
    }));
    const __VLS_27 = __VLS_26({
        ...{ 'onClick': {} },
        status: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    let __VLS_29;
    let __VLS_30;
    let __VLS_31;
    const __VLS_32 = {
        onClick: (...[$event]) => {
            __VLS_ctx.doDelete(record);
        }
    };
    __VLS_28.slots.default;
    var __VLS_28;
    var __VLS_16;
}
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            dayjs: dayjs,
            loginUser: loginUser,
            searchParams: searchParams,
            dataList: dataList,
            total: total,
            onPageChange: onPageChange,
            doDelete: doDelete,
            columns: columns,
        };
    },
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
