const { Router } = require('express')
const router = Router()
const _ = require('underscore')
const banner = require('../json/Banner.json')

const ban = banner.Banner

router.get('/', (req, res) => {
    res.json(ban)
})

router.post('/', (req, res) => {
    const { Img, Nombre } = req.body
    if (Img && Nombre) {
        const id = ban.length + 1
        const newBanner = {...req.body, id}
        console.log(newBanner)
        ban.push(newBanner)
        res.json(ban)
    } else {
        res.status(error).json({error: 'Error al guardar'})
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const { Img, Nombre } = req.body
    if (Img && Nombre) {
        _.each(ban, (bann, i) => {
            if (bann.id == id) {
                bann.Img = Img
                bann.Nombre = Nombre
            }
        })
        res.json(ban)
    } else {
        res.status(error).json({error: 'Hubo un error'})
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    _.each(ban, (bann, i) => {
        if (bann.id == id) {
            ban.splice(i, 1)
        }
    })
    res.send(ban)
})

module.exports = router