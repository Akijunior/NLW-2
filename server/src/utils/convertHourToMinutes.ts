export default function convertHourToMinutes(time: string) {

    const [hour, minutes] = time.split(":").map(Number); // converte cada um para numérico
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}
