<template>
    <div class="table-container">
        <el-button type="primary" @click="dialogVisible = true" class="task-button">任务下发</el-button>
        <el-table v-loading="loading" :data="task" stripe style="width: 100%">
            <el-table-column prop="id" label="Id" width="200" />
            <el-table-column prop="keyword" label="keyword" width="250" />
            <el-table-column prop="productName" label="关注商品名称" width="380" />
            <el-table-column prop="productDelay" label="延时" width="380" />
            <el-table-column prop="taskStatus" label="任务状态" width="380" />
            <el-table-column label="操作" width="300">
                <template #default="scope">
                    <el-button size="small" @click="goToTaskResult(scope.row.id)">进入</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row.idAsString)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination
            :page-size="pageSize" :pager-count=9 layout="prev, pager, next" :total=total
                @current-change="handleCurrentChange" />
        </div>
        <el-dialog v-model="dialogVisible" title="新建任务" width="700px">
            <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="95px" label-position="left">
                <el-form-item label="关键词" prop="keyword">
                    <el-input v-model="form.keyword" type="textarea" placeholder="请输入关键词" />
                </el-form-item>
                <el-form-item label="商品名称" prop="productName">
                    <el-autocomplete
                    v-model="form.productName" :fetch-suggestions="fetchCategories"
                        placeholder="请输入关注的商品名称" @select="handleSelect" />
                </el-form-item>
                <el-form-item label="监控时间" prop="maxWatch">
                    <el-input v-model="form.maxWatch" type="textarea" placeholder="请输入监控时间,天为单位" />
                </el-form-item>
                <el-form-item label="延迟时间" prop="productDelay">
                    <el-input v-model="form.productDelay" type="textarea" placeholder="请输入延迟时间,分钟为单位" />
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
import {getUsernameFromToken} from '@/utils/parseJwt';
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
    maxWatch: '',
    taskUsername: '',
    taskStatus: ''
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
    maxWatch: [
        { required: true, message: '请输入监控时间', trigger: 'blur' },
    ],
})
const fetchTaskInfo = async () => {
    loading.value = true;
    try {
        const response = await request.get('/task/task_info',
            {
                params: {
                    page: page.value,
                    limit: pageSize.value
                }
            });
        task.value = response.data.data.records;
        total.value = response.data.data.total;
        pageSize.value = response.data.data.size;
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
            const token = localStorage.getItem('token'); // 替换为实际的 token key
            const name = getUsernameFromToken(token);
            form.taskUsername = name;
            form.taskStatus = "未开始";
            try {
                const res = await request.post("/task/task_info", form)
                console.log(res);
            } catch (e) {
                console.log(e);
            } finally {
                dialogVisible.value = false
                fetchTaskInfo();
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
            const response = await request.get('/api/category-name', {
                params: { name: queryString }
            });
            const formattedData = Object.entries(response.data.data).map(([name, productId]) => {
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
        const response = await request.delete(`/task/task_info?id=${id}`);
        console.log(response);
    } catch (error) {
        console.error(error);
    } finally {
        fetchTaskInfo();
    }
};
onMounted(() => {
    fetchTaskInfo();
});
const handleSelect = (item: any) => {
    form.productId = item.productId;
};
const handleCurrentChange = (val: number) => {
    page.value = val
    fetchTaskInfo()
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

.task-button {
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

