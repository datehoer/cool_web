<template>
    <div class="table-container">
        <el-button type="primary" @click="goToBack" class="back-button">返回上级</el-button>
        <el-table v-loading="loading" :data="msgs" stripe style="width: 100%">
            <el-table-column prop="id" label="Id" width="200" />
            <el-table-column prop="username" label="用户名" width="200" />
            <el-table-column prop="message" label="消息" width="600">
                <template #default="scope">
                    <el-text class="w-150px mb-2" truncated>
                        {{ scope.row.message }}
                    </el-text>
                </template>
            </el-table-column>
            <el-table-column prop="deviceTitle" label="发布设备" width="200" />
            <el-table-column prop="createTime" label="发布时间" width="200">
                <template #default="scope">
                    {{ formatTime(scope.row.createTime) }}
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination
                :page-size="pageSize"
                :pager-count=9
                layout="prev, pager, next"
                :total=total
                @current-change="handleCurrentChange"
            />
        </div>
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
    try {
        const res = await request.get("/api/msg", {
            params: {
                page: page.value,
                limit: pageSize.value,
                tid: categoryId,
            }
        })
        msgs.value = res.data.records;
        total.value = res.data.total;
    } catch (e) {
        console.log(e);
    } finally {
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
<style scoped>
.table-container {
    width: 100%;
    max-width: 1440px; /* 调整为适合您的布局宽度 */
    margin: 0 auto;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

.el-input-group {
    margin: 20px;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 8px;
}

.el-input-group .el-input {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
}

.el-table {
    margin: 20px;
}

.el-table th {
    background-color: #f2f6fc;
    color: #333;
    font-weight: 600;
    line-height: 1.5;
}

.el-table-column {
    text-align: center;
}

.el-table td {
    color: #666;
    padding: 12px 10px;
}

.el-table tr:hover {
    background: #ecf5ff;
}

.el-pagination {
    margin: 20px;
    text-align: center;
}

.el-pagination .el-pager li.active {
    background-color: #409eff;
    color: #fff;
}

.el-button {
    font-size: 14px;
    border: none;
}

.el-button--primary {
    background-color: #409eff;
    color: #fff;
}

.el-button--danger {
    background-color: #f56c6c;
    color: #fff;
}

.pagination-container {
    padding: 10px 20px;
    background: #f9f9f9;
    border-top: 1px solid #ebeef5;
}
.back-button {
    margin: 20px;
}
/* 响应式布局样式 */
@media screen and (max-width: 768px) {
    .table-container {
        margin: 10px;
    }

    .el-input-group, .el-pagination {
        margin: 10px;
    }

    .el-table th, .el-table td {
        padding: 8px 5px;
    }
}
</style>
