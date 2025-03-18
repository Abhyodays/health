export const getTimeDifferenceMessage = (eventTime:string)=>{
    const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return { hours, minutes };
  };

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  
  const { hours: eventHours, minutes: eventMinutes } = parseTime(eventTime);

  const currentTotalMinutes = currentHours * 60 + currentMinutes;
  const eventTotalMinutes = eventHours * 60 + eventMinutes;
  const diffMinutes = eventTotalMinutes - currentTotalMinutes;

  if (diffMinutes <= 0) return "";

  const diffHours = Math.floor(diffMinutes / 60);
  const diffMins = diffMinutes % 60;

  if (diffHours > 0 && diffMins > 0) {
    return `Coming up in ${diffHours+1} hours`;
  } else if (diffHours > 0) {
    return `Coming up in ${diffHours} hours`;
  } else {
    return `Coming up in ${diffMins} minutes`;
  }
}