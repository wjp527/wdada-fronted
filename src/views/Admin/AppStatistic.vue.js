/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { computed, onMounted, ref, watchEffect } from 'vue';
import VChart from 'vue-echarts';
import 'echarts';
import { doAppAnswerCountUsingGet, doAppAnswerResultCountUsingGet } from '@/api/appStatisticController';
import { Message } from '@arco-design/web-vue';
const appAnswerCountList = ref([]);
const appAnswerResultCountList = ref([]);
const loadAppAnswerCount = async () => {
    let res = await doAppAnswerCountUsingGet();
    if (res.data.code === 0) {
        appAnswerCountList.value = res.data.data;
    }
    else {
        Message.error('获取失败: ' + res.data.msg);
    }
};
let appAnswerCountOption = computed(() => {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        xAxis: {
            type: 'category',
            data: appAnswerCountList.value.map(item => item.appId),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: appAnswerCountList.value.map(item => item.answerCount),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)',
                },
            },
        ],
    };
});
let appAnswerResultCountOption = computed(() => {
    return {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '5%',
            left: 'center',
        },
        series: [
            {
                name: '应用答案结果分布统计',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                    borderRadius: 10,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold',
                    },
                },
                labelLine: {
                    show: false,
                },
                data: appAnswerResultCountList.value?.map(item => {
                    return {
                        value: item.resultCount,
                        name: item.resultName,
                    };
                }),
            },
        ],
    };
});
const loadAppAnswerResultCount = async (appId) => {
    console.log(appId, 's');
    if (appId == '') {
        return;
    }
    let res = await doAppAnswerResultCountUsingGet({
        appId: appId,
    });
    if (res.data.code === 0) {
        appAnswerResultCountList.value = res.data.data;
    }
    else {
        Message.error('获取失败: ' + res.data.msg);
    }
};
watchEffect(() => {
    loadAppAnswerCount();
    loadAppAnswerResultCount('');
});
onMounted(() => {
    loadAppAnswerCount();
    loadAppAnswerResultCount('');
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-2xl" },
});
const __VLS_0 = {}.VChart;
/** @type {[typeof __VLS_components.VChart, typeof __VLS_components.vChart, typeof __VLS_components.VChart, typeof __VLS_components.vChart, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    option: (__VLS_ctx.appAnswerCountOption),
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    option: (__VLS_ctx.appAnswerCountOption),
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "!mr-10" },
});
const __VLS_4 = {}.AInputSearch;
/** @type {[typeof __VLS_components.AInputSearch, typeof __VLS_components.aInputSearch, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ 'onSearch': {} },
    ...{ style: ({ width: '320px' }) },
    placeholder: "快速发现答题应用",
    searchButton: true,
    allowClear: true,
}));
const __VLS_6 = __VLS_5({
    ...{ 'onSearch': {} },
    ...{ style: ({ width: '320px' }) },
    placeholder: "快速发现答题应用",
    searchButton: true,
    allowClear: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onSearch: (value => __VLS_ctx.loadAppAnswerResultCount(value))
};
var __VLS_7;
const __VLS_12 = {}.VChart;
/** @type {[typeof __VLS_components.VChart, typeof __VLS_components.vChart, typeof __VLS_components.VChart, typeof __VLS_components.vChart, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    option: (__VLS_ctx.appAnswerResultCountOption),
    ...{ class: "!h-[300px]" },
}));
const __VLS_14 = __VLS_13({
    option: (__VLS_ctx.appAnswerResultCountOption),
    ...{ class: "!h-[300px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['!mr-10']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-[300px]']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            VChart: VChart,
            appAnswerCountOption: appAnswerCountOption,
            appAnswerResultCountOption: appAnswerResultCountOption,
            loadAppAnswerResultCount: loadAppAnswerResultCount,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
