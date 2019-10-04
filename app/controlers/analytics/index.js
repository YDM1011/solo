const mongoose = require('mongoose');
const moment = require('moment')
const BasketsList = mongoose.model('basketsList');

module.exports.overview = async function(req, res) {
    try {
        const allOrders = await BasketsList.find({ownerest: req.params['id'], status: 6})
        .populate({path:'estAddressData'})
        .sort({dataUpdate: -1});
        const ordersMap = getOrdersMap(allOrders)
        const ordersMapPlace = getOrdersMapPlace(allOrders);
        const adressPlace = getAdressMapPlace(allOrders);
        const ordersGroup = getOrdersGroup(ordersMap)
        const summaryOrders = getSummaryOrders(ordersMap)

        
        const summaryOrdersPlace = getSummaryOrdersPlace(ordersMapPlace)
        const reserveOrders = geReservefOrders(ordersMap)
        const selfOrders = geBySelfOrders(ordersMap)
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
            },
            summaryOrders,
            summaryOrdersPlace,
            adressPlace
        })

    } catch (e) {
        res.status(500).json({
            message: e.message ? e.message : error
        })
    }
}

module.exports.overviewAll = async function(req, res) {
    try {
        const allOrders = await BasketsList.find({status: 6}).sort({dataUpdate: -1})
        const ordersMap = getOrdersMap(allOrders)
        const summaryOrders = getSummaryOrders(ordersMap)
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
        console.log(ordersMap);
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
            },
            summaryOrders            
        })

    } catch (e) {
        res.status(500).json({
            message: e.message ? e.message : error
        })
    }
}

function getAdressMapPlace(orders = []) {
    const daysOrders = {};
    const allPlace = [];

    orders.forEach(order => {
        if (order.estAddressData) {
            const place = order.estAddressData.address;

            if (allPlace.indexOf(place) == -1) {
                allPlace.push(place)
            }
        }
    });    
    return allPlace
}

function getOrdersMapPlace(orders = []) {
    const daysOrders = {};
    const allPlace = [];

    orders.forEach(order => {
        if (order.estAddressData) {
            const place = order.estAddressData.address;

            if (allPlace.indexOf(place) == -1) {
                allPlace.push(place)
            }

            if (!daysOrders[place]) {
                daysOrders[place] = []
            }

            const date = moment(order.dataUpdate).format('DD.MM.YYYY')

            //if (!daysOrders[place][date]) {
            //    daysOrders[place][date] = []
            //}

            //daysOrders[place][date].push(order)
            daysOrders[place].push(order)
        }
    });
    const daysOrdersPlace = [];
    allPlace.forEach(dor => {
        daysOrdersPlace.push(getOrdersMap(daysOrders[dor]));
        //daysOrdersPlace[dor] = getOrdersMap(daysOrders[dor]);
    });
    return daysOrdersPlace
}

function getOrdersMap(orders = []) {
    const daysOrders = {}
    orders.forEach(order => {
        const date = moment(order.dataUpdate).format('DD.MM.YYYY')

        //if (date === moment().format('DD.MM.YYYY')) {
        //    return
        //}

        if (!daysOrders[date]) {
            daysOrders[date] = []
        }

        daysOrders[date].push(order)
    })
    return daysOrders
}

function getOrdersGroup(orders = []) {
    const daysOrders = [];
    for (key in orders) {
        /* ... делать что-то с obj[key] ... */
        daysOrders.push(orders[key])
      }    
    return daysOrders
}

//function getDeliveryOrders(orders = []) {
//    const daysOrders = [];
//    for (key in orders) {
//        /* ... делать что-то с obj[key] ... */
//        const delOrder = [];
//        orders[key].forEach(order => {
//            if (order.orderType == 'delivery')
//                delOrder.push(order)
//        })
//       if (delOrder.length != 0) daysOrders.push(delOrder)
//      }    
//    return daysOrders
//}

