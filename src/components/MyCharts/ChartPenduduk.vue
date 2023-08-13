<template>

	<!--Start Active Users Card Baru -->
	<a-card :bordered="false" class="dashboard-bar-chart">
		<h6 class="font-semibold">Data Penduduk</h6>
		<p>Visualisasi seluruh data penduduk Kabupaten Pesawaran.</p>
		<chart-bar :height="220" :data="barChartData"></chart-bar>
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
			totalPd: {
				type: Number,
				default: 0
			},
			totalPdLaki: {
				type: Number,
				default: 0
			},
			totalPdPerempuan: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				// Data for bar chart.
				barChartData: {
					labels: ["L", "P", "TP"],
					datasets: [{
						label: "Penduduk",
						backgroundColor: '#fff',
						borderWidth: 0,
						borderSkipped: false,
						borderRadius: 6,
						data: [this.totalPdLaki, this.totalPdPerempuan, this.totalPd],
						maxBarThickness: 20,
					},
				],
				},
			}
		},
	})

</script>