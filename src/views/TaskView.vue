<template>
    <div>
        <el-button type="primary" @click="dialogVisible = true">任务下发</el-button>
        <el-table v-loading="loading" :data="task" stripe style="width: 100%">
            <el-table-column prop="id" label="Id"  width="200" />
            <el-table-column prop="keyword" label="keyword" width="250" />
            <el-table-column prop="productName" label="关注商品名称" width="380" />
            <el-table-column prop="productDelay" label="延时" width="380" />
            <el-table-column label="操作" width="380">
                <template #default="scope">
                    <el-button size="small" @click="goToTaskResult(scope.row.id)">进入</el-button>
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
                <el-input v-model="form.productName" type="textarea" placeholder="请输入关注的商品名称" />
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
import { FormInstance, FormRules } from '_element-plus@2.4.2@element-plus';
const router = useRouter();
const task = ref<any>([]);
const loading = ref(false);
const pageSize = ref(10);
const total = ref(0);
const page = ref(1);
const dialogVisible = ref(false)
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
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!',form)
        } else {
            console.log('error submit!', fields)
        }
    })
}
onMounted(() => {
    fetchProduct();
});
const handleCurrentChange = (val: number) => {
    page.value = val
    fetchProduct()
}
const goToTaskResult = (id: number) => {
    router.push({ name: 'taskResult', params: { taskId: id } });
}
</script>
