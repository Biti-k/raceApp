import {useEffect} from 'react';

function Main() {
    useEffect(() => {
        console.log(get_all_categories);
    }, [])

    return (
        <div>
            <h2 className="bg-slate-500">React App</h2>
        </div>
    );
}

export default Main;