<template>
	<div>
		<a-row :gutter="10" type="flex" align="stretch">
			<a-col :span="24" :lg="24" class="mb-24">
				<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 10,}">
          <template #title>
            <a-row type="flex" align="middle">
              <a-col :span="24" :md="16">
                <h6 class="font-semibold m-0">Detail Data Pegawai</h6>
              </a-col>
              <a-col :span="24" :md="8" style="display: flex; align-items: center; justify-content: flex-end">
                <a-input-search class="header-search" placeholder="Pencarian">
                </a-input-search>
              </a-col>
            </a-row>
          </template>
          <a-table
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            :rowKey="r => r.nipBaru"
            @change="handleTableChange"
          >
          <template v-slot>
            <a-table-column key="nipBaru" data-index="nipBaru">
              <span slot="title">NIP</span>
            </a-table-column>
            <a-table-column key="nama" data-index="nama">
              <span slot="title">Nama</span>
            </a-table-column>
            <a-table-column key="golAkhir" data-index="golAkhir">
              <span slot="title">Golongan</span>
            </a-table-column>
            <a-table-column key="insKerja" data-index="insKerja">
              <span slot="title">Instansi</span>
            </a-table-column>
            <a-table-column key="satKer" data-index="satKer">
              <span slot="title">Satuan Kerja</span>
            </a-table-column>

            <!-- Start Detail -->
            <!-- <a-table-column key="action" title="Action">
              <template slot-scope="text, record">
                <span>
                  <a-button type="primary" @click="goToDetail(record)" size="default">
                    Detail
                  </a-button>
                </span>
              </template>
            </a-table-column> -->
            <!-- End Detail -->

          </template>
          </a-table>
        </a-card>
			</a-col>
      <!-- <a-col :span="12" :xl="6" class="mb-20">
        <ChartsPns v-if="!loading" :totalPns="totalPns" :pnsLaki="totalLk"
          :pnsPerempuan="totalPerempuan"></ChartsPns>
        <WidgetCounter title="PNS" :value="totalPns" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192L512 64zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110 312 110v330zM378.4 475.1c-14.1-14.1-36.9-14.1-50.9 0-14.1 14.1-14.1 36.9 0 50.9l129.4 129.4 2.1 2.1c13.3 13.3 34.8 13.3 48.1 0L730.6 434c13.3-13.3 13.3-34.8 0-48.1l-2.8-2.8c-13.3-13.3-34.8-13.3-48.1 0L483 579.7 378.4 475.1z'/></svg>" status=""></WidgetCounter>
        <div class="mt-20">
        <WidgetCounter title="PRIA" :value="totalPendudukLaki" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M384 320C207.3 320 64 463.3 64 640s143.3 320 320 320 320-143.3 320-320-143.3-320-320-320zm0 568c-137 0-248-111-248-248s111-248 248-248 248 111 248 248-111 248-248 248zM949.5 74.5C942.9 68 933.9 64 924 64H548c-19.9 0-36 16.1-36 36s16.1 36 36 36h340v340c0 19.9 16.1 36 36 36s36-16.1 36-36V100c0-9.9-4-18.9-10.5-25.5z'/></svg>" status=""></WidgetCounter>
        <div class="mt-20">
        <WidgetCounter title="WANITA" :value="totalPendudukPerempuan" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 576c159.1 0 288-128.9 288-288S671.1 0 512 0 224 128.9 224 288s128.9 288 288 288zm0-504c119.3 0 216 96.7 216 216s-96.7 216-216 216-216-96.7-216-216S392.7 72 512 72zm348 568H164c-19.9 0-36 16.1-36 36s16.1 36 36 36h312v276c0 19.9 16.1 36 36 36s36-16.1 36-36V712h312c19.9 0 36-16.1 36-36s-16.1-36-36-36z'/></svg>" status=""></WidgetCounter>
      </div>
      
      </div>
      </a-col> -->
      <!-- <a-col :span="12" :xl="6" class="mb-20">
        <WidgetCounter title="PRIA" :value="totalPendudukLaki" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M384 320C207.3 320 64 463.3 64 640s143.3 320 320 320 320-143.3 320-320-143.3-320-320-320zm0 568c-137 0-248-111-248-248s111-248 248-248 248 111 248 248-111 248-248 248zM949.5 74.5C942.9 68 933.9 64 924 64H548c-19.9 0-36 16.1-36 36s16.1 36 36 36h340v340c0 19.9 16.1 36 36 36s36-16.1 36-36V100c0-9.9-4-18.9-10.5-25.5z'/></svg>" status=""></WidgetCounter>
        
      </a-col> -->
      <!-- <a-col :span="24" :md="8" :xl="6" class="mb-20">
        <ChartsPns v-if="!loading" :totalPns="totalPns" :pnsLaki="totalLk"
          :pnsPerempuan="totalPerempuan"></ChartsPns>
      </a-col> -->
      
      
      <!-- <a-col :span="12" :xl="6" class="mb-20">
        <WidgetCounter title="WANITA" :value="totalPendudukPerempuan" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 576c159.1 0 288-128.9 288-288S671.1 0 512 0 224 128.9 224 288s128.9 288 288 288zm0-504c119.3 0 216 96.7 216 216s-96.7 216-216 216-216-96.7-216-216S392.7 72 512 72zm348 568H164c-19.9 0-36 16.1-36 36s16.1 36 36 36h312v276c0 19.9 16.1 36 36 36s36-16.1 36-36V712h312c19.9 0 36-16.1 36-36s-16.1-36-36-36z'/></svg>" status=""></WidgetCounter>
      </a-col>
      <a-col :span="24" :lg="18">
        <a-row type="flex" :gutter="10">
        </a-row>
			</a-col> -->
		</a-row>
	</div>
