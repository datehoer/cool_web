<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <div class="grid-content ep-bg-purple">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content ep-bg-purple">
                            消息总数
                            <el-table :data="messageAllCount" style="width: 100%;height: 200px;">
                                <el-table-column prop="date" label="平台" width="180" />
                                <el-table-column prop="name" label="数量" width="180" />
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content ep-bg-purple">
                            今日消息数
                            <el-table :data="messageTodayCount" style="width: 100%;height: 200px;">
                                <el-table-column prop="date" label="平台" width="180" />
                                <el-table-column prop="name" label="数量" width="180" />
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content ep-bg-purple">
                            任务监控
                            <el-table :data="tableData" height="250" style="width: 100%;height: 300px;">
                                <el-table-column prop="date" label="Date" width="180" />
                                <el-table-column prop="name" label="Name" width="180" />
                                <el-table-column prop="address" label="Address" />
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content ep-bg-purple">
                月度统计
                <div id="monthCount" :style="{ width: '100%', height: '600px' }">
                </div>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
            <div class="grid-content ep-bg-purple">
                活跃5用户
                <div id="ActiveUsers" :style="{ width: '100%', height: '300px' }">
                </div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="grid-content ep-bg-purple">
                前五型号
                <div id="TopFiveCount" :style="{ width: '100%', height: '300px' }">
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import request from '@/utils/request'; // 引入封装的 request 实例
import { onMounted } from 'vue';
import { ref } from 'vue';
let echart = echarts;
const messageAllCount = ref([{}])
const messageTodayCount = ref([{}])
const fetchAllCount = async () => {
    try {
        const response = await request.get('/api/messageCount'); // 使用您的 API 路径
        let responseData = response.data;
        if (responseData && responseData.code === 1) {
            let transformedData = [
                { date: '用户数', name: String(responseData.data.userCount) },
                { date: '敏感消息数', name: String(responseData.data.sensitiveCount) },
                { date: '消息数', name: String(responseData.data.msgCount) },
                { date: '品牌数', name: String(responseData.data.productCount) }
            ]
            messageAllCount.value = transformedData;
        }
    } catch (error) {
        console.error(error);
    } finally {
    }
};
const fetchTodayCount = async () => {
    try {
        const response = await request.get('/api/todayMessageCount'); // 使用您的 API 路径
        let responseData = response.data;
        if (responseData && responseData.code === 1) {
            let transformedData = [
                { date: '用户数', name: String(responseData.data.userTodayCount) },
                { date: '敏感消息数', name: String(responseData.data.sensitiveTodayCount) },
                { date: '消息数', name: String(responseData.data.msgTodayCount) },
            ]
            messageTodayCount.value = transformedData;
        }
    } catch (error) {
        console.error(error);
    } finally {
    }
};

const tableData = [
    {
        date: '品牌数',
        name: '100',
    },
    {
        date: '消息数',
        name: '300',
    },
    {
        date: '敏感消息数',
        name: '10',
    },
    {
        date: '用户数',
        name: '120',
    }
]
const initChart = () => {
    let monthCount = echart.init(document.getElementById("monthCount"));
    monthCount.setOption({
        xAxis: {
            type: "category",
            data: [
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ]
        },
        tooltip: {
            trigger: "axis"
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                data: [
                    1320,
                    801,
                    102,
                    230,
                    4321,
                    4129
                ],
                type: "line",
                smooth: true
            }
        ]
    });
    let topFiveCount = echart.init(document.getElementById("TopFiveCount"));
    topFiveCount.setOption({
        title: {
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },

        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
    let activeUsers = echart.init(document.getElementById("ActiveUsers"));
    activeUsers.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    });
    window.onresize = function () {
        //自适应大小
        activeUsers.resize();
        monthCount.resize();
        topFiveCount.resize();
    };
}
onMounted(() => {
    fetchAllCount();
    fetchTodayCount();
    initChart();
});
</script>
<style scoped>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    /* 防止出现滚动条 */
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
    border: 1px solid #ebf4f5;
}
</style>