import mongoose from 'mongoose'

const MarkerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  garbageType: {
    type: Array,
    required: true
  },
  coords: {
    type: [ Number, Number ],
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  approvalStatus: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  collection: 'markers'
})

export default mongoose.model('Marker', MarkerSchema)
