<template>
  <div>
    <Card>
    <Form ref="formValidate" :model="formValidate" style="width: 70%;" :rules="id ? {} : ruleValidate" :label-width="80">
      <FormItem label="姓名" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入账号"></Input>
      </FormItem>
      <FormItem label="账号" prop="login_id">
        <Input v-model="formValidate.login_id" placeholder="请输入账号"></Input>
      </FormItem>
      <FormItem label="手机号码" prop="cell">
        <Input type="number" v-model="formValidate.cell" placeholder="手机号码"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="formValidate.password" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="repeat_password">
        <Input type="password" v-model="formValidate.repeat_password" placeholder="请输入确认密码"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
      </FormItem>
    </Form>
  </Card>
  </div>
</template>
<script>
import { createUser, getUserInfo, editUser } from '@/api/admin'
export default {
  data () {
    return {
      id: 0,
      formValidate: {
        name: '',
        login_id: '',
        password: '',
        repeat_password: '',
        cell: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        login_id: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        cell: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        repeat_password: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (typeof this.$route.query.id !== 'undefined') {
      this.id = this.$route.query.id
      getUserInfo(this.id).then(res => {
        if (res.data.code === 1) {
          this.formValidate = res.data.data
        } else {
          this.$Message.error('服务器错误')
        }
      })
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formValidate.password !== this.formValidate.repeat_password) {
            alert('两次密码不一致')
            return false
          }
          const formData = new FormData()
          formData.append('name', this.formValidate.name)
          formData.append('login_id', this.formValidate.login_id)
          formData.append('password', this.formValidate.password)
          formData.append('cell', this.formValidate.cell)
          if (this.id) {
            formData.append('id', this.id)
            editUser(formData).then(res => {
              this.$Message.success('编辑成功!')
              this.$router.push({
                path: '/user/index'
              })
            }).catch(err => {
              alert('编辑失败')
            })
          } else {
            return new Promise((resolve, reject) => {
              createUser(formData).then(res => {
                this.$Message.success('创建成功!')
                this.$router.push({
                  path: '/user/index'
                })
                resolve()
              }).catch(err => {
                alert('创建失败')
                reject(err)
              })
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
