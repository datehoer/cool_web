<template>
    <div class="table-container">
        <el-button type="primary" @click="goToBack" class="back-button">返回上级</el-button>
        <div>
            <el-table v-loading="loading" :data="brands" stripe style="width: 100%">
                <el-table-column prop="id" label="Id" width="200" />
                <el-table-column label="logo" width="250">
                    <template #default="scope">
                        <img
                            referrer="no-referrer|origin|unsafe-url"
                            referrerPolicy="no-referrer"
                            :src="scope.row.logo"
                            alt="User Image"
                            style="width: 50px; height: 50px;"
                            />
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="title" width="380" />
                <el-table-column label="操作" width="380">
                    <template #default="scope">
                        <el-button size="small" @click="goToCategory(scope.row.id)">进入</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination
                    :page-size="pageSize"
                    :pager-count=9
                    layout="prev, pager, next"
                    :total=total
                    @current-change="handleCurrentChange" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import request from '@/utils/request'; // 引入封装的 request 实例
const router = useRouter();
const route = useRoute();
const productId = route.params.productId;
const brands = ref<any>([]); // 存储用户数据
const loading = ref(false); // 控制加载状态
const pageSize = ref(10); // 每页显示条目数
const total = ref(0); // 总数据条数
const page = ref(1); // 当前页码
const fetchBrands = async () => {
    loading.value = true;
    try {
        const response = await request.get('/api/brands', {
            params: {
                page: page.value,
                limit: pageSize.value,
                typeId: productId
            }
        }); // 使用您的 API 路径
        brands.value = response.data.data.records; // 假设响应结构是 { data: { records: [], ... } }
        total.value = response.data.data.total;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

const goToCategory = (id: number) => {
    router.push({ name: 'category', params: { brandId: id, productId: productId } });
}
const goToBack = () => {
    router.back();
}
const handleCurrentChange = (val: number) => {
    page.value = val
    fetchBrands()
}
onMounted(() => {
    fetchBrands();
});
</script>
<style scoped>
.table-container {
    width: 100%;
    max-width: 1240px; /* 调整为适合您的布局宽度 */
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
