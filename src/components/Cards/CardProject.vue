<template>

	<!-- Project Card -->
	<a-card class="card-project">
		<img
			alt="example"
			:src="cover"
		/>
		<h6>{{ title }}</h6>
		{{ content }}
		<a-row type="flex" :gutter="6" class="card-footer" align="middle">
			<a-col :span="12">
				<a-button size="small">LIHAT</a-button>
			</a-col>
		</a-row>
	</a-card>
	<!-- / Project Card -->

</template>

<script>

	export default ({
		props: {
			id: {
				type: Number,
				required: true,
			},
			title: {
				type: String,
				default: "",
			},
			content: {
				type: String,
				default: "",
			},
			cover: {
				type: String,
				default: "",
			},
			team: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
			}
		},
	})

</script>