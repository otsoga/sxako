import BigButton from './BigButton';
import { Link } from 'react-router-dom';

function BigButtonLink({text, to}) {

    return (
    <Link to={to}>
        <BigButton text={text} />
    </Link>
    );
}

export default BigButtonLink;