<template>
    <div class="table-container">
        <el-table v-loading="loading" :data="product" stripe style="width: 100%">
            <el-table-column prop="id" label="Id"  width="200" />
            <el-table-column label="logo" width="250">
                <template #default="scope">
                    <img referrer="no-referrer|origin|unsafe-url" referrerPolicy="no-referrer" :src="scope.row.pic" alt="User Image" style="width: 50px; height: 50px;"/>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="title" width="380" />
            <el-table-column label="操作" width="380">
                <template #default="scope">
                    <el-button size="small" @click="goToBoard(scope.row.id)">进入</el-button>
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
import { useRouter } from 'vue-router';
import request from '@/utils/request';
const router = useRouter();
const product = ref<any>([]);
const loading = ref(false);
const pageSize = ref(10);
const total = ref(0);
const page = ref(1);

const fetchProduct = async () => {
    loading.value = true;
    try {
        const response = await request.get('/product_info',
        {
            params: {
                page: page.value,
                limit: pageSize.value
            }
        });
        product.value = response.data.records;
        total.value = response.data.total;
        pageSize.value = response.data.size;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchProduct();
});
const handleCurrentChange = (val: number) => {
    page.value = val
    fetchProduct()
}
const goToBoard = (id: number) => {
    router.push({ name: 'brands', params: { productId: id } });
}
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