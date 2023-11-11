<template>
    <div class="table-container">
        <div>
            <el-table v-loading="loading" :data="brands" stripe style="width: 100%">
                <el-table-column prop="id" label="Id"  width="200" />
                <el-table-column label="logo" width="250">
                    <template #default="scope">
                        <img referrer="no-referrer|origin|unsafe-url" referrerPolicy="no-referrer" :src="scope.row.logo" alt="User Image" style="width: 50px; height: 50px;"/>
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
                    @current-change="handleCurrentChange"
                />
            </div>
        </div>
        <el-button type="primary" @click="goToBack">返回上级</el-button>
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
        const response = await request.get('/brands', {
            params: {
                page: page.value,
                limit: pageSize.value,
                typeId: productId
            }
        }); // 使用您的 API 路径
        brands.value = response.data.records; // 假设响应结构是 { data: { records: [], ... } }
        total.value = response.data.total;
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
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>