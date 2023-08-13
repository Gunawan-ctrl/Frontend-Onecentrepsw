<template>

	<!-- Main Sidebar -->
	<component :is="navbarFixed ? 'a-affix' : 'div'" :offset-top="top">

		<!-- Layout Header -->
		<a-layout-header>
			<a-row type="flex">
				<!-- Header Breadcrumbs & Title Column -->
				<a-col :span="24" :md="24">

					<!-- Header Breadcrumbs -->
					<a-breadcrumb>
						<a-breadcrumb-item><router-link to="/"> Pages</router-link></a-breadcrumb-item>
						<a-breadcrumb-item>{{ this.$route.meta.title }}</a-breadcrumb-item>
					</a-breadcrumb>
					
					<!-- / Header Breadcrumbs -->

					<!-- Header Page Title -->
					<div class="ant-page-header-heading">
						<span class="ant-page-header-heading-title">{{ this.$route.meta.title }}</span>
					</div>
					<!-- / Header Page Title -->

				</a-col>
				<!-- Header Control Column -->
				<a-col :span="24" :md="18" class="header-control">

				<!-- Header Control Buttons -->
				<a-button type="link" class="sidebar-toggler" @click="$emit('toggleSidebar', ! sidebarCollapsed) , resizeEventHandler()">
					<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>
				</a-button>

				</a-col>
			<!-- / Header Control Column -->
			</a-row>
		</a-layout-header>

	</component>

</template>

<script>

	export default ({
		props: {
			navbarFixed: {
				type: Boolean,
				default: true,
			},

			sidebarCollapsed: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				top: 0,

				searchLoading: false,

				wrapper: document.body,
			}
		},
		methods: {
			resizeEventHandler(){
				this.top = this.top ? 0 : -0.01 ;
			},
			onSearch(value){
			}
		},
		mounted: function(){
			this.wrapper = document.getElementById('layout-dashboard') ;
		},
		created() {
			window.addEventListener("resize", this.resizeEventHandler);
		},
		destroyed() {
			window.removeEventListener("resize", this.resizeEventHandler);
		},
	})

</script>