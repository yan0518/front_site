<template>
  <div>
    <Card>
      <Table border :columns="dataTitle" :data="dataTable" style="min-height: 200px;">
          <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(row.uuid)">二维码</Button>
              <Button type="success" size="small" style="margin-right: 5px" @click="edit(row.id)">编辑</Button>
              <Button type="error" size="small" @click="remove(index, row.id)">删除</Button>
          </template>
      </Table>
      <br>
      <div>
        <Page :total="total" :current="pageNum" ref="page" :page-size="pageSize" @on-change="changePage" show-total />
      </div>
     </Card>
      <qrcode ref="qrcodeModal"></qrcode>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { getDocList, delDoc } from '@/api/doc'
import qrcode from './qrCode.vue'

export default {
  components: {
    Tables,
    qrcode
  },
  data () {
    return {
      total: 1,
      pages: 1,
      pageSize: 20,
      pageNum: 1,
      dataTitle: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '所在医院',
          key: 'hospital'
        },
        {
          title: '所属科室',
          key: 'department'
        },
        {
          title: '职称',
          key: 'position'
        },
        {
          title: '手机号码',
          key: 'cell'
        },
        {
          title: '所属销售',
          key: 'saler'
        },
        {
          title: '销售电话',
          key: 'sale_cell'
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
        pageSize: this.pageSize
      }
      getDocList(data).then(res => {
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
      this.$refs.qrcodeModal.url = 'http://121.40.138.67:8081/user/register/' + uuid
      this.$refs.qrcodeModal.qrCode = true
    },
    edit (id) {
      this.$router.push({
        path: '/doc/create',
        query: {
          'id': id
        }
      })
    },
    remove (index, id) {
      if (!confirm('确定要删除吗')) {
        return false
      }
      delDoc(id).then(res => {
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
