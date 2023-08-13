<template>
  <div>
    <a-row :gutter="24" type="flex" align="stretch" v-if="data">
			<a-col :span="24" :lg="24" class="mb-24">
				<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 10,}">
          <template #title>
            <a-row type="flex" align="middle">
              <a-col :span="12" :md="12">
                <p>NIP</p>	
                <h6>{{data.nipBaru}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Nama</p>	
                <h6>{{data.gelarDepan ? `${data.gelarDepan}. ` : ''}}{{data.nama}} {{data.gelarBelakang ? `, ${data.gelarBelakang}` : ''}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>TTL</p>	
                <h6>{{data.tempatLahir}}, {{$parseDate(data.tglLahir).fullDate}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>No HP</p>	
                <h6>{{data.noHp}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>No NPWP</p>	
                <h6>{{data.noNpwp}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Jenis Kelamin</p>	
                <h6>{{data.jKelamin === 12 ? 'Perempuan' : 'Laki-Laki'}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Golongan</p>	
                <h6>{{data.golAkhir}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>KPPN</p>	
                <h6>{{data.kppn}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Instansi</p>	
                <h6>{{data.insKerja}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Satuan Kerja</p>	
                <h6>{{data.satKer}}</h6>			
              </a-col>
              <a-col :span="24" :md="24">
                <p>Alamat Pegawai</p>	
                <h6>{{data.alamat}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Satuan Kerja</p>	
                <h6>{{data.satKer}}</h6>			
              </a-col>
              <a-col :span="12" :md="12">
                <p>Tanggal Pensiun</p>	
                <h6>{{$parseDate(data.tmt_pensiun).fullDate}}</h6>			
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
      this.$axios.get(`/pns/data/${this.$route.params.id}`)
        .finally(() => this.$loading(false))
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.data = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
  }
}
</script>