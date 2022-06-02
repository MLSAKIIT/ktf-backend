import { events, merchs } from "@data"
import { Event, Merch } from "@models"

export const seedData = async () => {
    try{
        await Event.deleteMany({})
        await Merch.deleteMany({})
        await Event.insertMany(events)
        await Merch.insertMany(merchs)
    }catch(err){
        console.error(err)
    }
}