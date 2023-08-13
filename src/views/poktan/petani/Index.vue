<template>
	<div>
		<a-row :gutter="24" type="flex" align="stretch">
			<a-col :span="24" :lg="24" class="mb-24">
				<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 10,}">
          <template #title>
            <a-row type="flex" align="middle">
              <a-col :span="24" :md="12">
                <h6>Data Petani Dipoktan Anda</h6>			
                <p>Keterangan Aja disini</p>	
              </a-col>
              <a-col :span="24" :md="12" :sm="24" style="display: flex; align-items: center;justify-content: flex-end">
                <!-- <a-radio-group v-model="projectHeaderBtns" size="small">
                  <a-radio-button value="all">Export</a-radio-button>
                  <a-radio-button value="online">Tambah</a-radio-button>
                  <a-radio-button value="stores">STORES</a-radio-button>
                </a-radio-group> -->
                <a-button-group>
                  <router-link
                    class="ant-btn ant-btn-primary ant-btn-background-ghost"
                    :to="{name: 'inputDataPetaniPoktan'}"
                  >
                    Export
                  </router-link>
                  <a-button type="primary" ghost>
                    Import
                  </a-button>
                  <router-link
                    class="ant-btn ant-btn-primary ant-btn-background-ghost"
                    :to="{name: 'inputDataPetaniPoktan'}"
                  >
                    Tambah
                  </router-link>
                </a-button-group>
              </a-col>
            </a-row>
          </template>
          <a-table
            :data-source="data"
            :pagination="true"
            :loading="loading"
            :rowKey="r => r._id"
          >
            <!-- <template slot="operation" slot-scope="text">
              <a>Publish</a>
              <a>Publish</a>
            </template> -->
            <a-table-column key="nik" data-index="nik">
              <span slot="title">NIK</span>
            </a-table-column>
            <a-table-column key="nama" data-index="nama">
              <span slot="title">Nama</span>
            </a-table-column>
            <a-table-column key="alamat" data-index="address">
              <span slot="title">Alamat</span>
            </a-table-column>
            <a-table-column key="poktan">
              <span slot="title">Status</span>
              <template slot-scope="r">
                <a-tag :class="`tag-status ${r.poktan.statusPetani === 'Aktif' ? 'ant-tag-success' : 'ant-tag-danger'}`">
                  {{ r.poktan.statusPetani }}
                </a-tag>
              </template>
            </a-table-column>
            <a-table-column key="action" title="Action">
              <template slot-scope="text, record">
                <span>
                  <a-button type="primary" icon="edit" size="default">
                    Edit
                  </a-button>
                  <a-divider type="vertical" />
                  <a-button type="danger" icon="delete" size="default" @click="deleteData(record)">
                    Hapus
                  </a-button>
                </span>
              </template>
            </a-table-column>

            <!-- <a-space slot="nama" :size="-12" class="avatar-chips">
              {{ nama }}
            </a-space> -->

            <!-- <template slot="company" slot-scope="company">
              <h6 class="m-0">
                <img :src="company.logo" width="25" class="mr-10">
                {{ company.name }}
              </h6>
            </template>

            <template slot="completion" slot-scope="completion">
              <span class="font-bold text-muted text-sm">{{ completion.label ? completion.label : completion }}</span>
              <a-progress :percent="completion.value ? completion.value : completion" :show-info="false" size="small" :status="completion.status ? completion.status : 'normal'" />
            </template> -->

          </a-table>

          <!-- <div class="table-upload-btn">
            <a-button type="dashed" block>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z" fill="#111827"/>
              </svg>
              Upload New Project
            </a-button>
          </div> -->
        </a-card>
				
			</a-col>

		</a-row>
	</div>
</template>

<script>
export default ({
  data() {
    return {
      data: [],
      columns : [
        {
          title: 'NIK',
          dataIndex: 'nik',
          // scopedSlots: { customRender: 'company' }
        },
        {
          title: 'Nama Petani',
          dataIndex: 'nama',
          // scopedSlots: { customRender: 'company' }
        },
        {
          title: 'Nama Petani',
          dataIndex: 'nama',
          // scopedSlots: { customRender: 'company' }
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      loading: true
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get(`petanibyidpoktan/${this.$getProfile().nik}`)
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.data = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    deleteData (data) {
      this.$confirm({
        title: 'Konfirmasi',
        content: 'Apakah Anda Yakin',
        okText: 'Ya',
        cancelText: 'Tidak',
        onOk: () => {
          alert('belum')
        }
      })
    }
  }
})

</script>
<style>
.my-icon {
  color: red;
}
</style>