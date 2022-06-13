import React, { useEffect, useState } from 'react';
import './App.css';

const languagesUrl =
  'https://gist.githubusercontent.com/MehfoozurRehman/b41d62e2f419c8212b196bab53826528/raw/c68dc51538002598245f18d4113c77d620348cda/languages.json';

interface LangItem {
  node: string;
  value: string;
}

const App = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);

  // Promise for filtering down languages based on value query
  const queryString = async (query: String) => {
    return new Promise<any>((resolve, reject) => {
      if (data) {
        resolve(data.filter((lang: String) => lang.toUpperCase().includes(query.toUpperCase())));
      }
      reject('No data');
    });
  };

  const handleFocus = (e: any) => {
    setDisplayResults(true);
  };

  const selectValue = (val: string) => {
    setValue(val);
    setDisplayResults(false);
  };

  // Fetch remote resources of Programming Languages
  useEffect(() => {
    fetch(languagesUrl)
      .then((res) => res.json())
      .then((dat) => setData(dat));
  }, []);

  useEffect(() => {
    // Calling queryString Promise and set selectedList
    if (value) {
      queryString(value).then((dat) =>
        setSelectedList(
          dat
            .map((lang: String) => ({
              node: lang
                .match(new RegExp(value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i')) // Escape special characters and then match
                ?.map((m) => lang.replace(m, `<b>${m}</b>`)), //Replace matches with bold tag
              value: lang,
            }))
            ?.slice(0, 10)
        )
      );
    }
  }, [value]);

  return (
    <div className="search-wrapper">
      <div className="search-box">
        <input
          className={displayResults && value ? 'search-input top-border' : 'search-input'}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type="search"
          autoFocus
          placeholder="Search a Programming Language"
          onFocus={(e) => handleFocus(e)}
        />
        {value && displayResults && (
          <div className="results-box">
            <ul>
              {selectedList.map((el: LangItem, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: el.node }} onClick={() => selectValue(el.value)} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
