
const insertIntoDB = async (payload: any) => {
    const { startTime, endTime, startDate, endDate } = payload;
    const intervalTime = 30; // Interval time in minutes
    const currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);
    return payload;
}

export const ScheduleService = {
    insertIntoDB,
}