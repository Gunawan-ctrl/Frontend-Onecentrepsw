<template>
	<div style="margin-top: -20px;">
		<!-- Dashboard Layout -->
		<a-layout class="layout-dashboard navbar-fixed has-sidebar" id="layout-dashboard">
			
			<!-- Main Sidebar -->
			<DashboardSidebar
				:sidebarCollapsed="sidebarCollapsed"
				:sidebarColor="sidebarColor"
				:sidebarTheme="sidebarTheme"
				@toggleSidebar="toggleSidebar"
				:listMenu="listMenu"
			></DashboardSidebar>
			<!-- / Main Sidebar -->

			<!-- Layout Content -->
			<a-layout>

				<!-- Layout Header's Conditionally Fixed Wrapper -->
				<DashboardHeader
					:sidebarCollapsed="sidebarCollapsed"
					:navbarFixed="navbarFixed"
					@toggleSettingsDrawer="toggleSettingsDrawer"
					@toggleSidebar="toggleSidebar"
				></DashboardHeader>
				<!-- / Layout Header's Conditionally Fixed Wrapper -->

				<!-- Page Content -->
				<a-layout-content>
					<router-view />
				</a-layout-content>
				<!-- / Page Content -->

				<!-- Layout Footer -->
				<DashboardFooter></DashboardFooter>
				<!-- / Layout Footer -->

				<!-- Sidebar Overlay -->
				<div class="sidebar-overlay" @click="sidebarCollapsed = true" v-show="! sidebarCollapsed"></div>
				<!-- / Sidebar Overlay -->

			</a-layout>
			<!-- / Layout Content -->

		</a-layout>
		<!-- / Dashboard Layout -->

	</div>
</template>

<script>

import DashboardSidebar from '../components/Sidebars/DashboardSidebar'
import DashboardHeader from '../components/Headers/DashboardHeader'
import DashboardFooter from '../components/Footers/DashboardFooter'
import listMenu from './menu/Poktan'

export default ({
	components: {
		DashboardSidebar,
		DashboardHeader,
		DashboardFooter
	},
	data() {
		return {
			listMenu,
			// Sidebar collapsed status.
			sidebarCollapsed: false,
			
			// Main sidebar color.
			sidebarColor: "primary",
			
			// Main sidebar theme : light, white, dark.
			sidebarTheme: "light",

			// Header fixed status.
			navbarFixed: false,

			// Settings drawer visiblility status.
			showSettingsDrawer: false,
		}
	},
	methods: {
		toggleSidebar( value ) {
			this.sidebarCollapsed = value ;
		},
		toggleSettingsDrawer( value ) {
			this.showSettingsDrawer = value ;
		},
		toggleNavbarPosition( value ) {
			this.navbarFixed = value ;
		},
		updateSidebarTheme( value ) {
			this.sidebarTheme = value ;
		},
		updateSidebarColor( value ) {
			this.sidebarColor = value ;
		},
	},
	computed: {
		// Sets layout's element's class based on route's meta data.
		layoutClass() {
			return this.$route.meta.layoutClass ;
		}
	},
})

</script>
