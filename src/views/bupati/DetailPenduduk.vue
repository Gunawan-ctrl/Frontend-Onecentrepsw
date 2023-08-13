<template>
  <div>
    <a-row :gutter="24" type="flex" align="stretch" v-if="data">
			<a-col :span="24" :lg="24" class="mb-24">
				<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 10,}">
          <template #title>
            <a-row type="flex" align="middle">
              <a-col :span="12" :md="12">
                <p>No. KK</p>	
                <h6>{{data.data.no_kk}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>NIK</p>	
                <h6>{{data.data.nik}}</h6>	
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama Lengkap</p>	
                <h6>{{data.data.nama_lgkp}}</h6>			
                <!-- <h6>{{data.nama_lgkp ? `${data.gelarDepan}. ` : ''}}{{data.nama}} {{data.gelarBelakang ? `, ${data.gelarBelakang}` : ''}}</h6>			 -->
              </a-col>
              <a-col :span="12" :md="12">
                <p>Tgl Lahir</p>
                <h6>{{$parseDate(data.data.tgl_lhr).fullDate}}</h6>	
                <!-- <h6>{{data.data.tgl_lhr}},{{fullDate}}</h6>			 -->
              </a-col>
              <a-col :span="12" :md="12">
                <p>Jenis Kelamin</p>	
                <h6>{{data.data.jenis_kelamin}}</h6>			
                <!-- <h6>{{data.jenis_kelamin === 12 ? 'Perempuan' : 'Laki-Laki'}}</h6>			 -->
              </a-col>
              <a-col :span="12" :md="12">
                <p>Tempat lahir</p>	
                <h6>{{data.data.tmpt_lhr}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Agama</p>	
                <h6>{{data.data.agama}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Status Kawin</p>	
                <h6>{{data.data.status_kawin}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Pendidikan Terakhir</p>	
                <h6>{{data.data.pendidikan_akhir}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Jenis Pekerjaan</p>	
                <h6>{{data.data.jenis_pekerjaan}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama Lengkap Ibu</p>	
                <h6>{{data.data.nama_lgkp_ibu}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama Lengkap Ayah</p>	
                <h6>{{data.data.nama_lgkp_ayah}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama Kepala Keluarga</p>	
                <h6>{{data.data.nama_kep}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Status Hubungan Keluarga</p>	
                <h6>{{data.data.status_hub_keluarga}}</h6>
                <!-- <h6>{{$parseDate(data.tmt_pensiun).fullDate}}</h6>			 -->
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama Provinsi</p>
                <h6>{{data.data.nama_prop}}</h6>
                <!-- <h6>{{$parseDate(data.tmt_pensiun).fullDate}}</h6>			 -->
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama Kabupaten</p>
                <h6>{{data.data.nama_kab}}</h6>
                <!-- <h6>{{$parseDate(data.tmt_pensiun).fullDate}}</h6>			 -->
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama Kecamatan</p>
                <h6>{{data.data.nama_kec}}</h6>		
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama Kelurahan</p>
                <h6>{{data.data.nama_kel}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Alamat</p>
                <h6>{{data.data.alamat}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>No. RT</p>
                <h6>{{data.data.no_rt}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>No. RW</p>
                <h6>{{data.data.no_rw}}</h6>			
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
      this.$axios.get(`datapenduduk/get-datapenduduk-byid/${this.$route.params.id}`)
        .finally(() => this.$loading(false))
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.data = res.data
          }
        })
        .catch(() => this.$commonErrorNotif())
  }
}
</script>