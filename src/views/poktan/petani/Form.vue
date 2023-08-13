<template>
  <div>
    <a-row>
      <a-card :bordered="false" class="header-solid mb-24" :bodyStyle="{padding: 10,}">
        <template #title>
          <a-row type="flex" align="middle">
            <a-col :span="24" :md="12">
              <a-form-model
                ref="ruleForm"
                :model="form"
                :rules="rules"
              >
                <a-form-model-item ref="nik" label="Masukan NIK" prop="nik">
                  <a-input-search
                    @search="onSubmit"
                    v-model="form.nik"
                  />
                </a-form-model-item>
              </a-form-model>
            </a-col>
          </a-row>
        </template>
      </a-card>
    </a-row>
    
    <a-form-model
      ref="formPetani"
      :model="formPetani"
      :rules="rulesPetani"
      v-if="loaded"
    >
      <a-row :gutter="24" justify="start">
        <a-col :span="24" :lg="12" class="mb-24">
          <a-card :bordered="false" class="header-solid">
            <template #title>
              <a-row type="flex" align="middle">
                <a-col :md="23" :xs="23">
                  <h5>Data Umum</h5>
                  <a-form-model-item class="no-top" ref="nik" label="NIK" prop="nik">
                    <a-input
                      v-model="formPetani.nik"
                      readOnly
                    />
                  </a-form-model-item>
                  <a-form-model-item  class="no-top" ref="nama" label="Nama Petani" prop="nama">
                    <a-input
                      v-model="formPetani.nama"
                      placeholder="Nama Petani"
                      :readOnly="adaDataPetani"
                    />
                  </a-form-model-item>
                  <a-form-model-item class="no-top" ref="namaIbuKandung" label="Nama Ibu Kandung" prop="namaIbuKandung">
                    <a-input
                      v-model="formPetani.namaIbuKandung"
                      :readOnly="adaDataPetani"
                    />
                  </a-form-model-item>
                  <a-form-model-item class="no-top" ref="noHp" label="No HP" prop="noHp">
                    <a-input
                      v-model="formPetani.no_hp"
                      :readOnly="adaDataPetani"
                    />
                  </a-form-model-item>
                  <a-form-model-item class="no-top" ref="password" label="Password" prop="password">
                    <a-input
                      type="password"
                      v-model="formPetani.password"
                      :readOnly="adaDataPetani"
                    />
                  </a-form-model-item>
                  <!-- <a-form-model-item>
                    <a-button type="primary" @click="simpan">
                      Submit
                    </a-button>
                  </a-form-model-item> -->
                </a-col>
              </a-row>
            </template>
          </a-card>
        </a-col>
        <a-col :span="24" :lg="12">
          <a-card :bordered="false" class="header-solid mt-4" :bodyStyle="{padding: 10,}">
            <template #title>
              <a-row type="flex" align="middle">
                <a-col :span="24" :md="23">
                  <h5>Alamat Petani</h5>
                  <a-form-model-item class="no-top" label="Kabupaten" prop="kabupaten">
                    <a-select
                      placeholder="Pilih Kabupaten"
                      :disabled="adaDataPetani"
                      v-model="kotaSel"
                      labelInValue
                      @change="getKec"
                    >
                      <a-select-option
                        v-for="l, in listKab"
                        :key="l.id_kab"
                        :value="l.id_kab"
                      >
                        {{ l.nama }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item class="no-top" label="Kecamatan" prop="kecamatan">
                    <a-select
                      placeholder="Pilih Kecamatan"
                      :disabled="adaDataPetani"
                      v-model="kecSel"
                      labelInValue
                      @change="getDesa"
                    >
                      <a-select-option
                        v-for="l, in listKec"
                        :key="l.id_kec"
                        :value="l.id_kec"
                      >
                        {{ l.nama }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item class="no-top" label="Desa" prop="desa">
                    <a-select
                      placeholder="Pilih Desa"
                      :disabled="adaDataPetani"
                      v-model="desa"
                      labelInValue
                    >
                      <a-select-option
                        v-for="l, in listDesa"
                        :key="l.id_kel"
                        :value="l.id_kel"
                      >
                        {{ l.nama }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item class="no-top" label="Desa" prop="desa">
                    <a-textarea
                      v-model="formPetani.address"
                      readOnly
                      placeholder="Alamat Lengkap"
                      :auto-size="{ minRows: 6.6, maxRows: 6.6 }"
                    />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </template>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="24" justify="start" align="stretch">
        <!-- <a-col :span="24" :lg="12" class="mb-24">
          <a-card :bordered="false" class="header-solid">
            <template #title>
              <h5>Area Poktan</h5>
              <a-row type="flex" align="middle">
                <a-col :md="23" :xs="23">
                  <a-form-model-item class="no-top" ref="nik" label="NIK" prop="nik">
                    <a-input
                      v-model="formPetani.nik"
                      readOnly
                    />
                  </a-form-model-item>
                  <a-form-model-item  class="no-top" ref="nama" label="Nama Petani" prop="nama">
                    <a-input
                      v-model="formPetani.nama"
                      placeholder="Nama Petani"
                      :readOnly="adaDataPetani"
                    />
                  </a-form-model-item>
                  <a-form-model-item class="no-top" ref="namaIbuKandung" label="Nama Ibu Kandung" prop="namaIbuKandung">
                    <a-input
                      v-model="formPetani.namaIbuKandung"
                      :readOnly="adaDataPetani"
                    />
                  </a-form-model-item>
                  <a-form-model-item class="no-top" ref="password" label="Password" prop="password">
                    <a-input
                      type="password"
                      v-model="formPetani.password"
                      :readOnly="adaDataPetani"
                    />
                  </a-form-model-item>
                  <a-form-model-item>
                    <a-button type="primary" @click="simpan">
                      Submit
                    </a-button>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </template>
          </a-card>
        </a-col>
        <a-col :span="24" :lg="12">
          <a-card :bordered="false" class="header-solid mt-4" :bodyStyle="{padding: 10,}">
            <template #title>
              <a-row type="flex" align="middle">
                <a-col :span="24" :md="23">
                  <a-form-model-item class="no-top" label="Kabupaten" prop="kabupaten">
                    <a-select
                      placeholder="Pilih Kabupaten"
                      :disabled="adaDataPetani"
                      v-model="kotaSel"
                      labelInValue
                      @change="getKec"
                    >
                      <a-select-option
                        v-for="l, in listKab"
                        :key="l.id_kab"
                        :value="l.id_kab"
                      >
                        {{ l.nama }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item class="no-top" label="Kecamatan" prop="kecamatan">
                    <a-select
                      placeholder="Pilih Kecamatan"
                      :disabled="adaDataPetani"
                      v-model="kecSel"
                      labelInValue
                      @change="getDesa"
                    >
                      <a-select-option
                        v-for="l, in listKec"
                        :key="l.id_kec"
                        :value="l.id_kec"
                      >
                        {{ l.nama }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item class="no-top" label="Desa" prop="desa">
                    <a-select
                      placeholder="Pilih Desa"
                      :disabled="adaDataPetani"
                      v-model="desa"
                      labelInValue
                    >
                      <a-select-option
                        v-for="l, in listDesa"
                        :key="l.id_kel"
                        :value="l.id_kel"
                      >
                        {{ l.nama }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item class="no-top" label="Desa" prop="desa">
                    <a-textarea
                      v-model="formPetani.address"
                      placeholder="Alamat Lengkap"
                      :auto-size="{ minRows: 5, maxRows: 5 }"
                    />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </template>
          </a-card>
        </a-col> -->
      </a-row>
    </a-form-model>
  </div>
</template>
<script>
const def = {
  label: null,
  key: null
}
export default {
  data () {
    return {
      form: {
        nik: '12'
      },
      rules: {
        nik: [
          {  required: true, message: 'Masukan NIK', trigger: 'change' }
        ]
      },
      rulesPetani: {
        nik: [
          {  required: true, message: 'Masukan NIK', trigger: 'change' }
        ]
      },
      formPetani: {
        nik: null,
        nama: null,
        address: null,
        namaIbuKandung: null,
        no_hp: null,
        password: '12345678',
        poktan: [
          {
            idKios: null,
            id_poktan: this.$getProfile().nik,
            name: this.$getProfile().namaPoktan,
            area: null,
            subSektor: null,
            komoditas: []
          }
        ],
        area: null
      },
      kotaSel: [],
      kecSel: [],
      desa: [],
      adaDataPetani: false,
      loaded: false,
      listKab: [],
      listKec: [],
      listDesa: []
    }
  },
  created () {
    this.getKab()
    this.onSubmit()
  },
  methods: {
    getKab () {
      this.$loading(true)
      this.$axios.get('kabupaten/18')
        .finally(() => this.$loading(false))
        .then(res => {
          this.listKab = res.data.message
        }).catch(() => this.$commonErrorNotif())
    },
    getKec () {
      this.$loading(true)
      this.$axios.get(`kecamatan/${this.kotaSel.key}`)
        .finally(() => this.$loading(false))
        .then(res => {
          this.listKec = res.data.message
        }).catch(() => this.$commonErrorNotif())
    },
    getDesa () {
      this.$loading(true)
      this.$axios.get(`desa/${this.kecSel.key}`, this.$createToken())
        .finally(() => this.$loading(false))
        .then(res => {
          this.listDesa = res.data.message
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      // this.$refs.ruleForm.validate(valid => {
      //   if (valid) {
          this.$loading(true)
          this.$axios.get(`cek-petani_v2-users/${this.form.nik}/${this.$getProfile().nik}`, this.$createToken())
            .finally(() => { this.$loading(false) })
            .then(res => {
              if (this.$parseResponse(res.data)) {
                if (res.data.result.length > 0) {
                  const dataPetani = res.data.result[0]
                  this.formPetani.nik = dataPetani.nik
                  this.formPetani.nama = dataPetani.nama
                  this.formPetani.namaIbuKandung = dataPetani.namaIbuKandung
                  this.formPetani.no_hp = dataPetani.no_hp

                  const area = dataPetani.area
                  this.kotaSel = {
                    key: area.city_code,
                    label: area.city
                  }
                  this.kecSel = {
                    key: area.district_code,
                    label: area.district
                  }
                  this.desa = {
                    key: area.sub_district_code,
                    label: area.sub_district
                  }
                  this.formPetani.address = dataPetani.address
                  this.adaDataPetani = true
                  this.loaded = true
                } else {
                  this.adaDataPetani = false
                  this.formPetani.nama = null
                  this.formPetani.nik = this.form.nik
                  this.formPetani.namaIbuKandung = null
                  this.kotaSel = []
                  this.kecSel = []
                  this.desa = []
                  this.formPetani.address = null
                  this.$confirm({
                    title: 'Konfirmasi',
                    content: 'Data Petani Belum Ada, Apakah Anda Ingin Mengisi ?',
                    okText: 'Ya',
                    cancleText: 'Batalkan',
                    onCancel: () => {
                      this.loaded = false
                    },
                    onOk: () => {
                      this.loaded = true
                    }
                  });
                }
              }
            }).catch(() => this.$commonErrorNotif())
      //   }
      // })
    },
    simpan () {
      this.$refs.formPetani.validate(valid => {
        if (valid) {
          alert('ya')
        }
      })
    }
  }
}
</script>