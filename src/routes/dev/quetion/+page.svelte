<script lang="js">
    import { onMount } from "svelte";
    let question_num = "?";
    let question_num_max = 10;
    let quetion = {answers:[]};
    onMount(async () => {
        const response = await fetch('/api/getQuestion');
        quetion = await response.json();
        console.log(quetion);
    });
    let answershown = false
    let selected = -1;
    function showAwnser(){
        if (answershown == true) return;
        let right_answer = -1;
        for (let [i, answer] of quetion.answers.entries()){
            if (selected == -1) return;
            if (answer.validation != "1")
                continue;
            right_answer = i;
            var div = document.getElementById("answer"+i+"label");
            if (div != undefined) {
                div.style.backgroundColor = "#45B39D";
            }
        }
        if (selected != right_answer) {
            var div = document.getElementById("answer"+selected+"label");
            if (div != undefined) {
                div.style.backgroundColor = "#CD6155";
            }
        }
        answershown = true
    }
    function nexteQuestoin(){
        showAwnser();
        setTimeout(async ()  => {
            const response = await fetch('/api/getQuestion');
            quetion = await response.json();
            for (let [i, answer] of quetion.answers.entries()){
                var div = document.getElementById("answer"+i+"label");
                if (div != undefined) {
                    div.style.backgroundColor = "#f6f6f6";
                }
            }
            answershown = false;
        }, 1000);
    }
</script>

<section>
    <div class="header">
        <div class="div">Protokollmaker</div>
    </div>
    <div class="question">
        <div>
            <h3>Frage {question_num}/{question_num_max}</h3>
            {#if quetion.hasOwnProperty('text')}
                <h2>{quetion.text}</h2>
            {/if}
            {#if quetion.hasOwnProperty('image')}
                <img src="{quetion.image}" alt="{quetion?.image_alt}"/>
            {/if}
        </div>
        
    </div>
    <div class="center">
        <div class="vl"></div>
    </div>
    <div class="answers">
        <div class="center">
            {#each quetion.answers as answers, i}
                <input type="radio" 
                id="{"answer"+i}" 
                class="answer-radio" 
                name="answer" 
                value="{i}" 
                bind:group={selected}>
                <label class="answer" for="{"answer"+i}" id="{"answer"+i+"label"}">
                
                    <div class="number"><span>{i+1}</span></div>
                    {#if answers.text != undefined}
                        <div class="text">{answers.text}</div>
                    {/if}
                    {#if answers.image != undefined}
                        <img src="{answers.image}" alt="{answers.image_alt}"/>
                    {/if}
                </label>
            {/each}
        </div>
    </div>
    <div class="footer">
        <button class="button-side-aktion    button-prev">vorherige Frage</button>
        <button class="button-side-aktion    button-show-awnser"
                    on:click={showAwnser}>Frage abgeben</button>
        <button class="button-call-to-aktion button-next"
                    on:click={nexteQuestoin}>nexte Frage</button>
    </div>
    <div class="empty"></div>
</section>

<style>
    #answer0:checked~#answer0label .number{background-color: var(--main-aktion); color: #ffffff;}
    #answer1:checked~#answer1label .number{background-color: var(--main-aktion); color: #ffffff;}
    #answer2:checked~#answer2label .number{background-color: var(--main-aktion); color: #ffffff;}
    #answer3:checked~#answer3label .number{background-color: var(--main-aktion); color: #ffffff;}
    #answer4:checked~#answer4label .number{background-color: var(--main-aktion); color: #ffffff;}
    .answer-radio{
        position: absolute;
        display: none;
    }
    h3{
        position: absolute;
        transform: translate(0px, -25px);
        color: #5F6A6A;
    }
    .answers{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .answer img {
        height: 12vh;
        margin-left: 10px;
    }
    .answer{
        display: flex;
        padding: 2%;
        width: 70%;
    }
    .center{
        width: 100%;
    }
    .answer .text{
        width: fit-content;
        margin-left: 10px;
        margin-top: 5px;
        width: 100%;
    }
    .answer .number{
        min-width: 25px;
        text-align: center;
        height: 25px;
        width: 25px;
        border-radius: 20px;
        
        color: #000000;
        
        border: 1px solid var(--main-aktion);
    }
    .number span{
        position: relative;
        top:15%;
    }
    .button-show-awnser{
        margin-left: auto;
        margin-right: 1%;
    }
    section {
        --main-bg-color1: #ffffff;
        --main-bg-color2: #f6f6f6;
        --main-vl-color: #d7d7d7;
        --main-aktion: #154360;
        padding: 0px;
        margin: 0px;
        display: grid;
        grid-template-rows: 5vh auto 5vh;
        grid-template-columns: 10fr 2fr 20fr;
        grid-template-areas: 
            "header center empty"
            "question center answers"
            ". center footer";
        height: 100vh;
    }

    .header {
        grid-area: header;
        background-color: var(--main-bg-color1);
    }
    .empty{
        grid-area: empty;
        background-color: var(--main-bg-color2);
    }
    .question
    {
        grid-area: question;
        background-color: var(--main-bg-color1);
    }
    .center
    {
        grid-area: center;
        background-color: var(--main-bg-color2);
    }
    .answers
    {
        grid-area: answers;
        background-color: var(--main-bg-color2);
    }
    .footer
    {
        grid-area: footer;
        background-color: var(--main-bg-color2);
    }
    :global(body){
        padding: 0px;
        margin: 0px;
        height: 100vh;
    }
    .vl {
        border-right: 1px solid var(--main-vl-color);
        width: 50%;
        background-color: var(--main-bg-color1);
        height: 100vh;
    }

    button {
        border: none;
        border-radius: 2px;
        padding: 1% 2% 1% 2%;
        min-height:fit-content;
    }

    .button-side-aktion{
        border: 1px solid var(--main-aktion);
        background-color: transparent;
    }

    .button-call-to-aktion{
        border: 1px solid var(--main-aktion);
        background-color: var(--main-aktion);
        color:#ffffff;
    }

    .footer{
        display: flex;
        padding-left: 0px;
        padding-right: 5%;
        padding-bottom: 1%;
        min-height:min-content;
    }

    .question {
        padding-left: 5%;
        padding-right: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, Helvetica, sans-serif;
    }

</style>