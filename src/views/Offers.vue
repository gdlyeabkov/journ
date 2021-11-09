<template>
    <div>
        <Header :tagline="offersType.includes('airplanes') ? 'Авиабилеты' : offersType.includes('railways') ? 'Ж/д билеты' : offersType.includes('busses') ? 'Автобусы' : offersType.includes('trains') ? 'Электрички' : 'Больше пользы для ваших путешествий'" />
        <div class="main">
            <div class="offerSearchAndService" v-if="offersType.includes('airplanes')">
                 <div class="searchBlock searchBlockPlane" v-if="planeChangeSearch" @click="planeChangeSearch = false">
                    <span class="searchBlockFromAndTo">
                        {{ fromPlane }} — {{ toPlane }}
                    </span>
                    <span class="searchBlockInfo">
                        {{ `${datePlane.split('.')[0]} ${monthsLabels[datePlane.split('.')[1]]}` }}, {{ daysLabels[new Date(`${datePlane.split('.')[2]}`, `${datePlane.split('.')[1]}`, `${datePlane.split('.')[0]}`).getDay()] }} • 1 пассажир • эконом
                    </span>
                    <button class="btn btn-light planeChangeSearchBtn">
                        Изменить поиск
                    </button>
                 </div>
                <div v-else>
                    <div class="planeServiceHeader">
                        <h4>
                            Поиск рейсов
                        </h4>
                        <span @click="planeChangeSearch = !planeChangeSearch" class="closer material-icons">
                            close
                        </span>
                    </div>
                    <div class="planeService">
                        <div class="input-group inputRailwayDatePicker">
                            <input v-model="fromPlane" type="text" placeholder="Откуда" class="form-control inputPlane" />
                            <span class="input-group-text material-icons" id="basic-addon1">swap_horiz</span>
                        </div>
                        <input v-model="toPlane" type="text" placeholder="Куда" class="form-control inputPlane" />
                        <div class="input-group inputRailwayDatePicker">
                            <input v-model="datePlane" type="text" placeholder="Дата вылета" class="form-control planeInput" />
                            <span class="input-group-text material-icons" id="basic-addon1">grid_on</span>
                        </div>
                        <div class="input-group inputRailwayDatePicker">
                            <input v-model="backPlane" type="text" placeholder="Обратно" class="form-control planeInput" />
                            <span class="input-group-text material-icons" id="basic-addon1">grid_on</span>
                        </div>
                        <button class="btn btn-primary planeBtn" @click="refreshRoutes()">
                            Найти билеты
                        </button>
                    </div>
                </div>
                 <div @scroll="airportDialog = false; aircompanyDialog = false; startTimeDialog = false" class="offerService offerServiceContainer">
                    <div :class="{ offerServiceItem: true, offerServiceItemActive: transferPlane }" @click="transferPlane = !transferPlane">
                         <span class="offerServiceItemHeader">
                            Прямой
                         </span>
                         <span class="offerServiceItemFooter">
                            от 1 009Ք
                         </span>
                    </div>
                    <div :class="{ offerServiceItem: true, offerServiceItemActive: !transferPlane }" @click="transferPlane = !transferPlane">
                         <span class="offerServiceItemHeader">
                            Короткая пересадка
                         </span>
                         <span class="offerServiceItemFooter">
                            от 5 310 Ք
                         </span>
                    </div>
                    <div :class="{ offerServiceItem: true, offerServiceItemActive: thingsPlane }" @click="thingsPlane = !thingsPlane">
                         <span class="offerServiceItemHeader">
                            C багажом
                         </span>
                         <span class="offerServiceItemFooter">
                            от 2 590 Ք
                         </span>
                     </div>
                     <div :class="{ offerServiceItem: true, offerServiceItemActive: returnPlane }" @click="returnPlane = !returnPlane">
                         <span class="offerServiceItemHeader">
                            С возвратом
                         </span>
                         <span class="offerServiceItemFooter">
                            от 2 590 Ք
                         </span>
                     </div>
                     <div :class="{ offerServiceItem: true, offerServiceItemActive: companyPlane.includes('Аэрофлот') }" @click="companyPlane.includes('Аэрофлот') ? companyPlane = '' : companyPlane = 'Аэрофлот'">
                         <span class="offerServiceItemHeader">
                            Аэрофлот
                         </span>
                         <span class="offerServiceItemFooter">
                            от 3 905 Ք
                         </span>
                     </div>
                     <div :class="{ offerServiceItem: true, offerServiceItemActive: companyPlane.includes('S7 Airlines') }" @click="companyPlane.includes('S7 Airlines') ? companyPlane = '' : companyPlane = 'S7 Airlines'">
                         <span class="offerServiceItemHeader">
                            S7 Airlines
                         </span>
                         <span class="offerServiceItemFooter">
                            от 3 615 Ք
                         </span>
                     </div>
                     <div class="offerServiceItem" @click="aircompanyDialog = !aircompanyDialog">
                        <div>
                            <span class="offerServiceItemHeader">
                                Авиакомпания
                            </span>
                            <span class="material-icons">
                                expand_more
                            </span>
                         </div>
                         <span class="offerServiceItemFooter">
                            Любая
                         </span>
                     </div>
                     <div class="offerServiceItem" @click="airportDialog = !airportDialog">
                         <div>
                             <span class="offerServiceItemHeader">
                                Аэропорт вылета
                            </span>
                             <span class="material-icons">
                                expand_more
                            </span>
                         </div>
                         <span class="offerServiceItemFooter">
                            Любой
                         </span>
                     </div>
                     <div class="offerServiceItem" @click="startTimeDialog = !startTimeDialog">
                         <div>
                            <span class="offerServiceItemHeader">
                                Время отправления
                            </span>
                            <span class="material-icons">
                                expand_more
                            </span>
                         </div>
                         <span class="offerServiceItemFooter">
                            Любое
                         </span>
                     </div>
                 </div>
            </div>
            <div class="railwayService" v-else-if="offersType.includes('railways')">
                <h4>
                    Выберите день, чтобы найти ж/д билеты {{ fromRailway }} — {{ toRailway }}
                </h4>
                <div class="railwaySearch">
                    <input v-model="fromRailway" type="text" placeholder="Откуда" class="form-control planeInput inputRailway" />
                    <span class="material-icons railwaysSwapper" @click="swapRailwayFromAndTo()">
                        swap_horiz
                    </span>
                    <input v-model="toRailway" type="text" placeholder="Куда" class="form-control planeInput inputRailway" />
                    <div class="input-group inputDatePicker inputRailwayDatePicker">
                        <span class="input-group-text material-icons inputDatePickerArrow" id="basic-addon1">arrow_left</span>
                        <input v-model="dateRailway" type="text" placeholder="Дата" class="form-control planeInput" />
                        <span class="input-group-text material-icons inputDatePickerArrow" id="basic-addon1">arrow_right</span>
                    </div>
                    <span class="backDate">
                        Указать дату обратно
                    </span>
                    <button class="btn btn-primary" @click="refreshRoutes()">
                        Найти ж/д билеты
                    </button>
                </div>
                <div>
                    <p>
                        Расписание поездов · Ж/д билеты {{ fromRailway }} → {{ toRailway }}
                    </p>
                    <h3>
                        Расписание поездов {{ fromRailway }} — {{ toRailway }}
                    </h3>
                    <p>
                        Открыта продажа билетов на 7 марта · Отправление и прибытие по местному времени. Цены за 1 пассажира
                    </p>
                </div>
            </div>
            <div class="offerSearchAndService" v-else-if="offersType.includes('busses')">
                <div class="bussInput">
                    <div class="dateBussWithExamples">
                        <input v-model="fromBus" type="text" placeholder="Откуда" class="form-control inputRailway" required />
                        <span>
                            Например:Москва,Санкт-Петербург
                        </span>
                    </div>
                    <span v-if="!isSwap" @mouseenter="isSwap = true" class="swapRoutes material-icons">
                        arrow_right_alt
                    </span>
                    <span v-else @mouseleave="isSwap = false" @click="swapRoutes()" class="swapRoutes material-icons">
                        sync
                    </span>
                    <div class="dateBussWithExamples">
                        <input v-model="toBus" type="text" placeholder="Куда" class="form-control inputRailway" required />
                        <span>
                            Например:Санкт-Петербург,Москва
                        </span>
                    </div>
                    <div class="dateBussWithExamples">
                        <div class="input-group bussDatePicker">
                            <input v-model="dateBuss" type="text" placeholder="Дата" class="form-control planeInput" />
                            <span class="input-group-text material-icons" id="basic-addon1">grid_on</span>
                        </div>
                        <span>
                            сегодня,завтра
                        </span>
                    </div>
                    <div class="input-group bussDatePicker">
                        <span :class="{ 'input-group-text': true, bussSpinner: true, notActiveBussSpinner: countPassengersBus <= 1 }" id="basic-addon1" @click="countPassengersBus >= 2 ? countPassengersBus-- : countPassengersBus = countPassengersBus">-</span>
                        <input :value="`${countPassengersBus} пассажир`" type="text" class="form-control planeInput" />
                        <span :class="{ 'input-group-text': true, bussSpinner: true }" id="basic-addon1" @click="countPassengersBus++">+</span>
                    </div>
                    <button class="btn btn-primary">
                        Найти билеты
                    </button>
                </div>
                <div class="busHeader">
                    <h4>
                        {{ toBus }} → {{ fromBus }}, {{ `${dateBuss.split('.')[0]} ${monthsLabels[dateBuss.split('.')[1]]} ${dateBuss.split('.')[2]}` }}
                    </h4>
                    <select class="form-select h-75 w-25" aria-label="Default select example" v-model="currencyBus">
                        <option value="руб.">руб.</option>
                        <option value="грн.">грн.</option>
                        <option value="BYN">BYN</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                    </select>
                </div>
                <div>
                    <span>
                        Поиск на другие дни
                    </span>
                    <button class="btn btn-light">
                        09 нояб., вт
                    </button>
                    <button class="btn btn-primary">
                        10 нояб., ср
                    </button>
                    <button class="btn btn-light">
                        11 нояб., чт
                    </button>
                    <button class="btn btn-light">
                        12 нояб., пт
                    </button>
                    <button class="btn btn-light">
                        13 нояб., сб
                    </button>
                </div>
            </div>
            <div class="offerShowTimetable" v-else-if="offersType.includes('trains')">
                <div class="w-100">
                    <div class="input-group inputLogo">
                        <input v-model="trainFrom" type="text" placeholder="Откуда" class="form-control planeInput" />
                        <span class="input-group-text material-icons" id="basic-addon1">tram</span>
                    </div>
                    <span class="trainExample" @click="trainFrom = 'Москва'">
                        Москва
                    </span>    
                </div>
                <div class="w-100">
                    <div class="input-group inputLogo">
                        <input v-model="trainTo" type="text" placeholder="Куда" class="form-control planeInput" />
                        <span class="input-group-text material-icons" id="basic-addon1">tram</span>
                    </div>
                    <span class="trainExample" @click="trainTo = 'Петушки'">
                        Петушки
                    </span>        
                </div>
                <div class="input-group inputDatePicker">
                    <span class="input-group-text material-icons inputDatePickerArrow" id="basic-addon1">arrow_left</span>
                    <input v-model="dateTrain" type="text" placeholder="Дата" class="form-control planeInput" />
                    <span class="input-group-text material-icons" id="basic-addon1">grid_on</span>
                    <span class="input-group-text material-icons inputDatePickerArrow" id="basic-addon1">arrow_right</span>
                </div>
                <button @click="refreshRoutes()" class="btn btn-light showTimetableBtn">
                    Показать расписание
                </button>
            </div>
            <div class="offersBody">
                <div v-if="offers.length >= 1">
                    <div v-if="offersType.includes('airplanes')">
                        <div class="offersCount">
                            <span>
                                {{ offers.length }} предложение, 
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
                        <div v-for="airplaneOffer in offers.filter(offer => {
                            return (offer.date === datePlane || offer.date === backPlane) && offer.from === fromPlane && offer.to === toPlane && ((thingsPlane && offer.isThings) || (!thingsPlane && !offer.isThings ))  && ((returnPlane && offer.isReturn) || (!returnPlane && !offer.isReturn )) && ((transferPlane && offer.isTrasfer) || (!transferPlane && !offer.isTrasfer )) && ((!transferPlane && !offer.isTrasfer) || (transferPlane && offer.isTrasfer )) && ((offer.company === companyPlane && companyPlane.length >= 1) || companyPlane.length <= 0) && selectedAirports.includes(offer.airport) && selectedAirCompanies.includes(offer.company) && ((selectedStartTimes.includes('Ночь') && (offer.fromTime.split(':')[0] >= '00' && offer.fromTime.split(':')[0] <= '03' && offer.fromTime.split(':')[0] >= '22')) || !selectedStartTimes.includes('Ночь')) && ((selectedStartTimes.includes('Вечер') && (offer.fromTime.split(':')[0] >= '16' && offer.fromTime.split(':')[0] <= '21')) || !selectedStartTimes.includes('Вечер')) && ((selectedStartTimes.includes('День') && (offer.fromTime.split(':')[0] >= '10' && offer.fromTime.split(':')[0] <= '15')) || !selectedStartTimes.includes('День')) && (selectedStartTimes.includes('Утро') && ((offer.fromTime.split(':')[0] >= '04' && offer.fromTime.split(':')[0] <= '09')) || !selectedStartTimes.includes('Утро'))
                        })" :key="airplaneOffer._id" class="offer">
                            <div class="offerAside">
                                <div class="offerAsideColumn">
                                    <div class="offerServiceFilters">
                                        <span class="offerServiceFilterCompany">
                                            {{ airplaneOffer.company }}
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
                    <div v-else-if="offersType.includes('railways')">
                        <div v-for="railwayOffer in offers.filter(offer => {
                            return offer.to === toRailway && offer.from === fromRailway && offer.date === dateRailway
                        })" :key="railwayOffer._id" class="offer">
                            <div class="offerAside">
                                <div class="offerAsideColumn">
                                    <div class="offerServiceFilters">
                                        <span class="offerServiceFilterDriver">
                                            {{ railwayOffer.mark }}
                                            {{ railwayOffer.author }}
                                        </span>
                                    </div>
                                    <div class="timeAndDestination">
                                        <span>
                                            <span class="time">
                                                {{ railwayOffer.fromTime }}
                                            </span>
                                            <span class="date">
                                                &nbsp;
                                            </span>
                                        </span>
                                        <span>
                                            {{ railwayOffer.from }}
                                        </span>
                                    </div>
                                    <div class="offerAsideFooter">
                                        <div class="ratio">
                                            {{ railwayOffer.ratio }}
                                        </div>
                                        <span class="aboutRoute">
                                            Дни следования
                                        </span>
                                    </div>
                                </div>
                                <div class="offerAsideColumn">
                                    <div class="timeAndDestination">
                                        <span>
                                            &nbsp;
                                        </span>
                                        <span class="time">
                                            {{ railwayOffer.toTime }}
                                        </span>
                                        <span>
                                            {{ railwayOffer.to }}
                                        </span>
                                        <span>
                                            ближайшие: 7, 8, 9 ноября
                                        </span>
                                    </div>
                                </div>
                                <div class="offerAsideColumn">
                                    <div class="timeAndDestination">
                                        <span>
                                            &nbsp;
                                        </span>
                                        <span>
                                            {{
                                                hoursLabels[railwayOffer.toTime.split(':')[0]] - hoursLabels[railwayOffer.fromTime.split(':')[0]] - 1
                                            }} ч 
                                            {{
                                                minutesLabels[railwayOffer.toTime.split(':')[1]] > minutesLabels[railwayOffer.toTime.split(':')[1]] ?
                                                    minutesLabels[railwayOffer.toTime.split(':')[1]] - minutesLabels[railwayOffer.fromTime.split(':')[1]] - 1
                                                :
                                                    60 - minutesLabels[railwayOffer.fromTime.split(':')[1]] + minutesLabels[railwayOffer.toTime.split(':')[1]] 
                                            }} м
                                        </span>
                                        <span class="route">
                                            маршрут
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="offerArticle">
                                <div class="railwayPayBlock" v-if="railwayOffer.prices.split('|')[0] >= 1">
                                     <!-- && railwayOffer.seatTickets >= 1 -->
                                    <div class="offerSettings">
                                        <span>
                                            Сид
                                        </span>
                                    </div>
                                    <div class="offerPrice">
                                        <span @click="payTicket(railwayOffer._id)" class="railwayPrice">
                                            ~{{ railwayOffer.prices.split('|')[0] }}Ք
                                        </span>
                                    </div>
                                </div>
                                <div class="railwayPayBlock" v-if="railwayOffer.prices.split('|')[1] >= 1 && railwayOffer.reservedSeatTickets >= 1">
                                    <div class="offerSettings">
                                        <span>
                                            Плацкарт
                                        </span>
                                    </div>
                                    <div class="offerPrice">
                                        <span @click="payTicket(railwayOffer._id)" class="railwayPrice">
                                            ~{{ railwayOffer.prices.split('|')[1] }}Ք
                                        </span>
                                    </div>
                                </div>
                                <div class="railwayPayBlock" v-if="railwayOffer.prices.split('|')[2] >= 1 && railwayOffer.compartmentTickets >= 1">
                                    <div class="offerSettings">
                                        <span>
                                            Купе
                                        </span>
                                    </div>
                                    <div class="offerPrice">
                                        <span @click="payTicket(railwayOffer._id)" class="railwayPrice">
                                            ~{{ railwayOffer.prices.split('|')[2] }}Ք
                                        </span>
                                    </div>
                                </div>
                                <button class="btn btn-light showOtherTariffs">
                                    Выбрать дату поездки
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="offersType.includes('busses')">
                        <div v-for="bussOffer in offers" :key="bussOffer._id" class="bussOffer">
                            <div class="bussOfferAside">
                                <span class="time">
                                    {{ bussOffer.fromTime }}
                                </span>
                                <span class="time">
                                    {{ bussOffer.toTime }}
                                </span>
                                <span>
                                    {{
                                        hoursLabels[bussOffer.toTime.split(':')[0]] - hoursLabels[bussOffer.fromTime.split(':')[0]] - 1
                                    }} ч 
                                    {{
                                        minutesLabels[bussOffer.toTime.split(':')[1]] > minutesLabels[bussOffer.toTime.split(':')[1]] ?
                                            minutesLabels[bussOffer.toTime.split(':')[1]] - minutesLabels[bussOffer.fromTime.split(':')[1]] - 1
                                        :
                                            60 - minutesLabels[bussOffer.fromTime.split(':')[1]] + minutesLabels[bussOffer.toTime.split(':')[1]] 
                                    }} м
                                </span>
                                <div class="bussInfo">
                                    <div class="ratio">
                                        {{ bussOffer.ratio }}
                                    </div>
                                    <span class="offerServiceFilterDriver">
                                        {{ bussOffer.driver }}
                                    </span>
                                </div>
                                <span>
                                    {{ bussOffer.days.split('|').join(', ') }}
                                </span>
                                <span class="bussPrice">
                                    {{ bussOffer.price }}Ք
                                </span>
                            </div>
                            <hr />
                            <div class="bussArticle">
                                {{ bussOffer.from }} – {{ bussOffer.to }}
                            </div>
                            <div class="bussArticle">
                                <span class="railwayRoute">
                                    Маршрут
                                </span>
                                <span>
                                    Увидели ошибку
                                </span>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="offersType.includes('trains')">
                        <span class="">
                            Расписание электричек • Москва • Горьковское направление • Расписание электричек {{ trainFrom }} → {{ trainTo }}
                        </span>
                        <div class="offersCount">
                            <span>
                                Расписание электричек {{ trainFrom }} → {{ trainTo }} на сегодня
                            </span>
                        </div>
                        <div class="trainRow">
                            <span>
                                базовое расписание
                            </span>
                            <span :class="{ offerServiceFilterTrain: true, offerServiceFilterTrainActive: dateTrain.includes(new Date().toLocaleDateString()) }" @click="dateTrain = new Date().toLocaleDateString()">
                                сегодня, 8 ноября
                            </span>
                            <span :class="{ offerServiceFilterTrain: true, offerServiceFilterTrainActive: dateTrain.includes(getTrainTommorow()) }" @click="setTrainTommorow()">
                                завтра
                            </span>
                            <span :class="{ offerServiceFilterTrain: true, offerServiceFilterTrainActive: dateTrain.includes(getTrainDayAfterTomorrow()) }" @click="setTrainDayAfterTomorrow()">
                                послезавтра
                            </span>
                            <span>
                                другой день
                            </span>
                        </div>
                        <div class="trainRow">
                            <span class="offerServiceFilterTrain">
                                Все поезда
                            </span>
                            <span>
                                Скорые
                            </span>
                            <span>
                                Экспрессы
                            </span>
                        </div>
                        <div class="trainOffer">
                            <div class="bussOfferAside">
                                <span class="trainSendColumn">
                                    Отпр.
                                </span>
                                <span class="trainReceiveColumn">
                                    Приб.
                                </span>
                                <span class="trainMoveColumn">
                                    В пути
                                </span>
                                <span class="trainModeMoveColumn">
                                    Режим движения
                                </span>
                                <span class="trainRouteColumn">
                                    Маршрут электрички
                                </span>
                                <span class="trainPriceColumn">
                                    Цена
                                </span>
                            </div>
                        </div>
                        <div v-for="trainOffer in offers.filter(offer => {
                            return offer.to === trainTo && offer.from === trainFrom && offer.date === dateTrain
                        })" :key="trainOffer._id" class="trainOffer">
                            <div class="bussOfferAside">
                                <span class="trainFromTime">
                                    {{ trainOffer.fromTime }}
                                </span>
                                <span class="trainToTime">
                                    {{ trainOffer.toTime }}
                                </span>
                                <span>
                                    {{
                                        hoursLabels[trainOffer.toTime.split(':')[0]] - hoursLabels[trainOffer.fromTime.split(':')[0]] - 1
                                    }} ч 
                                    {{
                                        minutesLabels[trainOffer.toTime.split(':')[1]] > minutesLabels[trainOffer.toTime.split(':')[1]] ?
                                            minutesLabels[trainOffer.toTime.split(':')[1]] - minutesLabels[trainOffer.fromTime.split(':')[1]] - 1
                                        :
                                            60 - minutesLabels[trainOffer.fromTime.split(':')[1]] + minutesLabels[trainOffer.toTime.split(':')[1]] 
                                    }} м
                                </span>
                                <span>
                                    {{ trainOffer.from }} → {{ trainOffer.to }}
                                </span>
                                <span>
                                    Ежедневно
                                </span>
                                <span>
                                    {{ 52 }}Ք
                                </span>
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
            <div v-if="offersType.includes('airplanes')">
                <div class="airplaneCompanyDialog" v-if="aircompanyDialog">
                    <div>
                        <input :value="'Россия'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            Россия
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'Россия'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Аэрофлот'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            Аэрофлот
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'Аэрофлот'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Якутия'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            Якутия
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'Якутия'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Победа'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            Победа
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'Победа'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'S7 Airlines'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            S7 Airlines
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'S7 Airlines'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Ютэйр'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            Ютэйр
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'Ютэйр'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Уральские авиалинии'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            Уральские авиалинии
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'Уральские авиалинии'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Пегас флай'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            Пегас флай
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'Пегас флай'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Северный ветер'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            Северный ветер
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'Северный ветер'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Азимут'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            Азимут
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'Азимут'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'НордСтар'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            НордСтар
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'НордСтар'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'АЛРОСА'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            АЛРОСА
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'АЛРОСА'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Belavia'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            Belavia
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'Belavia'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Руслайн'" name="selectedAirCompanies" v-model="selectedAirCompanies" type="checkbox" />
                        <span>
                            Руслайн
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.company === 'Руслайн'
                                }).length
                            }}
                        </span>
                    </div>
                </div>
                <div class="airportDialog" v-if="airportDialog">
                    <div>
                        <input :value="'Внуково'" name="selectedAirports" v-model="selectedAirports" type="checkbox" />
                        <span>
                            Внуково
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.airport === 'Внуково'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Шереметьево'" name="selectedAirports" v-model="selectedAirports" type="checkbox" />
                        <span>
                            Шереметьево
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.airport === 'Шереметьево'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Домодедово'" name="selectedAirports" v-model="selectedAirports" type="checkbox" />
                        <span>
                            Домодедово
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.airport === 'Домодедово'
                                }).length
                            }}
                        </span>
                    </div>
                </div>
                <div class="startTimeDialog" v-if="startTimeDialog">
                    <div>
                        <input :value="'Ночь'" name="selectedStartTimes" v-model="selectedStartTimes" type="checkbox" />
                        <span>
                            Ночь
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.fromTime.split(':')[0] >= '00' && offer.fromTime.split(':')[0] <= '03' && offer.fromTime.split(':')[0] >= '22'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Утро'" name="selectedStartTimes" v-model="selectedStartTimes" type="checkbox" />
                        <span>
                            Утро
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.fromTime.split(':')[0] >= '04' && offer.fromTime.split(':')[0] <= '09'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'День'" name="selectedStartTimes" v-model="selectedStartTimes" type="checkbox" />
                        <span>
                            День
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.fromTime.split(':')[0] >= '10' && offer.fromTime.split(':')[0] <= '15'
                                }).length
                            }}
                        </span>
                    </div>
                    <div>
                        <input :value="'Вечер'" name="selectedStartTimes" v-model="selectedStartTimes" type="checkbox" />
                        <span>
                            Вечер
                        </span>
                        <span>
                            от {{
                                offers.filter(offer => {
                                    return offer.fromTime.split(':')[0] >= '16' && offer.fromTime.split(':')[0] <= '21'
                                }).length
                            }}
                        </span>
                    </div>
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
            },
            trainTo: '',
            trainFrom: '',
            dateTrain: '',
            dateBuss: '',
            toRailway: '',
            fromRailway: '',
            dateRailway: '',
            toPlane: '',
            fromPlane: '',
            datePlane: '',
            backPlane: '',
            companyPlane: '',
            planeChangeSearch: true,
            thingsPlane: false,
            returnPlane: false,
            transferPlane: false,
            aircompanyDialog: false,
            airportDialog: false,
            startTimeDialog: false,
            selectedAirports: [
                'Внуково',
                'Шереметьево',
                'Домодедово'
            ],
            selectedStartTimes: [],
            selectedAirCompanies: [
                'Россия',
                'Аэрофлот',
                'Якутия',
                'Победа',
                'S7 Airlines',
                'Ютэйр',
                'Уральские авиалинии',
                'Пегас флай',
                'Северный ветер',
                'Азимут',
                'НордСтар',
                'АЛРОСА',
                'Belavia',
                'Руслайн',
            ],
            fromBus: '',
            toBus: '',
            dateBuss: '',
            countPassengersBus: 1,
            isSwap: false,
            currencyBus: 'руб.'
        }
    },
    mounted(){
        if(this.$route.query.offerstype !== null && this.$route.query.offerstype !== undefined) {
            this.offersType = this.$route.query.offerstype
            if(this.offersType.includes('airplanes')){
                this.fromPlane = this.$route.query.from
                this.toPlane = this.$route.query.to
                this.datePlane = this.$route.query.date
                this.backPlane = this.$route.query.backdate
            } else if(this.offersType.includes('railways')){
                this.fromRailway = this.$route.query.from
                this.toRailway = this.$route.query.to
                this.dateRailway = this.$route.query.date
            } else if(this.offersType.includes('busses')){
                this.fromBus = this.$route.query.from
                this.toBus = this.$route.query.to
                this.dateBuss = this.$route.query.date
                this.countPassengersBus = this.$route.query.meta.split(' пасс.')[0]
            } else if(this.offersType.includes('trains')){
                this.trainFrom = this.$route.query.from
                this.trainTo = this.$route.query.to
                this.dateTrain = this.$route.query.date
            }
        }
        this.refreshRoutes()
    },
    methods: {
        swapRoutes(){
            let tempToBus = this.toBus
            this.toBus = this.fromBus
            this.fromBus = tempToBus
        },
        swapPlaneFromAndTo(){
            let tempToPlane = this.toPlane
            this.toPlane = this.fromPlane
            this.fromPlane = tempToPlane
        },
        swapRailwayFromAndTo(){
            let tempToRailway = this.toRailway
            this.toRailway = this.fromRailway
            this.fromRailway = tempToRailway
        },
        getTrainDayAfterTomorrow(){
            let now = new Date()
            now.setDate(now.getDate() + 2)
            return now.toLocaleDateString()
        },
        setTrainDayAfterTomorrow(){
            let now = new Date()
            now.setDate(now.getDate() + 2)
            this.dateTrain = now.toLocaleDateString()
        },
        getTrainTommorow(){
            let now = new Date()
            now.setDate(now.getDate() + 1)
            return now.toLocaleDateString()
        },
        setTrainTommorow(){
            let now = new Date()
            now.setDate(now.getDate() + 1)
            this.dateTrain = now.toLocaleDateString()
        },
        refreshRoutes(){
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
        width: 175px;
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

    .aboutRoute {
        border-radius: 25px;
        border: 1px solid rgb(0, 0, 255);
        color: rgb(0, 0, 255);
        width: 115px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }

    .route {
        cursor: pointer;
        color: rgb(0, 0, 255);
    }

    .offerServiceFilterDriver {
        border-radius: 15px;
        background-color: rgb(225, 225, 225);
        width: 275px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 5px;
    }

    .railwayPayBlock {
        border: 1px solid rgb(200, 200, 200);
        height: 35px;
        margin: 5px 0px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 5px 15px;
    }

    .railwayPrice {
        font-weight: bolder;
    }

    .bussOfferAside {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
    }

    .bussOffer {
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        background-color: rgb(255, 255, 255);
        box-sizing: border-box;
        padding: 10px 25px;
        height: 185px;
        margin: 15px 0px;
    }

    .trainOffer {
        display: flex;
        flex-direction: column;
        /* border-radius: 15px; */
        justify-content: center;
        background-color: rgb(255, 255, 255);
        box-sizing: border-box;
        padding: 10px 25px;
        height: 50px;
        margin: 0px;
        border-bottom: 1px solid rgb(175, 175, 175);
    }

    .bussPrice {
        font-weight: bolder;
        color: rgb(0, 100, 255);
        font-size: 20px;
    }

    .bussInfo {
        display: flex;
        align-items: flex-start;
    }

    .bussInfo > * {
        margin: 0px 5px;
        
    }

    .bussArticle {
        display: flex;
        justify-content: space-between;
    }

    .trainFromTime {
        font-weight: bolder;
        text-decoration: underline;
        text-underline-offset: 3px;
        color: rgb(0, 100, 255);
    }

    .trainToTime {
        text-decoration: underline;
        text-underline-offset: 3px;
        color: rgb(0, 100, 255);
    }

    .inputDatePicker {
        width: 1025px;
    }

    .offerShowTimetable {
        margin: auto;
        display: flex;
        align-items: center;
        width: 90%;
        height: 100px;
        border-bottom: 1px solid rgb(175, 175, 175);
    }

    .offerShowTimetable > * {
        margin: 0px 5px;
    }

    .showTimetableBtn {
        width: 775px;
        border: 1px solid rgb(0, 0, 0);
        color: rgb(0, 100, 255);
        font-weight: bolder;
    }

    .trainExample {
        color: rgb(150, 150, 150);
        font-size: 12px;
        cursor: pointer;
        text-decoration: underline;
        text-decoration-style: dashed;
    }

    .trainSendColumn {
        color: rgb(255, 0, 0);
        text-decoration: underline;
        text-decoration-style: dashed;
        text-underline-offset: 3px;
    }
    
    .trainReceiveColumn {
        text-decoration: underline;
        text-decoration-style: dashed;
        text-underline-offset: 3px;
    }
    
    .trainMoveColumn {
        text-decoration: underline;
        text-decoration-style: dashed;
        text-underline-offset: 3px;
    }
    
    .trainModeMoveColumn {
        
    }

    .trainPriceColumn {

    }

    .offerServiceFilterTrain {
        cursor: pointer;
    }

    .offerServiceFilterTrainActive {
        margin: 0px 5px;
        border-radius: 15px;
        background-color: rgb(255, 200, 255);
        color: rgb(0, 0, 0);
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .trainRow {
        display: flex;
        margin: 15px 0px;
    }

    .trainRow > * {
        margin: 0px 5px;
    }

    .railwaySearch {
        background-color: rgb(150, 150, 150);
        border-radius: 15px;
        width: 100%;
        height: 150px;
        box-sizing: border-box;
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .railwaySearch > * {
        margin: 0px 5px;
    }

    .inputRailway {
        width: 150px;
    }

    .inputRailwayDatePicker {
        width: 250px;
    }

    .backDate {
        width: 65px;
        color: rgb(255, 255, 255);
        margin-right: 75px;
    }

    .railwayService {
        background-color: rgb(255, 255, 255);
        box-sizing: border-box;
        padding: 0px 175px;
    }

    .railwaysSwapper {
        color: rgb(255, 255, 255);
        cursor: pointer;
    }

    .searchBlockPlane:hover {
        background-color: rgb(255, 215, 255);
        cursor: pointer;
    }

    .planeService {
        display: flex;
        align-items: center;
    }

    .planeService > * {
        margin: 0px 5px;
    }

    .inputPlane {
        width: 125px;
    }

    .planeBtn {
        width: 150px;
    }

    .planeChangeSearchBtn {
        color: rgb(0, 0, 255);
        width: 250px;
    }

    .searchBlockPlane:hover .planeChangeSearchBtn {
        color: rgb(255, 0, 0);
    }

    .planeServiceHeader {
        display: flex;
        justify-content: space-between;
    }

    .offerServiceItem {
        background-color: rgb(255, 255, 255);
        justify-content: center;
        align-items: center;
        height: 100%;
        box-sizing: border-box;
        min-width: 225px;
        padding: 0px 5px;
        border: 1px solid rgb(0, 100, 255);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        margin: 0px 15px;
        text-align: center;
        cursor: pointer;
    }

    .offerServiceItem:hover {
        border: 1px solid rgb(255, 0, 0);
    }

    .offerServiceItem:hover > .offerServiceItemHeader {
        color: rgb(255, 0, 0);
    }

    .offerServiceItemHeader {
        color:rgb(0, 0, 255);
    }

    .offerServiceItemFooter {
        font-size: 12px;
        color:rgb(0, 150, 150);
    }
    
    .offerServiceItem:hover {
        color: rgb(255, 0, 0);
    }

    .offerServiceContainer {
        display: flex;
    }

    .offerServiceItemActive {
        background-color: rgb(235, 235, 235);
    }

    .closer {
        cursor: pointer;
    }
    
    .airplaneCompanyDialog {
        align-items: center;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px;
        position: absolute;
        top: 350px;
        left: 400px;
        width: 285px;
        height: 350px;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 0px 10px rgb(150, 150, 150);
    }
    
    .airplaneCompanyDialog > div > * {
        margin: 0px 5px;
    }

    .airportDialog {
        align-items: center;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px;
        position: absolute;
        top: 350px;
        left: 700px;
        width: 250px;
        height: 350px;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 0px 10px rgb(150, 150, 150);
    }

    .airportDialog > div > * {
        margin: 0px 5px;
    }

    .startTimeDialog {
        align-items: center;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px;
        position: absolute;
        top: 350px;
        left: 1000px;
        width: 175px;
        height: 200px;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 0px 10px rgb(150, 150, 150);
    }

    .startTimeDialog > div > * {
        margin: 0px 5px;
    }
    
    .bussInput {
        display: flex;
        align-items: center;
    }

    .bussInput > * {
        margin: 0px 5px;
    }

    .bussDatePicker {
        width: 250px;
    }

    .bussSpinner {
        font-weight: bolder;
        cursor: pointer;
    }

    .notActiveBussSpinner {
        color: rgb(200, 200, 200);
        cursor: default;
    }

    .swapRoutes {
        cursor: pointer;
    }

    .dateBussWithExamples {
        display: flex;
        flex-direction: column;
    }

    .currencyBus {
        align-self: center;
    }

    .busHeader {
        display: flex;
        justify-content: space-between;
    }

</style>