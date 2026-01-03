exports.createJitsiMeet = () => {
  const room = `calendar-${Date.now()}`;
  return `https://meet.jit.si/${room}`;
};
