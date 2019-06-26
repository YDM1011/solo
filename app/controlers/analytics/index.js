const mongoose = require('mongoose');
const moment = require('moment')
const BasketsList = mongoose.model('basketsList');

module.exports.overview = async function(req, res) {
    console.log('Hellollllll')
    try {
        const allOrders = await BasketsList.find({ownerest: req.params['id'], status: 6}).sort({data: 1})
        const ordersMap = getOrdersMap(allOrders)
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

        //кількість замовлень вчора
        const yesterdayOrdersNumber = yesterdayOrders.length
        //кількість замовлень
        const totalOrdersNumber = allOrders.length
        //кількість днів
        const daysNumber = Object.keys(ordersMap).length
        //замовлень в день
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
        //відсоток для кількості замовлень
        // ((замовлень вчора / кількість замовлень в день) - 1) * 100
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) -1) *100).toFixed(2)
        //загальна виручка
        const totalGain = calculatePrice(allOrders)
        //виручка за день
        const gainPerDay = (totalGain / daysNumber).toFixed(2)
        //виручка за вчора
        const yesterdayGain = calculatePrice(yesterdayOrders)
        //відсоток виручки
        const gainPercent = (((yesterdayGain / gainPerDay) -1) *100).toFixed(2)
        //порівняння виручки
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
        //порівняння кількості замовлень
        const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+gainPerDay),
                yesterday: +yesterdayGain,
                isHigher: +gainPercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+ordersPerDay),
                yesterday: +yesterdayOrdersNumber,
                isHigher: +ordersPercent > 0
            }
        })

    } catch (e) {
        res.status(500).json({
            message: e.message ? e.message : error
        })
    }
}

function getOrdersMap(orders = []) {
    const daysOrders = {}
    orders.forEach(order => {
        const date = moment(order.data).format('DD.MM.YYYY')

        if (date === moment().format('DD.MM.YYYY')) {
            return
        }

        if (!daysOrders[date]) {
            daysOrders[date] = []
        }

        daysOrders[date].push(order)
    })
    return daysOrders
}

function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.totalPrice+order.boxesPrice+order.deliveryPrice;
        return total += orderPrice
    }, 0)
}
