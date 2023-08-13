<template>
	<div>
		<a-row :gutter="24" type="flex" align="stretch">
			<a-col :span="24" :lg="16" class="mb-24">
				<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 10,}">
          <template #title>
            <a-row type="flex" align="middle">
              <a-col :span="24" :md="16">
                <h6 class="font-semibold m-0">Detail Data Penduduk</h6>
              </a-col>
              <a-col :span="24" :md="8" style="display: flex; align-items: center; justify-content: flex-end">
                <a-input-search class="header-search" v-model="filter" v-on:input="handleTableChange" placeholder="Pencarian">
                </a-input-search>
              </a-col>
            </a-row>
          </template>
          <a-table
            :data-source="data"
            :pagination= "pagination"
            :loading="loading"
            :rowKey="r => r.nik"
            :filter="filter"
            @change="handleTableChange"
          >
          <template v-slot>
            <a-table-column key="nik" data-index="nik">
              <span slot="title">NIK</span>
            </a-table-column>
            <a-table-column key="nama_lgkp" data-index="nama_lgkp">
              <span slot="title">Nama Lengkap</span>
            </a-table-column>
            <a-table-column key="jenis_kelamin" data-index="jenis_kelamin">
              <span slot="title">Jenis Kelamin</span>
            </a-table-column>
            <a-table-column key="agama" data-index="agama">
              <span slot="title">Agama</span>
            </a-table-column>
            <a-table-column key="alamat" data-index="alamat">
              <span slot="title">Alamat</span>
            </a-table-column>

            <!-- Start Button Detail -->
            <!-- <a-table-column key="action" title="Action">
              <template slot-scope="text, record">
                <span>
                  <a-button type="primary" @click="goToDetail(record)" size="default">
                    Detail
                  </a-button>
                </span>
              </template>
            </a-table-column> -->
            <!-- End Button Detail -->

          </template>
          </a-table>
        </a-card>
			</a-col>
      <a-col :span="24" :md="8" :xl="8" class="mb-20">
        <ChartsPenduduk v-if="!loading" :totalPd="totalPenduduk" :totalPdLaki="totalPendudukLaki"
          :totalPdPerempuan="totalPendudukPerempuan"></ChartsPenduduk>
      </a-col>
		</a-row>
	</div>
</template>

<script>
import ChartsPenduduk from '../../components/MyCharts/ChartPenduduk';
export default ({
  data() {
    return {
      data: [],
      pagination: {},
      filter: '',
      columns : [
        {
          title: 'No. KK',
          dataIndex: 'no_kk',
        },
        {
          title: 'NIK',
          dataIndex: 'nik',
        },
        {
          title: 'Nama Lengkap',
          dataIndex: 'nama_lgkp',
        },
        {
          title: 'Jenis Kelamin',
          dataIndex: 'jenis_kelamin',
        },
        {
          title: 'agama',
          dataIndex: 'agama',
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
    handleTableChange(pagination, filter) {
      const pager = { ...this.pagination };
      this.pagination = pager;
      
      this.getData({
        page: pagination.current,
        perPage: pagination.pageSize,
        filter : this.filter
      });
    },
    getData (params = {page: 1, perPage: 10 , filter : this.filter}) {
      this.loading = true
      this.$axios.get(`/datapenduduk/get-all-datapenduduk`, {params})
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.data = res.data.result
            const pagination = {
              page: res.data.page,
              total: res.data.count,
              filter : res.data.filter
            }
            this.pagination = pagination
          }
        }).catch(() => this.$commonErrorNotif())
    },
    goToDetail (record) {
      this.$router.push({name: 'detailDataPendudukBupati', params: {id: record._id}})
    }
  }
})

</script>
<style>
.my-icon {
  color: red;
}
</style>