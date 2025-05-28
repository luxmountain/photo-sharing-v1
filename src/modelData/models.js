import fetchModel from "../lib/fetchModelData";

const models = {
  userListModel: async () => await fetchModel("/user/list"),
  userModel: async (userId) => await fetchModel(`/user/${userId}`),
  photoOfUserModel: async (userId) => await fetchModel(`/photo/${userId}`),
  
  addCommentToPhoto: async (photoId, comment) => {
    const response = await fetch(`http://localhost:8081/api/commentsOfPhoto/${photoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ comment })
    });
    if (!response.ok) {
      if (response.status === 401) {
        window.dispatchEvent(new CustomEvent('unauthorized'));
      }
      throw new Error('Failed to add comment');
    }
    return response.json();
  },
  
  uploadPhoto: async (file) => {
    const formData = new FormData();
    formData.append('uploadedphoto', file);
    
    const response = await fetch('http://localhost:8081/api/photos/new', {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        window.dispatchEvent(new CustomEvent('unauthorized'));
      }
      throw new Error('Failed to upload photo');
    }
    return response.json();
  }
};

export default models;
