<script lang="ts"></script>

<section>
	<div class="zh">
		<h1>Login</h1>
		<form action="?/login" method="POST" class="auth-form">
			<label for=""> Email </label>
			<input type="text" name="email" />
			<label for=""> Passwort </label>
			<input type="password" name="password" />
			<button type="submit" class="btn btn-primary">Login</button>
		</form>
	</div>
	<div class="div1" />
	<div class="div2" />
</section>

<style>
	h1 {
		margin: 0px;
	}
	.zh {
		position: relative;
		z-index: 10;
	}
	.div1 {
		position: absolute;
		width: 80%;
		height: 100%;
		transform: translate(0px, 0px) rotate(45deg);
		border-radius: 50px;
		background-color: #ffff00;
		z-index: 9;
	}
	.div2 {
		position: absolute;
		background-color: #154360;
		transform: translate(0px, 0px);

		width: 20vw;
	}
	:global(body) {
		background-color: #ffffff;
		overflow: hidden;
		width: 100vw;
		height: 100vh;
		margin: 0px;
	}
</style>
