import React from 'react'
import "./style.css";
const FindMatches = () => {
  return (
    <div className="FindMatches-body">
    <div>
      <h1>Find Matches</h1>
      <form>
        <label>Select skill level:</label>
        <select>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button>Find matches</button>
      </form>
      <div>
        <h2>Available matches:</h2>
        <ul>
          <li>John Doe (Intermediate)</li>
          <li>Jane Smith (Advanced)</li>
          <li>Bob Johnson (Beginner)</li>
        </ul>
      </div>
    </div>
    </div>
  
  )
}

export default FindMatches