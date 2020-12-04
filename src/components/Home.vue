<template>
  <div>
    <h2>新着商品一覧</h2>
    <div v-for="item in items" :key="item.id" class="row item" v-on:click="GoItem(item.id)">
        <img :src="ItemImgUrl + item.img" alt="商品画像" class="col-2 img-thumbnail">
        <!--img src="https://i.pinimg.com/originals/11/ba/c9/11bac9268cb294df434cfc3ff12e5780.jpg" class="col-2 img-thumbnail"-->
        <div class="col-8">
          <div class="col">
            <div class="row">
              <div class="col">{{ item.name }}</div>
              <div class="col">￥{{ item.price }}</div>
            </div>
          </div>
          <div class="col">出品者：{{ item.exhibitor.name }}</div>
          <div class="col">
            <div>商品説明</div>
            <div class="ml-2">{{ item.explanation }}</div>
          </div>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler" spinner="spiral">
      <div slot="spinner">ロード中...</div>
      <div slot="no-more">もう検索データがないよ</div>
      <div slot="no-results">検索結果がない</div>
    </infinite-loading>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'Home',
  data () {
    return {
      items: [],
      itemData: [],
      endTime: '',
      end: 0,
      max: 0,
      ItemUrl: 'item/',
      ItemImgUrl: 'http://192.168.1.3:8080/freemarket/img/item/'
    }
  },
  filters: {
    moment (date) {
      return moment(date).format('YYYY/MM/DD HH:mm')
    }
  },
  methods: {
    async infiniteHandler ($state) {
      if (this.end === 0) await this.firstItem()
      if (this.end >= this.max) {
        $state.complete()
      } else {
        await this.getItems()
        $state.loaded()
      }
    },
    async getCount () {
      await axios.get('/freemarket/item/count', {
        withCredentials: true
      }).then(res => {
        this.max = res.data
        console.log(this.max)
      }).catch(err => {
        console.log(err)
      })
    },
    async firstItem () {
      await axios.get('/freemarket/item/first', {
        withCredentials: true
      }).then(res => {
        this.items.push(res.data)
        this.endTime = res.data.createdAt
        this.end = this.items.length
        console.log(this.items)
      }).catch(err => {
        console.log(err)
      })
    },
    async getItems () {
      if (this.endTime) {
        await axios.get(`/freemarket/item/paging/?time=${this.endTime}`, {
          withCredentials: true
        }, {
        }).then(res => {
          // console.log(res.data)
          if (res.data.length !== 0) {
            // console.log(this.items)
            // console.log(res.data)
            this.items = this.items.concat(res.data)
            this.endTime = res.data[res.data.length - 1].createdAt
            this.end = this.items.length
          }
        })
        // this.end = this.max + 1
        console.log(this.items)
      }
    },
    GoItem (id) {
      const path = this.ItemUrl + id
      this.$router.push({ path: path })
    }
  },
  beforeMount () {
    this.getCount()
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 15px;
}
img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.item {
  border: 5px solid antiquewhite;
  border-radius: 5px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 15px;
  cursor: pointer;
}
.item:hover {
  box-shadow: 10px 10px 10px rgba(0,0,0,0.5);
  transform: translateY(-10px);
  transition-duration: 0.5s;
}
</style>
