<template>
  <div>
    <Card>
      <Table border :columns="dataTitle" :data="dataTable" style="min-height: 200px;">
          <template slot-scope="{ row, index }" slot="action">
              <Poptip placement="left" @on-popper-show="creatQrCode(row.uuid)">
                <div class="api" slot="content">
                  <div :key="index" class="qrCode" ref="qrCode"></div>
                </div>
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">二维码</Button>
              </Poptip>
              <Button type="error" size="small" @click="remove(index)">Delete</Button>
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
import { getDocList } from '@/api/doc'
import QRCode from 'qrcodejs2'

export default {
  components: {
    Tables
  },
  data () {
    return {
      total: 1,
      pages: 1,
      pageSize: 2,
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
    creatQrCode (url) {
      const qrcode = new QRCode(this.$refs.qrCode, {
        text: url,
        width: 100,
        height: 100,
        colorDark: '#000',
        colorLight: '#fff'
      })
    },
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
    show (index) {
    },
    remove (index) {
      this.dataTable.splice(index, 1)
    }
  }
}
</script>
