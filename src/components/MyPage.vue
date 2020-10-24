<template>
  <div>
    <div>
    <div class="row border">
      <img :src="img" class="col" id="icon">
      <div class="col" id="summary">
        <div class="inline">
          <div id="name">{{ name }}</div>
          <div id="userid">@{{ userid }}</div>
          <b-button v-on:click="openModal" id="edit">編集</b-button>
        </div>
        <div id="profile">{{ profile }}</div>
      </div>
    </div>
    <div style="margin-left: 25px;">
      <ul>
        <h3 style="margin-top: 30px;margin-left: -20px">商品</h3>
        <div style="margin-left: 20px">
          <li>
            <a href="exhibit">出品する</a>
          </li>
          <li>
            <a href="mypage/exhibit">出品中</a>
          </li>
          <li>
            <a href="mypage/sold">売却済み</a>
          </li>
          <li>
            <a href="mypage/purchased">購入済み</a>
          </li>
        </div>
        <h3 style="margin-top: 30px;margin-left: -20px">ユーザ</h3>
        <div style="margin-left: 20px">
          <li>
            <a href="change/id">ユーザID変更</a>
          </li>
          <li>
            <a href="change/name">ユーザ名変更</a>
          </li>
          <li>
            <a href="change/passwd">パスワード変更</a>
          </li>
          <li>
            <a href="mypage/delete">ユーザ削除</a>
          </li>
        </div>
      </ul>
    </div>
  </div>
  <div id="overlay" v-show="showContent" v-on:click="closeModal">
    <div id="content" v-on:click="stopEvent" style="min-width: 600px;max-width: 600px;min-height: 350px; max-height: 350px;">
      <div class="row" style="margin-left: 1px;margin-right: 1px;border-bottom: 1px solid;">
        <div v-on:click="closeModal" style="max-width: 60px;min-width: 60px;cursor: pointer;" class="col">
          <svg viewBox="0 0 24 24"><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>
        </div>
        <div class="col" style="min-width: 312px">
          <h2>
            <span>プロフィールを編集</span>
          </h2>
        </div>
        <div style="align-self: center;">
          <b-button v-on:click="edit">保存</b-button>
        </div>
      </div>
      <div class="row" style="margin-top: 15px;">
        <img :src="img" class="col" id="icon" style="cursor: pointer;" v-on:click="icon">
        <form>
          <p>名前</p>
          <input type="text"/>
          <p style="margin-top: 10px;">自己紹介</p>
          <input type="text" style="height: 100%;"/>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Mypage',
  data () {
    return {
      showContent: false,
      userid: 'test',
      name: 'test',
      profile: 'test profile',
      img: 'https://pbs.twimg.com/profile_images/1238034989108711424/gQ1_2iGb_400x400.jpg'
    }
  },
  methods: {
    openModal () {
      this.showContent = true
    },
    closeModal () {
      this.showContent = false
    },
    stopEvent () {
      event.stopPropagation()
    },
    async getProfile () {
      await axios.get(process.env.VUE_APP_API_URL_BASE + 'user', {
        withCredentials: true
      }).then(res => {
        this.userid = res.data.userid
        this.name = res.data.name
        this.profile = res.data.profile
        if (res.data.img !== '') this.img = res.data.img
        console.log(res.data.name)
      }).catch(err => {
        console.log(err)
      })
    },
    edit () {
      console.log('edit profile')
    },
    icon () {
      console.log('edit icon')
    }
  },
  beforeMount () {
    this.getProfile()
  }
}
</script>

<style scoped>
#icon {
  border-radius: 9999px;
  width: 15%;
  min-width: 49px;
  position: relative;
  max-width: 150px;
}
.inline {
  display: flex;
  font-size: x-large;
  width: 100%;
}
.border {
  border-bottom: 1px solid #dee2e6;
}
#summary {
  padding-left: 0px;
  margin-left: 25px;
  margin-top: 10px;
  width: 600px;
}
#name {
  font-weight: 500;
  color: black;
}
#userid {
  margin-left: 10px;
  color: darkgray;
}
#edit {
  position: absolute;
  right: 0px;
  margin-right: 10%;
}
#profile {
  width: 90%;
  right: 0px;
  left: 0px;
  font-size: larger;
  color: black;
  word-break: break-all;
  white-space: normal;
  line-height: initial;
  margin-top: 15px;
  margin-right: 10%;
  max-height: 70px;
  min-width: 325px;
  overflow-y: auto;
  text-overflow: ellipsis;
  position: absolute;
}
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  z-index: 2;
  width: 50%;
  padding: 1em;
  background: #fff;
  flex-shrink: 1;
  flex-direction: row;
  border-radius: 5px;
}
.v-application p {
  color: black;
  font-weight: 600;
  margin-bottom: 0px;
}
input {
  width: 150%;
  border: 1px solid;
  border-radius: 5px;
}
</style>
