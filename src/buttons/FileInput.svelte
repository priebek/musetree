<script>
    import colorLookup from "../colors";

    export let disabled = false;
    export let emphasise = false;
    export let style = "";
    export let fileTypes = "";
    export let handleFile = () => { };

    function fileEvent(event) {
        if(event) {
            const files = event.target.files;
            if (files && files.length) {
                handleFile(files[0]);
            }
            event.target.value = null;
        }
    }

    $: textColor = disabled ? colorLookup.buttonBg : emphasise ? colorLookup.textEmphasis : colorLookup.textDark;
    $: bgColor = disabled ? colorLookup.buttonBgDisabled : emphasise ? colorLookup.text : colorLookup.buttonBg;

    $: emphClazz = emphasise ? "emphasise" : ""
</script>

<style>
    .button {
        display: inline-block;
        padding: 0.35em 1.2em;
        margin: 0.3em;
        border-radius: 0.12em;
        box-sizing: border-box;
        text-align: center;
        transition: all 0.1s;
        cursor: pointer;
    }

    .enabled:hover {
        background-color: #314549;
        color: #c3cee3;
    }

    .enabled {
        cursor: pointer;
    }

    .disabled {
        cursor: default;
    }

    .hidden {
        display: none;
    }
</style>

{#if disabled}
    <label for="upload" class="button disabled">
        <slot/>
    </label>
{:else}
    <div on:dragover|preventDefault|stopPropagation on:drop|preventDefault|stopPropagation={event => handleFile(event.dataTransfer.files.item(0))}>
        <label for="upload" class="button enabled" style={style + "; color: " + textColor + "; background-color: " + bgColor}>
            <slot/>
            <input
                    id="upload"
                    class="hidden"
                    type="file"
                    accept={fileTypes}
                    multiple={false}
                    on:input|preventDefault|stopPropagation={fileEvent}
            />
        </label>
    </div>
{/if}

