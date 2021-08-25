import BounceLoader from "react-spinners/ClipLoader";

function Spinner({ loading }: {loading: boolean}) {
    return (
        <div className="sweet-loading">
            <BounceLoader color='#000FFF' loading={loading} size={50} />
        </div>
    );
}

export default Spinner;