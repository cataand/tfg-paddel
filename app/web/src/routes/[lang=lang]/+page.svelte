<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import PredictForm from '$lib/PredictForm.svelte';
	import SmallNav from '$lib/SmallNav.svelte';
	import { predict } from '$lib/api';
	import type { AxiosProgressEvent } from 'axios';
	import LL from '$i18n/i18n-svelte';
	import LoadingIcon from '$lib/icons/LoadingIcon.svelte';

	let progress = 0;
	$: uploadFinished = progress === 100;
	let uploadSpeed = NaN;
	let submitted = false;
	let result: object;

	const submitHandler = async (e: CustomEvent) => {
		submitted = true;

		result = await predict(e.detail, (e: AxiosProgressEvent) => {
			progress = (100 * e.loaded) / e.total!;
			uploadSpeed = e.rate! / 1000000;
		});
	};
</script>

<div class="mx-auto max-w-xl px-8 sm:px-12 md:max-w-3xl lg:px-16">
	<SmallNav />

	{#if !submitted}
		<PredictForm on:submit={submitHandler} />
	{:else if !result}
		<div class="mt-8 text-center">
			<span class="inline-flex px-4 items-center gap-2 text-sm font-semibold text-left">
				<LoadingIcon
					class="block h-5 w-5 flex-shrink-0 animate-spin fill-blue-600 text-zinc-200 dark:fill-blue-400 dark:text-zinc-700"
				/>
				{#if !uploadFinished}
				{$LL.SENDING_DATA()}
				{:else}
				{$LL.PROCESSING_DATA()}
				{/if}
			</span>
			<div class="mt-4 h-1.5 w-full rounded-sm bg-zinc-200 dark:bg-zinc-700">
				<div class="h-1.5 rounded-sm bg-blue-600 dark:bg-blue-400" style="width: {progress}%" />
			</div>
			<div class="mt-2 flex justify-between text-sm" id="email-error">
				<span>{uploadSpeed.toFixed(2)} MB/s</span>
				<span>{progress.toFixed(2)}%</span>
			</div>
		</div>
	{:else}
		{JSON.stringify(result)}
	{/if}

	<Footer />
</div>