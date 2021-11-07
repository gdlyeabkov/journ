<template>
  <div>
    <Header :tagline="'Больше пользы для ваших путешествий'" />
    <div class="main">
      <div class="services">
        <div class="servicesLogos">
          <div @click="activeTab = 'Авиабилеты'" :class="{ serviceLogo: true, activeServiceLogo: activeTab.includes('Авиабилеты') }">
            <span class="serviceLogoItem material-icons">
              flight
            </span>
            <span class="serviceLogoLabel">
              Авиабилеты
            </span>
          </div>
          <div @click="activeTab = 'Ж/д билеты'" :class="{ serviceLogo: true, activeServiceLogo: activeTab.includes('Ж/д билеты') }">
            <span class="serviceLogoItem material-icons">
              train
            </span>
            <span class="serviceLogoLabel">
              Ж/д билеты
            </span>
          </div>
          <div @click="activeTab = 'Автобусы'" :class="{ serviceLogo: true, activeServiceLogo: activeTab.includes('Автобусы') }">
            <span class="serviceLogoItem material-icons">
              directions_bus
            </span>
            <span class="serviceLogoLabel">
              Автобусы
            </span>
          </div>
          <div @click="activeTab = 'Электрички'" :class="{ serviceLogo: true, activeServiceLogo: activeTab.includes('Электрички') }">
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
              where_to_vote
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
        <div class="serviceInput">
          <div class="serviceInputRow">
            <div class="input-group inputLogo">
              <input v-model="fromPlane" type="text" placeholder="Откуда" class="form-control planeInput" />
              <span class="input-group-text material-icons" id="basic-addon1">flight</span>
            </div>
            <div class="input-group inputLogo">
              <input v-model="toPlane" type="text" placeholder="Куда" class="form-control planeInput" />
              <span class="input-group-text material-icons" id="basic-addon1">flight</span>
            </div>
            <div class="input-group inputLogo">
              <input v-model="datePlane" type="text" placeholder="Дата вылета" class="form-control planeInput" />
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
      datePlane: '',
      backPlane: '',
      adultPlane: '',
      childPlane: '',
      kidPlane: '',
      
    }
  },
  methods: {
    findTickets(type){
      this.$router.push({ name: 'Offers', query: { offerstype: type } })
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

  

</style>