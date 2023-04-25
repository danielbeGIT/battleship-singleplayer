export const Box = ({ onClick, style, selected, isShip }) => {
    return (
        <div
            className={`Box ${selected ? "missBox" : ""} ${isShip ? "ship" : ""}`}
            onClick={onClick}
            style={style}
        >
        </div>
    );
};