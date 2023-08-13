<template>
	<div>
		<a-row :gutter="10" align="middle">
			<a-col :span="24" :lg="10" class="mb-24">
				<a-card :bordered="false" class="dashboard-bar-line header-solid">
					<template #title>
						<h6 class="mb-20">Cari Data Berdasarkan</h6>
						<div>
							<a-row type="flex" align="middle">
								<a-col :md="12" :xs="23" class="mb-24">
									<a-select style="width: 95%" placeholder="Pilih Golongan" @change="(val) => golongan = val">
										<a-select-option v-for="l, in listGolongan" :key="l.golAkhir" :value="l.golAkhir">
											{{ l.golAkhir }}
										</a-select-option>
									</a-select>
								</a-col>
								<a-col :md="12" :xs="23" class="mb-24">
									<a-select style="width: 95%" placeholder="Pilih Instansi" @change="(val) => instani = val">
										<a-select-option v-for="(l, i) in listInstansi" :key="i" :value="l.insKerja">
											{{ l.insKerja }}
										</a-select-option>
									</a-select>
								</a-col>
							</a-row>
						</div>
						<a-row>
							<a-space>
								<a-col :md="3" :xs="22" :xl="5">
									<a-button type="primary" @click="getData" class="login-form-button">
										Filter Data
									</a-button>
								</a-col>
								<a-col :md="3" :xs="22" :xl="5">
									<a-button @click="resetFilter()">Reset Filter</a-button>
								</a-col>
							</a-space>
						</a-row>
					</template>
				</a-card>
			</a-col>
			
			<a-col :span="24" :lg="14">
				<a-row type="flex" :gutter="10">
					<a-col :span="12" :xl="8" class="mb-20">
						<WidgetCounter title="PNS" :value="totalPns" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192L512 64zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110 312 110v330zM378.4 475.1c-14.1-14.1-36.9-14.1-50.9 0-14.1 14.1-14.1 36.9 0 50.9l129.4 129.4 2.1 2.1c13.3 13.3 34.8 13.3 48.1 0L730.6 434c13.3-13.3 13.3-34.8 0-48.1l-2.8-2.8c-13.3-13.3-34.8-13.3-48.1 0L483 579.7 378.4 475.1z'/></svg>" status=""></WidgetCounter>
					</a-col>

					<a-col :span="12" :xl="8" class="mb-20">
						<WidgetCounter title="PNS PRIA" :value="totalLk" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M384 320C207.3 320 64 463.3 64 640s143.3 320 320 320 320-143.3 320-320-143.3-320-320-320zm0 568c-137 0-248-111-248-248s111-248 248-248 248 111 248 248-111 248-248 248zM949.5 74.5C942.9 68 933.9 64 924 64H548c-19.9 0-36 16.1-36 36s16.1 36 36 36h340v340c0 19.9 16.1 36 36 36s36-16.1 36-36V100c0-9.9-4-18.9-10.5-25.5z'/></svg>" status=""></WidgetCounter>
					</a-col>
					
					<a-col :span="12" :xl="8" class="mb-20">
						<WidgetCounter title="PNS WANITA" :value="totalPerempuan" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 576c159.1 0 288-128.9 288-288S671.1 0 512 0 224 128.9 224 288s128.9 288 288 288zm0-504c119.3 0 216 96.7 216 216s-96.7 216-216 216-216-96.7-216-216S392.7 72 512 72zm348 568H164c-19.9 0-36 16.1-36 36s16.1 36 36 36h312v276c0 19.9 16.1 36 36 36s36-16.1 36-36V712h312c19.9 0 36-16.1 36-36s-16.1-36-36-36z'/></svg>" status=""></WidgetCounter>
					</a-col>

					<a-col :span="12" :xl="8" class="mb-20">
						<WidgetCounter title="PENDUDUK" :value="totalPenduduk" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0zm311.1 823.1c-40.4 40.4-87.5 72.2-139.9 94.3C629 940.4 571.4 952 512 952s-117-11.6-171.2-34.5c-52.4-22.2-99.4-53.9-139.9-94.3-40.4-40.4-72.2-87.5-94.3-139.9C83.6 629 72 571.4 72 512s11.6-117 34.5-171.2c22.2-52.4 53.9-99.4 94.3-139.9 40.4-40.4 87.5-72.2 139.9-94.3C395 83.6 452.6 72 512 72s117 11.6 171.2 34.5c52.4 22.2 99.4 53.9 139.9 94.3 40.4 40.4 72.2 87.5 94.3 139.9C940.4 395 952 452.6 952 512s-11.6 117-34.5 171.2c-22.2 52.4-53.9 99.5-94.4 139.9zM640.3 565.2c-19.9 0-36 16.1-36 36 0 50.9-41.4 92.3-92.3 92.3s-92.3-41.4-92.3-92.3c0-19.9-16.1-36-36-36s-36 16.1-36 36c0 90.6 73.7 164.3 164.3 164.3s164.3-73.7 164.3-164.3c0-19.9-16.1-36-36-36zM194.2 382.4a60 60 0 1 0 120 0 60 60 0 1 0-120 0zm515.3 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0z'/></svg>" status=""></WidgetCounter>
					</a-col>

					<a-col :span="12" :xl="8" class="mb-20">
						<WidgetCounter title="PRIA" :value="totalPendudukLaki" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M384 320C207.3 320 64 463.3 64 640s143.3 320 320 320 320-143.3 320-320-143.3-320-320-320zm0 568c-137 0-248-111-248-248s111-248 248-248 248 111 248 248-111 248-248 248zM949.5 74.5C942.9 68 933.9 64 924 64H548c-19.9 0-36 16.1-36 36s16.1 36 36 36h340v340c0 19.9 16.1 36 36 36s36-16.1 36-36V100c0-9.9-4-18.9-10.5-25.5z'/></svg>" status=""></WidgetCounter>
					</a-col>
					
					<a-col :span="12" :xl="8" class="mb-20">
						<WidgetCounter title="WANITA" :value="totalPendudukPerempuan" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 576c159.1 0 288-128.9 288-288S671.1 0 512 0 224 128.9 224 288s128.9 288 288 288zm0-504c119.3 0 216 96.7 216 216s-96.7 216-216 216-216-96.7-216-216S392.7 72 512 72zm348 568H164c-19.9 0-36 16.1-36 36s16.1 36 36 36h312v276c0 19.9 16.1 36 36 36s36-16.1 36-36V712h312c19.9 0 36-16.1 36-36s-16.1-36-36-36z'/></svg>" status=""></WidgetCounter>
					</a-col>
				</a-row>
			</a-col>
		</a-row>

		<a-row :gutter="10" type="flex" align="stretch">
			<a-col :span="24" :lg="6" class="mb-24">
				<a-row type="flex" :gutter="[24,24]" align="stretch">
					<a-col :span="24" :md="12" :xl="24">
						<ChartsPns v-if="!loading" :golongan="golongan === null ? 'Seluruh golongan' : golongan"
							:title="instani === null ? 'Seluruh Instansi' : instani" :totalPns="totalPns" :pnsLaki="totalLk"
							:pnsPerempuan="totalPerempuan"></ChartsPns>
					</a-col>
				</a-row>
			</a-col>

			<a-col :span="24" :lg="6" class="mb-24">
				<a-row type="flex" :gutter="[24,24]" align="stretch">
					<a-col :span="24" :md="12" :xl="24">
						<ChartsPenduduk v-if="!loading" :totalPd="totalPenduduk" :totalPdLaki="totalPendudukLaki"
							:totalPdPerempuan="totalPendudukPerempuan"></ChartsPenduduk>
					</a-col>
				</a-row>
			</a-col>

			<a-col :span="24" :lg="12" class="mb-24">
				<a-row type="flex" :gutter="[24,24]" align="stretch">
					<a-col :span="24" :md="12" :xl="24">
						<ChartGolongan v-if="!loading" :ia="indexGol.ia" :iia="indexGol.iia" :iiia="indexGol.iiia" :iva="indexGol.iva"
							:ib="indexGol.ib" :iib="indexGol.iib" :iiib="indexGol.iiib" :ivb="indexGol.ivb" :ic="indexGol.ic"
							:iic="indexGol.iic" :iiic="indexGol.iiic" :ivc="indexGol.ivc" :id="indexGol.id" :iid="indexGol.iid"
							:iiid="indexGol.iiid" :ivd="indexGol.ivd" />
					</a-col>
				</a-row>
			</a-col>
		</a-row>

		<!-- <a-row :gutter="10" type="flex" align="stretch">
			<a-card :bordered="false" class="header-solid h-full mb-24" :bodyStyle="{paddingTop: '14px'}">
			<template #title>
				<h6 class="font-semibold">Data Organisasi Perangkat Daerah</h6>			
				<p>Situs OPD Pemerintahan Kabupaten Pesawaran</p>	
			</template>

			<a-row type="flex" :gutter="[20,20]" align="stretch">

				<a-col :span="12" :xl="4" class="mb-20">
					<a-card :bordered="false" class="widget-1">
						<h6>Dishub</h6>
						<div class="icon">
							<img style="width:30px" shape="square" src="images/dishub.png" />
						</div>
					</a-card>
				</a-col>
				<a-col :span="12" :xl="4" class="mb-20">
					<a-card :bordered="false" class="widget-1">
						<h6>D</h6>
						<div class="icon">
							<img style="width:30px" shape="square" src="images/dishub.png" />
						</div>
					</a-card>
				</a-col>
				<a-col :span="12" :xl="4" class="mb-20">
					<a-card :bordered="false" class="widget-1">
						<h6>Dishub</h6>
						<div class="icon">
							<img style="width:30px" shape="square" src="images/dishub.png" />
						</div>
					</a-card>
				</a-col>
				<a-col :span="12" :xl="4" class="mb-20">
					<a-card :bordered="false" class="widget-1">
						<h6>Dishub</h6>
						<div class="icon">
							<img style="width:30px" shape="square" src="images/dishub.png" />
						</div>
					</a-card>
				</a-col>
				<a-col :span="12" :xl="4" class="mb-20">
					<WidgetCounter title="PNS" :value="totalPns" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192L512 64zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110 312 110v330zM378.4 475.1c-14.1-14.1-36.9-14.1-50.9 0-14.1 14.1-14.1 36.9 0 50.9l129.4 129.4 2.1 2.1c13.3 13.3 34.8 13.3 48.1 0L730.6 434c13.3-13.3 13.3-34.8 0-48.1l-2.8-2.8c-13.3-13.3-34.8-13.3-48.1 0L483 579.7 378.4 475.1z'/></svg>" status=""></WidgetCounter>
				</a-col>
				<a-col :span="12" :xl="4" class="mb-20">
					<WidgetCounter title="PNS" :value="totalPns" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192L512 64zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110 312 110v330zM378.4 475.1c-14.1-14.1-36.9-14.1-50.9 0-14.1 14.1-14.1 36.9 0 50.9l129.4 129.4 2.1 2.1c13.3 13.3 34.8 13.3 48.1 0L730.6 434c13.3-13.3 13.3-34.8 0-48.1l-2.8-2.8c-13.3-13.3-34.8-13.3-48.1 0L483 579.7 378.4 475.1z'/></svg>" status=""></WidgetCounter>
				</a-col>
				<a-col :span="12" :xl="4" class="mb-20">
					<WidgetCounter title="PNS" :value="totalPns" icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' width='25' height='25'><path d='M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192L512 64zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110 312 110v330zM378.4 475.1c-14.1-14.1-36.9-14.1-50.9 0-14.1 14.1-14.1 36.9 0 50.9l129.4 129.4 2.1 2.1c13.3 13.3 34.8 13.3 48.1 0L730.6 434c13.3-13.3 13.3-34.8 0-48.1l-2.8-2.8c-13.3-13.3-34.8-13.3-48.1 0L483 579.7 378.4 475.1z'/></svg>" status=""></WidgetCounter>
				</a-col>

			</a-row>
		</a-card>
		</a-row> -->

	</div>
