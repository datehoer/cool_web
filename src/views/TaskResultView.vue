<template>
    <div class="taskResult">
        <el-table v-loading="loading" :data="taskResult" stripe style="width: 100%">
            <el-table-column prop="id" label="Id"  width="200" />
            <el-table-column prop="productName" label="监控商品名称"  width="200" />
            <el-table-column prop="message" label="消息"  width="600">
                <template #default="scope">
                    <el-text class="w-150px mb-2" truncated>
                        {{ scope.row.message }}
                    </el-text>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发布时间"  width="200" >
                <template #default="scope">
                    {{ formatTime(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="insertTime" label="发现时间"  width="200" >
                <template #default="scope">
                    {{ formatTime(scope.row.insertTime) }}
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :page-size="pageSize"
            :pager-count=9
            layout="prev, pager, next"
            :total=total
            @current-change="handleCurrentChange"
        />
        <el-button type="primary" @click="goToBack">返回上级</el-button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import request from '@/utils/request';
const router = useRouter();
const route = useRoute();
const taskResult = ref<any>([]); // 存储用户数据
const loading = ref(true); // 控制加载状态
const pageSize = ref(10); // 每页显示条目数
const total = ref(0); // 总数据条数
const page = ref(1); // 当前页码
const taskId = route.params.taskId;
const fetchTaskResult = async () => {
    try{
        const res = await request.get("/task_result_info", {
            params: {
                page: page.value,
                limit: pageSize.value,
                taskId: taskId,
            }
        })
        taskResult.value = res.data.records;
        total.value = res.data.total;
    }catch(e){
        console.log(e);
    }finally{
        loading.value = false;
    }
}
const goToBack = () => {
    router.back();
};
const handleCurrentChange = (val: number) => {
    page.value = val;
    fetchTaskResult();
};
const formatTime = (timeStamp: any) => {
    const dateObj = new Date(timeStamp);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    const hours = ('0' + dateObj.getHours()).slice(-2);
    const minutes = ('0' + dateObj.getMinutes()).slice(-2);
    const seconds = ('0' + dateObj.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
onMounted(() => {
    fetchTaskResult();
});
</script>
