const stories = [];
const showHide = [];
//#region Story Activity
const addStory = (data) => {
    if(stories){
        //if not empty
        if(stories.find(x => x.roomId === data.roomId)){
            //if room already exist
            for (let index = 0; index < stories.length; index++) {
                if(stories[index].roomId === data.roomId){
                    stories[index].storyDescription = data.storyDescription;
                    break;
                }
            }
        }else{
            //add new rooms's story
            stories.push(data);
        }
    }else{
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
    if(showHide){
        //if not empty
        if(showHide.find(x => x.roomId === data.roomId)){
            //if room already exist
            for (let index = 0; index < showHide.length; index++) {
                if(showHide[index].roomId === data.roomId){
                    showHide[index].isShow = data.isShow;
                    break;
                }
            }
        }else{
            //add new rooms's story
            showHide.push(data);
        }
    }else{
        //if array is empty
        showHide.push(data);
    }
    
};

const getAllShowHide = function () {
    return showHide;
  };
//#endregion

module.exports = { addStory, removeStory, getAllStories,addShowHide,getAllShowHide };
