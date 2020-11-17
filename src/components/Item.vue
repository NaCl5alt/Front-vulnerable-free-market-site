<template>
  <div class="row" style="height: 90%;background: #f5f5f5;">
    <div class="col"></div>
    <div class="col-8 main">
      <h1>{{ name }}</h1>
      <div class="row">
        <img :src="img" alt="商品画像" class="col img-thumbnail">
        <table class="col">
          <tr>
            <th>出品者</th>
            <td>{{ exhibitor.name }}</td>
          </tr>
          <tr>
            <th>値段</th>
            <td>￥{{ price }}</td>
          </tr>
        </table>
      </div>
      <b-button style="width: 100%;margin-top: 5%;margin-bottom: 5%;" v-on:click="buy">購入</b-button>
      <div v-html="explanation"></div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Item',
  data () {
    return {
      name: '',
      explanation: '',
      price: 0,
      img: 'https://pbs.twimg.com/profile_images/1238034989108711424/gQ1_2iGb_400x400.jpg',
      ItemImgUrl: 'http://192.168.1.3:8080/freemarket/img/item/',
      exhibitor: []
    }
  },
  methods: {
    showItem () {
      axios.get(`${process.env.VUE_APP_API_URL_BASE}item/${this.$route.params.id}`, { withCredentials: true }).then(res => {
        console.log(res.data)
        this.name = res.data.name
        this.explanation = res.data.explanation
        this.price = res.data.price
        this.img = this.ItemImgUrl + res.data.img
        this.exhibitor = res.data.exhibitor
      }).catch(error => {
        console.log(error)
      })
    },
    buy () {
      axios.post(`${process.env.VUE_APP_API_URL_BASE}solditem`, {
        id: this.$route.params.id
      }, { withCredentials: true }).then(res => {
        document.location = '/buy'
      }).catch(err => {
        console.log(err)
      })
    }
  },
  beforeMount () {
    this.showItem()
  }
}
</script>

<style scoped>
.main {
  background: white;
  margin-top: 5%;
}
h1 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 5%;
}
img {
  height: 250px;
  width: 250px;
  max-height: 250px;
  max-width: 250px;
  margin-right: 5%;
  margin-left: 5%;
}
</style>
