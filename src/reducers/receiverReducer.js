const receiverReducer = (state, action) => {
  switch (action.type) {
    case "error":
      const newErrorCount = state.totalErrors + 1;
      console.log("Errors: ", newErrorCount)
      return {
        ...state,
        isError: true,
        totalErrors: newErrorCount,
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
    case "resetSignal":
      return {
        ...state,
        lastSignalReceived: "",
      }
    case "resetMessage":
      return {
        userSubmittedMessage: action.payload,
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