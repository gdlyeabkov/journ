<template>
    <div>
        <Header />
        <div class="mainForm">
            <h4>
                Создать новый тур
            </h4>
            <select class="form-select h-75 w-25" aria-label="Default select example" v-model="offersType">
                <option value="airplanes">Авиабилеты</option>
                <option value="railways">Ж/д билеты</option>
                <option value="busses">Автобусы</option>
                <option value="trains">Электрички</option>
            </select>
            <div v-if="offersType.includes('airplanes')">
                <input type="text" v-model="newAirplaneOfferFrom" placeholder="Откуда" class="form-control w-25" />
                <input type="text" v-model="newAirplaneOfferTo" placeholder="Куда" class="form-control w-25" />
                <label for="" class="formLabel">
                    Стоимость полёта
                </label>
                <input type="number" v-model="newAirplaneOfferPrice" class="form-control w-25" />
                <input type="text" v-model="newAirplaneOfferDate" placeholder="Дата" class="form-control w-25" />
                <input type="text" v-model="newAirplaneOfferFromTime" placeholder="Время отправления" class="form-control w-25" />
                <input type="text" v-model="newAirplaneOfferToTime" placeholder="Время прибытия" class="form-control w-25" />
                <input type="text" v-model="newAirplaneOfferAirport" placeholder="Аэропорт" class="form-control w-25" />
                <label for="" class="formLabel">
                    С возвратом
                </label>
                <input type="checkbox" v-model="newAirplaneOfferIsReturn" />
                <label for="" class="formLabel">
                    Багаж
                </label>
                <input type="checkbox" v-model="newAirplaneOfferIsThings" />
                <button class="btn btn-primary" @click="createTour()">
                    Создать аэромаршрут
                </button>
            </div>
            <div v-else-if="offersType.includes('railways')">
                <input type="text" v-model="newRailwayOfferFrom" placeholder="Откуда" class="form-control w-25" />
                <input type="text" v-model="newRailwayOfferTo" placeholder="Куда" class="form-control w-25" />
                <label for="" class="formLabel">
                    Кол-во билетов
                </label>
                <input type="number" v-model="newRailwayOfferSeatTickets" class="form-control w-25" />
                <label for="" class="formLabel">
                    Стоимость за билет
                </label>
                <input type="number" v-model="newRailwayOfferSeatPrice" class="form-control w-25" />
                <label for="" class="formLabel">
                    Стоимость за плацкарт
                </label>
                <input type="number" v-model="newRailwayOfferReservedSeatPrice" class="form-control w-25" />
                <label for="" class="formLabel">
                    Кол-во плацкарт мест
                </label>
                <input type="number" v-model="newRailwayOfferReservedSeatTickets" class="form-control w-25" />
                <label for="" class="formLabel">
                    Стоимость купе
                </label>
                <input type="number" v-model="newRailwayOfferCompartmentPrice" class="form-control w-25" />
                <label for="" class="formLabel">
                    Кол-во купе мест
                </label>
                <input type="number" v-model="newRailwayOfferCompartmentTickets" class="form-control w-25" />
                <input type="text" v-model="newRailwayOfferDate" placeholder="Дата" class="form-control w-25" />
                <input type="text" v-model="newRailwayOfferFromTime" placeholder="Время отправления" class="form-control w-25" />
                <input type="text" v-model="newRailwayOfferToTime" placeholder="Время прибытия" class="form-control w-25" />
                <input type="text" v-model="newRailwayOfferAuthor" placeholder="Машинист" class="form-control w-25" />
                <input type="text" v-model="newRailwayOfferMark" placeholder="Номер поезда" class="form-control w-25" />
                <button class="btn btn-primary" @click="createTour()">
                    Создать маршрут дальнего следования
                </button>
            </div>
            <div v-else-if="offersType.includes('busses')">
                <input type="text" v-model="newBussOfferFrom" placeholder="Откуда" class="form-control w-25" />
                <input type="text" v-model="newBussOfferTo" placeholder="Куда" class="form-control w-25" />
                <input type="number" v-model="newBussOfferPrice" class="form-control w-25" />
                <input type="text" v-model="newBussOfferDate" placeholder="Дата" class="form-control w-25" />
                <input type="text" v-model="newBussOfferFromTime" placeholder="Время отправления" class="form-control w-25" />
                <input type="text" v-model="newBussOfferToTime" placeholder="Время прибытия" class="form-control w-25" />
                <input type="text" v-model="newBussOfferDriver" placeholder="Компания" class="form-control w-25" />
                <label class="formLabel">Рабочие дни</label>
                <div class="bussDays">
                    <div>
                        <label for="">пн</label>
                        <input value="пн" type="checkbox" name="days" v-model="bussOfferDays" />
                    </div>
                    <div>
                        <label for="">вт</label>
                        <input value="вт" type="checkbox" name="days" v-model="bussOfferDays" />
                    </div>
                    <div>
                        <label for="">ср</label>
                        <input value="ср" type="checkbox" name="days" v-model="bussOfferDays" />
                    </div>
                    <div>
                        <label for="">чт</label>
                        <input value="чт" type="checkbox" name="days" v-model="bussOfferDays" />
                    </div>
                    <div>
                        <label for="">пт</label>
                        <input value="пт" type="checkbox" name="days" v-model="bussOfferDays" />
                    </div>
                    <div>
                        <label for="">сб</label>
                        <input value="сб" type="checkbox" name="days" v-model="bussOfferDays" />
                    </div>
                    <div>
                        <label for="">вс</label>
                        <input value="вс" type="checkbox" name="days" v-model="bussOfferDays" />
                    </div>
                </div>
                <button class="btn btn-primary" @click="createTour()">
                    Создать схему проезда
                </button>
            </div>
            <div v-else-if="offersType.includes('trains')">
                <input type="text" v-model="newTrainOfferFrom" placeholder="Откуда" class="form-control w-25" />
                <input type="text" v-model="newTrainOfferTo" placeholder="Куда" class="form-control w-25" />
                <input type="text" v-model="newTrainOfferDate" placeholder="Дата" class="form-control w-25" />
                <input type="text" v-model="newTrainOfferFromTime" placeholder="Время отправления" class="form-control w-25" />
                <input type="text" v-model="newTrainOfferToTime" placeholder="Время прибытия" class="form-control w-25" />
                <input type="number" v-model="newTrainOfferPrice" class="form-control w-25" />
                <button class="btn btn-primary" @click="createTour()">
                    Создать маршрут электрички
                </button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    data(){
        return {
            offersType: 'airplanes',
            newAirplaneOfferFrom: '',
            newAirplaneOfferTo: '',
            newAirplaneOfferPrice: 0,
            newAirplaneOfferDate: '',
            newAirplaneOfferFromTime: '',
            newAirplaneOfferToTime: '',
            newAirplaneOfferAirport: '',
            newAirplaneOfferIsReturn: false,
            newAirplaneOfferIsThings: false,
            newRailwayOfferFromTime: '',
            newRailwayOfferToTime: '',
            newRailwayOfferTo: '',
            newRailwayOfferFrom: '',
            newRailwayOfferDate: '',
            newRailwayOfferAuthor: '',
            newRailwayOfferCompartmentPrice: 0,
            newRailwayOfferSeatPrice: 0,
            newRailwayOfferReservedSeatPrice: 0,
            newRailwayOfferReservedSeatTickets: 0,
            newRailwayOfferCompartmentTickets: 0,
            newRailwayOfferSeatTickets: 0,
            newRailwayOfferMark: '',
            newBussOfferDate: '',
            newBussOfferFrom: '',
            newBussOfferTo: '',
            newBussOfferToTime: '',
            newBussOfferFromTime: '',
            newBussOfferDriver: '',
            newBussPrice: 0,
            bussOfferDays: [
                'пн',
                'вт',
                'ср',
                'чт',
                'пт',
                'сб',
                'вс',
            ],
            newBussOfferPrice: 0,
            newBussOfferDriver: '',
            newTrainOfferDate: '',
            newTrainOfferFromTime: '',
            newTrainOfferToTime: '',
            newTrainOfferFrom: '',
            newTrainOfferTo: '',
            newTrainOfferPrice: 0
        }
    },
    methods: {
        createTour() {
            if(this.offersType.includes('airplanes')) {
                fetch(`http://localhost:4000/api/tickets/airplanes/create/?newairplaneofferfromtime=${this.newAirplaneOfferFromTime}&newairplaneoffertotime=${this.newAirplaneOfferToTime}&newairplaneofferprice=${this.newAirplaneOfferPrice}&newairplaneofferfrom=${this.newAirplaneOfferFrom}&newairplaneofferto=${this.newAirplaneOfferTo}&newairplaneofferdate=${this.newAirplaneOfferDate}&newairplaneofferairport=${this.newAirplaneOfferAirport}&newairplaneofferisreturn=${this.newAirplaneOfferIsReturn}&newairplaneofferisthings=${this.newAirplaneOfferIsThings}`, {
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
                        alert('тур создан')
                        this.newAirplaneOfferFrom = ''
                        this.newAirplaneOfferTo = ''
                        this.newAirplaneOfferDate = ''
                        this.newAirplaneOfferFromTime = ''
                        this.newAirplaneOfferToTime = ''
                        this.newAirplaneOfferIsReturn = false
                        this.newAirplaneOfferIsThings = false
                        this.newAirplaneOfferAirport = ''
                        this.newAirplaneOfferPrice = 0
                    } else if(JSON.parse(result).status.includes('Error')) {
                        alert('ошибка при создании тура')
                    }
                });
            } else if(this.offersType.includes('railways')) {
                fetch(`http://localhost:4000/api/tickets/railways/create/?newrailwayofferfromtime=${this.newRailwayOfferFromTime}&newrailwayoffertotime=${this.newRailwayOfferToTime}&newrailwayofferprices=${this.newRailwayOfferSeatPrice}|${this.newRailwayOfferReservedSeatPrice}|${this.newRailwayOfferCompartmentPrice}&newrailwayofferfrom=${this.newRailwayOfferFrom}&newrailwayofferto=${this.newRailwayOfferTo}&newrailwayofferdate=${this.newRailwayOfferDate}&newrailwayofferauthor=${this.newRailwayOfferAuthor}&newrailwayofferreservedseattickets=${this.newRailwayOfferReservedSeatTickets}&newrailwayoffercompartmenttickets=${this.newRailwayOfferCompartmentTickets}&newrailwayoffermark=${this.newRailwayOfferMark}`, {
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
                        alert('тур создан')
                        this.newRailwayOfferFromTime = ''
                        this.newRailwayOfferToTime = ''
                        this.newRailwayOfferFrom = ''
                        this.newRailwayOfferTo = ''
                        this.newRailwayOfferDate = ''
                        this.newRailwayOfferAuthor = ''
                        this.newRailwayOfferCompartmentTickets = 0
                        this.newRailwayOfferReservedSeatTickets = 0
                        this.newRailwayOfferReservedSeatPrice = 0
                        this.newRailwayOfferCompartmentPrice = 0
                        this.newRailwayOfferSeatPrice = 0
                        this.newRailwayOfferMark = ''
                    } else if(JSON.parse(result).status.includes('Error')) {
                        alert('ошибка при создании тура')
                    }
                });
            } else if(this.offersType.includes('busses')) {
                fetch(`http://localhost:4000/api/tickets/busses/create/?newbussofferfromtime=${this.newBussOfferFromTime}&newbussoffertotime=${this.newBussOfferToTime}&newbussofferprice=${this.newBussOfferPrice}&newbussofferfrom=${this.newBussOfferFrom}&newbussofferto=${this.newBussOfferFrom}&newbussofferdate=${this.newBussOfferDate}&newbussofferdriver=${this.newBussOfferDriver}&newbussofferdays=${this.bussOfferDays.join('|')}`, {
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
                        alert('тур создан')
                        this.newBussOfferDate = ''
                        this.newBussOfferDriver = ''
                        this.newBussOfferFromTime = ''
                        this.newBussOfferToTime = ''
                        this.newBussOfferFrom = ''
                        this.newBussOfferTo = ''
                        this.newBussOfferDays = []
                        this.newBussOfferPrice = 0
                    } else if(JSON.parse(result).status.includes('Error')) {
                        alert('ошибка при создании тура')
                    }
                });
            } else if(this.offersType.includes('trains')) {
                fetch(`http://localhost:4000/api/tickets/trains/create/?newtrainofferfromtime=${this.newTrainOfferFromTime}&newtrainoffertotime=${this.newTrainOfferToTime}&newtrainofferfrom=${this.newTrainOfferFrom}&newtrainofferto=${this.newTrainOfferTo}&newtrainofferdate=${this.newTrainOfferDate}&newtrainofferprice=${this.newTrainOfferPrice}`, {
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
                        alert('тур создан')
                        this.newTrainOfferDate = ''
                        this.newTrainOfferFromTime = ''
                        this.neTrainOfferToTime = ''
                        this.newTrainOfferFrom = ''
                        this.newTrainOfferTo = ''
                        this.newTrainOfferPrice = 0
                    } else if(JSON.parse(result).status.includes('Error')) {
                        alert('ошибка при создании пути электрички')
                    }
                });
            }
        }
    },
    components: {
        Header,
        Footer
    }
}
</script>

<style scoped>
    
    .mainForm, .mainForm > div {
        margin: auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
    }

    .mainForm > div > *, .mainForm > * {
        margin: 10px 0px;
        align-self: center;
    }

    .formLabel {
        color: rgb(0, 150, 215);
        font-weight: bolder;
    }

    .bussDays {
        display: flex;
    }

    .bussDays > * {
        margin: 0px 5px;
    }

    .bussDays > div > * {
        margin: 0px 2px;
    }

</style>