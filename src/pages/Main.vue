<template lang='pug'>
    .main
        scene
        my-header
        router-view
</template>

<script>
export default {
    name: 'Main',
    components: {
        MyHeader: () => import('@/components/Header'),
        scene: () => import('@/components/Scene')
    },
    data() {
        return {
            //
        };
    }
};
</script>

<style lang='sass'>
    @import '@/assets/styles/mixins'

    .main
        //
</style>
