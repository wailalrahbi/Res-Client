export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    // Ensure that staffs slice is always undefined when loaded
    return {
      ...state,
      staffs: undefined,
    };
  } catch (err) {
    console.error("Error loading state from local storage:", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    // Remove the staffs slice before saving
    const { staffs, ...stateWithoutStaffs } = state;
    const serializedState = JSON.stringify(stateWithoutStaffs);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Error saving state to local storage:", err);
  }
};
