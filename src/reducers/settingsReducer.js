const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'soundsOn':
      return {
        ...state,
        soundsOn: true,
      };
    case 'soundsOff':
      return {
        ...state,
        soundsOn: false,
      };
    case 'showLetters':
      return {
        ...state,
        showLetters: true,
      };
    case 'hideLetters':
      return {
        ...state,
        showLetters: false,
      };
    case 'showSignals':
      return {
        ...state,
        showSignals: true,
      };
    case 'hideSignals':
      return {
        ...state,
        showSignals: false,
      };
    default:
      throw new Error('Unknown setting value.');
  }
};

export default settingsReducer;
