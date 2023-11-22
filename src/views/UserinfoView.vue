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
                    <el-avatar :src="scope.row.userSmallAvatar"/>
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
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* 防止出现滚动条 */
}
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
.el-input {
    border: 1px solid #d3dce6;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.el-table th, .el-table td {
    padding: 12px 10px;
}

.el-table tr:hover {
    background: #f5f7fa;
}

img.user-avatar {
    border-radius: 50%;
}

.el-button {
    margin-right: 10px;
}

.el-pagination .el-pager li, .el-pagination .el-pager .number, .el-pagination .el-pager .btn-prev, .el-pagination .el-pager .btn-next {
    min-width: 35px;
    height: 35px;
    line-height: 35px;
}

</style>