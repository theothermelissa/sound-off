const receiverReducer = (state, action) => {
  const newErrorCount = state.totalErrors + 1;
  switch (action.type) {
    case 'invalidSignal':
      return {
        ...state,
        isError: true,
        totalErrors: newErrorCount,
        lastSignalReceived: 'error',
        signalStartTimes: [...state.signalStartTimes, action.startTime],
        signalEndTimes: [...state.signalEndTimes, action.endTime],
      };
    case 'error':
      return {
        ...state,
        isError: true,
        totalErrors: newErrorCount,
        lastSignalReceived: 'error',
      };
    case 'dot':
      return {
        ...state,
        lastSignalReceived: 'dot',
        isBegun: true,
        signalStartTimes: [...state.signalStartTimes, action.startTime],
        signalEndTimes: [...state.signalEndTimes, action.endTime],
      };
    case 'dash':
      return {
        ...state,
        lastSignalReceived: 'dash',
        isBegun: true,
        signalStartTimes: [...state.signalStartTimes, action.startTime],
        signalEndTimes: [...state.signalEndTimes, action.endTime],
      };
    case 'letter':
      console.log("Reducer's payload: ", action.payload)
      return {
        ...state,
        lastSignalReceived: action.payload,
        isBegun: true,
        signalStartTimes: [...state.signalStartTimes, action.startTime],
        signalEndTimes: [...state.signalEndTimes, action.endTime],
      };
    case 'resetSignal':
      return {
        ...state,
        lastSignalReceived: '',
      };
    case 'newMessage':
      return {
        ...state,
        userSubmittedMessage: action.payload,
        signalStartTimes: [],
        signalEndTimes: [],
        lastSignalReceived: '',
        isError: false,
        totalErrors: 0,
        isComplete: false,
        isBegun: false,
      };
    case 'reset':
      return {
        ...state,
        signalStartTimes: [],
        signalEndTimes: [],
        lastSignalReceived: '',
        isError: false,
        totalErrors: 0,
        isComplete: false,
        isBegun: false,
      };
    case 'complete':
      return {
        ...state,
        isComplete: true,
      };
    default:
      throw new Error('Unknown signal');
  }
};

export default receiverReducer;
