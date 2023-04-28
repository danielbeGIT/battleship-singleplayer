export const Box = ({
    onClick,
    style,
    selected,
    isShip,
    isHit,
    text,
    disabled
}) => {
    return (
        <button
            className={`Box ${selected ? "missBox" : ""} ${isShip ? "ship" : ""} ${isHit ? "hitBox" : ""}`}
            onClick={onClick}
            style={style}
            disabled={disabled}
        >
            {text}
        </button>
    )
}