</template>

<script>

//mycharts
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
const stats = [
];

// "Projects" table list of columns and their properties.
const tableColumns = [
];

// "Projects" table list of rows and their properties.
const tableData = [
];

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
	async created() {
		await this.getCountGolongan()
		await this.getPenduduk()
		this.getData()
		// this.getListProfesi()
		this.getEslonJabatan()
		this.getInstansi()
	},
	methods: {
		getData() {
			this.$loading(true)
			this.loading = true;
			const golongan = this.golongan ? this.golongan : null
			const instani = this.instani ? this.instani : null
			this.$axios.get(`count/data-pns?golakhir=${golongan}&instansi=${instani}`)
				.finally(() => this.$loading(false))
				.then(res => {
					if (this.$parseResponse(res.data)) {
						const data = res.data
						this.totalPns = data.totalPns
						this.totalPerempuan = data.totalPerempuan
						this.totalLk = data.totalLaki
						this.loading = false
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
		getEslonJabatan() {
			this.$loading(true)
			this.$axios.get('count/eslon-jabatan')
				.finally(() => this.$loading(false))
				.then(res => {
					if (this.$parseResponse(res.data)) {
						this.listGolongan = res.data.result
					}
				}).catch(() => this.$commonErrorNotif())
		},
		getInstansi() {
			this.$loading(true)
			this.$axios.get('count/instansi')
				.finally(() => this.$loading(false))
				.then(res => {
					if (this.$parseResponse(res.data)) {
						this.listInstansi = res.data.result
					}
				}).catch(() => this.$commonErrorNotif())
		},
		resetFilter() {
			window.location.reload();
		},
		async getPenduduk() {
			this.$loading(true)
			this.loading = true;
			try {
				this.totalPenduduk = await this.$axios.get(`countdatapenduduk/get-data`).then((r) => r.data)
				this.totalPendudukLaki = await this.$axios.get(`countdatapenduduk/get-data-laki-laki/LAKI-LAKI`).then((r) => r.data)
				this.totalPendudukPerempuan = await this.$axios.get(`countdatapenduduk/get-data-perempuan/PEREMPUAN`).then((r) => r.data)
				this.$loading(false)
				this.loading = false
			} catch (err) {
				this.$loading(false)
				this.loading = false
				this.$commonErrorNotif()
			}
		},
	}
})

</script>

<style lang="scss">

</style>