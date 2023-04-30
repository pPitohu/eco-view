import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import fourSquares from '@/assets/icons/four-squares.svg'
import glassBottle from '@/assets/icons/glass-bottle.svg'
import metallicBottle from '@/assets/icons/metallic-bottle.svg'
import paperPlane from '@/assets/icons/paper-plane.svg'
import plasticBottle from '@/assets/icons/plastic-bottle.svg'
import tShirt from '@/assets/icons/t-shirt.svg'
import actions from './actions'
import { type Filter, FilterColors, FilterValues, type Marker, MarkerIcons } from './types'

const mapStore = () => {
  const filters = ref<Filter[]>([
    {
      name: 'Все',
      value: FilterValues.all,
      icon: fourSquares,
      isActive: true,
      activeColor: FilterColors.all,
      action: () => disableFiltersExcept(FilterValues.all)
    },
    {
      name: 'Бумага',
      value: FilterValues.paper,
      icon: paperPlane,
      isActive: false,
      activeColor: FilterColors.paper
    },
    {
      name: 'Стекло',
      value: FilterValues.glass,
      icon: glassBottle,
      isActive: false,
      activeColor: FilterColors.glass
    },
    {
      name: 'Пластик',
      value: FilterValues.plastic,
      icon: plasticBottle,
      isActive: false,
      activeColor: FilterColors.plastic
    },
    {
      name: 'Металл',
      value: FilterValues.metal,
      icon: metallicBottle,
      isActive: false,
      activeColor: FilterColors.metal
    },
    {
      name: 'Одежда',
      value: FilterValues.clothes,
      icon: tShirt,
      isActive: false,
      activeColor: FilterColors.clothes
    }
  ])

  const activeFilters = computed(() => filters.value.filter(({ isActive }) => isActive))
  const activeFiltersValues = computed(() => activeFilters.value.map(filter => filter.value))

  const findFilterByValue = (filterValue: Filter['value']) => {
    return filters.value.find(({ value }) => value === filterValue)
  }

  const disableFiltersExcept = (filterValue: Filter['value']) => {
    const filter = findFilterByValue(filterValue)
    if (filter && filter.isActive)
      return
    filters.value.map(filter => {
      if (filter.value !== filterValue)
        filter.isActive = false
    })
  }

  const toggleFilterActive = (filterValue: Filter['value']) => {
    const filter = findFilterByValue(filterValue)
    if (filter)
      filter.isActive = !filter.isActive
  }

  const setFilterActive = (filterValue: Filter['value']) => {
    const filter = findFilterByValue(filterValue)
    if (filter)
      filter.isActive = true
  }

  const setFilterInactive = (filterValue: Filter['value']) => {
    const filter = findFilterByValue(filterValue)
    if (filter)
      filter.isActive = false
  }

  const markers = ref<Marker | any>([])
  const markersToDisplay = ref<Marker | any>([])

  const modifyMarker = (marker: Marker) => {
    const setMarkerIcon = (marker: Marker) => {
      const markerIcon = marker.approvalStatus === 'approved'
        ? MarkerIcons[marker.garbageType[0]]
        : MarkerIcons['gray']
      const markerWithIcon = { ...marker, icon: markerIcon }
      return markerWithIcon
    }
    
    const markerWithIcon = setMarkerIcon(marker)

    return markerWithIcon
  }

  const modifyMarkers = () => {
    markers.value = markers.value.map(modifyMarker)
  }

  const isMarkerVisible = (marker: Marker) => {
    const isVisible = marker.garbageType.some(type =>
      activeFiltersValues.value.includes(type))
    return isVisible
  }
  watch([ markers, activeFilters ], () => {
    if (findFilterByValue(FilterValues.all)?.isActive)
      markersToDisplay.value = markers.value
    else markersToDisplay.value = markers.value.filter(isMarkerVisible)
  })

  return {
    markers,
    markersToDisplay,
    filters,
    activeFilters,
    activeFiltersValues,
    toggleFilterActive,
    setFilterActive,
    setFilterInactive,
    findFilterByValue,
    isMarkerVisible,
    modifyMarker,
    modifyMarkers,
    ...actions
  }
}

export const useMapStore = defineStore(
  'MapStore',
  mapStore
)
