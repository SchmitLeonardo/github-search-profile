import Spinner from 'react-bootstrap/Spinner';

export const Loader = () => {
    return (
        <div className="card d-flex align-items-center">
            <Spinner animation="border" variant="light" />
        </div>
    )
}
