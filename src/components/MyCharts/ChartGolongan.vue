<template>
  <!--Start Active Users Card Baru-->
  <a-card :bordered="false" class="dashboard-bar-chart">
		<h6 class="font-semibold">Data Index Golongan</h6>
		<p>Visualisasi index golongan seluruh PNS pada OPD Kabupaten Pesawaran.</p>
		<chart-bar :height="220" :data="barChartData"></chart-bar>
		<br>
    <div>
			<a-timeline-item color="green">
				{{ia}}, {{iia}}, {{iiia}}, {{iva}}, {{ib}}, {{iib}}, {{iiib}}, {{ivb}}, {{ic}}, {{iic}}, {{iiic}}, {{ivc}}, {{id}}, {{iid}}, {{iiid}}, {{ivd}}
				<p>#PNS</p>
			</a-timeline-item>
			<a-timeline-item color="green">
				{{barChartData.labels[0]}}, {{barChartData.labels[1]}}, {{barChartData.labels[2]}}, {{barChartData.labels[3]}}, {{barChartData.labels[4]}}, {{barChartData.labels[5]}}, {{barChartData.labels[6]}}, {{barChartData.labels[7]}}, {{barChartData.labels[8]}}, {{barChartData.labels[9]}}, {{barChartData.labels[10]}}, {{barChartData.labels[11]}}, {{barChartData.labels[12]}}, {{barChartData.labels[13]}}, {{barChartData.labels[14]}}, {{barChartData.labels[15]}}
				<p>#GOLONGAN</p>
			</a-timeline-item>
		</div>
	</a-card>
  <!--End Active Users Card Baru-->

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartBar from '../Charts/ChartBar' ;

	export default ({
		components: {
			ChartBar,
		},
		props: {
      ia: {
        type: Number,
        default: 0
      },
      iia: {
        type: Number,
        default: 0
      },
      iiia: {
        type: Number,
        default: 0
      },
      iva: {
        type: Number,
        default: 0
      },
      ib: {
        type: Number,
        default: 0
      },
      iib: {
        type: Number,
        default: 0
      },
      iiib: {
        type: Number,
        default: 0
      },
      ivb: {
        type: Number,
        default: 0
      },
      ic: {
        type: Number,
        default: 0
      },
      iic: {
        type: Number,
        default: 0
      },
      iiic: {
        type: Number,
        default: 0
      },
      ivc: {
        type: Number,
        default: 0
      },
      id: {
        type: Number,
        default: 0
      },
      iid: {
        type: Number,
        default: 0
      },
      iiid: {
        type: Number,
        default: 0
      },
      ivd: {
        type: Number,
        default: 0
      },
		},
		data() {
			return {
				// Data for bar chart.
				barChartData: {
					labels: [
            "I/A",
            "II/A",
            "III/A",
            "IV/A",
            "I/B",
            "II/B",
            "III/B",
            "IV/B",
            "I/C",
            "II/C",
            "III/C",
            "IV/C",
            "I/D",
            "II/D",
            "III/D",
            "IV/D",
          ],
					datasets: [
            {
						label: "Total PNS",
						backgroundColor: '#fff',
						borderWidth: 0,
						borderSkipped: false,
						borderRadius: 6,
						data: [
              this.ia,
              this.iia,
              this.iiia,
              this.iva,
              this.ib,
              this.iib,
              this.iiib,
              this.ivb,
              this.ic,
              this.iic,
              this.iiic,
              this.ivc,
              this.id,
              this.iid,
              this.iiid,
              this.ivd,
            ],
						maxBarThickness: 20,
					},
				],
				},
			}
		},
	})

</script>