<template>
  <div>
    <h1>商品の購入が完了しました。</h1>
    {{ time }}秒後に移動します。<br>
    移動しない場合は、<a href="/">こちら</a>をクリックしてください。
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: 5
    }
  },
  created: function () {
    setInterval(() => {
      this.time--
    }, 1000)
  },
  watch: {
    time: function (v) {
      if (v <= 0) {
        document.location = '/'
      }
    }
  }
}
</script>
