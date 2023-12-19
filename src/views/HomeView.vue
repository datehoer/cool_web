<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <div class="grid-content ep-bg-purple">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content ep-bg-purple">
                            消息总数
                            <el-table :data="messageAllCount" style="width: 100%; height: 200px">
                                <el-table-column prop="date" label="平台" width="180" />
                                <el-table-column prop="name" label="数量" width="180" />
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content ep-bg-purple">
                            今日消息数
                            <el-table :data="messageTodayCount" style="width: 100%; height: 200px">
                                <el-table-column prop="date" label="平台" width="180" />
                                <el-table-column prop="name" label="数量" width="180" />
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content ep-bg-purple">
                            前五型号
                            <div id="TopFiveCount" :style="{ width: '100%', height: '300px' }"></div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content ep-bg-purple">
                月度统计
                <div id="monthCount" :style="{ width: '100%', height: '600px' }"></div>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="6">
            <div class="grid-content ep-bg-purple">
                活跃10用户
                <el-table :data="activityUser" height="300" style="width: 100%; height: 300px">
                    <el-table-column label="头像" width="180">
                        <template #default="scope">
                            <img
                                referrer="no-referrer|origin|unsafe-url"
                                referrerPolicy="no-referrer"
                                :src="scope.row.SmallAvatar"
                                alt="User Image"
                                style="width: 50px; height: 50px"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="名称" width="180" />
                    <el-table-column prop="activitySource" label="活跃度" width="180" />
                </el-table>
            </div>
        </el-col>
        <el-col :span="18">
            <div class="grid-content ep-bg-purple">
                任务监控
                <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                    <el-table :data="task" stripe style="width: 100%">
                    <el-table-column prop="id" label="Id" width="200" />
                    <el-table-column prop="keyword" label="keyword" width="250" />
                    <el-table-column prop="productName" label="关注商品名称" width="380" />
                    <el-table-column prop="productDelay" label="延时" width="380" />
                    <el-table-column prop="taskStatus" label="任务状态" width="380" />
                </el-table>
                </ul>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import request from "@/utils/request"; // 引入封装的 request 实例
import { onMounted } from "vue";
import { ref } from "vue";
let echart = echarts;
const messageAllCount = ref([{}]);
const messageTodayCount = ref([{}]);
const monthStatisticsText = ref([]);
const monthStatisticsCount = ref([]);
const activityUser = ref([{}]);
const top5Brands = ref([{}]);
const task = ref<any>([]);
const pageSize = ref(10);
const total = ref(0);
const page = ref(1);
let loading = ref(false);
const fetchAllCount = async () => {
    try {
        const response = await request.get("/api/messageCount"); // 使用您的 API 路径
        let responseData = response.data;
        if (responseData && responseData.code === 1) {
            let transformedData = [
                { date: "用户数", name: String(responseData.data.userCount) },
                { date: "敏感消息数", name: String(responseData.data.sensitiveCount) },
                { date: "消息数", name: String(responseData.data.msgCount) },
                { date: "品牌数", name: String(responseData.data.productCount) },
            ];
            messageAllCount.value = transformedData;
        }
    } catch (error) {
        console.error(error);
    } finally {
    }
};
const fetchTodayCount = async () => {
    try {
        const response = await request.get("/api/todayMessageCount"); // 使用您的 API 路径
        let responseData = response.data;
        if (responseData && responseData.code === 1) {
            let transformedData = [
                { date: "用户数", name: String(responseData.data.userTodayCount) },
                {
                    date: "敏感消息数",
                    name: String(responseData.data.sensitiveTodayCount),
                },
                { date: "消息数", name: String(responseData.data.msgTodayCount) },
            ];
            messageTodayCount.value = transformedData;
        }
    } catch (error) {
        console.error(error);
    } finally {
    }
};
const fetchMonthStatistics = async () => {
    try {
        const response = await request.get("/api/monthStatistics"); // 使用您的 API 路径
        let responseData = response.data;
        if (responseData && responseData.code === 1) {
            monthStatisticsText.value = responseData.data.map(
                (item) => `${item.year}年${item.month}月`
            );
            monthStatisticsCount.value = responseData.data.map(
                (item) => item.messageCount
            );
        }
    } catch (error) {
        console.error(error);
    } finally {
    }
};
const fetchActivityUser = async () => {
    try {
        const response = await request.get("/api/activeUser"); // 使用您的 API 路径
        let responseData = response.data;
        if (responseData && responseData.code === 1) {
            let transformedData = responseData.data.map((item) => ({
                name: item.username,
                activitySource: item.activitySource,
                SmallAvatar: item.userSmallAvatar,
            }));
            activityUser.value = transformedData;
        }
    } catch (error) {
        console.error(error);
    } finally {
    }
};
const fetchTop5Brand = async () => {
    try {
        const response = await request.get("/api/top5Brand"); // 使用您的 API 路径
        let responseData = response.data;
        if (responseData && responseData.code === 1) {
            let transformedData = responseData.data.map((item) => ({
                value: item.infoCount,
                name: item.title,
            }));
            top5Brands.value = transformedData;
        }
    } catch (error) {
        console.error(error);
    } finally {
    }
};
const tableData = [
    {
        date: "品牌数",
        name: "100",
    },
    {
        date: "消息数",
        name: "300",
    },
    {
        date: "敏感消息数",
        name: "10",
    },
    {
        date: "用户数",
        name: "120",
    },
];
const initChart = () => {
    let monthCount = echart.init(document.getElementById("monthCount"));
    monthCount.setOption({
        xAxis: {
            type: "category",
            data: [...monthStatisticsText.value].reverse(),
        },
        tooltip: {
            trigger: "axis",
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: [...monthStatisticsCount.value].reverse(),
                type: "line",
                smooth: true,
            },
        ],
    });
    let topFiveCount = echart.init(document.getElementById("TopFiveCount"));
    topFiveCount.setOption({
        title: {
            left: "center",
        },
        tooltip: {
            trigger: "item",
        },

        series: [
            {
                type: "pie",
                radius: "50%",
                data: top5Brands.value,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    });
    window.onresize = function () {
        //自适应大小
        monthCount.resize();
        topFiveCount.resize();
    };
};
const load = async () => {
    if (loading.value || task.value.length >= total.value) {
        // 如果正在加载或已加载全部数据，则不再加载
        return;
    }
    loading.value = true;  // 设置加载状态为true
    page.value++;  // 增加页码
    try {
        await fetchTaskInfo();  // 调用获取数据的函数
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;  // 加载完成后设置加载状态为false
    }
};
const fetchTaskInfo = async () => {
    try {
        const response = await request.get('/task/task_info',
            {
                params: {
                    page: page.value,
                    limit: pageSize.value
                }
            });
        task.value = [...task.value, ...response.data.data.records];
        total.value = response.data.data.total;
    } catch (error) {
        console.error(error);
    }
};
onMounted(async () => {
    await fetchAllCount();
    await fetchTodayCount();
    await fetchMonthStatistics();
    await fetchActivityUser();
    await fetchTop5Brand();
    await fetchTaskInfo();
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

.infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>
