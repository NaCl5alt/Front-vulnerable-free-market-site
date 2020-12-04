<script>
import axios from 'axios'
export default {
  methods: {
    delete () {
      axios.delete('/freemarket/user', { withCredentials: true }).then(res => {
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
    this.delete()
  }
}
</script>