</template>

<script>
import ChartsPns from '../../components/MyCharts/ChartPns';
import ChartsPns1 from '../../components/MyCharts/ChartPns1';
import ChartsPenduduk from '../../components/MyCharts/ChartPendudukDashboard';
import ChartGolongan from '../../components/MyCharts/ChartGolongan';
// Bar chart for "Active Users" card.
import CardBarChart from '../../components/Cards/CardBarChart';

// Line chart for "Sales Overview" card.
import CardLineChart from '../../components/Cards/CardLineChart';

// Counter Widgets
import WidgetCounter from '../../components/Widgets/WidgetCounter';

// "Projects" table component.
import CardProjectTable from '../../components/Cards/CardProjectTable';

// Order History card component.
import CardOrderHistory from '../../components/Cards/CardOrderHistory';

// Information card 1.
import CardInfo from '../../components/Cards/CardInfo';

import CardInfo2 from '../../components/Cards/CardInfo2';
const stats = [];

// "Projects" table list of columns and their properties.
const tableColumns = [];

// "Projects" table list of rows and their properties.
const tableData = [];

const gol = [
	"I/a",
	"II/a",
	"III/a",
	"IV/a",
	"I/b",
	"II/b",
	"III/b",
	"IV/b",
	"I/c",
	"II/c",
	"III/c",
	"IV/c",
	"I/d",
	"II/d",
	"III/d",
	"IV/d",
];

export default ({
  components: {
		ChartsPns,
		ChartsPns1,
		ChartsPenduduk,
		ChartGolongan,
		CardBarChart,
		CardLineChart,
		WidgetCounter,
		CardProjectTable,
		CardOrderHistory,
		CardInfo,
		CardInfo2,
	},
  data() {
    return {
      loading: false,
			tableData,
			tableColumns,
			stats,
			totalPns: 0,
			totalPenduduk: 0,
			total: 0,
			listGolongan: [],
			golongan: null,
			listProfesi: [],
			profesi: null,
			totalPerempuan: 0,
			totalPendudukPerempuan: 0,
			totalLk: 0,
			totalPendudukLaki: 0,
			listInstansi: [],
			instani: null,
			indexGol: {
				ia: null,
				iia: null,
				iiia: null,
				iva: null,
				ib: null,
				iib: null,
				iiib: null,
				ivb: null,
				ic: null,
				iic: null,
				iiic: null,
				ivc: null,
				id: null,
				iid: null,
				iiid: null,
				ivd: null,
			},
      ChartsPns,
      data: [],
      pagination: {},
      columns : [
        {
          title: 'NIP',
          dataIndex: 'nipBaru',
        },
        {
          title: 'nama',
          dataIndex: 'nama',
        },
        {
          title: 'golAkhir',
          dataIndex: 'golAkhir',
        },
        {
          title: 'insKerja',
          dataIndex: 'insKerja',
        },
        {
          title: 'satKer',
          dataIndex: 'satKer',
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
  async created () {
    await this.getData()
    await this.getCountGolongan()
    // await this.getEslonJabatan()
		// await this.getInstansi()
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getData({
        page: pagination.current,
        perpage: pagination.pageSize
      });
    },
    async getData (params = {page: 1, perpage: 10}) {
      this.loading = true
      this.$axios.get(`/pns/data`, {params})
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.data = res.data.result
            const pagination = {
              page: res.data.paginate.page,
              total: res.data.paginate.rowsNumber
            }
            this.pagination = pagination
          }
        }).catch(() => this.$commonErrorNotif())
    },
    async getCountGolongan() {
			this.$loading(true)
			this.loading = true;
			try {
				// for (let i = 0; i < gol.length; i++) {
				this.indexGol.ia = await this.$axios.get(`count/data-pns?golakhir=${gol[0]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.iia = await this.$axios.get(`count/data-pns?golakhir=${gol[1]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.iiia = await this.$axios.get(`count/data-pns?golakhir=${gol[2]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.iva = await this.$axios.get(`count/data-pns?golakhir=${gol[3]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.ib = await this.$axios.get(`count/data-pns?golakhir=${gol[4]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.iib = await this.$axios.get(`count/data-pns?golakhir=${gol[5]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.iiib = await this.$axios.get(`count/data-pns?golakhir=${gol[6]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.ivb = await this.$axios.get(`count/data-pns?golakhir=${gol[7]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.ic = await this.$axios.get(`count/data-pns?golakhir=${gol[8]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.iic = await this.$axios.get(`count/data-pns?golakhir=${gol[9]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.iiic = await this.$axios.get(`count/data-pns?golakhir=${gol[10]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.ivc = await this.$axios.get(`count/data-pns?golakhir=${gol[11]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.id = await this.$axios.get(`count/data-pns?golakhir=${gol[12]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.iid = await this.$axios.get(`count/data-pns?golakhir=${gol[13]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.iiid = await this.$axios.get(`count/data-pns?golakhir=${gol[14]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				this.indexGol.ivd = await this.$axios.get(`count/data-pns?golakhir=${gol[15]}&instansi=null`).then((res) => {
					return res.data.totalPns
				})
				// }
				this.$loading(false)
				this.loading = false;
				// console.log(this.indexGol)
			} catch (err) {
				this.loading = false
				this.$commonErrorNotif()
			} finally {
				this.loading = false
				this.$loading(false)
			}
		},
    // goToDetail (record) {
    //   this.$router.push({name: 'detailDataPegawaiBupati', params: {id: record.dataUtamaId}})
    // }
  }
})

</script>
<style>
.my-icon {
  color: red;
}
</style>