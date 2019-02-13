<template>
  <div class="t-center px-4">
      <p class="t-center f-15 m-b-15">Enter your registered e-mail:</p>

      <el-form :model="form" :rules="rules" class="mb-5">
        <el-form-item
          label-width="120"
          prop="email">
          <el-input type="email" prefix-icon="fas fa-envelope" class="email" v-model="form.email" placeholder="usuario@correo.com"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" plain>Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Reset password</el-button>
      </span>
    </div>
</template>

<script>
import { resetPass } from '../../api/login'
import { Message } from 'element-ui'

export default {
  name: 'ResetPassword',
  components: {
    resetPass
  },
  data() {
    return {
      form: {
        email: ''
      },
      dialogVisible: '',
      rules: {
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
          ]
      }
    }
  },
  methods: {
    onSubmit() {
      resetPass(this.form).then(response => {
        Message({
          message: 'Reset link was sent to: ' + this.form.email,
          type: 'success',
          duration: 10 * 1000
        })
        this.form.email = ''
        this.closeDialog()
      })
    },
    closeDialog() {
      this.$emit('closedialog')
    }
  }
}
</script>

<style lang="scss">
  .el-dialog {
    background: #064E89;

    .el-dialog__title {
      color: #ffffff;
      display: block;
      border-left: none;
      padding-left: 0px;
      text-align: center;
      font-weight: 700;
      padding-bottom: 15px;
      border-bottom: 1px solid #0a599a;
    }

    .el-input__prefix, .el-input__suffix {
      position: absolute;
      top: 0px;
      font-size: 20px;
      height: 50px;
      color: #ffffff;
      text-align: center;
    }
    .email .el-input__inner::placeholder {
      color: #5384ad;
    }
    .email .el-input__inner {
      color: #FFF;
      background: #09528e;
      border-color: #ffffff;
      border-bottom: 2px solid;
      border-radius: 0px;
      padding: 20px 0px 20px 40px;
    }
  }
</style>
