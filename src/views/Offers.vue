<template>
    <div>
        <Header :tagline="offersType.includes('airplanes') ? 'Авиабилеты' : offersType.includes('railways') ? 'Ж/д билеты' : offersType.includes('busses') ? 'Автобусы' : offersType.includes('trains') ? 'Электрички' : 'Больше пользы для ваших путешествий'" />
        <div class="main">
             <div class="offerSearchAndService">
                 <div class="searchBlock">
                    <span class="searchBlockFromAndTo">
                        Москва — Сочи
                    </span>
                    <span class="searchBlockInfo">
                        10 ноя, ср • 1 пассажир • эконом
                    </span>
                    <button class="btn btn-light">
                        Изменить поиск
                    </button>
                 </div>
                 <div class="offerService">

                 </div>
             </div>
             <div class="offersBody">
                <div v-if="offers.length >= 1">
                    <div class="offersCount">
                        <span>
                            {{offers.length }} предложение, 
                        </span>
                        <span class="inexpensive">
                            сначала недорогие
                        </span>
                        <span class="material-icons">
                            filter_list
                        </span>
                    </div>
                    <span class="">
                        Отправление и прибытие по местному времени
                    </span>
                    <div v-if="offersType.includes('airplanes')">
                        <div v-for="airplaneOffer in offers" :key="airplaneOffer._id" class="offer">
                            <div class="offerAside">
                                <div class="offerAsideColumn">
                                    <div class="offerServiceFilters">
                                        <span class="offerServiceFilterCompany">
                                            Победа
                                        </span>
                                        <span class="offerServiceFilterPrice">
                                            Недорогой
                                        </span>
                                    </div>
                                    <div class="timeAndDestination">
                                        <span>
                                            <span class="time">
                                                {{ airplaneOffer.fromTime }}
                                            </span>
                                            <span class="date">
                                                {{ `${airplaneOffer.date.split('.')[0]} ${monthsLabels[airplaneOffer.date.split('.')[1]]} ${daysLabels[new Date(`${airplaneOffer.date.split('.')[2]}`, `${airplaneOffer.date.split('.')[1]}`, `${airplaneOffer.date.split('.')[0]}`).getDay()]}` }}
                                            </span>
                                        </span>
                                        <span class="destination">
                                            {{ airplaneOffer.airport }}, {{ airplaneOffer.from }}
                                        </span>
                                    </div>
                                    <div class="offerAsideFooter">
                                        <div class="ratio">
                                            {{ airplaneOffer.ratio }}
                                        </div>
                                        <span class="aboutRace">
                                            О рейсе
                                        </span>
                                    </div>
                                </div>
                                <div class="offerAsideColumn">
                                    <div class="timeAndDestination">
                                        <span>
                                            &nbsp;
                                        </span>
                                        <span class="time">
                                            {{ airplaneOffer.toTime }}
                                        </span>
                                        <span>
                                            {{ airplaneOffer.to }}
                                        </span>
                                    </div>
                                </div>
                                <div class="offerAsideColumn">
                                    <div class="timeAndDestination">
                                        <span>
                                            &nbsp;
                                        </span>
                                        <span>
                                            {{ airplaneOffer.isDirect }}
                                        </span>
                                        <span class="destination">
                                            {{
                                                hoursLabels[airplaneOffer.toTime.split(':')[0]] - hoursLabels[airplaneOffer.fromTime.split(':')[0]] - 1
                                            }} ч 
                                            {{
                                                minutesLabels[airplaneOffer.toTime.split(':')[1]] > minutesLabels[airplaneOffer.toTime.split(':')[1]] ?
                                                    minutesLabels[airplaneOffer.toTime.split(':')[1]] - minutesLabels[airplaneOffer.fromTime.split(':')[1]] - 1
                                                :
                                                    60 - minutesLabels[airplaneOffer.fromTime.split(':')[1]] + minutesLabels[airplaneOffer.toTime.split(':')[1]] 
                                            }} м
                                             в пути
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="offerArticle">
                                <div class="payBlock">
                                    <div class="offerSettings">
                                        <div class="offerSetting">
                                            <span :class="{ 'material-icons': true, check: airplaneOffer.isThings, notCheck: !airplaneOffer.isThings }">
                                                {{
                                                    airplaneOffer.isThings ?
                                                        'check'
                                                    :
                                                        'close'
                                                }}
                                            </span>
                                            <span>
                                                {{
                                                    airplaneOffer.isThings ?
                                                        'С багажом'
                                                    :
                                                        'Без багажа'
                                                }}
                                            </span>
                                        </div>
                                        <div class="offerSetting">
                                            <span :class="{ 'material-icons': true, check: airplaneOffer.isReturn, notCheck: !airplaneOffer.isReturn }">
                                                {{
                                                    airplaneOffer.isReturn ?
                                                        'check'
                                                    :
                                                        'close'
                                                }}
                                            </span>
                                            <span>
                                                {{
                                                    airplaneOffer.isReturn ?
                                                        'С возвратом'
                                                    :
                                                        'Без возврата'
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="offerPrice">
                                        <button class="btn btn-primary colorBtn" @click="payTicket(airplaneOffer._id)">
                                            выбрать за {{ airplaneOffer.price }}Ք
                                        </button>
                                        <span>
                                            {{ airplaneOffer.tickets }}+ билетов
                                        </span>
                                    </div>
                                </div>
                                <button class="btn btn-light showOtherTariffs">
                                    Показать другие тарифы
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="notFoundOffers">
                    <span>
                        Таких предложений нет
                    </span>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'Offers',
    data(){
        return {
            offers: [],
            offersType: 'airplanes',
            hoursLabels: {
                '01': 1,
                '02': 2,
                '03': 3,
                '04': 4,
                '05': 5,
                '06': 6,
                '07': 7,
                '08': 8,
                '09': 9,
                '10': 10,
                '11': 11,
                '12': 12,
                '13': 13,
                '14': 14,
                '15': 15,
                '16': 16,
                '17': 17,
                '18': 18,
                '19': 19,
                '20': 20,
                '21': 23,
                '22': 22,
                '23': 23,
                '00': 24,
            },
            minutesLabels: {
                '01': 1,
                '02': 2,
                '03': 3,
                '04': 4,
                '05': 5,
                '06': 6,
                '07': 7,
                '08': 8,
                '09': 9,
                '10': 10,
                '11': 11,
                '12': 12,
                '13': 13,
                '14': 14,
                '15': 15,
                '16': 16,
                '17': 17,
                '18': 18,
                '19': 19,
                '19': 19,
                '20': 20,
                '21': 21,
                '22': 22,
                '23': 23,
                '24': 24,
                '25': 25,
                '26': 26,
                '27': 27,
                '28': 28,
                '29': 29,
                '30': 30,
                '31': 31,
                '32': 32,
                '33': 33,
                '34': 34,
                '35': 35,
                '36': 36,
                '37': 37,
                '38': 38,
                '39': 39,
                '40': 40,
                '41': 41,
                '42': 42,
                '43': 43,
                '44': 44,
                '45': 45,
                '46': 46,
                '47': 47,
                '48': 48,
                '49': 49,
                '50': 50,
                '51': 51,
                '52': 52,
                '53': 53,
                '54': 54,
                '55': 55,
                '56': 56,
                '57': 57,
                '58': 58,
                '59': 59,
                '00': 60,
                
            },
            monthsLabels: {
                '01': 'января',
                '02': 'февраля',
                '03': 'марта',
                '04': 'апреля',
                '05': 'мая',
                '06': 'июня',
                '07': 'июля',
                '08': 'августа',
                '09': 'сентября',
                '1': 'января',
                '2': 'февраля',
                '3': 'марта',
                '4': 'апреля',
                '5': 'мая',
                '6': 'июня',
                '7': 'июля',
                '8': 'августа',
                '9': 'сентября',
                '10': 'октября',
                '11': 'ноября',
                '12': 'декабря',
            },
            daysLabels: {
                '3': 'пн',
                '4': 'вт',
                '5': 'ср',
                '6': 'чт',
                '7': 'пт',
                '1': 'сб',
                '2': 'вс',
            }
        }
    },
    mounted(){
        if(this.$route.query.offerstype !== null && this.$route.query.offerstype !== undefined) {
            this.offersType = this.$route.query.offerstype
        }
        fetch(`http://localhost:4000/api/offers/get/?offerstype=${this.offersType}`, {
              mode: 'cors',
              method: 'GET'
        }).then(response => response.body).then(rb  => {
            const reader = rb.getReader()
            return new ReadableStream({
              start(controller) {
                function push() {
                  reader.read().then( ({done, value}) => {
                    if (done) {
                      console.log('done', done);
                      controller.close();
                      return;
                    }
                    controller.enqueue(value);
                    console.log(done, value);
                    push();
                  })
                }
                push();
              }
            });
        }).then(stream => {
            return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
        })
        .then(result => {
            if(JSON.parse(result).status.includes('OK')) {
                this.offers = JSON.parse(result).offers
                console.log(`debug : ${new Date(`2021-7-11`).getDate()}`)
            }
        });
    },
    methods: {
        payTicket(offerId) {
            fetch(`http://localhost:4000/api/tickets/pay/?offerstype=${this.offersType}&offerid=${offerId}`, {
                mode: 'cors',
                method: 'GET'
            }).then(response => response.body).then(rb  => {
                const reader = rb.getReader()
                return new ReadableStream({
                start(controller) {
                    function push() {
                    reader.read().then( ({done, value}) => {
                        if (done) {
                        console.log('done', done);
                        controller.close();
                        return;
                        }
                        controller.enqueue(value);
                        console.log(done, value);
                        push();
                    })
                    }
                    push();
                }
                });
            }).then(stream => {
                return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
            })
            .then(result => {
                if(JSON.parse(result).status.includes('OK')) {
                    alert('билет куплен')
                } else if(JSON.parse(result).status.includes('Error')) {
                    alert('ошибка при покупке билета')
                }
            });
        }
    },
    components: {
        Header,
        Footer
    }
}
</script>

<style scoped>
    
    .main {
        background-color: rgb(240, 240, 240);
        width: 100%;
        min-height: 250px;
    }
    
    .offersCount {
        font-weight: bolder;
        font-size: 24px;
        display: flex;
        align-items: center;
    }

    .offersCount > * {
        margin: 0px 5px;
    }

    .inexpensive {
        color: rgb(0, 150, 255);
    }

    .offerService {
        overflow-x: scroll;
        height: 100px;
    }

    .searchBlock {
        display: flex;
        align-items: center;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 0px 15px;
        background-color: rgb(230, 230, 230);
        height: 75px;
        width: 65%;
    }

    .searchBlock > * {
        margin: 0px 10px;
    }

    .offerSearchAndService {
        background-color: rgb(255, 255, 255);
        height: 175px;
        box-sizing: border-box;
        padding: 0px 175px;
    }

    .searchBlockFromAndTo {
        font-weight: bolder;
        font-size: 20px;
    }

    .offersBody {
        box-sizing: border-box;
        padding: 0px 50px;
    }

    .offer {
        display: flex;
        border-radius: 15px;
        background-color: rgb(255, 255, 255);
        box-sizing: border-box;
        padding: 10px 25px;
        height: 185px;
        margin: 15px 0px;
    }

    .offer > div {
        margin: 0px 10px;
        /* display: flex;
        flex-direction: column; */
    }

    .offerAside {
        width: 65%;
        display: flex;
        justify-content: space-between;
    }

    .offerArticle {
        box-sizing: border-box;
        padding: 0px 10px;
        width: 35%;
        border-left: 1px solid rgb(200, 200, 200);
        display: flex;
        flex-direction: column;
    }


    .offerAsideColumn {
        display: flex;
        flex-direction: column;
    }

    .timeAndDestination {
        display: flex;
        flex-direction: column;
    }

    .time {
        font-weight: bolder;
        font-size: 24px;
    }

    .date {
        color: rgb(150, 150, 150);
        font-size: 10px;
    }

    .destination {
        color: rgb(150, 150, 150);
        font-size: 12px;
    }

    .ratio {
        border-radius: 100% 100% 100% 100%;
        background-color: rgb(150, 255, 0);
        width: 35px;
        height: 35px;
        color: rgb(255, 255, 255);
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        margin: 0px 15px;
    }

    .offerAsideFooter {
        display: flex;
        align-items: center;
    }

    .aboutRace {
        border-radius: 25px;
        border: 1px solid rgb(0, 0, 255);
        color: rgb(0, 0, 255);
        width: 75px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }

    .offerServiceFilters {
        display: flex;
        align-items: center;
    }
    
    .offerServiceFilterCompany {
        border-radius: 15px;
        background-color: rgb(225, 225, 225);
        width: 75px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 5px;
    }

    .offerServiceFilterPrice {
        margin: 0px 5px;
        border-radius: 15px;
        background-color: rgb(100, 200, 0);
        color: rgb(50, 150, 0);
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .showOtherTariffs {
        border: 1px solid rgb(0, 0, 215);
        color: rgb(0, 0, 215);
    }

    .payBlock {
        border: 1px solid rgb(200, 200, 200);
        height: 75px;
        margin: 15px 0px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 15px;
    }

    .colorBtn {
        background: linear-gradient(to right, rgb(30, 200, 200) 0%, rgb(100, 100, 150) 35%, rgb(100, 100, 150) 65%, rgb(255, 87, 255) 80%);
        font-weight: bolder;
    }

    .offerSettings {
        display: flex;
        flex-direction: column;
    }

    .offerSetting {
        display: flex;
        align-items: center;
        font-size: 10px;
    }

    .offerPrice {
        display: flex;
        flex-direction: column;
    }

    .notFoundOffers {
        text-align: center;
        font-weight: bolder;
        color: rgb(175, 175, 175);
    }

    .check {
      color: rgb(0, 200, 0);  
    }

    .notCheck {
        color: rgb(175, 175, 175);  
    }

</style>