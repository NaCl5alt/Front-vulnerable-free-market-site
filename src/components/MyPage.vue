<template>
  <div>
    <div>
      <div class="row frame">
        <!--img :src="img" class="col" id="icon"-->
        <img :src="imgUrl" class="col" id="icon">
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
          <div style="min-width: 150px;">
            <div style="min-width: 150px;max-width: 150px;max-height: 150px;min-height: 150px;position: absolute;z-index: 1;">
             <svg style="min-width: 30px;max-width: 30px;margin-left: 55px;margin-top: 55px;position: absolute;stroke: darkgray;background: rgba(0 0 0 / 0.5);border-radius: 5px;" viewBox="0 0 24 24"><g><path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path><path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>
             <input v-on:change="onImgChange" accept="image/jpeg,image/png,image/webp" type="file" style="z-index: -1;opacity: 0;margin-left: -70px;margin-top: 50px;width: 0.1px;height: 0.1px;cursor: pointer;"/>
          </div>
            <div style="z-index: 2;">
              <img v-show="showicon" :src="imgUrl" class="col" id="icon" style="position: absolute;">
              <img v-show="!showicon" :src="eimg" class="col" id="icon" style="position: absolute;">
            </div>
        </div>
        <div style="margin-top: 15px;margin-left: 15px;z-index: 1;">
          <form>
            <p>名前</p>
            <input type="text" class="input" v-model="ename"/>
            <p style="margin-top: 10px;">自己紹介</p>
            <textarea v-model="eprofile" class="input" style="height: 100%;resize: none;min-height: 100px;max-height: 100px;"></textarea>
          </form>
          </div>
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
      url: 'http://192.168.1.3:8080/freemarket/img/user/',
      imgUrl: '',
      showicon: true,
      showContent: false,
      userid: 'test',
      name: 'test',
      profile: 'test profile',
      img: '00000000-0000-0000-0000-000000000000',
      ename: '',
      eprofile: '',
      eimg: ''
    }
  },
  methods: {
    onImgChange (e) {
      const files = e.target.files || e.dataTransfer.files
      this.createImage(files[0])
      var params = new FormData()
      params.append('img', files[0])
      axios.post(process.env.VUE_APP_API_URL_BASE + 'img/user', params, { withCredentials: true }).then(res => {
        // this.img = files[0].name
        this.img = res.data
        this.edit()
      }).catch(error => {
        console.log(error)
      })
    },
    createImage (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.eimg = e.target.result
      }
      reader.readAsDataURL(file)
      this.showicon = false
    },
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
        this.ename = this.name = res.data.name
        this.eprofile = this.profile = res.data.profile
        if (res.data.img === '') this.eimg = this.imgUrl = this.url + this.img
        else this.eimg = this.imgUrl = this.url + res.data.img
      }).catch(err => {
        console.log(err)
      })
    },
    edit () {
      var params = new URLSearchParams()
      params.append('name', this.ename)
      if (!this.eprofile || !this.eprofile.match(/\S/g)) this.eprofile = ''
      params.append('profile', this.eprofile)
      params.append('img', this.img)
      axios.post(process.env.VUE_APP_API_URL_BASE + 'user/edit', params, { withCredentials: true }).then(res => {
        this.$router.go()
      }).catch(error => {
        console.log(error)
      })
    }
  },
  beforeMount () {
    this.eimg = this.imgUrl = this.url + this.img
    this.getProfile()
  }
}
</script>

<style scoped>
.frame {
  border-bottom: 1px solid #dee2e6;
  margin-right: 15px;
  margin-left: 15px;
  padding-bottom: 15px;
}
#icon {
  border-radius: 9999px;
  width: 15%;
  position: relative;
  max-width: 150px;
  min-width: 150px;
  max-height: 150px;
  min-height: 150px;
}
.inline {
  display: flex;
  font-size: x-large;
  width: 100%;
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
.input {
  width: 150%;
  border: 1px solid;
  border-radius: 5px;
  margin-left: 15px;
}
</style>
