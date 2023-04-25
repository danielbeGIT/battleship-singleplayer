export const Box = ({ onClick, style, selected, isShip }) => {
    return (
        <div
            className={`Box ${selected ? "selected" : ""} ${isShip ? "ship" : ""}`}
            onClick={onClick}
            style={style}
        >
        </div>
    );
};