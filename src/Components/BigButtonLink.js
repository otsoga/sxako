import BigButton from './BigButton';
import { Link, Outlet } from 'react-router-dom';

function BigButtonLink({text, to}) {

    return (
    <Link to={to}>
        <BigButton text={text} />
    </Link>
    );
}

export default BigButtonLink;