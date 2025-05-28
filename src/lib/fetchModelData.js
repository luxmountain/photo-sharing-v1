async function fetchModel(url) {
  try {
    const response = await fetch(`http://localhost:8081/api${url}`, {
      credentials: 'include', // Include cookies for session-based auth
    });
    
    if (response.status === 401) {
      // Unauthorized, trigger logout
      window.dispatchEvent(new CustomEvent('unauthorized'));
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchModel error:", error);
    return null;
  }
}

export default fetchModel;
