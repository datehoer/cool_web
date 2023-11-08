<template>
    <div class="product">
        <div>
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
        </el-table>
        <el-pagination
            :page-size="pageSize"
            :pager-count=9
            layout="prev, pager, next"
            :total=parseInt(users.total)
            @current-change="handleCurrentChange"
        />
    </div>
      <h1>product</h1>
      <el-button type="primary" @click="goToBoard">进入板块</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Product',
    setup() {
        const router = useRouter();
        function goToBoard() {
        router.push({ name: 'brands' });
        }
        return { goToBoard };
    },
    methods: {
        mounted() {
            console.log('Product component is mounted!');
        },
    },
});
</script>
  