import {useEffect} from 'react';
import Card from './Card';
export const List = ({curses}) => {
    console.log(curses);
    return (
        <div className='flex flex-wrap justify-center gap-4'>
            {
                curses.map(cursa =>
                    <Card cursa={cursa} key={cursa.cur_id}/>
                )
            }
        </div>
    );
}

export default List;