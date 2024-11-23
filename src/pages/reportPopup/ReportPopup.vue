<template>
    <div class="report-popup">
        <div class="header-report">
            <div></div>
            <div></div>
            <div>
                <MButton
                    :text="'Hủy'"
                    type="outline-button"
                    @click="() => {$emit('cancelReport')}"
                ></MButton>
            </div>
        </div>
        
        <div class="report">
            <iframe :src="url" title="description" height="100%" width="100%" class="report-iframe"></iframe>
        </div>
    </div>
</template>

<script>
import MButton from "@/components/MButton/MButton.vue";

export default {
    name: 'ReportPopup',
    props: {
        url: String
    },
    components: {
        MButton
    },
    watch: {
        url: function(newValue){
            this.reportURL = newValue;
        }
    },
    data(){
        return {
            reportURL: ""
        }
    }
}
</script>

<style scoped>
@import url(./ReportPopup.css);
</style>