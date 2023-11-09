<template>
    <div class="msg">
        <el-table v-loading="loading" :data="msgs" stripe style="width: 100%">
            <el-table-column prop="id" label="Id"  width="200" />
            <el-table-column prop="username" label="用户名"  width="200" />
            <el-table-column prop="message" label="消息"  width="600">
                <template #default="scope">
                    <el-text class="w-150px mb-2" truncated>
                        {{ scope.row.message }}
                    </el-text>
                </template>
            </el-table-column>
            <el-table-column prop="deviceTitle" label="发布设备"  width="200" />
            <el-table-column prop="createTime" label="发布时间"  width="200" >
                <template #default="scope">
                    {{ formatTime(scope.row.createTime) }}
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
const msgs = ref<any>([]); // 存储用户数据
const loading = ref(true); // 控制加载状态
const pageSize = ref(10); // 每页显示条目数
const total = ref(0); // 总数据条数
const page = ref(1); // 当前页码
const categoryId = route.params.categoryId;
const fetchMsg = async () => {
    try{
        const res = await request.get("/msg", {
            params: {
                page: page.value,
                limit: pageSize.value,
                tid: categoryId,
            }
        })
        msgs.value = res.data.records;
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
    fetchMsg();
};
const formatTime = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
onMounted(() => {
    fetchMsg();
});
</script>
