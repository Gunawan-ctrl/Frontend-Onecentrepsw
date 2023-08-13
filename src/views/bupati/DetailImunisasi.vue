<template>
  <div>
    <a-row :gutter="24" type="flex" align="stretch" v-if="data">
			<a-col :span="24" :lg="24" class="mb-24">
				<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 10,}">
          <template #title>
            <a-row type="flex" align="middle">
              <a-col :span="12" :md="12">
                <p>NIK</p>	
                <h6 v-for="example in data" :key="example.nik">{{ example.nik }}</h6>
                <!-- <h6 v-for="tugasSaya in data" :key="tugasSaya.params">{{tugasSaya.nik}}</h6> -->
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama Anak</p>	
                <h6>{{data[0].name}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Jenis Kelamin</p>	
                <h6>{{data[0].gender}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Tanggal Lahir</p>	
                <h6>{{data[0].birth_date}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Umur</p>	
                <h6>{{data.data}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama Ibu</p>	
                <h6>{{data[0].parent_name}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Provinsi</p>	
                <h6>{{data[0].province.name}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Kota</p>	
                <h6>{{data[0].city.name}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Kecamatan</p>	
                <h6>{{data[0].district.name}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Kelurahan</p>	
                <h6>{{data[0].subDistrict.name}}</h6>			
              </a-col>
            </a-row>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import axioss from 'axios'
export default {
  data () {
    return {
      data: null,
      gnw: null
    }
  },
  created () {
    // this.$loading(true)
    const config = {
        method: 'get',
        url: `https://sehatindonesiaku-api.kemkes.go.id/toddlers/page-prev-next?page_id=0&page_limit=20&page_event=next&status=1/${this.$route.params.id}`,
        headers: 
        { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJEaW5rZXMgUGVzYXdhcmFuIiwicm9sZV9pZCI6MiwiaGVhbHRoV29ya2VyIjpudWxsLCJoZWFkRGVwYXJ0bWVudCI6eyJpZCI6MTgwMCwidXNlcl9pZCI6MTIwODQsImxvY2F0aW9uX2lkIjoyNTcxOCwibG9jYXRpb24iOnsiaWQiOjI1NzE4LCJjb2RlIjoiMTgwOSIsIm5hbWUiOiJQZXNhd2FyYW4iLCJsZXZlbCI6MiwicGFyZW50X2lkIjoyMzY1NSwicGFyZW50Ijp7ImlkIjoyMzY1NSwiY29kZSI6IjE4IiwibmFtZSI6IkxhbXB1bmciLCJsZXZlbCI6MSwicGFyZW50X2lkIjpudWxsLCJwYXJlbnQiOm51bGx9fX19LCJyb2xlcyI6WyJIRUFEX09GX0hFQUxUSF9ERVBBUlRNRU5UIl0sInBlcm1pc3Npb25zIjpbXSwiaWF0IjoxNjY4NDk5OTk2LCJleHAiOjE2Njg1ODYzOTZ9.bpjEiIt273qHYJxpJq0GQvMneybEIZucBCkmrHq9mAA' }
      }
      axioss(config)
        .finally(() => { this.loading = false })
        .then(res => {
          this.data = res.data.data
          console.log(this.data);
          // let gnw = this.data
          // let arrayLength = gnw.length;
          // for (let i = 0; i < arrayLength; i++) {
          //   console.log(gnw[i].nik);
          // }
          
          // console.log(res.data);
          // if (this.$parseResponse(res.data)) {
            // this.data = res.data.data
          //   const pagination = {
          //     page: res.data.page,
          //     total: res.data.count,
          //     filter : res.data.filter
          //   }
          //   this.pagination = pagination
          // }
        }).catch((err) => console.log(err))
  }
}
</script>