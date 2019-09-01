<template>
  <div>
    <Card>
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
      total: 10,
      pages: 1,
      pageSize: 1,
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
    changePage (pageNum) {
      this.pageNum = pageNum
      this.getData(pageNum)
    },
    getData (pageNum) {
      const data = {
        pageNum: pageNum,
        pageSize: this.pageSize
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
