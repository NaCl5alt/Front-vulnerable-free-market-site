<template>
  <div>
    <h2>検索商品一覧</h2>
    <table class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th>商品名</th>
          <th>値段</th>
          <th>出品日時</th>
        </tr>
      </thead>
      <tr v-for="item in items" :key="item.id">
        <td><a :href="url + item.id">{{ item.name }}</a></td>
        <td>{{ item.price }}</td>
        <td>{{ item.updatedAt | moment }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data () {
    return {
      url: 'item/',
      keyword: '',
      items: []
    }
  },
  filters: {
    moment (date) {
      return moment(date).format('YYYY/MM/DD HH:mm')
    }
  },
  methods: {
    get () {
      if (this.$route.params.keyword) {
        this.keyword = decodeURIComponent(this.$route.params.keyword)
        console.log(this.keyword)
        axios.get(process.env.VUE_APP_API_URL_BASE + 'search?keyword=' + this.keyword).then(res => {
          this.items = res.data
          console.log(this.items)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  beforeMount () {
    this.get()
  }
}
</script>
