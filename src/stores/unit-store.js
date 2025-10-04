import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUnits, getUnitDetails } from '../services/unit-service'

export const useUnitStore = defineStore('unit', () => {
  const unitList = ref([])
  const unitDetails = ref({})

  const getUnitList = async () => {
    const result = await getUnits()
    unitList.value = result.data.data
  }

  const getSpecificUnitDetails = async (unitCode) => {
    const result = await getUnitDetails(unitCode)
    unitDetails.value = result.data.data
  }

  const resetUnitDetails = () => {
    unitDetails.value = {}
  }

  return {
    unitList,
    unitDetails,
    getUnitList,
    resetUnitDetails,
    getSpecificUnitDetails,
  }
})
