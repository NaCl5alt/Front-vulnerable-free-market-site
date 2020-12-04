<template>
  <div></div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    logout () {
      axios.post('/freemarket/logout', { withCredentials: true }).then(res => {
        this.$cookies.remove('token')
        console.log(res)
        this.$router.push({ name: 'Home' })
        this.$router.go()
      }).catch(error => {
        console.log(error)
      })
    }
  },
  beforeMount () {
    this.logout()
  }
}
</script>
