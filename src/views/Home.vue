<template>
  <div>
    <Header :tagline="'Больше пользы для ваших путешествий'" />
    <div class="main">
      <div class="services">
        <div class="servicesLogos">
          <div @click="changeTab('Авиабилеты')" :class="{ serviceLogo: true, activeServiceLogo: activeTab.includes('Авиабилеты') }">
            <span class="serviceLogoItem material-icons">
              flight
            </span>
            <span class="serviceLogoLabel">
              Авиабилеты
            </span>
          </div>
          <div @click="changeTab('Ж/д билеты')" :class="{ serviceLogo: true, activeServiceLogo: activeTab.includes('Ж/д билеты') }">
            <span class="serviceLogoItem material-icons">
              train
            </span>
            <span class="serviceLogoLabel">
              Ж/д билеты
            </span>
          </div>
          <div @click="changeTab('Автобусы')" :class="{ serviceLogo: true, activeServiceLogo: activeTab.includes('Автобусы') }">
            <span class="serviceLogoItem material-icons">
              directions_bus
            </span>
            <span class="serviceLogoLabel">
              Автобусы
            </span>
          </div>
          <div @click="changeTab('Электрички')" :class="{ serviceLogo: true, activeServiceLogo: activeTab.includes('Электрички') }">
            <span class="serviceLogoItem material-icons">
              tram
            </span>
            <span class="serviceLogoLabel">
              Электрички
            </span>
          </div>
          <div @click="$router.push({ name: 'Tours' })" :class="{ serviceLogo: true }">
            <span class="serviceLogoItem material-icons">
              beach_access
            </span>
            <span class="serviceLogoLabel">
              Туры
            </span>
          </div>
          <div @click="$router.push({ name: 'Tours' })" :class="{ serviceLogo: true }">
            <span class="serviceLogoItem material-icons">
              room
            </span>
            <span class="serviceLogoLabel">
              Приключения
            </span>
          </div>
          <div @click="$router.push({ name: 'Tours' })" :class="{ serviceLogo: true }">
            <span class="serviceLogoItem material-icons">
              king_bed
            </span>
            <span class="serviceLogoLabel">
              Отели
            </span>
          </div>
          <div @click="$router.push({ name: 'Tours' })" :class="{ serviceLogo: true }">
            <span class="serviceLogoItem material-icons">
              work
            </span>
            <span class="serviceLogoLabel">
              Командировки
            </span>
          </div>
          <div @click="$router.push({ name: 'Tours' })" :class="{ serviceLogo: true }">
            <span class="serviceLogoItem material-icons">
              ac_unit
            </span>
            <span class="serviceLogoLabel">
              Аэротакси
            </span>
          </div>
        </div>
        <div v-if="activeTab.includes('Авиабилеты')" class="serviceInput">
          <form ref="planeForm" @submit.prevent="">
            <div class="serviceInputRow">
              <div class="input-group inputLogo">
                <input v-model="fromPlane" type="text" placeholder="Откуда" class="form-control planeInput" required/>
                <span class="input-group-text material-icons" id="basic-addon1">flight</span>
              </div>
              <div class="input-group inputLogo">
                <input v-model="toPlane" type="text" placeholder="Куда" class="form-control planeInput" required />
                <span class="input-group-text material-icons" id="basic-addon1">flight</span>
              </div>
              <div class="input-group inputLogo">
                <input v-model="datePlane" type="text" placeholder="Дата вылета" class="form-control planeInput" required />
                <span class="input-group-text material-icons" id="basic-addon1">grid_on</span>
              </div>
              <div class="input-group inputLogo">
                <input v-model="backPlane" type="text" placeholder="Обратно" class="form-control planeInput" />
                <span class="input-group-text material-icons" id="basic-addon1">grid_on</span>
              </div>
              <button class="btn btn-primary colorBtn" @click="findTickets('airplanes')">
                Найти билеты
              </button>
            </div>
            <div class="serviceInputRow">
              <span>
                Например: 
                <span class="examples">
                  Москва, Санкт-Петербург
                </span>
              </span>
              <span>
                Например: 
                <span class="examples">
                  Санкт-Петербург, Москва
                </span>
              </span>
              <div>
                <input type="checkbox" />
                <span class="examples">
                  +- 3 дня
                </span>
              </div>
              <span class="examples">
                8 ноября, 9 ноября
              </span>
            </div>
            <hr />
            <div class="serviceInputRow">
              <div class="input-group inputSpinner">
                <span class="input-group-text" id="basic-addon1" @click="adultPlane++">+</span>
                <input v-model="adultPlane" type="text" placeholder="1 взрослый" class="form-control planeInput" />  
                <span class="input-group-text" id="basic-addon1" @click="adultPlane--">-</span>
              </div>
              <div class="input-group inputSpinner">
                <span class="input-group-text" id="basic-addon1" @click="childPlane++">+</span>
                <input v-model="childPlane" type="text" placeholder="без детей до 12 лет" class="form-control planeInput" />
                <span class="input-group-text" id="basic-addon1" @click="childPlane--">-</span>
              </div>
              <div class="input-group inputSpinner">
                <span class="input-group-text" id="basic-addon1" @click="kidPlane++">+</span>
                <input v-model="kidPlane" type="text" placeholder="без малышей до 2 лет" class="form-control planeInput" />
                <span class="input-group-text" id="basic-addon1" @click="kidPlane--">-</span>
              </div>
              <button class="btn btn-primary">
                Эконом
              </button>
            </div>
          </form>
        </div>
        <div v-else-if="activeTab.includes('Ж/д билеты')" class="serviceInput">
          <form ref="railwayForm" @submit.prevent="">
            <div class="serviceInputRow">
              <div class="input-group inputLogo">
                <input v-model="fromRailway" type="text" placeholder="Откуда" class="form-control planeInput" required />
                <span class="input-group-text material-icons" id="basic-addon1">train</span>
              </div>
              <div class="input-group inputLogo">
                <input v-model="toRailway" type="text" placeholder="Куда" class="form-control planeInput" />
                <span class="input-group-text material-icons" id="basic-addon1">train</span>
              </div>
              <div class="input-group inputDatePicker">
                <span class="input-group-text material-icons inputDatePickerArrow" id="basic-addon1" @click="toggleDate('left', dateRailway)">arrow_left</span>
                <input v-model="dateRailway" type="text" placeholder="Дата" class="form-control planeInput" />
                <span class="input-group-text material-icons" id="basic-addon1">grid_on</span>
                <span class="input-group-text material-icons inputDatePickerArrow" id="basic-addon1" @click="toggleDate('right', dateRailway)">arrow_right</span>
              </div>
              <span>
                Указать дату обратно
              </span>
              <button class="btn btn-primary colorBtn" @click="findTickets('railways')">
                Найти ж/д билеты
              </button>
            </div>
            <div class="serviceInputRow">
              <span class="examples">
                Москва, Санкт-Петербург
              </span>
              <span class="examples">
                Санкт-Петербург, Москва
              </span>
              <span class="examples">
                8 ноября, 9 ноября
              </span>
            </div>
          </form>
        </div>
        <div v-else-if="activeTab.includes('Автобусы')" class="serviceInput">
          <form ref="bussForm" @submit.prevent="">
            <div class="serviceInputRow">
              <div class="input-group inputLogo">
                <input v-model="fromBus" type="text" placeholder="Откуда" class="form-control planeInput" required />
                <span class="input-group-text material-icons" id="basic-addon1">directions_bus</span>
              </div>
              <div class="input-group inputLogo">
                <input v-model="toBus" type="text" placeholder="Куда" class="form-control planeInput" required />
                <span class="input-group-text material-icons" id="basic-addon1">directions_bus</span>
              </div>
              <div class="input-group inputLogo">
                <input v-model="dateBus" type="text" placeholder="Дата вылета" class="form-control planeInput" required />
                <span class="input-group-text material-icons" id="basic-addon1">grid_on</span>
              </div>
              <div class="input-group inputLogo">
                <input v-model="countPassengersBus" type="text" placeholder="Обратно" class="form-control planeInput" required />
                <span class="input-group-text material-icons" id="basic-addon1">grid_on</span>
              </div>
              <button class="btn btn-primary colorBtn" @click="findTickets('busses')">
                Найти билеты
              </button>
            </div>
            <div class="serviceInputRow">
              <span>
                Например: 
                <span class="examples">
                  Москва, Санкт-Петербург
                </span>
              </span>
              <span>
                Например: 
                <span class="examples">
                  Санкт-Петербург, Москва
                </span>
              </span>
              <div>
                <input type="checkbox" />
                <span class="examples">
                  +- 3 дня
                </span>
              </div>
              <span class="examples">
                8 ноября, 9 ноября
              </span>
            </div>
            <hr />
            <div class="serviceInputRow">
              <div class="input-group inputSpinner">
                <span class="input-group-text" id="basic-addon1" @click="adultPlane++">+</span>
                <input v-model="adultPlane" type="text" placeholder="1 взрослый" class="form-control planeInput" />  
                <span class="input-group-text" id="basic-addon1" @click="adultPlane--">-</span>
              </div>
              <div class="input-group inputSpinner">
                <span class="input-group-text" id="basic-addon1" @click="childPlane++">+</span>
                <input v-model="childPlane" type="text" placeholder="без детей до 12 лет" class="form-control planeInput" />
                <span class="input-group-text" id="basic-addon1" @click="childPlane--">-</span>
              </div>
              <div class="input-group inputSpinner">
                <span class="input-group-text" id="basic-addon1" @click="kidPlane++">+</span>
                <input v-model="kidPlane" type="text" placeholder="без малышей до 2 лет" class="form-control planeInput" />
                <span class="input-group-text" id="basic-addon1" @click="kidPlane--">-</span>
              </div>
              <button class="btn btn-primary">
                Эконом
              </button>
            </div>
          </form>
        </div>
        <div v-else-if="activeTab.includes('Электрички')" class="serviceInput">
          <form ref="trainForm" @submit.prevent="">
            <div class="serviceInputRow">
              <div class="input-group inputLogo">
                <input v-model="fromTrain" type="text" placeholder="Откуда" class="form-control planeInput" required />
                <span class="input-group-text material-icons" id="basic-addon1">tram</span>
              </div>
              <div class="input-group inputLogo">
                <input v-model="toTrain" type="text" placeholder="Куда" class="form-control planeInput" required />
                <span class="input-group-text material-icons" id="basic-addon1">tram</span>
              </div>
              <div class="input-group inputDatePicker">
                <span class="input-group-text material-icons inputDatePickerArrow" id="basic-addon1" @click="toggleDate('left', dateTrain)">arrow_left</span>
                <input v-model="dateTrain" type="text" placeholder="Дата" class="form-control planeInput" required />
                <span class="input-group-text material-icons" id="basic-addon1">grid_on</span>
                <span class="input-group-text material-icons inputDatePickerArrow" id="basic-addon1" @click="toggleDate('right', dateTrain)">arrow_right</span>
              </div>
              <button class="btn btn-primary colorBtn" @click="findTickets('trains')">
                Показать расписание
              </button>
            </div>
            <div class="serviceInputRow">
              <span>
                Например: 
                <span class="examples">
                  Москва, Санкт-Петербург
                </span>
              </span>
              <span>
                Например: 
                <span class="examples">
                  Санкт-Петербург, Москва
                </span>
              </span>
              <div>
                <input type="checkbox" />
                <span class="examples">
                  +- 3 дня
                </span>
              </div>
              <span class="examples">
                8 ноября, 9 ноября
              </span>
            </div>
            <hr />
            <div class="serviceInputRow">
              <div class="input-group inputSpinner">
                <span class="input-group-text" id="basic-addon1" @click="adultPlane++">+</span>
                <input v-model="adultPlane" type="text" placeholder="1 взрослый" class="form-control planeInput" />  
                <span class="input-group-text" id="basic-addon1" @click="adultPlane--">-</span>
              </div>
              <div class="input-group inputSpinner">
                <span class="input-group-text" id="basic-addon1" @click="childPlane++">+</span>
                <input v-model="childPlane" type="text" placeholder="без детей до 12 лет" class="form-control planeInput" />
                <span class="input-group-text" id="basic-addon1" @click="childPlane--">-</span>
              </div>
              <div class="input-group inputSpinner">
                <span class="input-group-text" id="basic-addon1" @click="kidPlane++">+</span>
                <input v-model="kidPlane" type="text" placeholder="без малышей до 2 лет" class="form-control planeInput" />
                <span class="input-group-text" id="basic-addon1" @click="kidPlane--">-</span>
              </div>
              <button class="btn btn-primary">
                Эконом
              </button>
            </div>
            </form>
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
  name: 'Home',
  data() {
    return {
      activeTab: 'Авиабилеты',
      fromPlane: '',
      toPlane: '',
      datePlane: new Date().toLocaleDateString(),
      backPlane: new Date().toLocaleDateString(),
      adultPlane: '',
      childPlane: '',
      kidPlane: '',
      toRailway: '',
      fromRailway: '',
      dateRailway: new Date().toLocaleDateString(),
      fromBus: '',
      toBus: '',
      dateBus: new Date().toLocaleDateString(),
      countPassengersBus: '1 пасс.',
      dialogCountPassengersBus: false,
      fromTrain: '',
      toTrain: '',
      dateTrain: new Date().toLocaleDateString(),
    }
  },
  mounted(){
    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
      if(tab.includes('Авиабилеты')) {
        document.body.style.backgroundImage = `url(https://wallpaperaccess.com/full/254381.jpg)`
      } else if(tab.includes('Ж/д билеты')) {
        document.body.style.backgroundImage = `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5odRECi00z_6WVRMVjpCaaE3JkMHbmt5p6Q&usqp=CAU)`
      } else if(tab.includes('Автобусы')) {
        document.body.style.backgroundImage = `url(https://uj-images.ru/images/article/2020/08/5f3df27d98bf2.png)`
      } else if(tab.includes('Электрички')) {
        document.body.style.backgroundImage = `url(https://bw4u.ru/upload/iblock/945/945db4a246fd0444f4dada6f7d290a84.jpg)`
      }
    },
    toggleDate(direction, datePicker){
      if(direction.includes('left')){
        let now = new Date(`${datePicker.split('.')[2]}`, `${datePicker.split('.')[1]}`, `${datePicker.split('.')[0]}`)
        // now.setDate(now.getDate() - 1)
        now = now.addDays(-1)
        now.setMonth(now.getMonth() - 1)
        this.dateRailway = now.toLocaleDateString()
        if(this.activeTab.includes('Ж/д билеты')) {
          this.dateRailway = now.toLocaleDateString()
        } else if(this.activeTab.includes('Электрички')) {
          this.dateTrain = now.toLocaleDateString()
        }
      } else if(direction.includes('right')){
        let now = new Date(`${datePicker.split('.')[2]}`, `${datePicker.split('.')[1]}`, `${datePicker.split('.')[0]}`)
        // now.setDate(now.getDate() + 1)
        now = now.addDays(1)
        now.setMonth(now.getMonth() - 1)
        if(this.activeTab.includes('Ж/д билеты')) {
          this.dateRailway = now.toLocaleDateString()
        } else if(this.activeTab.includes('Электрички')) {
          this.dateTrain = now.toLocaleDateString()
        }
      }
    },
    findTickets(type){
      if(type.includes('airplanes')) {
        if(this.$refs.planeForm.reportValidity()) {
          this.$router.push({ name: 'Offers', query: { offerstype: type, from: this.fromPlane, to: this.toPlane, date: this.datePlane, backdate: this.backPlane } })
        }
      } else if(type.includes('railways')) {
        if(this.$refs.railwayForm.reportValidity()) {
          this.$router.push({ name: 'Offers', query: { offerstype: type, from: this.fromRailway, to: this.toRailway, date: this.dateRailway } })
        }
      } else if(type.includes('busses')) {
        if(this.$refs.bussForm.reportValidity()) {
          this.$router.push({ name: 'Offers', query: { offerstype: type, from: this.fromBus, to: this.toBus, date: this.dateBus, meta: this.countPassengersBus } })
        }
      } else if(type.includes('trains')) {
        if(this.$refs.trainForm.reportValidity()) {
          this.$router.push({ name: 'Offers', query: { offerstype: type, from: this.fromTrain, to: this.toTrain, date: this.dateTrain } })
        }
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
  
  .services {
    width: 90%;
    margin:auto;
  }

  .servicesLogos {
    display: flex;
  }

  .serviceLogo:first-child {
    margin: 0px 3px 0px 0px;
  }

  .serviceLogo {
    margin: 0px 3px;
    background-color: rgba(0, 0, 0, 0.4);
    width: 115px;
    height: 120px;
    border-radius: 5px 5px 0px 0px;
    display: flex;
    flex-direction: column;
    color: rgb(255, 255, 255);
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .serviceLogo:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .activeServiceLogo, .activeServiceLogo:hover {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    /* background: linear-gradient(top, rgba(30,87,153,0), rgba(30,87,153,0.8)); */
    /* -webkit-background-clip: text; */
    
  }

  .serviceLogoLabel {
    text-decoration: underline;
    text-underline-offset: 5px;

    

  }

  .serviceLogoItem {
    font-size: 42px;
  }

  .serviceInput {
    border-radius: 0px 5px 5px 5px;
    background-color: rgb(255, 255, 255);
    min-height: 150px;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }

  .planeInput {
    width: 175px;
  }

  .serviceInputRow {
    display: flex;
    align-items: center;
  }

  .serviceInputRow > * {
    margin: 15px 8px;
  }

  .inputLogo {
    height: 25px;
    width: 225px;
  }

  .colorBtn {
    background: linear-gradient(to right, rgb(30, 200, 200) 0%, rgb(100, 100, 150) 35%, rgb(100, 100, 150) 65%, rgb(255, 87, 255) 80%);
  }

  .examples {
    text-decoration: underline;
    text-underline-offset: 5px;
    text-decoration-style: dashed;
  }

  .inputSpinner {
    width: 250px;
  }

  .inputDatePicker {
    width: 350px;
  }

  .inputDatePickerArrow {
    color: rgb(0, 0, 255);
    cursor: pointer;
    user-select: none;
  }

</style>