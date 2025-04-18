/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
// 导入需要的组件和方法
import { ref, watchEffect, computed } from 'vue';
import Card from '@/components/Card/index.vue';
import { listAppVoByPageUsingPost } from '@/api/appController';
import { REVIEW_STATUS_ENUM } from '@/constant/app';
import ShareModal from '@/components/Modal/ShareModal.vue';
const searchParams = ref({
    current: 1,
    pageSize: 12,
});
const appName = ref('');
const appList = ref([]);
const total = ref(0);
const loadData = async () => {
    const params = {
        reviewStatus: REVIEW_STATUS_ENUM.PASS,
        appName: appName.value,
        ...searchParams.value,
    };
    let res = await listAppVoByPageUsingPost(params);
    console.log(res.data.data.total, 'res.data.data.total');
    if (res.data.code === 0) {
        appList.value = res.data.data.records;
        total.value = res.data.data.total;
    }
};
loadData();
watchEffect(() => {
    loadData();
});
const paginationProps = computed(() => ({
    current: searchParams.value.current,
    pageSize: searchParams.value.pageSize,
    total: total.value,
}));
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
/** @type {__VLS_StyleScopedClasses['list-demo-action-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['list-demo-action-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['image-area']} */ ;
/** @type {__VLS_StyleScopedClasses['list-demo-action-layout']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "home-container" },
});
/** @type {[typeof ShareModal, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ShareModal, new ShareModal({
    modelValue: (__VLS_ctx.visible),
}));
const __VLS_1 = __VLS_0({
    modelValue: (__VLS_ctx.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex justify-center" },
});
const __VLS_3 = {}.AInputSearch;
/** @type {[typeof __VLS_components.AInputSearch, typeof __VLS_components.aInputSearch, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
    ...{ 'onSearch': {} },
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.appName),
    placeholder: "快速发现答题应用",
    searchButton: true,
    allowClear: true,
}));
const __VLS_5 = __VLS_4({
    ...{ 'onSearch': {} },
    ...{ style: ({ width: '320px' }) },
    modelValue: (__VLS_ctx.appName),
    placeholder: "快速发现答题应用",
    searchButton: true,
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
let __VLS_7;
let __VLS_8;
let __VLS_9;
const __VLS_10 = {
    onSearch: (__VLS_ctx.loadData)
};
var __VLS_6;
const __VLS_11 = {}.AList;
/** @type {[typeof __VLS_components.AList, typeof __VLS_components.aList, typeof __VLS_components.AList, typeof __VLS_components.aList, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ 'onPageChange': {} },
    ...{ 'onPageSizeChange': {} },
    ...{ class: "list-demo-action-layout" },
    gridProps: ({ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }),
    bordered: (false),
    data: (__VLS_ctx.appList),
    paginationProps: (__VLS_ctx.paginationProps),
}));
const __VLS_13 = __VLS_12({
    ...{ 'onPageChange': {} },
    ...{ 'onPageSizeChange': {} },
    ...{ class: "list-demo-action-layout" },
    gridProps: ({ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }),
    bordered: (false),
    data: (__VLS_ctx.appList),
    paginationProps: (__VLS_ctx.paginationProps),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_15;
let __VLS_16;
let __VLS_17;
const __VLS_18 = {
    onPageChange: (__VLS_ctx.onPageChange)
};
const __VLS_19 = {
    onPageSizeChange: (__VLS_ctx.onPageSizeChange)
};
__VLS_14.slots.default;
{
    const { item: __VLS_thisSlot } = __VLS_14.slots;
    const [{ item }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_20 = {}.AListItem;
    /** @type {[typeof __VLS_components.AListItem, typeof __VLS_components.aListItem, typeof __VLS_components.AListItem, typeof __VLS_components.aListItem, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ class: "list-demo-item" },
        actionLayout: "horizontal",
    }));
    const __VLS_22 = __VLS_21({
        ...{ class: "list-demo-item" },
        actionLayout: "horizontal",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    /** @type {[typeof Card, ]} */ ;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(Card, new Card({
        app: (item),
    }));
    const __VLS_25 = __VLS_24({
        app: (item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    var __VLS_23;
}
var __VLS_14;
/** @type {__VLS_StyleScopedClasses['home-container']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['list-demo-action-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['list-demo-item']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Card: Card,
            ShareModal: ShareModal,
            appName: appName,
            appList: appList,
            loadData: loadData,
            paginationProps: paginationProps,
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
