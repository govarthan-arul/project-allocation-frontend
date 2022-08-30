import {combineReducers} from 'redux';
import projectReducers from './project/projectReducers'
const initState = {
    projects : [
        {
            "projectId":1,
            "projectName": "Smart Wind power",
            "marketPrice": "0.5",
            "vintages": [
                {
                    "year": 2000, 
                    "reservationId": 1234567, 
                    "balanceAvailable": 20, 
                    "pricePerUnit": 10
                },
                {
                    "year": 2001, 
                    "reservationId": 1234568, 
                    "balanceAvailable": 50, 
                    "pricePerUnit": 20
                },
            ]
        },
        {
            "projectId":2,
            "projectName": "Telengana Wind power",
            "marketPrice": 1.5,
            "vintages": [
                {
                    "year": 2021, 
                    "reservationId": 1234567, 
                    "balanceAvailable": 120, 
                    "pricePerUnit": 100
                },
                {
                    "year": 2022, 
                    "reservationId": 1234568, 
                    "balanceAvailable": 200, 
                    "pricePerUnit": 10
                },
            ]
        },
    ]
}
const rootReducer = combineReducers({
    projects:projectReducers
})
export default rootReducer