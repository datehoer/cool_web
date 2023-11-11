<template>
    <div class="table-container">
        <el-button type="primary" @click="dialogVisible = true">任务下发</el-button>
        <el-table v-loading="loading" :data="task" stripe style="width: 100%">
            <el-table-column prop="id" label="Id"  width="200" />
            <el-table-column prop="keyword" label="keyword" width="250" />
            <el-table-column prop="productName" label="关注商品名称" width="380" />
            <el-table-column prop="productDelay" label="延时" width="380" />
            <el-table-column label="操作" width="380">
                <template #default="scope">
                    <el-button size="small" @click="goToTaskResult(scope.row.id)">进入</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row.idAsString)">删除</el-button>
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
        <el-dialog
            v-model="dialogVisible"
            title="新建任务"
            width="700px"
        >
            <el-form
            ref="ruleFormRef"
            :rules="rules"
            :model="form"
            label-width="95px"
            label-position="left">
            <el-form-item label="关键词" prop="keyword">
                <el-input v-model="form.keyword" type="textarea" placeholder="请输入关键词" />
            </el-form-item>
            <el-form-item label="商品名称" prop="productName">
                <el-autocomplete
                    v-model="form.productName"
                    :fetch-suggestions="fetchCategories"
                    placeholder="请输入关注的商品名称"
                    @select="handleSelect"
                />
            </el-form-item>

            <el-form-item label="延迟时间" prop="productDelay">
                <el-input v-model="form.productDelay" type="textarea" placeholder="请输入延迟时间" />
            </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save(ruleFormRef)">
                保存
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import request from '@/utils/request';
import { FormInstance, FormRules } from 'element-plus';
import debounce from 'lodash/debounce';
const router = useRouter();
const task = ref<any>([]);
const loading = ref(false);
const pageSize = ref(10);
const total = ref(0);
const page = ref(1);
const dialogVisible = ref(false)
const searchResults = ref<any>([]);
const form = reactive({
    keyword: '',
    productId: '',
    productName: '',
    insertTime: '',
    productDelay: '',
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
    keyword: [
        { required: true, message: '请输入关键词', trigger: 'blur' },
    ],
    productName: [
        { required: true, message: '请输入关注的商品名称', trigger: 'blur' },
    ],
    productDelay: [
        { required: true, message: '请输入延迟时间', trigger: 'blur' },
    ],
})
const fetchProduct = async () => {
    loading.value = true;
    try {
        const response = await request.get('/task_info',
        {
            params: {
                page: page.value,
                limit: pageSize.value
            }
        });
        task.value = response.data.records;
        total.value = response.data.total;
        pageSize.value = response.data.size;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};
const save = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            form.insertTime = new Date().toISOString();
            try{
                const res = await request.post("/task_info", form)
                console.log(res);
            }catch(e){
                console.log(e);
            }finally{
                dialogVisible.value = false
                fetchProduct();
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
const fetchCategories = debounce(async (queryString: string, callback: Function) => {
    // 原有的 fetchCategories 逻辑
    if (queryString) {
        try {
            const response = await request.get('/category-name', {
                params: { name: queryString }
            });
            const formattedData = Object.entries(response.data).map(([name, productId]) => {
                return { value: name, productId: productId };
            });
            searchResults.value = formattedData;
            callback(searchResults.value);
        } catch (error) {
            console.error(error);
        }
    }
}, 500);
const deleteTask = async (id: number) => {
    try {
        const response = await request.delete(`/task_info?id=${id}`);
        console.log(response);
    } catch (error) {
        console.error(error);
    } finally {
        fetchProduct();
    }
};
onMounted(() => {
    fetchProduct();
});
const handleSelect = (item: any) => {
    form.productId = item.productId;
};
const handleCurrentChange = (val: number) => {
    page.value = val
    fetchProduct()
}
const handleDelete = (row: any) => {
    console.log('删除任务', row);
    deleteTask(row);
};
const goToTaskResult = (id: number) => {
    router.push({ name: 'taskResult', params: { taskId: id } });
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
