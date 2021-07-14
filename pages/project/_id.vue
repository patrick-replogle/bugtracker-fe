<template>
  <div>
    <div v-if="project">
      {{project}}
    </div>
  </div>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth';

export default {
    data() {
        return {
            params: this.$route.params,
            project: null
        }
    },
    created() {
        axiosWithAuth().get(this.$config.baseURL + '/projects/project/' + this.$route.params.id)
            .then(res => this.project = res.data)
            .catch(err => console.dir(err))
    }
}
</script>

<style lang="scss" scoped></style>
