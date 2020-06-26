<template lang='pug'>
    .header
        .header__nav-block
            router-link(to='/')
                span.header__link Главная
            router-link(to='/about')
                span.header__link Обо мне
            router-link(to='/contacts')
                span.header__link Контакты
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {};
    }
};
</script>

<style lang='sass'>
    @import '@/assets/styles/mixins'

    .header
        &__nav-block
            height: 50px
            display: flex
            align-items: flex-end
            justify-content: center
        &__link
            padding: 0 30px
            +pseudo
            transition: color .3s ease
            &:before, &:after
                left: 0
                right: 0
                top: -15px
                margin: auto
                opacity: 0
                transition: opacity .3s ease
            &:before
                width: 95%
                height: 20px
                border: solid 1px $teal
                border-bottom: 0
            &:after
                width: 1px
                height: 7px
                background: $teal
            &:hover
                color: $teal
                animation: color-animation 3s infinite
                &:before, &:after
                    opacity: 1
                &:before
                    animation: border-color-animation 3s infinite
                &:after
                    animation: background-color-animation 3s infinite
</style>
