import express from 'express'
import { UserRoles } from '../constants/userRoles'
import { MapController } from '../controllers/map'
import { authorize } from '../middlewares/authorize'

const MapRouter = express.Router()

MapRouter.get('/markers/all', authorize([ UserRoles.USER, UserRoles.ADMIN ]), MapController.getAllMarkers)
MapRouter.post('/markers/add', authorize([ UserRoles.USER, UserRoles.ADMIN ]), MapController.addMarker)

export default MapRouter
