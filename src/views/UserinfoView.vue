<template>
    <div class="table-container">
        <el-input-group>
            <el-input v-model="searchQuery" placeholder="Search by username" @input="debouncedHandleSearch"/>
            <template #append>
                <el-button icon="el-icon-search"/>
            </template>
        </el-input-group>
        <el-table v-loading="loading" :data="users['records']" stripe style="width: 100%">
            <el-table-column prop="uid" label="Id"  width="280" />
            <el-table-column label="头像" width="280">
                <template #default="scope">
                    <img
                    referrer="no-referrer|origin|unsafe-url"
                    referrerPolicy="no-referrer"
                    :src="scope.row.userSmallAvatar"
                    alt="User Image"
                    style="width: 50px; height: 50px;"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="username" label="UserName" width="280" />
            <el-table-column prop="displayUsername" label="displayUsername" width="280" />
            <el-table-column prop="insertTime" label="InsertTime" width="380" />
            <el-table-column label="操作" width="380">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination
            :page-size="pageSize"
            :pager-count=9
            layout="prev, pager, next"
            :total=parseInt(users.total)
            @current-change="handleCurrentChange"
        />
        </div>
    </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { ref, onMounted } from 'vue'
import _ from 'lodash'
const pageSize = ref(10)
const page = ref(1)
const limit = ref(10)
const users = ref<any>([])
const searchQuery = ref('')
const loading = ref(true)
const getUsers = (search = searchQuery.value) => {
    request
        .get('/api/user_info', {
            params: {
                limit: limit.value,
                page: page.value,
                userName: search
            }
        })
        .then((response) => {
            users.value = response.data
            pageSize.value = response.data.size
            console.log(users.value) // optional: log the retrieved data to the console
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            loading.value = false
        })
}
const handleCurrentChange = (val: number) => {
    page.value = val
    getUsers()
}
const handleSearch = () => {
    page.value = 1 // 重置到第一页
    getUsers(searchQuery.value)
}
const debouncedHandleSearch = _.debounce(handleSearch, 500)
const handleEdit = (row: any) => {
    console.log('编辑用户', row.uid);
};

const handleDelete = (row: any) => {
    console.log('删除用户', row.uid);
};
onMounted(() => {
    getUsers()
})
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
