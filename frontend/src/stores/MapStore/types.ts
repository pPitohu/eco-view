import blueMarkerIcon from '@/assets/icons/blue-marker-icon.svg'
import defaultMarkerIcon from '@/assets/icons/default-marker-icon.svg'
import grayMarkerIcon from '@/assets/icons/gray-marker-icon.svg'
import orangeMarkerIcon from '@/assets/icons/orange-marker-icon.svg'
import pinkMarkerIcon from '@/assets/icons/pink-marker-icon.svg'
import redMarkerIcon from '@/assets/icons/red-marker-icon.svg'

export interface Filter {
  name: string,
  value: string,
  icon: string,
  isActive: boolean,
  activeColor: string,
  action?: Function
}

export enum FilterColors {
  all = '#426A8C',
  paper = '#91D925',
  plastic = '#F2D46B',
  metal = '#EA3838',
  glass = '#5EC8F2',
  clothes = '#F2C9E0'
}

export enum FilterValues {
  all = 'all',
  paper = 'paper',
  plastic = 'plastic',
  metal = 'metal',
  glass = 'glass',
  clothes = 'clothes'
}

export interface Marker {
  _id: string,
  name: string,
  coords: [number, number],
  garbageType: string[],
  icon: string,
  approvalStatus: string,
  author: string,
  isVisible: boolean,
  createdAt: string,
  updatedAt: string
}

export const MarkerIcons = {
  [FilterValues.paper]: defaultMarkerIcon,
  [FilterValues.glass]: blueMarkerIcon,
  [FilterValues.metal]: redMarkerIcon,
  [FilterValues.plastic]: orangeMarkerIcon,
  [FilterValues.clothes]: pinkMarkerIcon,
  'gray': grayMarkerIcon,
}

export const ruGarbageType = {
  [FilterValues.paper]: 'Бумага',
  [FilterValues.plastic]: 'Пластик',
  [FilterValues.metal]: 'Металл',
  [FilterValues.glass]: 'Стекло',
  [FilterValues.clothes]: 'Одежда'
}
