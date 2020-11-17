<template>
  <div>
    <h2>売却済み商品一覧</h2>
    <table class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th>商品名</th>
          <th>値段</th>
          <th>売却済み日時</th>
        </tr>
      </thead>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}円</td>
        <td>{{ item.updatedAt | moment }}</td>
     </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'ExhibitList',
  data () {
    return {
      items: []
    }
  },
  filters: {
    moment (date) {
      return moment(date).format('YYYY/MM/DD HH:mm')
    }
  },
  methods: {
    getItems () {
      axios.get(`${process.env.VUE_APP_API_URL_BASE}solditem/exhibitor`, { withCredentials: true }).then(res => {
        this.items = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  beforeMount () {
    this.getItems()
  }
}
</script>
