<template>

	<!--Start Active Users Card Baru -->
	<a-card :bordered="false" class="dashboard-bar-chart">
		<h6 class="font-semibold">Data PNS</h6>
		<p>Visualisasi data berdasarkan instansi dan golongan.</p>
		<chart-bar :height="220" :data="barChartData"></chart-bar>
		<br>
		<div>
			<a-timeline-item color="green">
				{{title}}
				<p>#ASAL DATA</p>
			</a-timeline-item>
			<a-timeline-item color="green">
				{{golongan}}
				<p>#ASAL GOLONGAN</p>
			</a-timeline-item>
		</div>
	</a-card>
	<!--End Active Users Card Baru -->

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartBar from '../Charts/ChartBar' ;

	export default ({
		components: {
			ChartBar,
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
				// Data for bar chart.
				barChartData: {
					labels: ["L", "P"],
					datasets: [{
						label: "PNS",
						backgroundColor: '#fff',
						borderWidth: 0,
						borderSkipped: false,
						borderRadius: 6,
						data: [this.pnsLaki, this.pnsPerempuan],
						maxBarThickness: 20,
					},
				],
				},
			}
		},
	})

</script>