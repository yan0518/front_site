<template>
  <div>
    <Modal
        v-model="qrCode" :mask-closable='false' :footer-hide="true" :closable="true" title='请微信扫描二维码'>
        <div style="margin: 5% 20%;" >
          <div class="qrCode" ref='qrCode'></div>
          <div style="font-weight: bold;font-size: 20px;margin: 5% 35%;">{{doc_name}}</div>
        </div>
    </Modal>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

var qrcode
export default {
  data: () => {
    return {
      qrCode: false,
      url: '',
      doc_name: ''
    }
  },
  watch: {
    'qrCode': function (val) {
      if (val === true) {
        if (this.url !== '') {
          if (typeof qrcode === 'object') {
            qrcode.makeCode(this.url) // 生成另一个新的二维码
          } else {
            this.creatQrCode(this.url)
          }
        }
      } else {
        qrcode.clear()
      }
    }
  },
  methods: {
    creatQrCode (url) {
      qrcode = new QRCode(this.$refs.qrCode, {
        text: url,
        width: 300,
        height: 300,
        colorDark: '#000',
        colorLight: '#fff'
      })
    },
    cancel () {
      this.qrCode = false
      this.$parent.clickDisable = false
    },
    close () {
      this.cancel()
    }
  }
}
</script>
