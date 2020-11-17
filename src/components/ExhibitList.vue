<template>
  <div>
    <h2>出品中商品一覧</h2>
    <table class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th>商品名</th>
          <th>値段</th>
          <th>出品日時</th>
          <th style="min-width: 153px; width: 15%;">操作</th>
        </tr>
      </thead>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.updatedAt | moment }}</td>
        <td style="display: flex">
          <b-button style="margin-right: 10px">編集</b-button>
          <b-button>削除</b-button>
        </td>
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
      axios.get(`${process.env.VUE_APP_API_URL_BASE}item`, { withCredentials: true }).then(res => {
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
