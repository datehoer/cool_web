<template>
    <div>
        <el-input v-model="searchQuery" placeholder="Search by username" @input="debouncedHandleSearch" />
        <el-table v-loading="loading" :data="users['records']" stripe style="width: 100%">
            <el-table-column prop="uid" label="Id"  width="280" />
            <el-table-column label="头像" width="280">
                <template #default="scope">
                    <img referrer="no-referrer|origin|unsafe-url" referrerPolicy="no-referrer" :src="scope.row.userSmallAvatar" alt="User Image" style="width: 50px; height: 50px;"/>
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
        <el-pagination
            :page-size="pageSize"
            :pager-count=9
            layout="prev, pager, next"
            :total=parseInt(users.total)
            @current-change="handleCurrentChange"
        />
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
        .get('/user_info', {
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
const handleCurrentChange = (val) => {
    page.value = val
    getUsers()
}
const handleSearch = () => {
    page.value = 1 // 重置到第一页
    getUsers(searchQuery.value)
}
const debouncedHandleSearch = _.debounce(handleSearch, 500)
const handleEdit = (row) => {
    // 这里可以打开一个对话框或者使用路由导航到编辑页面，传递所选用户的信息
    console.log('编辑用户', row.uid);
};

const handleDelete = (row) => {
    // 这里可以弹出确认对话框，然后执行删除操作，通常需要发送请求到服务器
    console.log('删除用户', row.uid);
};
onMounted(() => {
    getUsers()
})
</script>