function getSummaryOrders(orders = []) {
    const daysOrders = [];
    for (key in orders) {
        /* ... делать что-то с obj[key] ... */
        let sumDel = 0;
        let sumSelf = 0;
        let sumRes = 0;
        let fiat = 0;
        let card = 0;
        let foodcoin = 0;
        let count_sumDel = 0;
        let count_sumSelf = 0;
        let count_sumRes = 0;
        let count_fiat = 0;
        let count_card = 0;
        let count_foodcoin = 0;
        let delOrder = {};
        orders[key].forEach(order => {
            totPrice = order.editByAdmin ? order.editByAdmin.totalPrice || order.totalPrice : order.totalPrice;
            delPrice = order.editByAdmin ? order.editByAdmin.deliveryPrice || order.deliveryPrice : order.deliveryPrice;
            boxPrice = order.editByAdmin ? order.editByAdmin.boxesPrice || order.boxesPrice : order.boxesPrice;
            if (order.orderType == 'delivery') {
                count_sumDel += 1;
                sumDel += totPrice+delPrice+boxPrice;
                if (order.paymentType == 'fiat') {
                    count_fiat += 1;
                    fiat += totPrice+delPrice+boxPrice;
                }
                if (order.paymentType == 'card') {
                    count_card += 1;
                    card += totPrice+delPrice+boxPrice;
                }
                if (order.paymentType == 'coin') {
                    count_foodcoin += 1;
                    foodcoin += totPrice+delPrice+boxPrice;
                }
            }
            if (order.orderType == 'bySelf') {
                count_sumSelf += 1;
                sumSelf += totPrice+boxPrice;
                if (order.paymentType == 'fiat') {
                    count_fiat += 1;
                    fiat += totPrice+boxPrice;
                }
                if (order.paymentType == 'card') {
                    count_card += 1;
                    card += totPrice+boxPrice;
                }
                if (order.paymentType == 'coin') {
                    count_foodcoin += 1;
                    foodcoin += totPrice+boxPrice;
                }
            }
            if (order.orderType == 'reserve') {
                count_sumRes += 1;
                sumRes += totPrice;
                if (order.paymentType == 'fiat') {
                    count_fiat += 1;
                    fiat += totPrice;
                }
                if (order.paymentType == 'card') {
                    count_card += 1;
                    card += totPrice;
                }
                if (order.paymentType == 'coin') {
                    count_foodcoin += 1;
                    foodcoin += totPrice;
                }
            }           
            delOrder= {
                'total': sumDel+sumSelf+sumRes,
                'sumDel': sumDel,
                'sumSelf': sumSelf,
                'sumRes': sumRes,
                'fiat': fiat,
                'card': card,
                'foodcoin': foodcoin,
                'count_total': count_sumDel+count_sumSelf+count_sumRes,
                'count_sumDel': count_sumDel,
                'count_sumSelf': count_sumSelf,
                'count_sumRes': count_sumRes,
                'count_fiat': count_fiat,
                'count_card': count_card,
                'count_foodcoin': count_foodcoin,
                'data': key
            }
        })
        if (Object.keys(delOrder).length != 0) daysOrders.push(delOrder)
      }    
    return daysOrders
}

function getSummaryOrdersPlace(orders) {
    const AlldaysOrders = [];

    for (key in orders) {
        /* ... делать что-то с obj[key] ... */
        const daysOrders = [];
        //return orders[key]   
        for (key1 in orders[key]) {
            let sumDel = 0;
            let sumSelf = 0;
            let sumRes = 0;
            let fiat = 0;
            let card = 0;
            let foodcoin = 0;
            let count_sumDel = 0;
            let count_sumSelf = 0;
            let count_sumRes = 0;
            let count_fiat = 0;
            let count_card = 0;
            let count_foodcoin = 0;
            let delOrder = {};
            orders[key][key1].forEach(order => {
                totPrice = order.editByAdmin ? order.editByAdmin.totalPrice || order.totalPrice : order.totalPrice;
                delPrice = order.editByAdmin ? order.editByAdmin.deliveryPrice || order.deliveryPrice : order.deliveryPrice;
                boxPrice = order.editByAdmin ? order.editByAdmin.boxesPrice || order.boxesPrice : order.boxesPrice;
                if (order.orderType == 'delivery') {
                    count_sumDel += 1;
                    sumDel += totPrice+delPrice+boxPrice;
                    if (order.paymentType == 'fiat') {
                        count_fiat += 1;
                        fiat += totPrice+delPrice+boxPrice;
                    }
                    if (order.paymentType == 'card') {
                        count_card += 1;
                        card += totPrice+delPrice+boxPrice;
                    }
                    if (order.paymentType == 'coin') {
                        count_foodcoin += 1;
                        foodcoin += totPrice+delPrice+boxPrice;
                    }
                }
                if (order.orderType == 'bySelf') {
                    count_sumSelf += 1;
                    sumSelf += totPrice+boxPrice;
                    if (order.paymentType == 'fiat') {
                        count_fiat += 1;
                        fiat += totPrice+boxPrice;
                    }
                    if (order.paymentType == 'card') {
                        count_card += 1;
                        card += totPrice+boxPrice;
                    }
                    if (order.paymentType == 'coin') {
                        count_foodcoin += 1;
                        foodcoin += totPrice+boxPrice;
                    }
                }
                if (order.orderType == 'reserve') {
                    count_sumRes += 1;
                    sumRes += totPrice;
                    if (order.paymentType == 'fiat') {
                        count_fiat += 1;
                        fiat += totPrice;
                    }
                    if (order.paymentType == 'card') {
                        count_card += 1;
                        card += totPrice;
                    }
                    if (order.paymentType == 'coin') {
                        count_foodcoin += 1;
                        foodcoin += totPrice;
                    }
                }           
                delOrder= {
                    'total': (sumDel+sumSelf+sumRes).toFixed(2),
                    'sumDel': (sumDel).toFixed(2),
                    'sumSelf': (sumSelf).toFixed(2),
                    'sumRes': (sumRes).toFixed(2),
                    'fiat': (fiat).toFixed(2),
                    'card': (card).toFixed(2),
                    'foodcoin': (foodcoin).toFixed(2),
                    'count_total': count_sumDel+count_sumSelf+count_sumRes,
                    'count_sumDel': count_sumDel,
                    'count_sumSelf': count_sumSelf,
                    'count_sumRes': count_sumRes,
                    'count_fiat': count_fiat,
                    'count_card': count_card,
                    'count_foodcoin': count_foodcoin,
                    'data': key1
                }
            });
            if (Object.keys(delOrder).length != 0) daysOrders.push(delOrder)
        };
        AlldaysOrders.push(daysOrders);
        //if (Object.keys(delOrder).length != 0) daysOrders.push(delOrder)
      }    
    return AlldaysOrders;

}

