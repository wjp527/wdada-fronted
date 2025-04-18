<template>
  <div>
    <!-- <a-space> -->
    <div>
      <h1 class="text-2xl">热门应用统计</h1>
      <v-chart :option="appAnswerCountOption" style="height: 300px"></v-chart>
    </div>

    <div>
      <div class="flex items-center">
        <h1 class="!mr-10">应用结果统计</h1>
        <a-input-search :style="{ width: '320px' }" placeholder="快速发现答题应用" search-button allow-clear @search="value => loadAppAnswerResultCount(value)" />
      </div>
      <v-chart :option="appAnswerResultCountOption" class="!h-[300px]"></v-chart>
    </div>
    <!-- </a-space> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import VChart from 'vue-echarts'
import 'echarts'
import { doAppAnswerCountUsingGet, doAppAnswerResultCountUsingGet } from '@/api/appStatisticController'
import { Message } from '@arco-design/web-vue'

const appAnswerCountList = ref<API.AppAnswerCountDTO>([])
const appAnswerResultCountList = ref([])
const loadAppAnswerCount = async () => {
  let res = await doAppAnswerCountUsingGet()
  if (res.data.code === 0) {
    appAnswerCountList.value = res.data.data
  } else {
    Message.error('获取失败: ' + res.data.msg)
  }
}
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
  }
})

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
          }
        }),
      },
    ],
  }
})

const loadAppAnswerResultCount = async (appId: any) => {
  console.log(appId, 's')
  if (appId == '') {
    return
  }
  let res = await doAppAnswerResultCountUsingGet({
    appId: appId,
  })
  if (res.data.code === 0) {
    appAnswerResultCountList.value = res.data.data
  } else {
    Message.error('获取失败: ' + res.data.msg)
  }
}

watchEffect(() => {
  loadAppAnswerCount()
  loadAppAnswerResultCount('')
})

onMounted(() => {
  loadAppAnswerCount()
  loadAppAnswerResultCount('')
})
</script>

<style lang="less" scoped>
::v-deep .arco-layout-content {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
