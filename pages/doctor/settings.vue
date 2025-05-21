<template>
  <div class="max-w-4xl mx-auto p-6 rtl text-right">
    <h2 class="text-2xl font-bold mb-8 text-gray-800">{{ $t('settings.bookingSystemSettings') }}</h2>
    
    <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">{{ $t('settings.bookingTypeManagement') }}</h3>
      <div class="flex flex-col space-y-3">
        <label class="inline-flex items-center">
          <input type="radio" v-model="bookingType" value="online_only" class="form-radio h-5 w-5 text-blue-600">
          <span class="mr-2 text-gray-700">{{ $t('settings.onlineOnly') }}</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" v-model="bookingType" value="clinic_only" class="form-radio h-5 w-5 text-blue-600">
          <span class="mr-2 text-gray-700">{{ $t('settings.clinicOnly') }}</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" v-model="bookingType" value="both" class="form-radio h-5 w-5 text-blue-600">
          <span class="mr-2 text-gray-700">{{ $t('settings.onlineAndClinic') }}</span>
        </label>
      </div>
    </div>

    <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6" v-if="showOfflineSettings">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-700">{{ $t('settings.onlineClinicData') }}</h3>
        <button @click="addNewClinic" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <span>+ {{ $t('settings.addPlace') }}</span>
        </button>
      </div>
      
      <div v-for="(clinic, index) in onlineClinics" :key="index" class="bg-white p-5 rounded-lg shadow-sm mb-4 border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h4 class="font-medium text-gray-800">{{ $t('settings.clinic') }} {{ index + 1 }}</h4>
          <div class="flex items-center">
            <label class="switch">
              <input type="checkbox" v-model="clinic.active" class="hidden">
              <span class="slider round bg-gray-300"></span>
            </label>
            <span class="mr-2 text-sm text-gray-600">{{ $t('settings.activateClinic') }}</span>
          </div>
        </div>
       
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.placeName') }} *</label>
            <input type="text" v-model="clinic.name" required 
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
         
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.phoneNumber') }}</label>
            <input type="tel" v-model="clinic.phone"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
         
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.address') }}</label>
            <input type="text" v-model="clinic.address"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
         
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.googleMapsLink') }}</label>
            <input type="url" v-model="clinic.mapLink"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
       
        <div class="flex items-center mt-4">
          <input type="checkbox" v-model="clinic.bookingDisabled" id="disableBooking" 
                 class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
          <label for="disableBooking" class="mr-2 block text-sm text-gray-700">{{ $t('settings.disableBookingForClinic') }}</label>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">{{ $t('settings.availableSessionDurations') }}</h3>
      <div class="space-y-4">
        <div v-for="duration in availableDurations" :key="duration.minutes" 
             class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
          <div class="flex items-center">
            <input type="checkbox" v-model="duration.enabled" 
                   @change="duration.enabled ? openPricingModal(duration) : null"
                   class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
            <span class="mr-2 text-gray-700">{{ duration.minutes }} {{ $t('settings.minutes') }}</span>
          </div>
          <button @click="openPricingModal(duration)" 
                  class="text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            {{ $t('settings.editPrices') }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showPricingModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ $t('settings.pricingSettingsFor') }} {{ currentDuration?.minutes }} {{ $t('settings.minutes') }}</h3>
            <button @click="closePricingModal" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.basePrice') }}</label>
              <div class="flex">
                <input type="number" v-model="currentDuration.basePrice" min="0"
                       class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
           
            <div>
              <h5 class="text-sm font-medium text-gray-700 mb-2">{{ $t('settings.specialPricesForCountries') }}</h5>
              <div v-for="(price, country) in currentDuration.specialPrices" :key="country" class="flex items-center mb-2">
                <span class="text-sm text-gray-600 flex-1">{{ getCountryName(country) }}</span>
                <input type="number" v-model="currentDuration.specialPrices[country]" min="0"
                       class="w-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm mr-2">
                <button @click="removeSpecialPrice(currentDuration, country)" 
                        class="text-red-600 hover:text-red-800 p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div class="flex mt-2">
                <select v-model="currentDuration.newCountry"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">{{ $t('settings.selectCountry') }}</option>
                  <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
                </select>
                <button @click="addSpecialPrice(currentDuration)" 
                        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md">
                  {{ $t('settings.add') }}
                </button>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <button @click="savePricing" 
                      class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm">
                {{ $t('settings.saveChanges') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">{{ $t('settings.appointmentModificationSettings') }}</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('settings.allowClientsToReschedule') }}</label>
        <div class="flex space-x-4 rtl:space-x-reverse">
          <label class="inline-flex items-center">
            <input type="radio" v-model="allowReschedule" :value="true" class="form-radio h-4 w-4 text-blue-600">
            <span class="mr-2 text-gray-700">{{ $t('settings.yes') }}</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" v-model="allowReschedule" :value="false" class="form-radio h-4 w-4 text-blue-600">
            <span class="mr-2 text-gray-700">{{ $t('settings.no') }}</span>
          </label>
        </div>
      </div>
     
      <div v-if="allowReschedule" class="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.freeRescheduleBefore') }}</label>
            <div class="flex">
              <input type="number" v-model="freeReschedule.value" min="0"
                     class="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <select v-model="freeReschedule.unit"
                      class="px-3 py-2 border border-l-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="hours">{{ $t('settings.hour') }}</option>
                <option value="days">{{ $t('settings.day') }}</option>
                <option value="weeks">{{ $t('settings.week') }}</option>
              </select>
            </div>
          </div>
         
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.feeAfterThat') }}</label>
            <div class="flex">
              <input type="number" v-model="rescheduleFeePercent" min="0" max="100"
                     class="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <span class="flex items-center px-3 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-l-md">%</span>
            </div>
          </div>
         
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.cannotRescheduleBefore') }}</label>
            <div class="flex">
              <input type="number" v-model="minRescheduleNotice.value" min="0"
                     class="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <select v-model="minRescheduleNotice.unit"
                      class="px-3 py-2 border border-l-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="hours">{{ $t('settings.hour') }}</option>
                <option value="days">{{ $t('settings.day') }}</option>
                <option value="weeks">{{ $t('settings.week') }}</option>
              </select>
            </div>
          </div>
         
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.allowedRescheduleAttempts') }}</label>
            <div class="flex">
              <input type="number" v-model="maxRescheduleAttempts" min="1"
                     class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">{{ $t('settings.lastMinuteBookingSettings') }}</h3>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.lastTimeForBooking') }}</label>
        <div class="flex">
          <input type="number" v-model="lastMinuteBooking.value" min="0"
                 class="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <select v-model="lastMinuteBooking.unit"
                  class="px-3 py-2 border border-l-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="hours">{{ $t('settings.hour') }}</option>
            <option value="days">{{ $t('settings.day') }}</option>
          </select>
        </div>
        <p class="mt-1 text-xs text-gray-500">{{ $t('settings.lastMinuteBookingHint') }}</p>
      </div>
    </div>

    <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">{{ $t('settings.holidays') }}</h3>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('settings.sessionsRemovedOnHolidays') }}</label>
        <div class="space-y-2 mb-3">
          <div v-for="(holiday, index) in holidays" :key="index" class="flex items-center">
            <input type="date" v-model="holiday.date"
                   class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <button @click="removeHoliday(index)" 
                    class="ml-2 text-red-600 hover:text-red-800 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <button @click="addHoliday" 
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          {{ $t('settings.addHoliday') }}
        </button>
      </div>
    </div>

    <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">{{ $t('settings.bookingWindowSettings') }}</h3>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.daysInBookingForm') }}</label>
        <div class="flex">
          <input type="number" v-model="bookingWindowDays" min="1" max="90"
                 class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <p class="mt-1 text-xs text-gray-500">{{ $t('settings.bookingWindowHint') }}</p>
      </div>
    </div>

    <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">{{ $t('settings.newVsExistingClientPricing') }}</h3>
      <div class="mb-4">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="enableDifferentPricing" 
                 class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
          <span class="mr-2 text-gray-700">{{ $t('settings.enableDifferentPricing') }}</span>
        </label>
      </div>
     
      <div v-if="enableDifferentPricing" class="bg-white p-4 rounded-lg border border-gray-200">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('settings.gracePeriodForOldPrice') }}</label>
          <div class="flex">
            <input type="number" v-model="pricingGracePeriod.value" min="0"
                   class="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <select v-model="pricingGracePeriod.unit"
                    class="px-3 py-2 border border-l-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="days">{{ $t('settings.day') }}</option>
              <option value="weeks">{{ $t('settings.week') }}</option>
              <option value="months">{{ $t('settings.month') }}</option>
            </select>
          </div>
          <p class="mt-1 text-xs text-gray-500">{{ $t('settings.gracePeriodHint') }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <button @click="saveSettings" 
              class="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-sm font-medium">
        {{ $t('settings.saveSettings') }}
      </button>
    </div>
  </div>
</template>

<script>
const toast = useToast()
export default {
  name: 'Settings',
  data() {
    return {
      bookingType: 'online_only',
      onlineClinics: [
        {
          active: true,
          name: '',
          phone: '',
          address: '',
          mapLink: '',
          bookingDisabled: false
        }
      ],
      availableDurations: [
        { minutes: 60, enabled: true, basePrice: 0, currency: 'SAR', specialPrices: {}, newCountry: '' },
        { minutes: 45, enabled: false, basePrice: 0, currency: 'SAR', specialPrices: {}, newCountry: '' },
        { minutes: 30, enabled: false, basePrice: 0, currency: 'SAR', specialPrices: {}, newCountry: '' }
      ],
      countries: [
        { code: 'SA', name: 'السعودية' },
        { code: 'AE', name: 'الإمارات' },
        { code: 'EG', name: 'مصر' },
        // Add more countries as needed
      ],
      allowReschedule: false,
      freeReschedule: {
        value: 2,
        unit: 'days'
      },
      rescheduleFeePercent: 0,
      minRescheduleNotice: {
        value: 1,
        unit: 'days'
      },
      maxRescheduleAttempts: 1,
      lastMinuteBooking: {
        value: 3,
        unit: 'hours'
      },
      holidays: [],
      bookingWindowDays: 25,
      enableDifferentPricing: false,
      pricingGracePeriod: {
        value: 2,
        unit: 'months'
      },
      showPricingModal: false,
      currentDuration: null
    }
  },
  computed: {
    showOfflineSettings() {
      return this.bookingType === 'clinic_only' || this.bookingType === 'both';
    }
  },
  methods: {
    getCountryName(code) {
      const country = this.countries.find(c => c.code === code);
      return country ? this.$t(`countries.${country.code}`) : code;
    },
    addNewClinic() {
      this.onlineClinics.push({
        active: false,
        name: '',
        phone: '',
        address: '',
        mapLink: '',
        bookingDisabled: false
      });
    },
    addSpecialPrice(duration) {
      if (duration.newCountry && !duration.specialPrices[duration.newCountry]) {
        duration.specialPrices[duration.newCountry] = 0; // Directly assign for Vue 3 reactivity
        duration.newCountry = ''; // Clear the selection after adding
      }
    },
    removeSpecialPrice(duration, country) {
      delete duration.specialPrices[country]; // Use native JavaScript delete for Vue 3 reactivity
    },
    addHoliday() {
      this.holidays.push({ date: '' });
    },
    removeHoliday(index) {
      this.holidays.splice(index, 1);
    },
    saveSettings() {
      // Here you would typically send the settings to your Laravel backend
      console.log('Settings to save:', {
        bookingType: this.bookingType,
        onlineClinics: this.onlineClinics,
        availableDurations: this.availableDurations.filter(d => d.enabled),
        allowReschedule: this.allowReschedule,
        rescheduleSettings: {
          freeReschedule: this.freeReschedule,
          rescheduleFeePercent: this.rescheduleFeePercent,
          minRescheduleNotice: this.minRescheduleNotice,
          maxRescheduleAttempts: this.maxRescheduleAttempts
        },
        lastMinuteBooking: this.lastMinuteBooking,
        holidays: this.holidays,
        bookingWindowDays: this.bookingWindowDays,
        pricingSettings: {
          enableDifferentPricing: this.enableDifferentPricing,
          pricingGracePeriod: this.pricingGracePeriod
        }
      });
      toast.add({
        title: 'Success',
        description: this.$t('settings.settingsSavedSuccessfully'),
        position: 'top-left',
        duration: 3000,
        color: 'green' // optional (green, red, blue, etc.)
      })
    },
    openPricingModal(duration) {
      this.currentDuration = JSON.parse(JSON.stringify(duration));
      this.showPricingModal = true;
    },
    closePricingModal() {
      this.showPricingModal = false;
      this.currentDuration = null;
    },
    savePricing() {
      // Find and update the original duration
      const index = this.availableDurations.findIndex(d => d.minutes === this.currentDuration.minutes);
      if (index !== -1) {
        this.availableDurations[index] = this.currentDuration;
      }
      this.closePricingModal();
    },
  }
}
</script>

<style scoped>
/* Switch styling */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #3b82f6;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>