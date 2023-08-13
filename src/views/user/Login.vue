<template>
	<div class="sign-in">
		
		<a-row type="flex" :gutter="[20,20]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
				<h3 class="mb-15">Sign In</h3>
				<h6 class="font-regular text-muted">Masuk ke dalam sistem one centre</h6>

				<!-- Sign In Form -->
				<a-form
					id="components-form-demo-normal-login"
					:form="form"
					class="login-form"
					@submit="handleSubmit"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-10" label="Username" :colon="false">
						<a-input 
						v-decorator="[
						'username',
						{ rules: [{ required: true, message: 'Please input your username!' }] },
						]" placeholder="Username" />
					</a-form-item>
					<a-form-item class="mb-5" label="Password" :colon="false">
						<a-input
						v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your password!' }] },
						]" type="password" placeholder="Password" />
					</a-form-item>
					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
							SIGN IN
						</a-button>
					</a-form-item>
				</a-form>
				<!-- / Sign In Form -->
			</a-col>
			<!-- / Sign In Form Column -->

			<!-- Sign In Image Column -->
			<a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
				<!-- <img src="images/login-bg.jpg" alt=""> -->
				<lottie :options="defaultOptions" />
			</a-col>
			<!-- Sign In Image Column -->

		</a-row>
		
	</div>
</template>

<script>
import Login from '../../helper/services/Login'
import Lottie from '../../components/lottie'
import * as animationData from '../../../public/sign.json'
export default ({
	components: {
    	lottie: Lottie
  	},
	data() {
		return {
			defaultOptions: { animationData: animationData.default },
      animationSpeed: 2,
			form: this.$form.createForm(this, { name: 'normal_login' }),
		}
	},
	created () {
		this.form.setFields({})
	},
	methods: {
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if ( !err ) {
					this.$loading(true)
					const basicAuth = 'Basic ' + window.btoa(`${values.username}:${values.password}`)
					this.$axios.post('users/sign-in', {}, {
						headers: { 'Authorization': basicAuth}
					}).finally(() => this.$loading(false))
						.then(res => {
							if (this.$parseResponse(res.data)) {
								Login(res.data.result)
							}
						}).catch(() => this.$commonErrorNotif())
				}
			});
		},
	},
})

</script>

<style lang="scss">
	body {
		background-color: #ffffff;
	}
</style>