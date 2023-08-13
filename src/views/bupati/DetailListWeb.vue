<template>
  <div>
    <a-row :gutter="24" type="flex" align="stretch" v-if="data">
			<a-col :span="24" :lg="24" class="mb-24">
				<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 10,}">
          <template #title>
            <a-row type="flex" align="middle">
              <a-col :span="12" :md="12">
                <p>No</p>	
                <h6>{{data.data.No}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama Domain dan Subdomain</p>	
                <h6><a :href="data.data.namaDomainDanSubdomain" target="_blank">{{data.data.namaDomainDanSubdomain}}</a></h6>	
              </a-col>
              <a-col :span="12" :md="12">
                <p>OPD Pengelola</p>	
                <h6>{{data.data.OPD_Pengelola}}</h6>
              </a-col>
              <a-col :span="12" :md="12">
                <p>Alamat IP</p>	
                <h6>{{data.data.Alamat_IP}}</h6>	
              </a-col>
              <a-col :span="12" :md="12">
                <p>Browser</p>	
                <h6>{{data.data.status_Browser}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>CMD</p>	
                <h6>{{data.data.status_Cmd}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Jenis</p>	
                <h6>{{data.data.Jenis}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Lokasi Penyimpanan</p>	
                <h6>{{data.data.lokasiPenyimpanan}}</h6>			
              </a-col>
            </a-row>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: null
    }
  },
  created () {
    this.$loading(true)
      this.$axios.get(`listweb/get-dataweb-byid/${this.$route.params.id}`)
        .finally(() => this.$loading(false))
        .then(res => {
          // console.log(res);
          if (this.$parseResponse(res.data)) {
            this.data = res.data
          }
        })
        .catch(() => this.$commonErrorNotif())
  }
}
</script>