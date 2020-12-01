<template>
  <div>
    <div class="row" style="margin-top: 15px; margin-left: 15px;">
      <div style="min-width: 150px;">
        <div style="min-width: 150px;max-width: 150px;max-height: 150px;min-height: 150px;position: absolute;z-index: 1;">
          <svg style="min-width: 30px;max-width: 30px;margin-left: 55px;margin-top: 55px;position: absolute;stroke: darkgray;background: rgba(0 0 0 / 0.5);border-radius: 5px;" viewBox="0 0 24 24"><g><path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path><path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>
            <input v-on:change="onImgChange" accept="image/jpeg,image/png,image/webp" type="file" style="z-index: -1;opacity: 0;margin-left: -70px;margin-top: 50px;width: 0.1px;height: 0.1px;cursor: pointer;"/>
          </div>
          <img :src="img" class="col img-thumbnail" id="img" style="position: absolute;">
        </div>
        <div style="margin-top: 15px;margin-left: 15px;z-index: 1;">
          <form>
            <p>商品名</p>
            <input type="text" class="input" v-model="name"/>
            <p style="margin-top: 10px;">値段</p>
            <div style="display: flex;" class="input">
            ￥<input type="text"  v-model="price" style="width: 100%;"/>
            </div>
            <p style="margin-top: 10px;">商品説明</p>
            <textarea v-model="explanation" class="input" style="height: 100%;resize: none;min-height: 100px;max-height: 100px;"></textarea>
            <b-button v-on:click="exhibit">保存</b-button>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Exhibit',
  data () {
    return {
      name: '',
      explanation: '',
      price: 0,
      img: 'http://192.168.1.3:8080/freemarket/img/item/00000000-0000-0000-0000-000000000000',
      imgchange: false,
      imgname: '00000000-0000-0000-0000-000000000000',
      eimg: ''
    }
  },
  methods: {
    onImgChange (e) {
      const files = e.target.files || e.dataTransfer.files
      this.createImage(files[0])
    },
    createImage (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.img = e.target.result
      }
      reader.readAsDataURL(file)
      this.imgchange = true
      this.imgname = file.name
      this.eimg = file
    },
    async exhibit () {
      if (this.imgchange) {
        var params = new FormData()
        params.append('img', this.eimg)
        await axios.post(process.env.VUE_APP_API_URL_BASE + 'img/item', params, { withCredentials: true }).then(res => {
          console.log(res.data)
          this.imgname = res.data
        }
        ).catch(error => {
          console.log(error)
        })
      }
      await axios.post(process.env.VUE_APP_API_URL_BASE + 'item', {
        name: this.name,
        explanation: this.explanation,
        price: parseInt(this.price, 10),
        img: this.imgname
      }, { withCredentials: true }).then(res => {
        this.$router.push({ path: '/' })
        this.$router.go()
      }).catch(error => {
        console.log(error)
      })
    }
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
#img {
  object-fit: cover;
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
