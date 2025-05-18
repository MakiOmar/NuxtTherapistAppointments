<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">{{ $t('doctor_settings_title') }}</h1>

    <!-- الحالة: أونلاين / أوفلاين / كلاهما -->
    <div class="mb-6">
      <label class="block font-medium mb-2">{{ $t('availability_mode') }}</label>
      <USelect
        v-model="form.availability"
        :items="availabilityOptions"
        class="w-full"
      />
    </div>

    <!-- إضافة عيادات -->
    <div class="mb-6">
      <label class="block font-medium mb-2">{{ $t('clinics') }}</label>
      <div v-for="(clinic, index) in form.clinics" :key="index" class="border p-4 rounded mb-4 space-y-2 bg-gray-50">
        <UInput v-model="clinic.name" :placeholder="$t('clinic_name')" />
        <UInput v-model="clinic.address" :placeholder="$t('clinic_address')" />

        <!-- الأسعار حسب المدة -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
          <UInput v-model="clinic.price_30" type="number" :placeholder="$t('price_30')" />
          <UInput v-model="clinic.price_45" type="number" :placeholder="$t('price_45')" />
          <UInput v-model="clinic.price_60" type="number" :placeholder="$t('price_60')" />
        </div>

        <!-- تعطيل الحجز في هذه العيادة -->
        <UToggle v-model="clinic.disabled" :label="$t('disable_booking')" />
      </div>

      <UButton @click="addClinic" color="gray">{{ $t('add_clinic') }}</UButton>
    </div>

    <!-- تسعير مختلف للعملاء الجدد -->
    <div class="mb-6">
      <UToggle v-model="form.enable_new_patient_pricing" :label="$t('enable_new_patient_pricing')" />
      <div v-if="form.enable_new_patient_pricing" class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
        <UInput v-model="form.new_patient_price_30" type="number" :placeholder="$t('price_30')" />
        <UInput v-model="form.new_patient_price_45" type="number" :placeholder="$t('price_45')" />
        <UInput v-model="form.new_patient_price_60" type="number" :placeholder="$t('price_60')" />
      </div>
    </div>

    <!-- زر حفظ/نشر -->
    <UButton @click="saveSettings" color="primary" class="mt-6">
      {{ $t('publish_sessions') }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const availabilityOptions = [
  { label: t('online_only'), value: 'online' },
  { label: t('offline_only'), value: 'offline' },
  { label: t('both'), value: 'both' }
]


const form = reactive({
  availability: 'both',
  clinics: [
    {
      name: '',
      address: '',
      price_30: '',
      price_45: '',
      price_60: '',
      disabled: false
    }
  ],
  enable_new_patient_pricing: false,
  new_patient_price_30: '',
  new_patient_price_45: '',
  new_patient_price_60: ''
})

function addClinic() {
  form.clinics.push({
    name: '',
    address: '',
    price_30: '',
    price_45: '',
    price_60: '',
    disabled: false
  })
}

function saveSettings() {
  // تنفيذ الحفظ لاحقًا
  console.log('Saving settings...', form)
}
</script>
