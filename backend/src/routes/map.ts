import express from 'express'
import { UserRoles } from '../constants/userRoles'
import { MapController } from '../controllers/map'
import { authorize } from '../middlewares/authorize'

const MapRouter = express.Router()

MapRouter.get('/markers/all', MapController.getAllMarkers)
MapRouter.post('/markers/add', authorize([ UserRoles.USER, UserRoles.ADMIN ]), MapController.addMarker)
MapRouter.post('/markers/approve', authorize([UserRoles.ADMIN]), MapController.approveMarker)
MapRouter.post('/markers/delete', authorize([UserRoles.ADMIN]), MapController.deleteMarker)

export default MapRouter
