import { useState } from 'react';
import './App.css';

const files = {
  children: [
    {
      name: 'node_modules'
    },
    {
      name: 'assets',
      children: [
        {
          name: 'asset 1'
        },
        {
          name: 'asset 2'
        }
      ]
    },
    {
      name: 'priv',
      children: [
        {
          name: 'priv 1',
          children: [
            {
              name: 'priv 1.1'
            }
          ]
        }
      ]
    }
  ]
}

type TEntry = {
  name: string;
  children?: TEntry[];
}

function Entry({ entry, depth }: { entry: TEntry, depth: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      {entry.children ?
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '-' : '+'} {entry.name}
        </button>
        :
        <div>{entry.name}</div>
      }
      {isExpanded &&
        <div style={{ paddingLeft: `${depth * 10}px` }}>
          {entry.children?.map((entry) => (
            <Entry entry={entry} depth={depth + 1} />
          ))}
        </div>
      }
    </div>
  )
}

function App() {
  return (
    <div>
      {files.children.map((entry) => (
        <Entry entry={entry} depth={1} />
      ))}
    </div>
  )
}

export default App;