function geBySelfOrders(orders = []) {
    const daysOrders = [];
    for (key in orders) {
        /* ... делать что-то с obj[key] ... */
        const selfOrder = [];
        orders[key].forEach(order => {
            if (order.orderType == 'bySelf')
            selfOrder.push(order)
        })
        if (selfOrder.length != 0) daysOrders.push(selfOrder)
      }    
    return daysOrders
}

function geReservefOrders(orders = []) {
    const daysOrders = [];
    for (key in orders) {
        /* ... делать что-то с obj[key] ... */
        const reserveOrder = [];
        orders[key].forEach(order => {
            if (order.orderType == 'reserve')
            reserveOrder.push(order)
        })
        if (reserveOrder.length != 0) daysOrders.push(reserveOrder)
      }    
    return daysOrders
}

function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        totPrice = order.editByAdmin ? order.editByAdmin.totalPrice || order.totalPrice : order.totalPrice;
        delPrice = order.editByAdmin ? order.editByAdmin.deliveryPrice || order.deliveryPrice : order.deliveryPrice;
        boxPrice = order.editByAdmin ? order.editByAdmin.boxesPrice || order.boxesPrice : order.boxesPrice;
        let orderPrice = 0;
        if (order.orderType == 'delivery') {
            orderPrice = totPrice+boxPrice+delPrice;
        }
        if (order.orderType == 'bySelf') {
            orderPrice = totPrice+boxPrice;
        }
        if (order.orderType == 'reserve') {
            orderPrice = totPrice;
        }        
        return total += orderPrice;
    }, 0)
}

function calculateBox(orders = []) {
    return orders.reduce((total, order) => {
        boxPrice = order.editByAdmin ? order.editByAdmin.boxesPrice || order.boxesPrice : order.boxesPrice;
        let totalBoxPrice = 0;
        if (order.orderType == 'delivery' || order.orderType == 'bySelf') {
            totalBoxPrice = boxPrice;
        }       
        return total += totalBoxPrice;
    }, 0)
}

function calculateDelivery(orders = []) {
    return orders.reduce((total, order) => {
        delPrice = order.editByAdmin ? order.editByAdmin.deliveryPrice || order.deliveryPrice : order.deliveryPrice;
        let totalDelPrice = 0;
        if (order.orderType == 'delivery') {
            totalDelPrice = delPrice;
        }       
        return total += totalDelPrice;
    }, 0)
}

function getCategoryMap(orders = []) {

    const categoryOrders = {}

    orders.forEach(order=>{        
        order.productData.map(v=>{
            const cat = v.categoryData.name;
            if (!categoryOrders[cat]) {
                categoryOrders[cat] = 0;
            }
    
            categoryOrders[cat] += v.totalPrice;
        })        

    });    
    return categoryOrders;
    
}

module.exports.analytics = async function(req, res) {

    //console.log(req.query['select']);
    
    var month = parseInt(req.query['select']); 
    
    var date = new Date();
    var y = date.getFullYear();   
    var a = new Date(y, month, 1);
    var b = new Date(y, month+1, 0);
    //req.query = '';
    //console.log(a + ' to ' + b);
    try {
        const allOrders = await BasketsList.find({ownerest: req.params['id'], status: 6, dataUpdate: {"$gte": a,"$lte": b}})
            .populate({path:'productData', populate:{path:"categoryData"}})
            .sort({dataUpdate: 1})
        const ordersMap = getOrdersMap(allOrders);

        const categoryMap = getCategoryMap(allOrders);
        
        const total = +(calculatePrice(allOrders)).toFixed(2);
        const kilk = Object.keys(allOrders).length;
        const average = +(total / kilk).toFixed(2);

        const box = +(calculateBox(allOrders)).toFixed(2);
        const del = +(calculateDelivery(allOrders)).toFixed(2);
        
        const chart = Object.keys(ordersMap).map(label => {
            // label == 05.05.2019
            const gain = calculatePrice(ordersMap[label])
            const order = ordersMap[label].length
            
            return {label, order, gain}
        })

        const cat = Object.keys(categoryMap).map(label => {
            const sum = categoryMap[label]; 
            return {label, sum}
        });

        res.status(200).json({kilk, total, average, chart, cat, box, del})

    } catch (e) {
        res.status(500).json({
            message: e.message ? e.message : error
        })
    }
}