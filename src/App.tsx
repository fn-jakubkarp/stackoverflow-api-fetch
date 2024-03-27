import './App.css'
import { fetchTags } from './api/fetchTags';


function App() {
  (async () => {
    try {
      // Fetch tags
      const tags = await fetchTags();
      console.log('Tags:', tags);
    } catch (error) {
      console.error('Error:', error);
    }
  })();
  return (
    <>
    
    </>
  )
}

export default App
