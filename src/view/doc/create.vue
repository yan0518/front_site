<template>
  <div>
    <Card>
    <Form ref="formValidate" :model="formValidate" style="width: 70%;" :rules="ruleValidate" :label-width="80">
      <FormItem label="姓名" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入医生姓名"></Input>
      </FormItem>
      <FormItem label="头像">
        <Upload
          :before-upload="handleUpload"
          name="Filedata"
          action="">
          <Button type="default">请上传头像</Button>
        </Upload>
        <img v-if="photo !== ''" :src="photo" width="150" height="150">
      </FormItem>
      <FormItem label="所在医院" prop="hospital">
        <Input v-model="formValidate.hospital" placeholder="请输入医院"></Input>
      </FormItem>
      <FormItem label="所属科室">
        <Select v-model="formValidate.department" placeholder="请选择所属科室">
          <Option v-for="(item, index) of deparmentlist" :key="index" :value="item.key">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="职称">
        <Select v-model="formValidate.position" placeholder="请选择职称">
          <Option v-for="(item, index) of positionList" :key="index" :value="item.key">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="手机号码" prop="cell">
        <Input type="number" v-model="formValidate.cell" placeholder="手机号码"></Input>
      </FormItem>
      <FormItem label="所属销售" prop="saler">
        <Input v-model="formValidate.saler" placeholder="所属销售"></Input>
      </FormItem>
      <FormItem label="销售电话" prop="sale_cell">
        <Input type="number" v-model="formValidate.sale_cell" placeholder="销售电话"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
      </FormItem>
    </Form>
  </Card>
  </div>
</template>
<script>
import { createDoc, getDocInfo, editDoc } from '@/api/doc'
export default {
  data () {
    return {
      id: 0,
      photo: '',
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
      file: null,
      formValidate: {
        name: '',
        hospital: '',
        department: '',
        position: '',
        cell: '',
        saler: '',
        sale_cell: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入医生姓名', trigger: 'blur' }
        ],
        hospital: [
          { required: true, message: '请输入所在医院', trigger: 'blur' }
        ],
        cell: [
          { required: true, message: '请输入医生手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (typeof this.$route.query.id !== 'undefined') {
      this.id = this.$route.query.id
      getDocInfo(this.id).then(res => {
        if (res.data.code === 1) {
          this.formValidate = res.data.data
          this.photo = res.data.data.photo
        } else {
          this.$Message.error('服务器错误')
        }
      })
    }
  },
  methods: {
    handleUpload (file) {
      this.file = file
      if (this.file === null) {
        alert('请选择文件')
        return false
      }
      if (this.file.name.split('.')[1] !== 'jpg' && this.file.name.split('.')[1] !== 'jpeg' && this.file.name.split('.')[1] !== 'png' &&
        this.file.name.split('.')[1] !== 'JPG' && this.file.name.split('.')[1] !== 'JPEG' && this.file.name.split('.')[1] !== 'PNG') {
        alert('图片只支持jpg、jpeg、png格式')
        return false
      }
      let fileSize = (this.file.size / 1024).toFixed(2)
      if (fileSize > 20480) {
        alert('您上传的文件大于20M')
        return false
      }
      this.photo = window.URL.createObjectURL(this.file)
      return false
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (!this.formValidate.department) {
            alert('请选择所属科室')
            return false
          }
          if (!this.formValidate.position) {
            alert('请输入职称')
            return false
          }
          const formData = new FormData()
          formData.append('name', this.formValidate.name)
          formData.append('hospital', this.formValidate.hospital)
          formData.append('department', this.formValidate.department)
          formData.append('position', this.formValidate.position)
          formData.append('cell', this.formValidate.cell)
          formData.append('saler', this.formValidate.saler)
          formData.append('sale_cell', this.formValidate.sale_cell)
          if (this.file) {
            formData.append('photo', this.file)
          }
          if (this.id) {
            formData.append('id', this.id)
            editDoc(formData).then(res => {
              this.$Message.success('编辑医生成功!')
              this.$router.push({
                path: '/doc/index'
              })
            }).catch(err => {
              alert('编辑失败')
            })
          } else {
            createDoc(formData).then(res => {
              this.$Message.success('创建医生成功!')
              this.$router.push({
                path: '/doc/index'
              })
            }).catch(err => {
              alert('新建医生失败')
            })
          }
        } else {
          this.$Message.error('操作失败!')
        }
      })
    }
  }
}
</script>
