import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const reactElemet = React.createElement('a',
    {
        href: 'https://www.google.com',
        target: '_blank',
    },
    'Click here to visit Google'
);




ReactDOM.createRoot(document.getElementById('root')).render(
  
    <App />
    // reactElemet
)
