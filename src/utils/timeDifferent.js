const timeDifferent = (a, b) => {
   const [hours, minutes, seconds] = a
      .replace(/PT/g, "")
      .split(/[HMS]+/)
      .map((x) => +x)
   const [hours2, minutes2, seconds2] = b
      .replace(/PT/g, "")
      .split(/[HMS]+/)
      .map((x) => +x)
   return seconds + (minutes - 1) * 60 + (hours - 24) * 3600 - (seconds2 + (minutes2 - 1) * 60 + (hours2 - 24) * 3600)
}

export default timeDifferent
