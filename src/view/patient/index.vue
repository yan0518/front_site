<template>
  <div>
    <Card>
      <Row>
        <Col push="12" span="12">
          <Input v-model="search_key"
             ref="search_key"
             icon="ios-search"
             @on-click="searchList"
             placeholder="请输入昵称或者手机号"></Input>
        </Col>
      </Row>
      <br>
      <Table border :columns="dataTitle" :data="dataTable">
          <template slot-scope="{ row, index }" slot="action">
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
import Tables from '_c/tables'
import { getPatientList } from '@/api/patient'
export default {
  components: {
    Tables
  },
  data () {
    return {
      search_key: '',
      total: 10,
      pages: 1,
      pageSize: 20,
      pageNum: 1,
      dataTitle: [
        {
          title: '用户昵称',
          key: 'name'
        },
        {
          title: '电话',
          key: 'cell'
        },
        {
          title: '注册时间',
          key: 'created_at'
        },
        {
          title: '关联医生',
          key: 'doctor_name'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150
        }
      ],
      dataTable: []
    }
  },
  created () {
    this.getData(1)
  },
  methods: {
    searchList () {
      this.getData(1)
    },
    changePage (pageNum) {
      this.pageNum = pageNum
      this.getData(pageNum)
    },
    getData (pageNum) {
      const data = {
        pageNum: pageNum,
        pageSize: this.pageSize,
        searchKey: this.search_key
      }
      getPatientList(data).then(res => {
        if (res.data.code === 1) {
          this.dataTable = res.data.data.list
          this.total = res.data.data.total
        } else {
          this.$Message.error('服务器错误')
        }
      })
    }
  }
}
</script>
