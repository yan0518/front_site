<template>
  <div>
    <Card>
      <Row>
        <Col push="12" span="12">
          <Input v-model="search_key"
             ref="search_key"
             icon="ios-search"
             @on-click="searchList"
             placeholder="请输入医生姓名或者手机号"></Input>
        </Col>
      </Row>
      <br>
      <Table border :columns="dataTitle" :data="dataTable" style="min-height: 200px;">
        <template slot-scope="{ row, index }" slot="department">
          <label v-for="(item, idx) in deparmentlist" :key="idx" v-if="item.key == row.department">{{item.name}}</label>
        </template>
        <template slot-scope="{ row, index }" slot="position">
          <label v-for="(item, idx) in positionList" :key="idx" v-if="item.key == row.position">{{item.name}}</label>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">二维码</Button>
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
import { getDocList, delDoc, getDocQrcode } from '@/api/doc'
import qrcode from './qrCode.vue'

export default {
  components: {
    qrcode
  },
  data () {
    return {
      search_key: '',
      total: 1,
      pages: 1,
      pageSize: 20,
      pageNum: 1,
      deparmentlist: [{
        key: 1,
        name: '内科'
      },
      {
        key: 2,
        name: '内分泌科'
      },
      {
        key: 3,
        name: '肝胆科'
      },
      {
        key: 4,
        name: '心胸外科'
      },
      {
        key: 5,
        name: '预防保健科'
      },
      {
        key: 6,
        name: '护理部'
      },
      {
        key: 7,
        name: '营养科'
      },
      {
        key: 8,
        name: '免疫科'
      },
      {
        key: 9,
        name: '麻醉科'
      },
      {
        key: 10,
        name: '康复科'
      },
      {
        key: 11,
        name: '血液科'
      },
      {
        key: 12,
        name: '药剂科'
      },
      {
        key: 13,
        name: '放射科'
      },
      {
        key: 14,
        name: '肾内科'
      },
      {
        key: 15,
        name: '心内科'
      },
      {
        key: 16,
        name: '感染传染科'
      },
      {
        key: 17,
        name: '儿科'
      },
      {
        key: 18,
        name: '妇科'
      },
      {
        key: 19,
        name: '骨科'
      },
      {
        key: 20,
        name: '神经科'
      }],
      positionList: [{
        key: 1,
        name: '主任医师'
      },
      {
        key: 2,
        name: '副主任医师'
      },
      {
        key: 3,
        name: '主治医师'
      },
      {
        key: 4,
        name: '医师'
      },
      {
        key: 5,
        name: '临床营养师'
      },
      {
        key: 6,
        name: '药师'
      }],
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
          slot: 'department',
          key: 'department'
        },
        {
          title: '职称',
          slot: 'position',
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
        pageSize: this.pageSize,
        searchKey: this.search_key
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
    show (row) {
      getDocQrcode(row.uuid).then(res => {
        if (res.data.code === 1) {
          this.$refs.qrcodeModal.doc_name = row.name
          this.$refs.qrcodeModal.url = res.data.data
          this.$refs.qrcodeModal.qrCode = true
        } else {
          this.$Message.error('服务器错误')
        }
      })
    },
    edit (id) {
      this.$router.push({
        path: '/doc/create',
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
