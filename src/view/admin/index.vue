<template>
  <div>
    <Card>
      <Row>
        <Col push="12" span="12">
          <Input v-model="search_key"
             ref="search_key"
             icon="ios-search"
             @on-click="searchList"
             placeholder="请输入管理员账号或者手机号"></Input>
        </Col>
      </Row>
      <br>
      <Table border :columns="dataTitle" :data="dataTable" style="min-height: 200px;">
          <template slot-scope="{ row, index }" slot="action">
              <Button type="success" size="small" style="margin-right: 5px" @click="edit(row.id)">编辑</Button>
              <Button type="error" size="small" @click="remove(index, row.id)">删除</Button>
          </template>
      </Table>
      <br>
      <div>
        <Page :total="total" :current="pageNum" ref="page" :page-size="pageSize" @on-change="changePage" show-total />
      </div>
     </Card>
  </div>
</template>
<script>
import { getUserList, delUser } from '@/api/admin'

export default {
  data () {
    return {
      search_key: '',
      total: 1,
      pages: 1,
      pageSize: 20,
      pageNum: 1,
      dataTitle: [
        {
          title: ' 姓名',
          key: 'name'
        },
        {
          title: '账号',
          key: 'login_id'
        },
        {
          title: '手机号码',
          key: 'cell'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200
        }
      ],
      dataTable: []
    }
  },
  created () {
    this.getData(1)
  },
  methods: {
    getData (pageNum) {
      const data = {
        pageNum: pageNum,
        pageSize: this.pageSize,
        searchKey: this.search_key
      }
      getUserList(data).then(res => {
        if (res.data.code === 1) {
          this.dataTable = res.data.data.list
          this.total = res.data.data.total
        } else {
          this.$Message.error('服务器错误')
        }
      })
    },
    changePage (pageNum) {
      this.pageNum = pageNum
      this.getData(pageNum)
    },
    show (uuid) {
    },
    edit (id) {
      this.$router.push({
        path: '/user/create',
        query: {
          'id': id
        }
      })
    },
    searchList () {
      this.getData(1)
    },
    remove (index, id) {
      if (!confirm('确定要删除吗')) {
        return false
      }
      delUser(id).then(res => {
        if (res.data.code === 1) {
          this.$Message.info('删除成功')
          this.dataTable.splice(index, 1)
          this.getData(1)
        } else {
          this.$Message.error('服务器错误')
        }
      })
    }
  }
}
</script>
