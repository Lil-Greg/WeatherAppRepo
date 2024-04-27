import { useState } from 'react'
import { SearchBar } from './components/SearchBar'

export default function App() {

  return (
    <div className="App">
      <div className="search_bar_container"></div>
      {/* Code */}
      <SearchBar/>
    </div>
  );
}
