const stories = [];
const showHide = [];
const storyPoints = [];

//#region Story Activity
const addStory = (data) => {
  if (stories) {
    //if not empty
    if (stories.find((x) => x.roomId === data.roomId)) {
      //if room already exist
      for (const element of stories) {
        if (element.roomId === data.roomId) {
          element.storyDescription = data.storyDescription;
          break;
        }
      }
    } else {
      //add new rooms's story
      stories.push(data);
    }
  } else {
    //if array is empty
    stories.push(data);
  }
};

const removeStory = (roomId) => {
  const index = stories.findIndex((room) => room === roomId);
  if (index !== -1) {
    return stories.splice(index, 1)[0];
  }
};

const getAllStories = function () {
  return stories;
};
//#endregion

//#region Show Hide Button Activity
const addShowHide = (data) => {
  if (showHide) {
    //if not empty
    if (showHide.find((x) => x.roomId === data.roomId)) {
      //if room already exist
      for (const element of showHide) {
        if (element.roomId === data.roomId) {
          element.isShow = data.isShow;
          element.averagePoint = data.averagePoint;
          break;
        }
      }
    } else {
      //add new rooms's story
      showHide.push(data);
    }
  } else {
    //if array is empty
    showHide.push(data);
  }
};

const getAllShowHide = function () {
  return showHide;
};
//#endregion

//#region Story point Activity
const addStoryPoint = (data) => {
  if (storyPoints) {
    //if not empty
    if (
      showHide.find(
        (x) => x.roomId === data.roomId && x.username === data.username
      )
    ) {
      //if room already exist
      for (const element of storyPoints) {
        if (
          element.roomId === data.roomId &&
          element.username === data.username
        ) {
          element.storyPoint = data.storyPoint;
          break;
        }
      }
    } else {
      //add new rooms's story
      storyPoints.push(data);
    }
  } else {
    //if array is empty
    storyPoints.push(data);
  }
};

const getAllStoryPoints = function () {
  return storyPoints;
};
//#endregion

module.exports = {
  addStory,
  removeStory,
  getAllStories,
  addShowHide,
  getAllShowHide,
  addStoryPoint,
  getAllStoryPoints,
};
