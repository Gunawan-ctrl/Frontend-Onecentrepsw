<template>

	<a-card :bordered="false" class="dashboard-bar-line header-solid">
		<template #title>
			<h6>Sales Overview</h6>			
			<p>than last year <span class="text-success">+20%</span></p>	
		</template>
		<template #extra>
			<a-badge color="primary" class="badge-dot-primary" text="Traffic" />
			<a-badge color="primary" class="badge-dot-secondary" text="Sales" />
		</template>
		<chart-line :height="310" :data="lineChartData"></chart-line>
	</a-card>

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartLine from '../Charts/ChartLine' ;

	export default ({
		components: {
			ChartLine,
		},
		props: {
			title: {
				type: String,
				default: "Seluruh Instansi/OPD"
			},
			golongan: {
				type: String,
				default: "Seluruh Golongan"
			},
			totalPns: {
				type: Number,
				default: 0
			},
			pnsLaki: {
				type: Number,
				default: 0
			},
			pnsPerempuan: {
				type: Number,
				default: 0
			},
			// totalPenduduk: {
			// 	type: Number,
			// 	default: 0
			// },
			// totalPendudukLaki: {
			// 	type: Number,
			// 	default: 0
			// },
			// totalPendudukPerempuan: {
			// 	type: Number,
			// 	default: 0
			// }
		},
		data() {
			return {

				// Data for line chart.
				lineChartData: {
					labels: ["PRIA", "WANITA"],
					datasets: [{
						label: "PNS",
						tension: 0.4,
						borderWidth: 0,
						pointRadius: 0,
						borderColor: "#1890FF",
						borderWidth: 3,
						data: [this.pnsLaki, this.pnsPerempuan],
						maxBarThickness: 20
					}],
				},
			}
		},
	})

</script>