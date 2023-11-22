<template>
    <div class="table-container">
        <el-button type="primary" @click="goToBack" class="back-button">返回上级</el-button>
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
            <el-table-column prop="title" label="商品名称" width="380" />
            <el-table-column prop="starAverageScore" label="打分" width="380" />
            <el-table-column label="消息数量" width="180" header-align="center" align="center">
                <template #default="scope">
                    {{ scope.row.msgCount }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="380">
                <template #default="scope">
                    <el-button
                        size="small"
                        :disabled="scope.row.msgCount === 0"
                        @click="goToMsg(scope.row.id)"
                        >
                        进入
                    </el-button>
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
import request from '@/utils/request'; // 引入封装的 request 实例


const router = useRouter();
const route = useRoute();
const brandId = route.params.brandId;
const productId = route.params.productId;
const brands = ref<any>([]); // 存储用户数据
const loading = ref(false); // 控制加载状态
const pageSize = ref(10); // 每页显示条目数
const total = ref(0); // 总数据条数
const page = ref(1); // 当前页码
const fetchCategory = async () => {
    loading.value = true;
    try {
        const response = await request.get('/api/category', {
            params: {
                page: page.value,
                limit: pageSize.value,
                brandsId: brandId,
                typeId: productId
            }
        }); // 使用您的 API 路径
        brands.value = response.data.records;
        total.value = response.data.total;

        // 获取 ID 数组
        const ids = brands.value.map((brand: any) => brand.id);

        // 构造自定义查询字符串
        const query = ids.map(id => `ids=${encodeURIComponent(id)}`).join('&');
        const msgCounts = await request.get(`/api/msg-count?${query}`)
        const msgCountsData = msgCounts.data;
        brands.value.forEach((brand: any) => {
            brand.msgCount = msgCountsData[brand.id] || 0;
        });
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};
const goToMsg = (id: number) => {
    router.push({ name: 'msg', params: { categoryId: id } });
}
const goToBack = () => {
    router.back();
}
const handleCurrentChange = (val: number) => {
    page.value = val
    fetchCategory()
}
onMounted(() => {
    fetchCategory();
});
</script>
<style scoped>
.table-container {
    width: 100%;
    max-width: 1900px; /* 调整为适合您的布局宽度 */
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
