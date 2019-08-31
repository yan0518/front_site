<template>
  <div>
    <Card>
      <Table border :columns="dataTitle" :data="dataTable">
          <template slot-scope="{ row, index }" slot="action">
          </template>
      </Table>
      <br>
      <div>
        <Page :total="total" show-total />
      </div>
     </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import {  getPatientList } from '@/api/patient'
export default {
  components: {
    Tables
  },
  data () {
    return {
      total: 100,
      pages: 1,
      pageSize: 20,
      pageNum: 1,
      dataTitle: [
        {
          title: '用户昵称',
          key: 'name',
        },
        {
          title: '电话',
          key: 'cell',
        },
        {
          title: '注册时间',
          key: 'register_time',
        },
        {
          title: '关联医生',
          key: 'doctor',
        },
        {
          title: '操作',
          slot: 'action',
          width: 150
        }
      ],
      dataTable: [{
        'name': 'test',
        'cell': 'test',
        'register_time': 'test',
        'doctor': 'test'
      }]
    }
  },
  created() {
    this.getData(1)
  },
  methods: {
    getData(pageNum) {
      getDocList().then(res => {
        if(res.code === 200) {
          this.dataTable = res.data
        } else {
          this.$Message.error('服务器错误')
        }
      })
    }
  }
}
</script>
