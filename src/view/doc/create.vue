<template>
  <Form ref="formValidate" :model="formValidate" style="width: 70%;" :rules="ruleValidate" :label-width="80">
    <FormItem label="姓名" prop="name">
      <Input v-model="formValidate.name" placeholder="请输入医生姓名"></Input>
    </FormItem>
    <FormItem label="所在医院" prop="hospital">
      <Input v-model="formValidate.hospital" placeholder="请输入医院"></Input>
    </FormItem>
    <FormItem label="所属科室">
      <Select v-model="formValidate.department" prop="department" placeholder="请选择所属科室">
        <Option v-for="(item, index) of deparmentlist" :key="index" :value="item.key">{{ item.name }}</Option>
      </Select>
    </FormItem>
    <FormItem label="职称" prop="position">
      <Input v-model="formValidate.position" placeholder="请输入职称"></Input>
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
</template>
<script>
  import { createDoc } from '@/api/doc'
  export default {
     data () {
      return {
        deparmentlist: [{ key: 1, name: '外科' }, { key: 2, name: '内科' }],
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
          department: [
            { required: true, message: '请输入所属科室', trigger: 'blur'}
          ],
          position: [
            { required: true, message: '请输入职称', trigger: 'blur'}
          ],
          cell: [
            { required: true, message: '请输入医生手机号码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // createDoc().then(res => {
              this.$Message.success('创建医生成功!')
              this.$router.push({
                path: '/doc/index'
              })
            // })
          } else {
            this.$Message.error('创建失败!')
          }
        })
      }
    }
  }
</script>
