<template>
    <div class="header">
        <div v-if="isWarning" class="warning">
            <span class="warningMessage">
                Самое важное про открытие стран. А тут про поездки и вакцинацию.
            </span>
            <span @click="isWarning = false" class="warningCloser material-icons">
                close
            </span>
        </div>
        <div class="headerBanner">
            <div>
                <img width="175px" src="https://cdn1.tu-tu.ru/images2/bemp/svg/logo/2018/logo_tutu_final.svg" alt="" />
                <span class="tagline">
                    {{ tagline }}
                </span>
            </div>
            <div class="headerBannerRightBlock">
                <div class="headerBannerRightBlockItem">
                    <div class="headerBannerRightBlockItemService">
                        <span class="material-icons">
                            flag
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Trains in English
                        </span>
                    </div>
                    <div class="headerBannerRightBlockItemService">
                        <span class="material-icons">
                            redeem
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Бонусы и скидки
                        </span>
                    </div>
                    <div class="headerBannerRightBlockItemService">
                        <span>
                            &nbsp;
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Корпоративным клиентам
                        </span>
                    </div>
                    <div class="headerBannerRightBlockItemService">
                        <span>
                            &nbsp;
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Войти или Зарегистрироваться
                        </span>
                    </div>
                </div>
                <div class="headerBannerRightBlockItem">
                    <div class="headerBannerRightBlockItemService">
                        <span class="material-icons">
                            flight
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Авиабилеты
                        </span>
                    </div>
                    <div class="headerBannerRightBlockItemService">
                        <span class="material-icons">
                            train
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Ж/д билеты
                        </span>
                    </div>
                    <div class="headerBannerRightBlockItemService">
                        <span class="material-icons">
                            directions_bus
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Автобусы
                        </span>
                    </div>
                    <div class="headerBannerRightBlockItemService">
                        <span class="material-icons">
                            beach_access
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Туры
                        </span>
                    </div>
                    <div class="headerBannerRightBlockItemService">
                        <span class="material-icons">
                            tram
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Электрички
                        </span>
                    </div>
                    <div class="headerBannerRightBlockItemService">
                        <span class="material-icons">
                            local_see
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Приключения
                        </span>
                    </div>
                    <div class="headerBannerRightBlockItemService">
                        <span>
                            &nbsp;
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Справочная
                        </span>
                    </div>
                    <div class="headerBannerRightBlockItemService">
                        <span>
                            &nbsp;
                        </span>
                        <span class="headerBannerRightBlockItemServiceLabel">
                            Сюжеты
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data(){
        return {
            isWarning: true
        }
    },
    props: [
        'tagline'
    ]
}
</script>

<style scoped>
    .header {
        color: rgb(255, 255, 255);
    }

    .warning {
        height: 35px;
        background-color: rgb(250, 0, 250);
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0px 15px;
        color: rgb(255, 255, 255);
    }

    .warningMessage {
        width: 65%;
        text-decoration: underline;
        text-align: right;
    }

    .headerBanner {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 25px;
    }

    .tagline {
        color: rgb(255, 255, 255);
        font-weight: bolder;
        margin-left: 35px;
        word-break: break-all;
    }

    .headerBannerRightBlock {
    
    }

    .headerBannerRightBlockItem {
        display: flex;
        margin: 15px 0px;
    }

    .headerBannerRightBlockItemService {
        display: flex;
        align-self: center;
        margin: 0px 5px;
        cursor: pointer;
    }

    .headerBannerRightBlockItemService > * {
        margin: 0px 2px;
    }

    .headerBannerRightBlockItemServiceLabel {
        text-decoration: underline;
        text-underline-offset: 5px;
        font-size: 10px;
    }

    .warningCloser {
        cursor: pointer;
    }

    
</style>