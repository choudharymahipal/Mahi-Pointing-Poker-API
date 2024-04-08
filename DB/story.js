const stories = [];

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

module.exports = { addStory, removeStory, getAllStories };
