import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Main from './Components/main';


ReactDOM.createRoot(document.getElementById('app')).render(
	<BrowserRouter>
		<React.StrictMode>
			<Main />
		</React.StrictMode>
	</BrowserRouter>
);