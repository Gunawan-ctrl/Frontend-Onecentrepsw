<template>
	<div>
		<a-row :gutter="24" type="flex" align="stretch" >
			<a-col :span="24" :md="24" class="mb-24">
				<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 10,}">
          <template #title>
            <a-row :gutter="20" type="flex" align="middle">
              <a-col :span="24" :md="16">
                <p>List Web Pesawaran</p>
              </a-col>
            </a-row>

          </template>
            
          <a-table
            :data-source="data"
            :pagination= "pagination"
            :loading="loading"
            :rowKey="r => r.namaDomainDanSubdomain"
            :filter="filter"
            @change="handleTableChange"
          >
          <template v-slot>
            <a-table-column key="No" data-index="No">
              <span slot="title">No</span>
            </a-table-column>
            <a-table-column key="namaDomainDanSubdomain" data-index="namaDomainDanSubdomain">
              <span slot="title">Nama Domain dan Subdomain</span>
            </a-table-column>
            <a-table-column key="OPD_Pengelola" data-index="OPD_Pengelola">
              <span slot="title">OPD Pengelola</span>
            </a-table-column>
            <a-table-column key="Alamat_IP" data-index="Alamat_IP">
              <span slot="title">Alamat IP</span>
            </a-table-column>
            <a-table-column key="status_Browser" data-index="status_Browser">
              <span slot="title">Browser</span>
            </a-table-column>

            <!-- Start Detail -->
            <a-table-column key="action" title="Action">
              <template slot-scope="text, record">
                <span>
                  <a-button type="primary" @click="goToDetail(record)" size="default">
                    Detail
                  </a-button>
                </span>
              </template>
            </a-table-column>
            <!-- End btn Detail -->

          </template>
          </a-table>
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
      pagination: {},
      filter: '',
      columns : [
        {
          title: 'No',
          dataIndex: 'No',
        },
        {
          title: 'Nama Domain dan Subdomain',
          dataIndex: 'namaDomainDanSubdomain',
        },
        {
          title: 'OPD Pengelola',
          dataIndex: 'opd_pengelola',
        },
        {
          title: 'Alamat IP',
          dataIndex: 'alamat_ip',
        },
        {
          title: 'Browser',
          dataIndex: 'browser',
        },
        {
          title: 'CMD',
          dataIndex: 'cmd',
        },
        {
          title: 'Jenis',
          dataIndex: 'jenis',
        },
        {
          title: 'Lokasi Penyimpanan',
          dataIndex: 'lokasi_penyimpanan',
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
    this.getDataweb()
  },
  methods: {
    handleTableChange(pagination, filter) {
    },
    getDataweb () {
      this.loading = true
      this.$axios.get('listweb/get-data')
        .finally(() => { this.loading = false })
        .then(res => {
          console.log(res);
          this.data = res.data.data
        }).catch(() => this.$commonErrorNotif())
    },
    goToDetail (record) {
      this.$router.push({name: 'DetailListWeb', params: {id: record._id}})
    }
  }
})

</script>
<style>
</style>