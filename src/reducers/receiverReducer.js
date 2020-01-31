const receiverReducer = (state, action) => {
  console.log("gameMasterDispatch activated.")
  switch (action.type) {
    case "error":
      return {
        ...state,
        isError: true,
        lastSignalReceived: "error",
        signalStartTimes: [...state.signalStartTimes, action.startTime],
        signalEndTimes: [...state.signalEndTimes, action.endTime]
      };
    case "dot":
      return {
        ...state,
        lastSignalReceived: "dot",
        signalStartTimes: [...state.signalStartTimes, action.startTime],
        signalEndTimes: [...state.signalEndTimes, action.endTime]
      };
    case "dash":
      return {
        ...state,
        lastSignalReceived: "dash",
        signalStartTimes: [...state.signalStartTimes, action.startTime],
        signalEndTimes: [...state.signalEndTimes, action.endTime]
      };
    case "reset":
      return {
        userSubmittedMessage: action.newMessage,
        signalStartTimes: [],
        signalEndTimes: [],
        lastSignalReceived: "",
        isError: false,
        totalErrors: 0,
        isComplete: false,
      }
    case "complete":
      return {
        ...state,
        isComplete: true,
      }
    default:
      throw new Error("Unknown signal");
  }
};

export default receiverReducer;