<template>

	<!-- Layout Header ( Navbar ) -->
	<component :is="navbarFixed ? 'a-affix' : 'div'"
	>
		<a-layout-header>
			<div class="header-col header-brand">
				<a-col :span="24" :md="6" class="col-info">
					<img src="images/psw-ico-35x50.png" alt="" />
				</a-col>
				<h6>ONE CENTRE PESAWARAN</h6>
			</div>
		</a-layout-header>
	</component>
	<!-- / Layout Header ( Navbar ) -->

</template>

<script>

	export default ({
		props: {
			// Header fixed status.
			navbarFixed: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				// Collapse navigation value.
				// Binded model property for "Collapsible Navigation Menu" collapsed status .
				collapseNav: 0,
			}
		},
	})

</script>

<style lang="scss" scoped>

	.nav-link svg {
		margin-right: 5px;
		vertical-align: middle;
	}
	.nav-link span {
		vertical-align: middle;
	}
	.ant-menu-submenu-popup {
		width: 100%;
	}

</style>