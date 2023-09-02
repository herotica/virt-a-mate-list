import { render } from 'preact';
import { useState } from 'preact/hooks';
import preactLogo from './assets/preact.svg';
import './style.css';
import Data from "./example.json"

export function App() {
	const [query, setQuery] = useState("")

	return (
		<main>
			<div className='grid grid-3'>
				{Data.map((item) => <Item item={item} />)}</div>
		</main>
	);
}

function Item({ item }) {
	return (
		<a href={item.link} target="_blank">
			<div className=''>
				<h4>{item?.normalName || "missing"}</h4>
			</div>
		</a>
	);
}

render(<App />, document.getElementById('app'));
