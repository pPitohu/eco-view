import { useMapStore } from '.'

const actions = {
  loadMarkers: async () => {
    
    const mapStore = useMapStore()
    mapStore.markers = [
      {
        id: '1',
        name: 'first',
        coords: [ 53.943997, 27.712215 ],
        garbageType: [ 'plastic', 'paper' ]
      },
      {
        id: '2',
        name: 'second',
        coords: [ 53.93333, 27.7000 ],
        garbageType: [ 'metal', 'paper', 'clothes' ]
      }
    ]

    mapStore.setMarkersImage()

    // const handleSuccessStatus = () => {
    // }

    // handleResponse({
    //   handleSuccessStatus,
    //   response,
    //   successStatus: 200
    // })
  }
}

export default actions
